# nftx-vault-tokens-holdings-subgraph

Subgraph for NFTX token holdings for NFTX Protocol V2

Rinkeby Subgraph: `https://thegraph.com/legacy-explorer/subgraph/--add--`

Mainnet Subgraph: `https://thegraph.com/legacy-explorer/subgraph/--add--`

## Scripts

#### `yarn auth`

```sh
GRAPH_ACCESS_TOKEN=<access-token> yarn auth
```

#### `yarn prepare-<network>`

Generates subgraph.yaml for particular network.
Supported networks are rinkeby and mainnet.

#### `yarn codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### `yarn build`

Compiles the subgraph to WebAssembly.

#### `yarn deploy-<network>`

Deploys the subgraph for particular network to the official Graph Node.<br/>
