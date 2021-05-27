// SPDX-License-Identifier: ISC

pragma solidity ^0.7.3;

// SampleBread contract defines a marketplace for renting samples

contract SampleBread {


    // Define the Sample to be rented out on SampleBread
    struct Sample {
        string name;
        string description;
        string metadata;
        bool isActive; // is the listing active?
        uint256 price; // per day price in wei (1 ether == 10^18 wei)
        address owner; // Owner of the sample
        bool[] isBooked; // is sample booked on particular day? 0 to jan 1, 1 to jan2 
                         // isBooked[31] will denote feb1
                
    }

    uint256 public sampleId;

    // Mapping of sampleId to Sample object
    mapping(uint256 => Sample) public samples;


    // Details of a particular booking
    struct Booking {
        uint256 sampleId;
        uint256 checkInDate;
        uint256 checkOutDate;
        address user;

    }

    uint256 public bookingId;

    // Mapping of bookingId to Booking objet
    mapping(uint256 => Booking) public bookings;


    

    // Event emitted when new sample is put up
    event NewSample (
        uint256 indexed sampleId
    );

    // Event emitted when a NewBooking is made
    event NewBooking (
        uint256 indexed propertyId,
        uint256 indexed bookingId
    );


    /**
      * @dev Place a sample in the market
      * @param name Name of the sample
      * @param description Short description of your sample
      * @param price Price per day in wei (1ETH = 10^18 wei)
     */
    function rentOutSample(string memory name, string memory description, string memory metadata,  uint256 price) public {

        Sample memory sample = Sample(name, description, metadata, true, price, msg.sender, new bool[](365));

        // Persist `sample` object to the "permanent" storage
        samples[sampleId] = sample;

        // Emit an event to notify clients
        emit NewSample(sampleId++);
    }


    /**
      * @dev Make a Sample booking
      * @param _sampleId id of the sample to rent out
      * @param checkInDate Check-in date
      * @param checkOutDate check-out date
     */

     function rentSample(uint256 _sampleId, uint256 checkInDate, uint256 checkOutDate) public payable {

         // Retrieve `sample` object from the storage
         Sample storage sample = samples[_sampleId];

        // Assertion to confirm that sample is active
        require(
            sample.isActive == true,
            "sample with this ID is not active"
        );


        // Assertion to confirm sample is available for the dates
        for (uint256 i = checkInDate; i < checkOutDate; i++) {

            // Revert transaction if booked already
            if (sample.isBooked[i] == true) {
                revert("sample is not available for the selected dates");
            }
        }



        // Check to confirm the customer has sent an amount enqual to (priceperday * numberofdays)
        require(
            msg.value == sample.price * (checkOutDate - checkInDate),
            "Sent insufficient funds"
        );


        // Send the funds to the owner of the sample
        _sendFunds(sample.owner, msg.value);

        // conditions are satisfied so we can make the booking
        _createBooking(_sampleId, checkInDate, checkOutDate);

     }



     function _createBooking(uint256 _sampleId, uint256 checkInDate, uint256 checkOutDate) internal {

         // Create a new Booking object
         bookings[bookingId] = Booking(_sampleId, checkInDate, checkOutDate, msg.sender);

         // Get the sample object from the storage
         Sample storage sample = samples[_sampleId];


         // Mark the sample booked on the requested dates
         for (uint256 i = checkInDate; i < checkOutDate; i++) {
             sample.isBooked[i] = true;
         }

         // Emit an event to notify clients
         emit NewBooking(_sampleId, bookingId++);

     }


    function _sendFunds(address beneficiary, uint256 value) internal {

        //address(uint160()) is a solidity thing i don't fully understand...
        // address(uint160(beneficiary)).transfer(value);

        // Convert address to payable (solidity 0.8.0)
        address payable receiver = payable(address(beneficiary));
        receiver.transfer(value);
    }


    /**
      * @dev take down the sample form the market
      * @param _sampleId Sample ID
     */
     function markSampleAsInactive(uint256 _sampleId) public {
         require(
             samples[_sampleId].owner == msg.sender,
             "THIS IS NOT YOUR SAMPLE"
         );

         samples[sampleId].isActive = false;
     }


}
