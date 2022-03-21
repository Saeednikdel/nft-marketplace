// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

contract NFTMarket is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.001 ether;
        struct colectionStruct {
            NFT nftCollection;
            string name;
            string symbol;
        }
    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable tokenSeller;
        address payable tokenOwner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct NftCollection{
        NFT nft;

    }
    mapping(address => NftCollection[]) addreesToNftCollection;
    

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address tokenSeller,
        address tokenOwner,
        uint256 price,
        bool sold
    );

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function listingItemForSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );
        ///transfer tokenOwnership from creator to contract
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function cancelListingItemForSale(address nftContract,uint256 itemId) public nonReentrant {
        require(
            msg.sender == idToMarketItem[itemId].tokenSeller,
            "adress is not the owner of token"
        );
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        idToMarketItem[itemId].tokenOwner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        payable(msg.sender).transfer(listingPrice);
    }

    function buyMarketItem(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        idToMarketItem[itemId].tokenSeller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketItem[itemId].tokenOwner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        payable(owner()).transfer(listingPrice);
    }

    /* Returns all unsold market items with address(0) */
    function fetchAllListedItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].tokenOwner == address(0)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns onlyl items that a user has purchased */
    function fetchMyPurchasedItems() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].tokenOwner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].tokenOwner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has listed for sale */
    function fetchMyListedItems() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].tokenSeller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].tokenSeller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getCollectionListByUser() public view returns(colectionStruct[] memory){
        colectionStruct[] memory list= new colectionStruct[](addreesToNftCollection[msg.sender].length);
        for (uint256 i =0 ; i < addreesToNftCollection[msg.sender].length ; i++){
            NFT nft= NFT(address(addreesToNftCollection[msg.sender][i].nft));
            colectionStruct memory struc = colectionStruct(nft, nft.name(), nft.symbol());
            list[i]= struc;
        }
        return list;
    }
    function createCollection (address marketplaceAddress, string memory name, string memory symbol) public {
        NFT nftCollection = new NFT(marketplaceAddress,name, symbol);
        addreesToNftCollection[msg.sender].push(NftCollection(nftCollection));
    }
    function getCollectionName (uint256 index) public view returns (string memory){
       NFT nft= NFT(address(addreesToNftCollection[msg.sender][index].nft));
       return nft.name();
    }
}
