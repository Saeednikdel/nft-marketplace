const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();
  console.log("nftMarket deployed to:", nftMarket.address);

  const NFTCollectible = await hre.ethers.getContractFactory("NFTCollectible");
  const nftcollectible = await NFTCollectible.deploy(nftMarket.address);
  await nftcollectible.deployed();
  console.log("nft deployed to:", nftcollectible.address);

  let config = `
  export const nftmarketaddress = "${nftMarket.address}"
  export const nftaddress = "${nftcollectible.address}"
  `;

  let data = JSON.stringify(config);
  fs.writeFileSync("config.js", JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
