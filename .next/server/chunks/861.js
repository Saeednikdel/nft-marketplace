"use strict";
exports.id = 861;
exports.ids = [861];
exports.modules = {

/***/ 8861:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dL": () => (/* binding */ fetchNFTs),
/* harmony export */   "$L": () => (/* binding */ getSingleNFTsMetadata)
/* harmony export */ });
/* unused harmony export getAddressNFTs */
const getAddressNFTs = async (endpoint, owner, contractAddress, retryAttempt = 0)=>{
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data1;
        try {
            if (contractAddress) {
                data1 = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then((data)=>data.json()
                );
            } else {
                // data = await fetch(`${endpoint}/v1/getNFTs?owner=${owner}`).then(data => data.json())
                data1 = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then((data)=>data.json()
                );
            }
        // console.log("GETNFTS: ", data)
        } catch (e) {
            getAddressNFTs(endpoint, owner, contractAddress, retryAttempt + 1);
        }
        return data1;
    }
};
const getEndpoint = (chain)=>{
    switch(chain){
        case 1:
            return "https://eth-mainnet.alchemyapi.io/v2/kxaJ8PFEDr1K4BTyF39QnLtSlxzMy2mW";
        case 137:
            return "https://polygon-mainnet.g.alchemy.com/v2/9E_Lj_2imo7pNzJNh1ROffy6uMl4NyNb";
        case 80001:
            return "https://polygon-mumbai.g.alchemy.com/v2/TqVpwwPDZwB36mDwIWcxByG6lz2DocI1";
        case 4:
            return "https://eth-rinkeby.alchemyapi.io/v2/PMsZU3kE2rYsahOVSpbQ9OQGsZXGfnzN";
    }
};
const fetchNFTs = async (owner, chain, contractAddress)=>{
    let endpoint = getEndpoint(chain);
    const data = await getAddressNFTs(endpoint, owner, contractAddress);
    if (data.ownedNfts.length) {
        const NFTs = await getNFTsMetadata(data.ownedNfts, endpoint);
        // console.log("NFTS metadata", NFTs);
        let fullfilledNFTs = NFTs.filter((NFT)=>NFT.status == "fulfilled"
        );
        console.log("NFTS", fullfilledNFTs);
        return fullfilledNFTs;
    } else {
        return null;
    }
};
const getNFTsMetadata = async (NFTS, endpoint)=>{
    const NFTsMetadata = await Promise.allSettled(NFTS.map(async (NFT)=>{
        const metadata = await fetch(`${endpoint}/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`).then((data)=>data.json()
        );
        let image;
        // console.log("metadata", metadata);
        if (metadata.media[0].gateway.length) {
            image = metadata.media[0].gateway;
        } else {
            image = "https://via.placeholder.com/500";
        }
        return {
            id: NFT.id.tokenId,
            contractAddress: NFT.contract.address,
            image,
            title: metadata.metadata.name,
            description: metadata.metadata.description,
            attributes: metadata.metadata.attributes
        };
    }));
    return NFTsMetadata;
};
const getSingleNFTsMetadata = async (contractAddress, tokenId, chainId)=>{
    let endpoint = getEndpoint(chainId);
    let metadata;
    try {
        metadata = await fetch(`${endpoint}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}`).then((data)=>data.json()
        );
    } catch (error) {
        console.log("error", error);
    }
    console.log("meta", metadata);
    let image;
    // console.log("metadata", metadata);
    if (metadata.media[0].gateway.length) {
        image = metadata.media[0].gateway;
    } else {
        image = "https://via.placeholder.com/500";
    }
    return {
        contractAddress,
        tokenId,
        image,
        title: metadata.metadata.name,
        description: metadata.metadata.description,
        attributes: metadata.metadata.attributes
    };
};



/***/ })

};
;