import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchNFTs } from "../utils/fetchNFTs";
import Link from "next/link";
import { ethers } from "ethers";
import { nftmarketaddress } from "../config";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { useRouter } from "next/router";
import Popup from "../components/Popup";

const Myassets = ({ signer, provider }) => {
  const [NFTs, setNFTs] = useState();
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [formInput, updateFormInput] = useState({
    price: "",
    id: "",
    contractAddress: "",
    image: "",
    title: "",
  });
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
  const handleDialog = (NFT) => {
    updateFormInput({
      ...formInput,
      id: NFT.value.id,
      contractAddress: NFT.value.contractAddress,
      image: NFT.value.image,
      title: NFT.value.title,
    });
    setOpenPopup(true);
  };

  async function createSale() {
    const { id, contractAddress, price } = formInput;
    if (!id || !contractAddress || !price) return;
    const _price = ethers.utils.parseUnits(price, "ether");
    if (price <= 0) return;
    /* then list the item for sale on the marketplace */
    let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    let transaction = await contract.listingItemForSale(
      contractAddress,
      id,
      _price,
      {
        value: listingPrice,
      }
    );
    await transaction.wait();
    router.push("/");
  }
  return (
    <Box sx={{ width: "100%" }} style={{ marginTop: 30, marginBottom: 60 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                    {/* <Button size='small'>{Number(NFT.value.id)}</Button> */}
                    <Link
                      href={`/item/${NFT.value.contractAddress}/${Number(
                        NFT.value.id
                      )}`}>
                      <Button size='small'>view</Button>
                    </Link>
                    <Button
                      variant='contained'
                      onClick={() => handleDialog(NFT)}>
                      sell
                    </Button>
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
        title={"set a price for your NFT."}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <div>
          <CardMedia
            component='img'
            height='300'
            width='300'
            image={formInput.image}
            alt={formInput.title}
          />
          <Typography gutterBottom variant='h5' component='div'>
            title : {formInput.title}
          </Typography>
          <TextField
            type='number'
            name='price'
            label='price'
            placeholder='price'
            style={{ margin: 20 }}
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
        </div>
        <Button variant='contained' style={{ margin: 20 }} onClick={createSale}>
          ok
        </Button>
      </Popup>
    </Box>
  );
};
export default Myassets;
