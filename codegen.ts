import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.thegraph.com/subgraphs/name/jonassunandar/any-ape-subgraph',
  documents: ['./lib/gql/queries/nft.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './lib/gql/types/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;