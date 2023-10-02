# BITCOINWALLETHANDLING(Testing on Bitcoin-testnet)

**NOTE:**
- Make sure node.js and npm are installed in the system.
- I have simply used local file system for storage puroses('fs').
- Will work only on Linux based systems for now
  
## Steps To Test
After coming inside BITCOINWALLETHANDLING directory,
Inside .env add your BlockCypher Token in TOKEN. Example:
```
TOKEN = "debe9e904b65463fa6a77a828409e0de"
```
Open terminal and execute one by one:
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
  
### Sample Input/Output

Input-
```
./index.js create-wallet -n "demo"
```
Output- Wallets.json created and content is:
```
[
  {
    "token": "debe9e904b65463fa6a77a828409e0de",
    "name": "demo",
    "hd": true,
    "extended_public_key": "tpubD6NzVbkrYhZ4WygeEXZLMUNsJpjpPAEdJ2kLjBn6Z6q4p752843WyTdprn4ARpDPJxwkPx3nEtckwpVxLNg4EWPDb29p6LjmfigwjDKam8k",
    "chains": [
      {
        "chain_addresses": []
      }
    ],
    "address": "muarCHv97gfgooNrFJgUpTEcynGS8xQQFu",
    "mnemonic": "theory birth chronic fun crazy morning still change hybrid taste found stomach"
  },
 ]
```
Input-
```
./index.js import-wallet -n "demo" -m "clever steak bicycle innocent winner tumble setup supply gossip wash capital rifle"
```
Output- In Wallets.json:
```
[
  {
    "token": "debe9e904b65463fa6a77a828409e0de",
    "name": "demo",
    "hd": true,
    "extended_public_key": "tpubD6NzVbkrYhZ4WygeEXZLMUNsJpjpPAEdJ2kLjBn6Z6q4p752843WyTdprn4ARpDPJxwkPx3nEtckwpVxLNg4EWPDb29p6LjmfigwjDKam8k",
    "chains": [
      {
        "chain_addresses": []
      }
    ],
    "address": "muarCHv97gfgooNrFJgUpTEcynGS8xQQFu",
    "mnemonic": "theory birth chronic fun crazy morning still change hybrid taste found stomach"
  },
  {
    "token": "debe9e904b65463fa6a77a828409e0de",
    "name": "demo1",
    "hd": true,
    "extended_public_key": "tpubD6NzVbkrYhZ4YdUDxpcn6CzG3r72c8MMgwBHs6fdZ5He8TKxB3fVwfwo9cjaZKjGcBKkvayDRCQYFFnxaZEjQo7AKAc5NmooPvzHU2tz68q",
    "chains": [
      {
        "chain_addresses": []
      }
    ],
    "address": "mqyeTZvMNyFDSdMrD3hdUSpgNhE5iQWE28",
    "mnemonic": "clever steak bicycle innocent winner tumble setup supply gossip wash capital rifle"
  }
]
```
Input-
```
./index.js generate-address -n demo1
```
Output- In wallets.json
```
[
  {
    "token": "debe9e904b65463fa6a77a828409e0de",
    "name": "demo",
    "hd": true,
    "extended_public_key": "tpubD6NzVbkrYhZ4WygeEXZLMUNsJpjpPAEdJ2kLjBn6Z6q4p752843WyTdprn4ARpDPJxwkPx3nEtckwpVxLNg4EWPDb29p6LjmfigwjDKam8k",
    "chains": [
      {
        "chain_addresses": []
      }
    ],
    "address": "muarCHv97gfgooNrFJgUpTEcynGS8xQQFu",
    "mnemonic": "theory birth chronic fun crazy morning still change hybrid taste found stomach"
  },
  {
    "token": "debe9e904b65463fa6a77a828409e0de",
    "name": "demo1",
    "hd": true,
    "extended_public_key": "tpubD6NzVbkrYhZ4YdUDxpcn6CzG3r72c8MMgwBHs6fdZ5He8TKxB3fVwfwo9cjaZKjGcBKkvayDRCQYFFnxaZEjQo7AKAc5NmooPvzHU2tz68q",
    "chains": [
      {
        "chain_addresses": [
          {
            "address": "n3CFQQ954NmRQ3kyra9do8F8x6F1aYZVof",
            "public": "03a1ad567ff3ce011e10eb13adf4c87399a4f31521feabd9416a29576e75f50591",
            "path": "m/0"
          }
        ]
      }
    ],
    "address": "mqyeTZvMNyFDSdMrD3hdUSpgNhE5iQWE28",
    "mnemonic": "clever steak bicycle innocent winner tumble setup supply gossip wash capital rifle"
  }
]
```
Input-
```
./index.js list-wallets
```
Output- In terminal
```
List of Wallets in Local Storage:
demo
demo1
```
Input-
```
./index.js get-balance -a "muarCHv97gfgooNrFJgUpTEcynGS8xQQFu"
```
Output- In terminal
```
Balance: ₿ 0
```
Input-
```
./index.js get-transactions -a "muarCHv97gfgooNrFJgUpTEcynGS8xQQFu"
```
Output- In terminal
```
Transactions:
[]  //tranctions Array
```