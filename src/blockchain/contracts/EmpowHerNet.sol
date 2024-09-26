pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract EmpowHerNet {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Mapping of user addresses to their corresponding wallet addresses
    mapping (address => address) public userWallets;

    // Mapping of wallet addresses to their corresponding balances
    mapping (address => uint256) public walletBalances;

    // Mapping of wallet addresses to their corresponding PiCoin addresses
    mapping (address => address) public walletPiCoinAddresses;

    // Event emitted when a user creates a new wallet
    event NewWallet(address indexed user, address indexed wallet);

    // Event emitted when a user deposits PiCoin into their wallet
    event Deposit(address indexed user, address indexed wallet, uint256 amount);

    // Event emitted when a user withdraws PiCoin from their wallet
    event Withdrawal(address indexed user, address indexed wallet, uint256 amount);

    // Event emitted when a user transfers PiCoin to another user's wallet
    event Transfer(address indexed from, address indexed to, uint256 amount);

    // Function to create a new wallet for a user
    function createWallet(address user) public {
        // Check if the user already has a wallet
        require(userWallets[user] == address(0), "User already has a wallet");

        // Create a new wallet address
        address wallet = address(this);

        // Set the user's wallet address
        userWallets[user] = wallet;

        // Emit the NewWallet event
        emit NewWallet(user, wallet);
    }

    // Function to deposit PiCoin into a user's wallet
    function deposit(address user, uint256 amount) public {
        // Check if the user has a wallet
        require(userWallets[user] != address(0), "User does not have a wallet");

        // Get the user's wallet address
        address wallet = userWallets[user];

        // Deposit the PiCoin into the user's wallet
        walletBalances[wallet] = walletBalances[wallet].add(amount);

        // Emit the Deposit event
        emit Deposit(user, wallet, amount);
    }

    // Function to withdraw PiCoin from a user's wallet
    function withdraw(address user, uint256 amount) public {
        // Check if the user has a wallet
        require(userWallets[user] != address(0), "User does not have a wallet");

        // Get the user's wallet address
        address wallet = userWallets[user];

        // Check if the user has sufficient balance
        require(walletBalances[wallet] >= amount, "Insufficient balance");

        // Withdraw the PiCoin from the user's wallet
        walletBalances[wallet] = walletBalances[wallet].sub(amount);

        // Emit the Withdrawal event
        emit Withdrawal(user, wallet, amount);
    }

    // Function to transfer PiCoin to another user's wallet
    function transfer(address from, address to, uint256 amount) public {
        // Check if the from user has a wallet
        require(userWallets[from] != address(0), "From user does not have a wallet");

        // Check if the to user has a wallet
        require(userWallets[to] != address(0), "To user does not have a wallet");

        // Get the from user's wallet address
        address fromWallet = userWallets[from];

        // Get the to user's wallet address
        address toWallet = userWallets[to];

        // Check if the from user has sufficient balance
        require(walletBalances[fromWallet] >= amount, "Insufficient balance");

        // Transfer the PiCoin from the from user's wallet to the to user's wallet
        walletBalances[fromWallet] = walletBalances[fromWallet].sub(amount);
        walletBalances[toWallet] = walletBalances[toWallet].add (amount);

        // Emit the Transfer event
        emit Transfer(from, to, amount);
    }
}
