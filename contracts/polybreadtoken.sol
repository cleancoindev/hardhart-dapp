// SPDX-License-Identifier: MIT


pragma solidity ^0.7.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract BreadToken is ERC20("Bread", "BREAD"), Ownable {

    // Safe minting by contract owner only
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
        // move delegates after mint
        _moveDelegates(address(0), _delegates[_to], _amount);
    }


    // @dev Record of each accounts delegate
    mapping (address => address) internal _delegates;


    // @dev checkpoint for marking number of votes from a given block
    struct Checkpoint {
        uint32 fromBlock;
        uint256 votes;
    }

    // @dev record of votes checppoints for each account, by index
    mapping (address => mapping(uint32 => Checkpoint)) public checkpoints;

    // @dev the # of checkpoints for each account
    mapping (address => uint32) public numCheckpoints;


    // typehashes below
    // @dev EIP-712 typehash for the contracts domain
    bytes32 public constant DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name, uint256 chainId, address verifyingContract)");

    // @dev EIP-712 typehash for the delegation struct used by the contract
    bytes32 public constant DELEGATION_TYPEHASH = keccak256("Delegation(address delegatee, uint256 nonce, uint256 expiry)");



    // @ record of states for signing and validating signatures
    mapping (address => uint) public nonces;


    // events
    // @dev event for when an account changes it's delegate
    event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);
    // @dev event for when a delegates accounts vote balance changes
    event DelegateVotesChanged(address indexed delegate, uint previousBalance, uint newBalance);




    /**
    * @dev delegate votes from msg.sender to delgateee
    *    
     */

     function delegates(address delegator) external view returns (address) {
         return _delegates[delegator];
     }

    // delegate votes from msg. sender to delegatee
     function delegate(address delegatee) external {
         return _delegate(msg.sender, delegatee);
     }




}