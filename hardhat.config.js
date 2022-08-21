require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("./tasks/block-number");

const rinkebyRpcURL = process.env.RINKEBY_RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby : {
      url: rinkebyRpcURL,
      accounts: [privateKey],
      chainId: 4,
    },
  },
  solidity: "0.8.9",
  etherscan: {
    apiKey: etherscanApiKey,
  }
};
