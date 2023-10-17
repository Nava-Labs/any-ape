import { DocumentNode } from "graphql";
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

export const getNftDetailsQuery = graphql(`
  query GetNftDetailsQuery($id: ID!) {
    nft(
      id: $id
    ) {
      activity {
        from
        price
        timestamp
        to
        type
      }
      collectionName
      owner
      price
      uri
    }
  }
`)