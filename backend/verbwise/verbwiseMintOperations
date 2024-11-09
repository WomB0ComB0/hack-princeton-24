

const apiKey = process.env.VERBWIRE_API_KEY;
const verbwire = require('verbwire')(apiKey);


export const createNFT =  async (transaction) => {
    
    const metaData = {
        name: `Date: ${transaction.date} Goal: ${transaction.goalId} Transaction: ${transaction.transactionType} Amount: ${transaction.amount}`,
        description: `${transaction.description}`,
        contractAddress: '0xB4EDD991e2b6b7fa041122F5b9A82Eed2f740Be3',
        data: JSON.stringify([
            { "trait_type": "goalId", "value": transaction.goalId.toString() },
            { "trait_type": "userId", "value": transaction.userId.toString() },
            { "trait_type": "amount", "value": `${transaction.amount} USD` },
            { "trait_type": "transactionType", "value": transaction.transactionType },
            { "trait_type": "date", "value": transaction.date.toISOString() },
            { "trait_type": "description", "value": transaction.description },
        ]),
        chain: 'sepolia',
    };

    try {
        const success = await verbwire.mint.mintFromMetadata(metaData);

        if (success && success.status ==='success') {
            console.log('Transaction minted into NFT successfully');
            return {
                status: 'success',
                message: 'NFT minted successfully',
                data: success,
            };
        }

    } catch (error) {
        throw new Error('Error during NFT minting: ', error);
    }
};