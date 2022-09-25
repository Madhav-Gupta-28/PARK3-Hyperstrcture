const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  await window.ethereum.enable();
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let contractAddress = "0x3368f41abd14350782f19346872fa36d2fb111a7";

  const signer = provider.getSigner();

  let contract = new ethers.Contract(contractAddress, abi, provider);

  let balance = await provider.getBalance("ethers.eth");

  console.log(balance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

let abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Proposals",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "contendId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "AncillaryData",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "StartingTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ExpirationTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "passed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCids",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
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
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
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
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
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
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
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
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "getState",
    outputs: [
      {
        internalType: "enum OptimisticOracleV2Interface.State",
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
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
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
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
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
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
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
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
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
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "settleRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
