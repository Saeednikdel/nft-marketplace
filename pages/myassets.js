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
import { useState, useEffect } from "react";
import { fetchNFTs } from "../utils/fetchNFTs";
import Link from "next/link";

const myassets = ({ signer, provider }) => {
  const [NFTs, setNFTs] = useState();

  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const { chainId } = await provider.getNetwork();
    const address = await signer.getAddress();
    if (address) {
      const data = await fetchNFTs(
        address,
        chainId
        // "0x34F86F47b943ABA644Ca1a5A55424d109029dF65"
      );
      setNFTs(data);
    }
  }
  return (
    <Box sx={{ width: "100%" }} style={{ marginTop: 30, marginBottom: 60 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {NFTs ? (
          NFTs.map((NFT, i) => {
            return (
              <Grid key={i} item xs={6} md={4}>
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
    </Box>
  );
};
export default myassets;
