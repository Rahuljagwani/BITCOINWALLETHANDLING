const fs = require('fs');

const WALLET_FILE = 'wallets.json';

function saveWallet(walletData) {
  let wallets = loadWallets();
  wallets.push(walletData);
  fs.writeFileSync(WALLET_FILE, JSON.stringify(wallets, null, 2));
}

function loadWallets() {
  if (fs.existsSync(WALLET_FILE)) {
    const data = fs.readFileSync(WALLET_FILE, 'utf8');
    return JSON.parse(data);
  } else {
    return [];
  }
}

function updateWalletAddress(walletName, newAddress) {
  let wallets = loadWallets();
  const updatedWallets = wallets.map((wallet) => {
      if (wallet.name === walletName) {
        const chains = wallet.chains;
        chains[0].chain_addresses.push(newAddress);
        return { ...wallet, chains: chains };
      }
      return wallet;
  });
  fs.writeFileSync(WALLET_FILE, JSON.stringify(updatedWallets, null, 2));
}

function checkMnemonic(mnemonic) {
  let wallets = loadWallets();
  let check = false;
  wallets.map((wallet) => {
    wallet.mnemonic === mnemonic ? check = true : '';
  })
  return check;
}

module.exports = {
  saveWallet,
  loadWallets,
  updateWalletAddress,
  checkMnemonic
};
