import './App.css';
import { useState, useEffect } from 'react'
import Upload from './artifacts/Upload.json'
const { ethers } = require('ethers')
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [modalOpen, setModelOpen] = useState(null);



  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {

        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        })

        window.ethereum.on('accountsChanged', () => {
          window.location.reload();
        })

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contractAddress = "0xd00D84B04100c4FDD17F147bd35D1a6C1707B6E3";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);

        setContract(contract);
        setProvider(provider);
        setSigner(signer);

      }
      else {
        alert("Metamask not installed");
      }
    }
    provider && loadProvider();
  }, []);

  return (
    <>

    </>
  );
}

export default App;
