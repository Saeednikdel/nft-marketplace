const getAddressNFTs = async (
  endpoint,
  owner,
  contractAddress,
  retryAttempt = 0
) => {
  if (retryAttempt === 5) {
    return;
  }

  if (owner) {
    let data;
    try {
      if (contractAddress) {
        data = await fetch(
          `${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`
        ).then((data) => data.json());
      } else {
        // data = await fetch(`${endpoint}/v1/getNFTs?owner=${owner}`).then(data => data.json())
        data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then((data) =>
          data.json()
        );
      }
      // console.log("GETNFTS: ", data)
    } catch (e) {
      getAddressNFTs(endpoint, owner, contractAddress, retryAttempt + 1);
    }

    return data;
  }
};

const getEndpoint = (chain) => {
  switch (chain) {
    case 1:
      return process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_ENDPOINT;
    case 137:
      return process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_ENDPOINT;
    case 80001:
      return process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_ENDPOINT;
    case 4:
      return process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_ENDPOINT;
  }
};

const fetchNFTs = async (owner, chain, contractAddress) => {
  let endpoint = getEndpoint(chain);
  const data = await getAddressNFTs(endpoint, owner, contractAddress);
  if (data.ownedNfts.length) {
    const NFTs = await getNFTsMetadata(data.ownedNfts, endpoint);
    // console.log("NFTS metadata", NFTs);
    let fullfilledNFTs = NFTs.filter((NFT) => NFT.status == "fulfilled");
    console.log("NFTS", fullfilledNFTs);
    return fullfilledNFTs;
  } else {
    return null;
  }
};

const getNFTsMetadata = async (NFTS, endpoint) => {
  const NFTsMetadata = await Promise.allSettled(
    NFTS.map(async (NFT) => {
      const metadata = await fetch(
        `${endpoint}/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`
      ).then((data) => data.json());
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
        attributes: metadata.metadata.attributes,
      };
    })
  );

  return NFTsMetadata;
};
const getSingleNFTsMetadata = async (contractAddress, tokenId, chainId) => {
  let endpoint = getEndpoint(chainId);
  let metadata;
  try {
    metadata = await fetch(
      `${endpoint}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}`
    ).then((data) => data.json());
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
    attributes: metadata.metadata.attributes,
  };
};
export { fetchNFTs, getAddressNFTs, getSingleNFTsMetadata };
