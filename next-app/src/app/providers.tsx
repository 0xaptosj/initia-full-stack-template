"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { useEffect, useState } from "react";
import { QueryProvider } from "@/components/providers/QueryProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  //// required for terra wallet kit
  // workaround for window undefined error at launch, terra wallet kit needs window
  useEffect(() => {
    setIsClient(true);
  }, []);

  //// required for cosmos kit
  // const supportedChains = chains.filter((chain) =>
  //   AVAILABLE_CHAIN_IDS.includes(chain.chain_id)
  // );

  return isClient ? (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <WalletProvider>{children}</WalletProvider>
      </QueryProvider>
    </ThemeProvider>
  ) : <></>;
};

export default Providers;
