import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFTCollectible.sol/NFTCollectible.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Home({ signer, provider }) {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    // const address = await signer.getAddress();
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    try {
      const data = await marketContract.fetchAllListedItems();
      console.log("items id & con address", data);
      const items = await Promise.all(
        data.map(async (i) => {
          const tokenContract = new ethers.Contract(
            i.nftContract,
            NFT.abi,
            provider
          );

          const tokenUri = await tokenContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            itemId: i.itemId.toNumber(),
            tokenId: i.tokenId.toNumber(),
            seller: i.tokenSeller,
            owner: i.tokenOwner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            nftContract: i.nftContract,
          };
          return item;
        })
      );
      console.log("items with detail", items);

      setNfts(items);
      setLoadingState("loaded");
    } catch (error) {
      console.log("error", error);
    }
  }
  async function buyNft(nft) {
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.buyMarketItem(
      nft.nftContract,
      nft.itemId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className='px-20 py-10 text-3xl'>No items in marketplace</h1>;
  return (
    <Box sx={{ width: "100%" }} style={{ marginTop: 30, marginBottom: 60 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {nfts.map((nft, i) => (
          <Grid key={i} item xs={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <Link href={`/item/${nft.nftContract}/${nft.tokenId}`}>
                <CardMedia
                  component='img'
                  height='140'
                  image={nft.image}
                  alt={nft.name}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {nft.name}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  component='div'>
                  {nft.description}
                </Typography>
                <Typography variant='h5' component='div'>
                  {nft.price} ETH
                </Typography>
              </CardContent>

              <CardActions>
                <Button size='small' onClick={() => buyNft(nft)}>
                  Buy
                </Button>
                <Link href={`/item/${nft.nftContract}/${nft.tokenId}`}>
                  <Button size='small'>view</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
