const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
const bip32 = BIP32Factory(ecc)
const storage = require('./storage');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const apiUrl = process.env.API_URL;
const apiToken = process.env.TOKEN;

async function createWallet(walletName, mnemonic = bip39.generateMnemonic()) {

    if(!walletName) {
        console.log(`err(missing argument):Enter wallet name as "command -n walletName"`);
        return;
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const network = bitcoin.networks.testnet;
    const root = bip32.fromSeed(seed, network);
    const masterPublicKey = root.neutered();
    const xpub = masterPublicKey.toBase58();
    const testnetNode = root.derivePath("m/44'/1'/0'/0/0");
    const testnetAddress = bitcoin.payments.p2pkh({ pubkey: testnetNode.publicKey, network: network }).address;

    const walletData = {
        name: walletName,
        extended_public_key: xpub,
    };

    await axios
    .post(`${apiUrl}/wallets/hd?token=${apiToken}`, walletData)
    .then((response) => {
        console.log('HD Wallet created successfully');
        let data = response.data;
        data.address = testnetAddress;
        data.mnemonic = mnemonic;
        storage.saveWallet(data);
    })
    .catch((error) => {
        console.log(error.response.data.error);
    });
}

async function importWallet(name, mnemonic) {

    if(!name || !mnemonic) {
        console.log(`err(missing argument):Enter wallet name as "command -n walletName -m mnemonic"`);
        return;
    }

    if(storage.checkMnemonic(mnemonic)) {
        console.log("Error:Wallet with same mnemonic exists");
        return;
    }

    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error('Invalid BIP39 mnemonic');
    }

    await createWallet(name, mnemonic);
}

async function listWallets() {

    const wallets = storage.loadWallets();
    console.log('List of Wallets in local storage:');
    wallets.map((wallet) => console.log(wallet.name ));
    // await axios
    // .get(`${apiUrl}/wallets?token=${apiToken}`)
    // .then((response) => {
    //     console.log('List of Wallets:');
    //     console.log(response.data);
    // })
    // .catch((error) => {
    //     console.log(error.response.data.error);
    // });
}

async function getBalance(walletAddress) {

    if(!walletAddress) {
        console.log(`err(missing argument):Enter address as "command -a address"`);
        return;
    }

    await axios
    .get(`${apiUrl}/addrs/${walletAddress}/balance`)
    .then((response) => {
        console.log('Balance: ₿ ' + response.data.balance);
    })
    .catch((error) => {
        console.log(error.response.data.error);
    });
}

async function getTransactions(walletAddress) {

    if(!walletAddress) {
        console.log(`err(missing argument):Enter address as "command -a address"`);
        return;
    }
    
    await axios
    .get(`${apiUrl}/addrs/${walletAddress}/full`)
    .then((response) => {
        console.log('Transactions:');
        console.log(response.data.txs);
    })
    .catch((error) => {
        console.log(error.response.data.error);
    });
}

async function generateUnusedAddress(walletName) {

    if(!walletName) {
        console.log(`err(missing argument):Enter wallet name as "command -n walletName"`);
        return;
    }

    await axios
    .post(`${apiUrl}/wallets/hd/${walletName}/addresses/derive?token=${apiToken}`)
    .then((response) => {
        const addr = response.data.chains[0].chain_addresses[0];
        console.log('Address generated successfully:');
        console.log(addr.address);
        storage.updateWalletAddress(walletName, addr);
    })
    .catch((error) => {
        console.log(error.response.data.error);
    });
}

module.exports = {
    createWallet,
    importWallet,
    listWallets,
    getBalance,
    getTransactions,
    generateUnusedAddress
};