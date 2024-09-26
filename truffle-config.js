const path = require('path');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'src/blockchain/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    test: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
  },
  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: '0.8.0',
    },
  },
};
