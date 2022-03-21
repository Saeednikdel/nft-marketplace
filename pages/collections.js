import {
  Box,
  Grid,
  Card,
  CardActions,
  Button,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Popup from "../components/Popup";
import NewCollection from "../components/NewCollection";
import Link from "next/link";

import { nftmarketaddress } from "../config";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const collctions = () => {
  const [collectionList, setCollectionList] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();
  useEffect(() => {
    loadCollections();
  }, [openPopup]);

  async function loadCollections() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
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
      setCollectionList(items);
      console.log("items", items);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Button
        color='secondary'
        variant='contained'
        style={{ marginTop: 30 }}
        onClick={() => setOpenPopup(true)}>
        new
      </Button>

      <Box sx={{ width: "100%" }} style={{ marginTop: 30, marginBottom: 60 }}>
        {collectionList ? (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {collectionList.map((collection, i) => (
              <Grid key={i} item xs={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Link href={`/collection/${collection.nftCollection}`}>
                      <Typography gutterBottom variant='h5' component='div'>
                        {collection.name}
                      </Typography>
                    </Link>

                    <Typography variant='h5' component='div'>
                      {collection.symbol}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button size='small'>{`${collection.nftCollection.slice(
                      0,
                      4
                    )}...${collection.nftCollection.slice(
                      collection.nftCollection.length - 4
                    )}`}</Button>
                    <Link href={`/collection/${collection.nftCollection}`}>
                      <Button size='small'>view</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <h3>No Collection</h3>
        )}
      </Box>
      <Popup
        title={"new collection"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <NewCollection setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
};
export default collctions;
