"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const connected =
          mounted &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              className: "opacity-0 pointer-events-none select-none",
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} type="button">
                    Connect
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex gap-3">
                  <Button onClick={openAccountModal} type="button">
                    <span className="mr-1">{account.displayName}</span>
                    <span className="hidden md:inline">
                      {account.displayBalance ? ` (${account.displayBalance})` : ""}
                    </span>
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
