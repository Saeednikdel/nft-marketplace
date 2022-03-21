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
import { getSingleNFTsMetadata } from "../../../../utils/fetchNFTs";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Link from "next/link";

const item = () => {
  const [NFT, setNFT] = useState();
  const router = useRouter();
  const { address, id } = router.query;
  useEffect(() => {
    loadNFTs();
  }, [address, id]);
  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const { chainId } = await provider.getNetwork();
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();

    if (address) {
      const data = await getSingleNFTsMetadata(address, id, chainId);
      console.log(data);
      setNFT(data);
    }
  }
  return (
    <Box sx={{ width: "100%" }} style={{ marginTop: 30, marginBottom: 60 }}>
      {NFT ? (
        <Card>
          <Grid container>
            <Grid xs={12} md={6}>
              <CardMedia component='img' image={NFT.image} alt={NFT.title} />
            </Grid>
            <Grid xs={12} md={6}>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {NFT.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {NFT.description}
                </Typography>
              </CardContent>

              <CardActions>
                <Link href={`/collection/${NFT.contractAddress}`}>
                  <Button size='small'>{`${NFT.contractAddress.slice(
                    0,
                    4
                  )}...${NFT.contractAddress.slice(
                    NFT.contractAddress.length - 4
                  )}`}</Button>
                </Link>
                <Button size='small'>{Number(NFT.tokenId)}</Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <h3>No NFT Item found</h3>
      )}
    </Box>
  );
};
export default item;
