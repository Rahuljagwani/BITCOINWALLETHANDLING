# BITCOINWALLETHANDLING(Testing on Bitcoin-testnet)

**NOTE:**
- Make sure node.js and npm are installed in the system.
- I have simply used local file system for storage puroses('fs').
- Will work only on Linux based systems for now
  
## Steps To Test
After coming inside BITCOINWALLETHANDLING directory, open terminal and execute one by one:
```
npm install
```
```
chmod +x index.js
```
Below are the commands to execute for wallet operations:

- **Creating Wallet**
  ```
  ./index.js create-wallet -n <walletName>
  ```
  wallets.json will be created after executing above. 
- **Importing Wallet**
  ```
  ./index.js import-wallet -n <walletName> -m <mnemonic inside "">
  ```
- **Listing Wallets**
  ```
  ./index.js list-wallets
  ```
- **Get Balance by Address**
  ```
  ./index.js get-balance -a <walletAddress>
  ```
- **Get Transaction Details by address**
  ```
  ./index.js get-transactions -a <walletAddress>
  ```
- **Generate Unused Address**
  ```
  ./index.js generate-address -n <walletName>
  ``` 
