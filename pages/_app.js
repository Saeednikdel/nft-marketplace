import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Container from "@mui/material/Container";
import Head from "next/head";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }) {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    connect();
  }, []);

  async function connect() {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const _provider = new ethers.providers.Web3Provider(connection);
      const _signer = _provider.getSigner();
      const _address = await _signer.getAddress();
      setProvider(_provider);
      setSigner(_signer);
      setAddress(_address);
    } catch (error) {}
  }
  return (
    <>
      <Head>
        <title>NFT MARKET</title>
        <meta name='description' content='NFT MARKET' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavBar address={address} connect={connect} />
      {signer ? (
        <>
          <Container maxWidth='lg'>
            <Component
              signer={signer}
              provider={provider}
              address={address}
              {...pageProps}
            />
          </Container>
        </>
      ) : (
        <h3>please connect your wallet</h3>
      )}
    </>
  );
}

export default MyApp;
