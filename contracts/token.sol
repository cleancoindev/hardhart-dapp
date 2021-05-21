// TOKEN.SOL IS  A DEMO, JUST FOR TESTING PURPOSES.

// compiler pragma
pragma solidity ^0.7.3;

// debugging in hardhat
import "hardhat/console.sol";



contract Token {
    // Set variable for identification
    string public name = "CD Hardhat Token";
    string public symbol = "CHT";

    // Fixed amount of tokens stored in unisigned int
    uint256 public totalSupply = 10000000;
    // Address variable is used to store ethereum accounts
    address public owner;


    mapping(address => uint256) balances;

    // Contract initialization
    constructor() {
        // Total supply is assigned to transaction sender (account deploying contract)
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    // Transfer token function
    function transfer(address to, uint256 amount) external {
        // Console output
        console.log("Sender balalnce is %s tokens", balances[msg.sender]);
        console.log("trying to send %s tokens to %s", amount, to);

        // Check if trnsaction sender has enough tokens. if first arg is false then transaction reverts
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Make the transfer
        balances[msg.sender] -= amount;
        balances[to] += amount;

    }


    // Read only function to retrieve ballance of a given account
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

}
