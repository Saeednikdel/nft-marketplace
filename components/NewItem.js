import { Box, Grid, Card, CardActions, Button, TextField } from "@mui/material";
import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { styled } from "@mui/material/styles";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFTCollectible.sol/NFTCollectible.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const Input = styled("input")({
  display: "none",
});
const NewItem = ({ address, setOpenPopup }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createMarket() {
    const { name, description, price } = formInput;
    console.log(name, description, price, fileUrl);
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(address, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.listingItemForSale(address, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    setOpenPopup(false);
    // router.push("/");
  }
  return (
    <>
      <Box style={{ minWidth: 400 }}>
        <div>
          <TextField
            name='name'
            label='name'
            placeholder='name'
            style={{ margin: 20 }}
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            name='desc'
            label='desc'
            placeholder='desc'
            style={{ margin: 20 }}
            multiline
            rows={4}
            onChange={(e) =>
              updateFormInput({
                ...formInput,
                description: e.target.value,
              })
            }
          />
        </div>
        <div>
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
        <label style={{ margin: 20 }} htmlFor='contained-button-file'>
          <Input
            accept='image/*'
            id='contained-button-file'
            // multiple
            type='file'
            onChange={onChange}
          />
          <Button variant='contained' component='span'>
            Upload
          </Button>
        </label>
        <div>
          {fileUrl && (
            <img className='rounded mt-4' width='350' src={fileUrl} />
          )}
        </div>
        <CardActions>
          <Button
            variant='contained'
            style={{ margin: 20 }}
            onClick={createMarket}>
            mint nft
          </Button>
        </CardActions>
      </Box>
    </>
  );
};
export default NewItem;
