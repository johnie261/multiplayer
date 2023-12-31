import React, { useState, useEffect, createContext, useRef, useContext } from 'react'
import { ethers } from 'ethers'
import Web3Modal from "web3modal";
import { useNavigate } from 'react-router-dom'
import { ADDRESS, abi } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {

  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState('')
  const [contract, setContract] = useState('')

  // set wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    if (accounts) setWalletAddress(accounts[0])
  }

  useEffect(() => {
    updateCurrentWalletAddress();

    window.ethereum.on('accountsChanged', updateCurrentWalletAddress);
  }, [])

  // set the smart contract and provider to the state
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const newProvider = new ethers.providers.Web3Provider(connection)
      const signer = newProvider.signer();
      const newContract = new ethers.Contract(ADDRESS, abi, signer);

      setProvider(newProvider)
      setContract(newContract)
    }

    setSmartContractAndProvider()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => useContext(GlobalContext)