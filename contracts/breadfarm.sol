// SPDX-License-Identifier: MIT

/*
 * BreadFarm is a yield farming contract for the BREAD token.
 *
 *
*/

pragma solidity ^0.7.0;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./polybread.sol";



contract BreadFarm {

    // State variable mappings

    // userAddress -> stakingBalance
    mapping(address => uint256) public stakingBalance;

    // userAddress -> isStaking boolean
    mapping(address => bool) public isStaking;

    // userAddress -> timeStamp
    // Keeps track of the timestamp for the users address to track unrealized yield.
    mapping(address => uint256) public startTime;


    // userAddress -> breadBalance
    mapping(address => uint256) public breadBalance;


    string public name = "BreadFarm";

    // interfaces
    IERC20 public daiToken;
    PolyBread public breadToken;


    // events
    event Stake(address indexed from, uint256 amount);
    event Unstake(address indexed from, uint256 amount);
    event YieldWithdraw(address indexed to, uint256 amount);


    constructor(IERC20 _daiToken, PolyBread _breadToken) {

        daiToken = _daiToken;
        breadToken = _breadToken;

    }


    function calculateYieldTime(address user) internal view returns(uint256) {

        uint256 end = block.timestamp;
        uint256 totalTime = end - startTime[user];

        return totalTime;
    }

    // Rate variable equates to 86,400 === number of senconds in 1 day. user receives 
    // 100% of staked DAI every 24 hours. this hould be determiend by users percentage of the pool

    // BigNumber time variable is divided by hardcoded rate.  frontend must divide by 10^18 to display actual yield.
    function calculateYieldTotal(address user) public view returns(uint256) {

        uint256 time = calculateYieldTime(user) * 10**18;

        uint256 rate = 86400;

        uint256 timeRate = time / rate;


        uint256 rawYield = (stakingBalance[user] * timeRate) / 10**18;

        return rawYield;
    }


    // Core functions
    function stake(uint256 amount) public {

        require(amount > 0 && daiToken.balanceOf(msg.sender) >= amount, "You cannot stake zero tokens");


        if (isStaking[msg.sender] == true) {
            uint256 toTransfer = calculateYieldTotal(msg.sender);

            breadBalance[msg.sender] += toTransfer;
        }



        daiToken.transferFrom(msg.sender, address(this), amount);
        stakingBalance[msg.sender] += amount;

        startTime[msg.sender] = block.timestamp;

        isStaking[msg.sender] = true;

        // emit event
        emit Stake(msg.sender, amount);
    }



    function unstake(uint256 amount) public {
        require(isStaking[msg.sender] = true && stakingBalance[msg.sender] >= amount, "nothing to unstake");


        uint256 yieldTransfer = calculateYieldTotal(msg.sender);
        uint256 balanceTransfer = amount;
        amount = 0;
        stakingBalance[msg.sender] -= balanceTransfer;
        daiToken.transfer(msg.sender, balanceTransfer);

        breadBalance[msg.sender] += yieldTransfer;


        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }

        emit Unstake(msg.sender, amount);
    }



    function withdrawYield() public {

        uint256 toTransfer = calculateYieldTotal(msg.sender);


        require(toTransfer > 0 || breadBalance[msg.sender] > 0, "nothing to withdraw");


        if (breadBalance[msg.sender] != 0) {
            uint256 oldBalance = breadBalance[msg.sender];

            breadBalance[msg.sender] = 0;
            toTransfer += oldBalance;
        }


        startTime[msg.sender] = block.timestamp;
        breadToken.mint(msg.sender, toTransfer);


        emit YieldWithdraw(msg.sender, toTransfer);
    }


}