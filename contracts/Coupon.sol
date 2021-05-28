pragma solidity ^0.6.0;
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/token/ERC721/ERC721.sol";
import "./IBEP20.sol";

contract Coupon is ERC721 {
    IBEP20 public ticketBuyToken;
    uint256 public ticketPrice;
    uint256 public ticketNumber;
    string public description;
    string public dataURI;
    address internal couponWinner;

    event NewBuy(address buyer, uint256 ticketNumber);

    mapping(uint256 => uint256) internal distResult;
    mapping(uint256 => bool) internal alreadyDistResult;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _description,
        address _ticketBuyToken,
        uint256 _ticketBuyPrice,
        string memory _tokenURI,
        string memory _dataURI
    )
    
    public ERC721(_name, _symbol) {
        ticketBuyToken = IBEP20(_ticketBuyToken);
        ticketPrice = _ticketBuyPrice;
        description = _description;
        dataURI = _dataURI;

        _setBaseURI(_tokenURI);
    }

    function buyTicket() public {

        require(
            ticketBuyToken.transferFrom(
                msg.sender,
                address(this),
                ticketPrice * 10**ticketBuyToken.decimals()
            )
        );

        ticketNumber++;
        _mint(msg.sender, ticketNumber);

        emit NewBuy(msg.sender, ticketNumber);
    }

    function dist(uint256 userProvidedSeed) public {
        // require(
        //     distCount < ticketNumber - 1,
        //     "Can't call dist function anymore !!"
        // );
        // require(ticketNumber > 1, "Minimum two ticket buy is needed !!");
        // require(
        //     block.timestamp > getNextDistTimestamp(),
        //     "Distribution is not started yet !!"
        // );        

        // fulfillDist(userProvidedSeed);
        // distCount++;

        // setNextDistTime();
        
        ticketBuyToken.transfer(
            msg.sender,
            (ticketPrice * 10**ticketBuyToken.decimals()) / 100
        );
    }

    // function fulfillDist(uint256 userProvidedSeed) internal {
    //     uint256 randomness = block.timestamp + userProvidedSeed;
    //     uint256 i = ticketNumber;

    //     do {
    //         i--;
    //     } while (alreadyDistResult[(randomness % i) + 1] && i > 1);

    //     uint256 result = (randomness % i) + 1;

    //     if (i == 0 || alreadyDistResult[result]) {
    //         do {
    //             result = result + 1;
    //         } while (alreadyDistResult[result] && result < ticketNumber);
    //     }

    //     if (i > ticketNumber || alreadyDistResult[result]) {
    //         do {
    //             result = result - 1;
    //         } while (alreadyDistResult[result] && result > 1);
    //     }

    //     distResult[distCount] = result;
    //     alreadyDistResult[result] = true;
    // }

    function claimPrize(uint256 _ticketNumber) public {
        // require(
        //     distCount == ticketNumber - 1,
        //     "Can't claim prize before all dist !!"
        // );
        require(
            _isApprovedOrOwner(_msgSender(), _ticketNumber),
            "ERC721: transfer caller is not owner nor approved"
        );
        // require(
        //     !alreadyDistResult[_ticketNumber] &&
        //         _ticketNumber <= ticketNumber &&
        //         _ticketNumber > 0,
        //     "You are not an winner !!"
        // );

        transferFrom(msg.sender, address(this), _ticketNumber);
        _burn(_ticketNumber);
        // couponWinner = msg.sender;

        require(
            ticketBuyToken.transfer(
                msg.sender,
                ticketBuyToken.balanceOf(address(this))
            )
        );
    }

    function stillValidTicket(uint256 _ticketNumber) public view returns (bool) {
        bool result = false;

        if (!alreadyDistResult[_ticketNumber]) {
            result = true;
        }

        return result;
    }

    function getDistResult(uint256 _distCount) public view returns (uint256) {
        return distResult[_distCount];
    }

    function getFinalResult() public view returns (uint256) {
        // require(
        //     distCount == ticketNumber - 1,
        //     "Can't get result before all dist !!"
        // );

        uint256 result;

        for (uint256 i = 1; i <= ticketNumber; i++) {
            if (!alreadyDistResult[i]) {
                result = i;
            }
        }

        return result;
    }

    function getCouponWinner() public view returns (address) {
        // require(
        //     distCount == ticketNumber - 1,
        //     "Can't get winner before all distribute !!"
        // );

        return couponWinner;
    }

    function getNextDistTimestamp() public view returns (uint256) {
        // uint256 result = nextDistTimestamp;

        // if (ticketNumber > 1 && distCount == 0) {
        //     result =
        //         ticketBuyEndTime +
        //         ((distCount + 1) * distInterval * 1 minutes);
        // }

        // return result;
    }

    function setNextDistTime() internal {
        // if (distCount >= ticketNumber - 1) {
        //     nextDistTimestamp = 0;
        // } else if (distCount > 0) {
        //     nextDistTimestamp = block.timestamp + (distInterval * 1 minutes);
        // }
    }

    function claimReturn() public {
        require(ticketNumber == 1, "There are more than 1 tickets !!");
        // require(block.timestamp > ticketBuyEndTime, "Buy period isn't over");
        require(
            _isApprovedOrOwner(_msgSender(), 1),
            "ERC721: transfer caller is not owner nor approved"
        );

        transferFrom(msg.sender, address(this), 1);
        _burn(1);

        require(
            ticketBuyToken.transfer(
                msg.sender,
                ticketBuyToken.balanceOf(address(this))
            )
        );
    }
}
