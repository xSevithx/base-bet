// src/contexts/Web3Context.js
import React, { createContext, useContext, useState } from 'react';
import Web3 from 'web3';

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const contractABI = require('../assets/abi.json');
  const contractAddress = '0x1214d49702a247d2167a34729026D77f1705f9D9';

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        const bettingContract = new web3Instance.eth.Contract(contractABI, contractAddress);

        setWeb3(web3Instance);
        setContract(bettingContract);
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  //useEffect(() => {
  //  connectWalletHandler();
  //}, [contractABI]);

  return (
    <Web3Context.Provider value={{ web3, contract, currentAccount, connectWalletHandler }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
