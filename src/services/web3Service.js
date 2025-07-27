import { ethers } from 'ethers';
import { toast } from 'react-toastify';

class Web3Service {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.account = null;
    this.chainId = null;
    this.isConnecting = false;
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled() {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }

  // Get provider instance
  getProvider() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }
    
    if (!this.provider) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
    
    return this.provider;
  }

  // Connect to MetaMask
  async connect() {
    try {
      if (this.isConnecting) {
        return { success: false, error: 'Connection already in progress' };
      }

      if (!this.isMetaMaskInstalled()) {
        toast.error('MetaMask is not installed. Please install MetaMask to continue.');
        return { success: false, error: 'MetaMask not installed' };
      }

      this.isConnecting = true;
      toast.info('Connecting to MetaMask...');

      const provider = this.getProvider();
      
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      this.account = accounts[0];
      this.signer = await provider.getSigner();
      
      // Get network info
      const network = await provider.getNetwork();
      this.chainId = network.chainId;

      // Set up event listeners
      this.setupEventListeners();

      toast.success(`Connected to ${this.account.slice(0, 6)}...${this.account.slice(-4)}`);
      
      return {
        success: true,
        account: this.account,
        chainId: this.chainId
      };

    } catch (error) {
      console.error('MetaMask connection error:', error);
      
      let errorMessage = 'Failed to connect to MetaMask';
      
      if (error.code === 4001) {
        errorMessage = 'Connection rejected by user';
      } else if (error.code === -32002) {
        errorMessage = 'Connection request already pending';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      
      return { success: false, error: errorMessage };
    } finally {
      this.isConnecting = false;
    }
  }

  // Disconnect wallet
  disconnect() {
    this.provider = null;
    this.signer = null;
    this.account = null;
    this.chainId = null;
    
    // Remove event listeners
    if (window.ethereum) {
      window.ethereum.removeAllListeners();
    }
    
    toast.info('Wallet disconnected');
  }

  // Get current account
  async getCurrentAccount() {
    try {
      if (!this.isMetaMaskInstalled()) {
        return null;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      return accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
      console.error('Error getting current account:', error);
      return null;
    }
  }

  // Get network info
  async getNetworkInfo() {
    try {
      const provider = this.getProvider();
      const network = await provider.getNetwork();
      return {
        chainId: network.chainId,
        name: network.name
      };
    } catch (error) {
      console.error('Error getting network info:', error);
      return null;
    }
  }

  // Switch network
  async switchNetwork(chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      });
      
      this.chainId = chainId;
      toast.success('Network switched successfully');
      return { success: true };
    } catch (error) {
      console.error('Error switching network:', error);
      toast.error('Failed to switch network');
      return { success: false, error: error.message };
    }
  }

  // Setup event listeners for account and network changes
  setupEventListeners() {
    if (!window.ethereum) return;

    // Account changed
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        this.disconnect();
      } else {
        this.account = accounts[0];
        toast.info(`Account changed to ${this.account.slice(0, 6)}...${this.account.slice(-4)}`);
      }
    });

    // Network changed
    window.ethereum.on('chainChanged', (chainId) => {
      this.chainId = parseInt(chainId, 16);
      toast.info('Network changed');
      // Reload the page as recommended by MetaMask
      window.location.reload();
    });

    // Connection changed
    window.ethereum.on('connect', (connectInfo) => {
      console.log('MetaMask connected:', connectInfo);
    });

    // Disconnection
    window.ethereum.on('disconnect', (error) => {
      console.log('MetaMask disconnected:', error);
      this.disconnect();
    });
  }

  // Get balance of current account
  async getBalance() {
    try {
      if (!this.account) {
        throw new Error('No account connected');
      }

      const provider = this.getProvider();
      const balance = await provider.getBalance(this.account);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }

  // Check if wallet is connected
  isConnected() {
    return !!this.account;
  }

  // Get current connection state
  getConnectionState() {
    return {
      isConnected: this.isConnected(),
      account: this.account,
      chainId: this.chainId,
      isConnecting: this.isConnecting
    };
  }
}

// Export singleton instance
export const web3Service = new Web3Service();
export default web3Service;