"use client";

import { InitiaWidgetProvider, injectStyles } from "@initia/widget-react";
import { PropsWithChildren, useEffect } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import initiaWidgetStyles from "@initia/widget-react/styles.js";

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
});

export const WalletProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    injectStyles(initiaWidgetStyles);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <InitiaWidgetProvider>{children}</InitiaWidgetProvider>
    </WagmiProvider>
  );
};
