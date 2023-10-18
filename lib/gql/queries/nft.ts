import { DocumentNode } from "graphql";
import { graphql } from "../types";

export const getNftsQuery = graphql(`
  query GetNftsQuery {
    listedNFTs {
      id
      collectionAddress
      owner
      uri
      collectionName
      price
    }
  }
`); 

export const getNftDetailsQuery = graphql(`
  query GetNftDetailsQuery($id: ID!) {
    listedNFT(
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