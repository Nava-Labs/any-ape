import { graphql } from "../types";

export const getNftsQuery = graphql(`
  query GetNftsQuery {
    nfts {
      id
      collectionAddress
      owner
      uri
      collectionName
      price
    }
    activities {
      id
      type
      from
      to
      timestamp
      price
    }
  }
`);