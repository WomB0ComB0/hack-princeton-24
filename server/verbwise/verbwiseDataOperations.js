const apiKey = process.env.VERBWIRE_API_KEY;
const verbwire = require('verbwire')(apiKey);
const chains = [
  'sepolia',
  'mumbai',
  'fuji',
  'optimism-sepolia',
  'arbitrum-sepolia',
  'base-sepolia',
  'fantom-testnet',
  'ethereum',
  'polygon',
  'avalanche',
  'optimism',
  'arbitrum',
  'base',
  'fantom',
  'bsc',
  'bsc-testnet',
  'goerli',
  'optimism-goerli',
  'arbitrum-goerli',
  'base-goerli',
];
const tokenTypes = ['nft721', 'nft1158', 'erc20'];
const wallet = 'your_wallet_address';
const contract = 'your_contract_address';
const token = 'your_token_id';
const slug = 'boredapeyachtclub';

// gets all nfts for all chains and all token types (everything crypto you could have)
export const getAllNFTsForAllChainsAndTypes = () => {
  chains.forEach((chain) => {
    tokenTypes.forEach((type) => {
      const success = verbwire.data.getNftDataOwned({
        walletAddress: wallet,
        chain: chain,
        tokenType: type,
      });

      if (!success) {
        return new Error('Error occurred');
      }

      return 'Success!';
    });
  });
};

// gets all NFTs made by a wallet
export const getAllNFTsMade = async () => {
  chains.forEach((chain) => {
    const success = verbwire.data.getNftDataCreated({
      walletAddress: wallet,
      chain: chain,
    });

    if (!success) {
      return new Error('Error occurred');
    }

    return 'Success';
  });
};

// gets all transactions made by a wallet
export const getAllTransactionsMade = () => {
  chains.forEach((chain) => {
    const success = verbwire.data.getNftDataTransactions({
      walletAddress: wallet,
      chain: chain,
    });

    if (!success) {
      return new Error('Error occurred');
    }

    return 'Success';
  });
};

// gets all NFT details for every nft on every chain for a particular contract address
export const getNFTDetailsByContractForAllChains = () => {
  chains.forEach((chain) => {
    const success = verbwire.data.getNftDataNftdetails({
      contractAddress: contract,
      tokenId: token,
      chain: chain,
    });

    if (!success) {
      return new Error('Error occurred');
    }

    return 'Success';
  });
};

// gets all NFT details for every nft on every chain for a particular contract address and a wallet address
export const getAllNFTsByBothAddressesForAllChains = () => {
  chains.forEach((chain) => {
    const success = verbwire.data.getNftDataNftdetails({
      contractAddress: contract,
      walletAddress: wallet,
      chain: chain,
    });

    if (!success) {
      return new Error('Error occurred');
    }

    return 'Success';
  });
};

export const getOwnershipDetailsBySlugOrContract = () => {
  // HAVE TO DEFINE SLUG
  if (slug) {
    chains.forEach((chain) => {
      const success = verbwire.data.getNftDataNftdetails({
        slug: slug,
        chain: chain,
      });

      if (!success) {
        return new Error('Error occurred');
      }

      return 'Success';
    });
  } else {
    chains.forEach((chain) => {
      const success = verbwire.data.getNftDataNftdetails({
        contractAddress: contract,
        chain: chain,
      });

      if (!success) {
        return new Error('Error occurred');
      }

      return 'Success';
    });
  }
};
