/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  MiniMintMarketplace,
  MiniMintMarketplaceInterface,
} from "../../contracts/MiniMintMarketplace";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_mainCollection",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "NFTDelisted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "NFTListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "NFTSold",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "buyNFT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "delistNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
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
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getListing",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        internalType: "struct MiniMintMarketplace.Listing",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    name: "isFactoryDeployedCollection",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "listNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listings",
    outputs: [
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mainCollection",
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
] as const;

const _bytecode =
  "0x60c060405234801561001057600080fd5b5060405161235938038061235983398181016040528101906100329190610155565b61004c67716a5fdd6d15926260c01b6100ef60201b60201c565b61006667c77ffef9c6e8225e60c01b6100ef60201b60201c565b8173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250506100b4677599b7c9ee252ca660c01b6100ef60201b60201c565b8073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250505050610195565b50565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610122826100f7565b9050919050565b61013281610117565b811461013d57600080fd5b50565b60008151905061014f81610129565b92915050565b6000806040838503121561016c5761016b6100f2565b5b600061017a85828601610140565b925050602061018b85828601610140565b9150509250929050565b60805160a0516121836101d66000396000818161024e0152818161062701528181610a7801526110500152600081816103b801526117bb01526121836000f3fe60806040526004361061007a5760003560e01c8063a17a70941161004e578063a17a709414610162578063a82ba76f1461018b578063ad05f1b4146101a7578063c45a0155146101d05761007a565b806207df301461007f578063689b5e3c146100bd57806388700d1c146100e8578063927ca0b414610125575b600080fd5b34801561008b57600080fd5b506100a660048036038101906100a191906118c3565b6101fb565b6040516100b4929190611921565b60405180910390f35b3480156100c957600080fd5b506100d261024c565b6040516100df919061194a565b60405180910390f35b3480156100f457600080fd5b5061010f600480360381019061010a91906118c3565b610270565b60405161011c91906119b2565b60405180910390f35b34801561013157600080fd5b5061014c600480360381019061014791906119cd565b610376565b6040516101599190611a15565b60405180910390f35b34801561016e57600080fd5b50610189600480360381019061018491906118c3565b6105c0565b005b6101a560048036038101906101a091906118c3565b610a11565b005b3480156101b357600080fd5b506101ce60048036038101906101c99190611a30565b610fe9565b005b3480156101dc57600080fd5b506101e56117b9565b6040516101f2919061194a565b60405180910390f35b6000602052816000526040600020602052806000526040600020600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b7f000000000000000000000000000000000000000000000000000000000000000081565b6102786117eb565b61028c67e84930f1ced0547560c01b6117dd565b6102a0673b8912ffb4d68eea60c01b6117dd565b6102b467a6ce091444caeb9760c01b6117dd565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481525050905092915050565b600061038c6764358772fe5566bb60c01b6117dd565b6103a067ef06464a0fc2f57d60c01b6117dd565b6103b467b2a33a21f06236cf60c01b6117dd565b60007f000000000000000000000000000000000000000000000000000000000000000090506103ed67b711825e0a32069160c01b6117dd565b610401671317a4c607618a6160c01b6117dd565b60008173ffffffffffffffffffffffffffffffffffffffff166346e635866040518163ffffffff1660e01b8152600401600060405180830381865afa15801561044e573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906104779190611bf1565b905061048d6705f72b4249f6521e60c01b6117dd565b6104a167ad09fa6663c7bc1a60c01b6117dd565b60005b815181101561058b576104c167f6dad35b6d6ff94b60c01b6117dd565b6104d56727bb79393241cc8760c01b6117dd565b8473ffffffffffffffffffffffffffffffffffffffff168282815181106104ff576104fe611c3a565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff160361056a5761053667abf2123fdb63b5e760c01b6117dd565b61054a67fc76e533f875224060c01b6117dd565b61055e6701fd6f5bb195c67760c01b6117dd565b600193505050506105bb565b61057e672ebfb6d2033f41c760c01b6117dd565b80806001019150506104a4565b506105a067f8db2c9ba14ad5b460c01b6117dd565b6105b4676d68f8a8172b812860c01b6117dd565b6000925050505b919050565b6105d46764434cf170ecd65160c01b6117dd565b816105e967b910eab75f0ad29960c01b6117dd565b6105fd676985aed74227283660c01b6117dd565b6106116727e7ad56b21c80fc60c01b6117dd565b610625677732e4acc040b92660c01b6117dd565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16148015610690575061068f675d1f774d72c21f8660c01b6117e0565b5b806106bc575061069f81610376565b80156106bb57506106ba6727fcf8accf1fbefb60c01b6117e0565b5b5b6106fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f290611cec565b60405180910390fd5b61070f67513723620bc5c92960c01b6117dd565b610723675eacc7fa94bb366d60c01b6117dd565b61073767a7c13939b2b91c1060c01b6117dd565b61074b67b3f1cece8b0f68a760c01b6117dd565b61075f6783f480d3836f72ec60c01b6117dd565b610773671de59f6a9812f37d60c01b6117dd565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152505090506108456755d7e0fdaa03246d60c01b6117dd565b6108596737af217a598efbc560c01b6117dd565b61086d675e0fca00f71e189a60c01b6117dd565b3373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16146108df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d690611d58565b60405180910390fd5b6108f36751ced4151e6ae3cf60c01b6117dd565b6109076753047f804b21318360c01b6117dd565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055505061099c67b4edc614858a45db60c01b6117dd565b6109b067ce3c1066ef80992f60c01b6117dd565b828473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167ffc314074f528769d77ad4a29ede7c622894f632282e936ebefff2646a598c2ee60405160405180910390a450505050565b610a2567e895ba9157c4bbf160c01b6117dd565b81610a3a67b910eab75f0ad29960c01b6117dd565b610a4e676985aed74227283660c01b6117dd565b610a626727e7ad56b21c80fc60c01b6117dd565b610a76677732e4acc040b92660c01b6117dd565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16148015610ae15750610ae0675d1f774d72c21f8660c01b6117e0565b5b80610b0d5750610af081610376565b8015610b0c5750610b0b6727fcf8accf1fbefb60c01b6117e0565b5b5b610b4c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4390611cec565b60405180910390fd5b610b6067513723620bc5c92960c01b6117dd565b610b74675eacc7fa94bb366d60c01b6117dd565b610b8867aa5ce45f5158bdf160c01b6117dd565b610b9c6784b2ea1c255c39cc60c01b6117dd565b610bb06747c5fd39a7a4053760c01b6117dd565b610bc4670da90116ffa0e16360c01b6117dd565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815250509050610c966704dc0b7bf8def89660c01b6117dd565b610caa6792c4d899e055dcdc60c01b6117dd565b610cbe67c2a3576301baa5a160c01b6117dd565b6000816020015111610d05576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cfc90611dc4565b60405180910390fd5b610d196728e2ca5161b53cd660c01b6117dd565b610d2d67cd83d84f579a7c5160c01b6117dd565b610d416786eca82ba697d24460c01b6117dd565b610d55674d61a5734b3096a260c01b6117dd565b80602001513414610d9b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9290611e30565b60405180910390fd5b610daf67eeb1f7214c439d0060c01b6117dd565b610dc3678dbfa400dc2492b860c01b6117dd565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090555050610e58672d69e5b6860589cb60c01b6117dd565b610e6c6710483fcd43a51f2760c01b6117dd565b806000015173ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610eb6573d6000803e3d6000fd5b50610ecb67382d51c921bccc2060c01b6117dd565b610ede66f1ef54df18c58560c01b6117dd565b8373ffffffffffffffffffffffffffffffffffffffff166342842e0e826000015133866040518463ffffffff1660e01b8152600401610f1f93929190611e50565b600060405180830381600087803b158015610f3957600080fd5b505af1158015610f4d573d6000803e3d6000fd5b50505050610f6567f473ddd7ddfd88ab60c01b6117dd565b610f7967b63755869b0fbd2a60c01b6117dd565b828473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167ff6ccc0cf89c21c54724ea6ef2ec01da8fe33a1cebe06607e160fd78483eba3028460200151604051610fdb9190611e87565b60405180910390a450505050565b610ffd67b2167c098586e3ae60c01b6117dd565b8261101267b910eab75f0ad29960c01b6117dd565b611026676985aed74227283660c01b6117dd565b61103a6727e7ad56b21c80fc60c01b6117dd565b61104e677732e4acc040b92660c01b6117dd565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480156110b957506110b8675d1f774d72c21f8660c01b6117e0565b5b806110e557506110c881610376565b80156110e457506110e36727fcf8accf1fbefb60c01b6117e0565b5b5b611124576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111b90611cec565b60405180910390fd5b61113867513723620bc5c92960c01b6117dd565b61114c675eacc7fa94bb366d60c01b6117dd565b6111606729bf125b3f06197e60c01b6117dd565b6111746730bef887c1f594be60c01b6117dd565b611188671435cfb2c0ca4f1560c01b6117dd565b61119c674a40de2f7559a05560c01b6117dd565b6111b067d6be68b7f284964a60c01b6117dd565b600082116111f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111ea90611eee565b60405180910390fd5b61120767d1713e2795f7789160c01b6117dd565b61121b673ae65e81ccbe525e60c01b6117dd565b61122f671fb4bc7dc6a2ece660c01b6117dd565b6000849050611248677fb464ed8c35450260c01b6117dd565b61125c67827b56ce0abadc7b60c01b6117dd565b611270675ece654472aa60fa60c01b6117dd565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16636352211e866040518263ffffffff1660e01b81526004016112c09190611e87565b602060405180830381865afa1580156112dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113019190611f0e565b73ffffffffffffffffffffffffffffffffffffffff1614611357576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161134e90611fad565b60405180910390fd5b61136b671d5c996b7383987e60c01b6117dd565b61137f6713bd0dd03bfad4d960c01b6117dd565b611393674adeaf7d3d9adacf60c01b6117dd565b6113a7672472ac4b268b9e3460c01b6117dd565b8073ffffffffffffffffffffffffffffffffffffffff1663e985e9c533306040518363ffffffff1660e01b81526004016113e2929190611fcd565b602060405180830381865afa1580156113ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114239190612022565b801561143f575061143e67c4e6e3ab55e7932960c01b6117e0565b5b8061150a57503073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1663081812fc866040518263ffffffff1660e01b81526004016114959190611e87565b602060405180830381865afa1580156114b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114d69190611f0e565b73ffffffffffffffffffffffffffffffffffffffff161480156115095750611508677b50619c06467f5e60c01b6117e0565b5b5b611549576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611540906120c1565b60405180910390fd5b61155d675c33590e8f3bb6c760c01b6117dd565b61157167b2f7757a4e95e44460c01b6117dd565b6115856758fd3ea4c33c988860c01b6117dd565b6115996766da7797cfcba18d60c01b6117dd565b60008060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000868152602001908152602001600020600101541461162e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116259061212d565b60405180910390fd5b61164267e0cd9c97168c943c60c01b6117dd565b6116566792dc99f0791d343360c01b6117dd565b60405180604001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001848152506000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015590505061173867f5f2b4d2707477be60c01b6117dd565b61174c67f5cc6e3be77b4ef360c01b6117dd565b838573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fbeab3a2bb824b124a8a1eb465eec003338d61b414db132d37e9b3a984fdcf010866040516117aa9190611e87565b60405180910390a45050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b50565b600060019050919050565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061185a8261182f565b9050919050565b61186a8161184f565b811461187557600080fd5b50565b60008135905061188781611861565b92915050565b6000819050919050565b6118a08161188d565b81146118ab57600080fd5b50565b6000813590506118bd81611897565b92915050565b600080604083850312156118da576118d9611825565b5b60006118e885828601611878565b92505060206118f9858286016118ae565b9150509250929050565b61190c8161184f565b82525050565b61191b8161188d565b82525050565b60006040820190506119366000830185611903565b6119436020830184611912565b9392505050565b600060208201905061195f6000830184611903565b92915050565b61196e8161184f565b82525050565b61197d8161188d565b82525050565b6040820160008201516119996000850182611965565b5060208201516119ac6020850182611974565b50505050565b60006040820190506119c76000830184611983565b92915050565b6000602082840312156119e3576119e2611825565b5b60006119f184828501611878565b91505092915050565b60008115159050919050565b611a0f816119fa565b82525050565b6000602082019050611a2a6000830184611a06565b92915050565b600080600060608486031215611a4957611a48611825565b5b6000611a5786828701611878565b9350506020611a68868287016118ae565b9250506040611a79868287016118ae565b9150509250925092565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611ad182611a88565b810181811067ffffffffffffffff82111715611af057611aef611a99565b5b80604052505050565b6000611b0361181b565b9050611b0f8282611ac8565b919050565b600067ffffffffffffffff821115611b2f57611b2e611a99565b5b602082029050602081019050919050565b600080fd5b600081519050611b5481611861565b92915050565b6000611b6d611b6884611b14565b611af9565b90508083825260208201905060208402830185811115611b9057611b8f611b40565b5b835b81811015611bb95780611ba58882611b45565b845260208401935050602081019050611b92565b5050509392505050565b600082601f830112611bd857611bd7611a83565b5b8151611be8848260208601611b5a565b91505092915050565b600060208284031215611c0757611c06611825565b5b600082015167ffffffffffffffff811115611c2557611c2461182a565b5b611c3184828501611bc3565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b7f4d61726b6574706c6163653a20556e737570706f7274656420636f6c6c65637460008201527f696f6e0000000000000000000000000000000000000000000000000000000000602082015250565b6000611cd6602383611c69565b9150611ce182611c7a565b604082019050919050565b60006020820190508181036000830152611d0581611cc9565b9050919050565b7f596f7520617265206e6f74207468652073656c6c657200000000000000000000600082015250565b6000611d42601683611c69565b9150611d4d82611d0c565b602082019050919050565b60006020820190508181036000830152611d7181611d35565b9050919050565b7f4e4654206973206e6f74206c697374656420666f722073616c65000000000000600082015250565b6000611dae601a83611c69565b9150611db982611d78565b602082019050919050565b60006020820190508181036000830152611ddd81611da1565b9050919050565b7f496e636f72726563742076616c75652073656e74000000000000000000000000600082015250565b6000611e1a601483611c69565b9150611e2582611de4565b602082019050919050565b60006020820190508181036000830152611e4981611e0d565b9050919050565b6000606082019050611e656000830186611903565b611e726020830185611903565b611e7f6040830184611912565b949350505050565b6000602082019050611e9c6000830184611912565b92915050565b7f5072696365206d7573742062652067726561746572207468616e207a65726f00600082015250565b6000611ed8601f83611c69565b9150611ee382611ea2565b602082019050919050565b60006020820190508181036000830152611f0781611ecb565b9050919050565b600060208284031215611f2457611f23611825565b5b6000611f3284828501611b45565b91505092915050565b7f596f7520617265206e6f7420746865206f776e6572206f662074686973204e4660008201527f5400000000000000000000000000000000000000000000000000000000000000602082015250565b6000611f97602183611c69565b9150611fa282611f3b565b604082019050919050565b60006020820190508181036000830152611fc681611f8a565b9050919050565b6000604082019050611fe26000830185611903565b611fef6020830184611903565b9392505050565b611fff816119fa565b811461200a57600080fd5b50565b60008151905061201c81611ff6565b92915050565b60006020828403121561203857612037611825565b5b60006120468482850161200d565b91505092915050565b7f4d61726b6574706c616365206973206e6f7420617070726f76656420746f207460008201527f72616e736665722074686973204e465400000000000000000000000000000000602082015250565b60006120ab603083611c69565b91506120b68261204f565b604082019050919050565b600060208201905081810360008301526120da8161209e565b9050919050565b7f4e465420697320616c7265616479206c69737465640000000000000000000000600082015250565b6000612117601583611c69565b9150612122826120e1565b602082019050919050565b600060208201905081810360008301526121468161210a565b905091905056fea2646970667358221220ee1377a141603871d8e3a645450d0daf10604992eb91bd50e74f4be1e1ca305664736f6c634300081b0033";

type MiniMintMarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MiniMintMarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MiniMintMarketplace__factory extends ContractFactory {
  constructor(...args: MiniMintMarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _factory: AddressLike,
    _mainCollection: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _factory,
      _mainCollection,
      overrides || {}
    );
  }
  override deploy(
    _factory: AddressLike,
    _mainCollection: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_factory, _mainCollection, overrides || {}) as Promise<
      MiniMintMarketplace & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): MiniMintMarketplace__factory {
    return super.connect(runner) as MiniMintMarketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MiniMintMarketplaceInterface {
    return new Interface(_abi) as MiniMintMarketplaceInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MiniMintMarketplace {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as MiniMintMarketplace;
  }
}
