import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, LogOut, Wallet, Zap } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";

const Header = () => {
  const {
    isConnected,
    account,
    isConnecting,
    error,
    connect,
    disconnect,
    formattedAccount,
    networkName,
    formattedBalance,
    isMetaMaskInstalled
  } = useWallet();

  const handleConnect = async () => {
    if (!isMetaMaskInstalled()) {
      toast.error('MetaMask is not installed. Please install MetaMask to continue.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    await connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const WalletButton = () => {
    if (!isMetaMaskInstalled()) {
      return (
        <Button
          onClick={handleConnect}
          className="bg-error/20 hover:bg-error/30 text-error border-error/50"
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          Install MetaMask
        </Button>
      );
    }

    if (isConnecting) {
      return (
        <Button disabled className="bg-primary/20 text-primary border-primary/50">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
          Connecting...
        </Button>
      );
    }

    if (isConnected && account) {
      return (
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm text-gray-300">{formattedAccount}</p>
            <p className="text-xs text-gray-500">{networkName}</p>
            <p className="text-xs text-primary">{formattedBalance} ETH</p>
          </div>
          <Button
            onClick={handleDisconnect}
            className="bg-secondary/20 hover:bg-secondary/30 text-secondary border-secondary/50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Disconnect</span>
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={handleConnect}
        className="bg-primary/20 hover:bg-primary/30 text-primary border-primary/50 hover:glow-primary"
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>
    );
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-primary/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
Auton8n
              </h1>
              <p className="text-xs text-gray-400">AI Workflow Automation</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#templates" className="text-gray-300 hover:text-primary transition-colors">
                Templates
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-primary transition-colors">
                Pricing
              </a>
            </nav>
            
            <WalletButton />
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-full left-0 right-0 bg-error/10 border-b border-error/20 p-2"
            >
              <p className="text-center text-sm text-error">
                Wallet Error: {error}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary" size="sm">
              <ApperIcon name="Sparkles" className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary transition-colors"
            >
              <ApperIcon name={isMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 mt-4 pt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors duration-300 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <Button variant="primary" size="sm" className="w-full">
                  <ApperIcon name="Sparkles" className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}