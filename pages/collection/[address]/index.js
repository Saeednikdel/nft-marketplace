import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchNFTs } from "../../../utils/fetchNFTs";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Link from "next/link";
import NewItem from "../../../components/NewItem";
import Popup from "../../../components/Popup";
import { nftmarketaddress } from "../../../config";
import Market from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const Collection = ({ signer, provider }) => {
  const [userOwnsCollectoin, setUserOwnsCollectoin] = useState(false);
  const [NFTs, setNFTs] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    loadNFTs();
  }, [openPopup, address]);
  async function loadNFTs() {
    const { chainId } = await provider.getNetwork();
    const signerAddress = await signer.getAddress();
    if (address) {
      const data = await fetchNFTs(signerAddress, chainId, address);
      setNFTs(data);
    }

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    try {
      const data = await marketContract.getCollectionListByUser();
      console.log("data", data);
      const items = await Promise.all(
        data.map(async (i) => {
          let item = {
            name: i.name,
            symbol: i.symbol,
            nftCollection: i.nftCollection,
          };
          return item;
        })
      );
      console.log("Collection", items);
      //// Attention remove .toLowerCase()
      //// Attention remove .toLowerCase()
      //// Attention remove .toLowerCase()
      const x = items.find(
        (i) => i.nftCollection.toLowerCase() === address.toLowerCase()
      );
      if (x) {
        setUserOwnsCollectoin(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <Box sx={{ width: "100%" }} style={{ marginTop: 10, marginBottom: 60 }}>
      {userOwnsCollectoin && (
        <Button
          color='secondary'
          variant='contained'
          style={{ marginTop: 30 }}
          onClick={() => setOpenPopup(true)}>
          new
        </Button>
      )}

      <Grid
        container
        style={{ marginTop: 30 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {NFTs ? (
          NFTs.map((NFT, i) => {
            return (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <Link
                    href={`/item/${NFT.value.contractAddress}/${Number(
                      NFT.value.id
                    )}`}>
                    <CardMedia
                      component='img'
                      height='300'
                      image={NFT.value.image}
                      alt={NFT.value.title}
                    />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {NFT.value.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {NFT.value.description}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Link href={`/collection/${NFT.value.contractAddress}`}>
                      <Button size='small'>{`${NFT.value.contractAddress.slice(
                        0,
                        4
                      )}...${NFT.value.contractAddress.slice(
                        NFT.value.contractAddress.length - 4
                      )}`}</Button>
                    </Link>
                    <Button size='small'>{Number(NFT.value.id)}</Button>
                    <Link
                      href={`/item/${NFT.value.contractAddress}/${Number(
                        NFT.value.id
                      )}`}>
                      <Button size='small'>view</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <h3>No NFT Item found</h3>
        )}
      </Grid>
      <Popup
        title={"new item"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <NewItem setOpenPopup={setOpenPopup} address={address} />
      </Popup>
    </Box>
  );
};
export default Collection;
