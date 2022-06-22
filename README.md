## Getting Started

### Prerequisites

```bash
npm i npm@latest -g
npx create-next-app@latest --typescript .
```

### Installation

```bash
npm i moralis react-moralis
npm i web3uikit

npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Resources

Moralis
* https://docs.moralis.io/moralis-dapp/connect-the-sdk/connect-with-react
* https://www.npmjs.com/package/react-moralis
* https://github.com/MoralisWeb3/react-moralis


Web3UIKit!
* https://github.com/web3ui/web3uikit

ABI -- Converting Between Formats
* https://docs.ethers.io/v5/api/utils/abi/formats/#abi-formats--converting-between-formats

Install Tailwind CSS with Next.js
* https://tailwindcss.com/docs/guides/nextjs

IPFS Desktop for Windows
* https://docs.ipfs.io/install/ipfs-desktop/#windows

# Usage
1. Run node
```shell
# Update constants
hh deploy

# Run node
hh node

# Pick a winner
hh run scripts/mockOffchain.ts --network localhost
```
## Useful commands

# Build and deploy
```shell
npm run build
next export
# Export successful. Files written to C:\Projects\solidity-patrick-lottery-nextjs\out
```
Then 
* Import folder `output` to IPFS
* Set spinning folder `output`
* Copy CID
* Goto browser: ipfs.ip/ipfs/QmfTDb2UmmNth2LL5gHynVm8K88QUGk4jTia27r81ewcat
