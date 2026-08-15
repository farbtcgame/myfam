import React from "react";
import { Layout } from "../components/Layout";
import { Countdown } from "../components/Countdown";
import { ExchangeSwapCard } from "../components/ExchangeSwapCard";
import { EXCHANGE_LAUNCH_TIMESTAMP, WEB3_CONFIG } from "../config/web3";

export default function ExchangePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h1 className="font-display text-xl font-bold text-white tracking-widest uppercase">Exchange</h1>
          <p className="text-xs text-zinc-500 mt-1">
            SWAP interface — {WEB3_CONFIG.CHAIN_NAME} MAINNET only
          </p>
        </div>

        <Countdown
          target={EXCHANGE_LAUNCH_TIMESTAMP}
          label="Trading opens in"
          completeState={
            <div className="space-y-4">
              <div className="p-3 border border-neon/40 bg-neon/10 text-neon text-xs font-bold tracking-wider uppercase">
                Exchange is live
              </div>
              <ExchangeSwapCard />
            </div>
          }
        />
      </div>
    </Layout>
  );
}
