require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
ALCHEMY_URL = process.env.ALCHEMY_URL
PRIVATE_KEY = process.env.PRIVATE_KEY



module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: ALCHEMY_URL,
      accounts: [PRIVATE_KEY],
    }
  }
};
