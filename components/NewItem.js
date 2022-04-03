import { Box, CardActions, Button, TextField } from "@mui/material";
import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { styled } from "@mui/material/styles";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
import NFT from "../artifacts/contracts/NFTCollectible.sol/NFTCollectible.json";

const Input = styled("input")({
  display: "none",
});
const NewItem = ({ address, setOpenPopup }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: "",
    description: "",
  });

  async function uploadImage(e) {
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
  async function createIpfsUrl() {
    const { name, description } = formInput;
    console.log(name, description, fileUrl);
    if (!name || !description || !fileUrl) return;
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createItem(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createItem(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(address, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    setOpenPopup(false);
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
        <label style={{ margin: 20 }} htmlFor='contained-button-file'>
          <Input
            accept='image/*'
            id='contained-button-file'
            // multiple
            type='file'
            onChange={uploadImage}
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
            onClick={createIpfsUrl}>
            mint nft
          </Button>
        </CardActions>
      </Box>
    </>
  );
};
export default NewItem;
