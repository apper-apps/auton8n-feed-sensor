import { useState, useEffect, useCallback } from 'react';
import { web3Service } from '@/services/web3Service';
import { toast } from 'react-toastify';

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState('0');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize wallet state
  const initializeWallet = useCallback(async () => {
    try {
      const currentAccount = await web3Service.getCurrentAccount();
      if (currentAccount) {
        setAccount(currentAccount);
        setIsConnected(true);
        
        const networkInfo = await web3Service.getNetworkInfo();
        if (networkInfo) {
          setChainId(networkInfo.chainId);
        }
        
        const accountBalance = await web3Service.getBalance();
        setBalance(accountBalance);
      }
    } catch (error) {
      console.error('Error initializing wallet:', error);
      setError(error.message);
    }
  }, []);

  // Connect wallet
  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      const result = await web3Service.connect();
      
      if (result.success) {
        setIsConnected(true);
        setAccount(result.account);
        setChainId(result.chainId);
        
        // Get balance after connection
        const accountBalance = await web3Service.getBalance();
        setBalance(accountBalance);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      const errorMessage = error.message || 'Failed to connect wallet';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    web3Service.disconnect();
    setIsConnected(false);
    setAccount(null);
    setChainId(null);
    setBalance('0');
    setError(null);
  }, []);

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    if (isConnected && account) {
      try {
        const accountBalance = await web3Service.getBalance();
        setBalance(accountBalance);
      } catch (error) {
        console.error('Error refreshing balance:', error);
      }
    }
  }, [isConnected, account]);

  // Switch network
  const switchNetwork = useCallback(async (targetChainId) => {
    try {
      const result = await web3Service.switchNetwork(targetChainId);
      if (result.success) {
        setChainId(targetChainId);
      }
      return result;
    } catch (error) {
      console.error('Error switching network:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Format account address for display
  const formatAccount = useCallback((address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  // Get network name
  const getNetworkName = useCallback((id) => {
    const networks = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Polygon Mumbai',
      56: 'BSC Mainnet',
      97: 'BSC Testnet'
    };
    return networks[id] || `Chain ID: ${id}`;
  }, []);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = useCallback(() => {
    return web3Service.isMetaMaskInstalled();
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeWallet();
  }, [initializeWallet]);

  // Set up event listeners for account/network changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAccount(accounts[0]);
        refreshBalance();
      }
    };

    const handleChainChanged = (chainId) => {
      setChainId(parseInt(chainId, 16));
    };

    const handleConnect = () => {
      initializeWallet();
    };

    const handleDisconnect = () => {
      disconnect();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('connect', handleConnect);
    window.ethereum.on('disconnect', handleDisconnect);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('connect', handleConnect);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [disconnect, initializeWallet, refreshBalance]);

  return {
    // State
    isConnected,
    account,
    chainId,
    balance,
    isConnecting,
    error,
    
    // Actions
    connect,
    disconnect,
    refreshBalance,
    switchNetwork,
    
    // Utilities
    formatAccount,
    getNetworkName,
    isMetaMaskInstalled,
    
    // Formatted values
    formattedAccount: formatAccount(account),
    networkName: getNetworkName(chainId),
    formattedBalance: parseFloat(balance).toFixed(4)
  };
};

export default useWallet;