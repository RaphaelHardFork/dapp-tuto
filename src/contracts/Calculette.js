export const calculetteAddress = "0x9455e7753d790325446A84Bf845A2be3b65c07a2"

export const calculetteAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenContractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rate_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "result",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "Add",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyers",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "creditsBought",
        type: "uint256",
      },
    ],
    name: "CreditsBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "result",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "Div",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "result",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "Mod",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "result",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "Mul",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "result",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "Sub",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "add",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "buyCredits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "creditsBalanceOf",
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
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "div",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "mod",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "mul",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "rate",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "number1",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "number2",
        type: "int256",
      },
    ],
    name: "sub",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenContract",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]
