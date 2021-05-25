// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./Coupon.sol";

contract CouponFactory {
    struct CouponInfo {
        address couponAddress;
        string couponTokenName;
//        string nftType;
        string couponTokenSymbol;
        string description;
        address ticketBuyToken;
        uint256 ticketPrice;
        // uint256 distInterval;
        // uint256 couponStartTimestamp;
        // uint256 ticketBuyDuration;
        string baseTokenURI;
        string dataURI;
    }

    uint256 public totalCoupons;
    CouponInfo[] public allCoupons;

    event NewCoupon(
        uint256 id,
        address distCouponAddress,
//        string nftType, // have 3 type => Image, Video, Music
        string description,
        string couponTokenName,
        string couponTokenSymbol,
        address ticketBuyToken,
        uint256 ticketPrice,
        // uint256 distInterval,
        // uint256 couponStartTimestamp,
        // uint256 ticketBuyDuration,
        string baseTokenURI,
        string dataURI
    );

    function addCoupon(
        string memory _name,
        string memory _symbol,
        string memory _description,
        address _ticketBuyToken,
        uint256 _ticketBuyPrice,
        // uint256 _distInterval,
        // uint256 _ticketBuyDuration,
        string memory _baseTokenURI,
        string memory _dataURI
    ) public {
        Coupon newCoupon =
            new Coupon(
                _name,
                _symbol,
                _description,
                _ticketBuyToken,
                _ticketBuyPrice,
                // _distInterval,
                // _ticketBuyDuration,
                _baseTokenURI,
                _dataURI
            );

        address couponAddress = address(newCoupon);

        totalCoupons++;

        allCoupons.push(
            CouponInfo(
                couponAddress,
                _name,
                _symbol,
                _description,
                _ticketBuyToken,
                _ticketBuyPrice,
                // _distInterval,
                // block.timestamp,
                // _ticketBuyDuration,
                _baseTokenURI,
                _dataURI
            )
        );

        emit NewCoupon(
            totalCoupons,
            couponAddress,
            _name,
            _symbol,
            _description,
            _ticketBuyToken,
            _ticketBuyPrice,
            // _distInterval,
            // block.timestamp,
            // _ticketBuyDuration,
            _baseTokenURI,
            _dataURI
        );
    }
}
