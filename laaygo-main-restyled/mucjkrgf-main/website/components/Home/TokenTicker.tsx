import React from "react";
import { WEB3_CONFIG, SWAP_TOKEN_SYMBOL } from "../../config/web3";

/**
 * Ticker watchlist. Wire `changeLabel`/`priceLabel` up to a real price feed
 * (once SWAP_ROUTER_ADDRESS / an oracle is live) by replacing the static
 * strings below — the marquee itself needs no changes.
 */
interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
}

const TICKER_ITEMS: TickerItem[] = [
  { symbol: `$${SWAP_TOKEN_SYMBOL}`, name: "StonkBroker", price: "PENDING", change: "EXCHANGE SOON", up: true },
  { symbol: "$ORIGIN", name: "Origin Token", price: "PENDING", change: "EXCHANGE SOON", up: true },
  { symbol: WEB3_CONFIG.CURRENCY_SYMBOL, name: WEB3_CONFIG.CHAIN_NAME, price: "—", change: "NATIVE", up: true },
  { symbol: "MINI BROKERS", name: "NFT Floor", price: "PENDING", change: "TBD", up: false },
];

const TickerCard: React.FC<{ item: TickerItem }> = ({ item }) => (
  <div className="glass pixel-corners flex items-center gap-3 px-4 py-3 shrink-0">
    <span className="font-display text-sm font-bold text-white whitespace-nowrap">{item.symbol}</span>
    <span className="text-[10px] text-zinc-500 whitespace-nowrap hidden sm:inline">{item.name}</span>
    <span className="font-mono text-xs text-zinc-300 whitespace-nowrap">{item.price}</span>
    <span
      className={`font-mono text-[10px] whitespace-nowrap ${item.up ? "text-neon" : "text-zinc-500"}`}
    >
      {item.change}
    </span>
  </div>
);

/** Continuous right-to-left scrolling ticker strip. The item list is
 * duplicated once so the marquee loops seamlessly. */
export const TokenTicker: React.FC = () => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="marquee-row overflow-hidden">
      <div className="marquee-track flex gap-3 w-max">
        {doubled.map((item, i) => (
          <TickerCard key={`${item.symbol}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
};
