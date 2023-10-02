#!/usr/bin/env node

const { program } = require('commander');
const wallet = require('./wallet');

program.version('1.0.0');

program
  .command('create-wallet')
  .description('Create a new wallet')
  .option('-n, --name <name>', 'Name for the new wallet')
  .action((obj) => {
    wallet.createWallet(obj.name);
  });

program
  .command('import-wallet')
  .description('Import a wallet from a BIP39 mnemonic')
  .option('-n, --name <name>', 'Name of the wallet')
  .option('-m, --mnemonic <mnemonic>', 'Mnemonic of the wallet')
  .action((obj) => {
    wallet.importWallet(obj.name, obj.mnemonic);
  });

program
  .command('list-wallets')
  .description('List all wallets')
  .action(() => {
    wallet.listWallets();
  });

program
  .command('get-balance')
  .description('Get the bitcoin balance of a wallet')
  .option('-a, --walletAddress <walletAddress>', 'Address of the wallet')
  .action((obj) => {
    wallet.getBalance(obj.walletAddress);
  });

program
  .command('get-transactions')
  .description('Get the list of bitcoin transactions of a wallet')
  .option('-a, --walletAddress <walletAddress>', 'Address of the wallet')
  .action((obj) => {
    wallet.getTransactions(obj.walletAddress);
  });

program
  .command('generate-address')
  .description('Generate an unused bitcoin address for a wallet')
  .option('-n, --name <name>', 'Name of the wallet')
  .action((obj) => {
    wallet.generateUnusedAddress(obj.name);
  });

program.parse(process.argv);
