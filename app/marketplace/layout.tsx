"use client";

import { Client, Provider, cacheExchange, fetchExchange } from "urql";

export const client = new Client({
  url: "https://api.thegraph.com/subgraphs/name/jonassunandar/any-ape-subgraph",
  requestPolicy: "network-only",
  exchanges: [cacheExchange, fetchExchange],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider value={client}>
      <main className="flex min-h-screen items-center justify-between p-24">
        {children}
      </main>
    </Provider>
  );
}
