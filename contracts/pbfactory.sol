// SPDX-License-Identifier: MIT

// // SPDX-License-Identifier: MIT



// pragma solidity ^0.7.0;

// contract PBFactory {


//     // deploy event
//     event Deployed(address addr, uint256 salt);


//     // getBytecode of contract to be deployed.
//     // params are arguments of the testContracts constructor

//     function getBytecode(address _owner, uint _foo) public pure returns (bytes memory) {

//         bytes memory bytecode = type(TestContract).creationCode;

//         return abi.encodePacked(bytecode, abi.encode(_owner, _foo));
//     }

//     //  Compute and return the address of the contract to be deployed. _salt is a random number used to create an address
//     function getAddress(bytes memory bytecode, uint _salt) public view returns (address) {

//         bytes hash  = keccak256(
            
//             abi.encodePacked(
//                 bytes1(0xff),
//                 address(this),
//                 _salt,
//                 keccak256(bytecode)
//             )
//         );


//         // cast last 20 bytes of hash to the address
//         return address(uint160(uint256(hash)));
//     }



//     // deploy contract
//     // event log Deployed shpuld contain address of deployed testocntract. address in log should equal computed value
//     function deploy(bytes memory bytecode, uint _salt) public payable {

//         address addr;

//         // call create2
//         /*
//         NOTE: How to call create2

//         create2(v, p, n, s)
//         create new contract with code at memory p to p + n
//         and send v wei
//         and return the new address
//         where new address = first 20 bytes of keccak256(0xff + address(this) + s + keccak256(mem[p…(p+n)))
//               s = big-endian 256-bit value
//         */

//         assembly {
//             addr := create2(
//                 callvalue(),        // wei sent with current call, actual code stards after skipping first 32 bytes
//                 add(bytecode, 0x20),
//                 mload(bytecode),    // load size of code contained in first 32 bytes
//                 _salt               // salt from function args
//             )


//             if iszero(extcodesize(addr)) {
//                 revert(0, 0)
//             }
//         }

//         // emit event
//         emit Deployed(addr, _salt);


//     }
// }



// contract TestContract {

//     address public owner;
//     uint public foo;


//     constructor(address _owner, uint _foo) payable {
//         owner = _owner;
//         foo = _foo;
//     }


//     function getBalance() public view returns (uint) {
//         return address(this).balance;
//     }

// }


