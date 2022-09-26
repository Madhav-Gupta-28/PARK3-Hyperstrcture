import "./index.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Qrcode from "./components/QRCode/Qrcode";
import ProposeList from "./components/ProposesList/ProposeList";
import Watchvideo from "./components/watchVideo/Watchvideo";
import Web3 from "web3";
import { useState, createContext, useEffect } from "react";
import {
  createReactClient,
  studioProvider,
  LivepeerConfig,
} from "@livepeer/react";

const ethers = require("ethers");
// const fs = require("fs-extra");

export const AppStateContext = createContext(null);

function App() {
  const [login, setlogin] = useState(false);
  const [walletaddress, setwalletaddress] = useState("");
  const [description, setdescription] = useState("");
  const [uploadSucess, setuploadSucess] = useState(false);
  const [proposalData, setproposalData] = useState([]);
  const [provider, setprovider] = useState("");
  const [signer, setsigner] = useState("");
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [web3Obj, setWeb3Obj] = useState();

  // declaring an assest id
  const [assetid, setassetid] = useState("");

  const client = createReactClient({
    provider: studioProvider({
      apiKey: "6a234aef-9c9c-41a1-82ba-948e33476fa2",
    }),
  });

  let abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "getCids",
      outputs: [
        {
          internalType: "bytes[]",
          name: "",
          type: "bytes[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
      ],
      name: "getData",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
      ],
      name: "getExpirationTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getOracleAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
      ],
      name: "getSettledData",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
      ],
      name: "getStartingTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
      ],
      name: "getState",
      outputs: [
        {
          internalType: "enum OptimisticOracleInterface.State",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
        {
          internalType: "int256",
          name: "proposedPrice",
          type: "int256",
        },
      ],
      name: "propose",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
      ],
      name: "registerContentId",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
        {
          internalType: "string",
          name: "data",
          type: "string",
        },
      ],
      name: "requestData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "data",
          type: "string",
        },
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
      ],
      name: "setAncillaryData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "contentId",
          type: "string",
        },
      ],
      name: "settleRequest",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

      setWeb3Obj(web3);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      const _contract = new web3.eth.Contract(
        abi,
        "0x72665365323F772c22Fd8848550603C095aa6275"
      );
      //_contract.address = "0x3368f41abd14350782f19346872fa36d2fb111a7";
      setContract(_contract);
    }

    load();
  }, []);

  return (
    <>
      <LivepeerConfig client={client}>
        <AppStateContext.Provider
          value={{
            login,
            setlogin,
            walletaddress,
            setwalletaddress,
            description,
            setdescription,
            uploadSucess,
            setuploadSucess,
            proposalData,
            setproposalData,
            assetid,
            setassetid,
          }}
        >
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home
                    contract={contract}
                    account={account}
                    web3Obj={web3Obj}
                  />
                }
              />
              <Route exact path="/qrcode" element={<Qrcode />} />
              <Route
                exact
                path="/list"
                element={
                  <ProposeList
                    contract={contract}
                    account={account}
                    web3Obj={web3Obj}
                  />
                }
              />
              <Route exact path="/watchvideo" element={<Watchvideo />} />
            </Routes>
          </Router>
        </AppStateContext.Provider>
      </LivepeerConfig>
    </>
  );
}

export function requestData(contentId, videoDescription, contract, account) {
  contract.methods
    .requestData(contentId, videoDescription)
    .send({ from: account })
    .then(function (receipt) {
      if (receipt) {
        console.log("requestData is sucessfull");
      } else {
        console.log("requestData is not succesfull");
      }
    });
}

export function proposePrice(contentId, price, contract, account) {
  contract.methods
    .propose(contentId, price)
    .send({ from: account })
    .then(function (receipt) {
      if (receipt) {
        console.log("requestData is sucessfull");
      } else {
        console.log("requestData is not succesfull");
      }
    });
}
export default App;
