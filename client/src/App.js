import Upload from "./artifacts/Upload.json";
import { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import Footer from "./components/Footer";
const { ethers } = require('ethers');

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xd00D84B04100c4FDD17F147bd35D1a6C1707B6E3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>

      <div className="App">
        <div className="wrapper"> <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
          <div><span className="dot"></span></div>
        </div>

        <h1>File Sharing Decentralized</h1>

        <p >
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>


        {!modalOpen && (
          <button className="share" onClick={() => setModalOpen(true)}>
            Share
          </button>
        )}
        {modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )}

      </div>

      <Footer />
    </>
  );
}

export default App;

