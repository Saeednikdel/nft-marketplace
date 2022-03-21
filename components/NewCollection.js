import { Box, Grid, Card, CardActions, Button, TextField } from "@mui/material";
import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { nftmarketaddress } from "../config";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const NewCollction = ({ setOpenPopup }) => {
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  async function create() {
    const { name, symbol } = formInput;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let transaction = await contract.createCollection(
      nftmarketaddress,
      name,
      symbol
    );
    let tx = await transaction.wait();
    setOpenPopup(false);
    console.log("collection created");
    ///router.push("/");
  }
  return (
    <>
      <Box sx={{ width: "100%" }} style={{ marginTop: 20 }}>
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
            name='symbol'
            label='symbol'
            placeholder='symbol'
            style={{ margin: 20 }}
            onChange={(e) =>
              updateFormInput({
                ...formInput,
                symbol: e.target.value,
              })
            }
          />
        </div>

        <CardActions>
          <Button variant='contained' style={{ margin: 20 }} onClick={create}>
            Create Collection
          </Button>
        </CardActions>
      </Box>
    </>
  );
};
export default NewCollction;
