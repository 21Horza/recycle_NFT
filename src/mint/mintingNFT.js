const BN = require("bn.js");

export const mintNFT = async () => {
  console.log(window.contract)
    await window.contract.nft_mint(
      {
        token_id: `${window.accountId}-recycle-tok`,
        metadata: {
          title: "Save our Home",
          description: "Save our Home",
          media:
            "https://bafkreih44fknbnh5gxcdqku23cvs7zo5xb3jwzrixp4d6cafekihbmjvee.ipfs.nftstorage.link/",
        },
        receiver_id: window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN("1000000000000000000000000")
    );
};