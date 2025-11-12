import { Link, Outlet } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import type { AccountType, WalletType, CoinType } from "../lib/wallet-data";
import { Button } from "./ui/button";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { coinTypes } from "../lib/wallet-data";
import AccountCard from "./account-card";
import CoinCard from "./coin-card";
import Fuse from "fuse.js";
import { Input } from "./ui/input";

type WalletLocationState = {
  wallet?: WalletType;
  account?: AccountType;
};

const WalletCoinList = () => {
  const { walletId } = useParams();
  const location = useLocation();
  const locationState = location.state as WalletLocationState | null;
  const wallet = locationState?.wallet;
  const [copied, setCopied] = useState(false);
  const [isPhraseExpanded, setIsPhraseExpanded] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const [showAccounts, setShowAccounts] = useState(true);
  const [filterCoin, setFilterCoin] = useState("");
  const [coin, setCoin] = useState(coinTypes);

  const copyPhrase = async () => {
    if (wallet?.phrase) {
      try {
        await navigator.clipboard.writeText(wallet.phrase.join(" "));
        setCopied(true);
        toast.success("Phrase copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy phrase:", err);
        toast.error("Failed to copy phrase!");
      }
    }
  };

  const handleAddAccount = () => {
    setShowAccounts(false);
    setShowCoins(true);
  };

  const handleCancel = () => {
    setShowAccounts(true);
    setShowCoins(false);
  };

  const handleFilterCoin = (value: string) => {
    setFilterCoin(value);
    if (value === "") {
      setCoin(coinTypes);
      return;
    }
    const fuse = new Fuse(coinTypes, {
      isCaseSensitive: false,
      includeScore: true,
      shouldSort: true,
      keys: ["name", "symbol"],
      threshold: 0.2,
    });
    const results = fuse.search(value);
    // console.log(results);
    setCoin(results.map((result) => result.item));
  };

  const togglePhrase = () => {
    setIsPhraseExpanded(!isPhraseExpanded);
  };

  if (!wallet) {
    return (
      <div className="mx-auto max-w-[900px] my-16 px-6 flex justify-center items-center min-h-64">
        <div className="w-full max-w-md bg-secondary-background border border-border rounded-base shadow-shadow p-6">
          <p className="text-center text-muted-foreground">
            No wallet data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] overflow-auto mt-16 px-6 flex flex-col gap-6">
      {/* Wallet Header Card */}
      <div className="bg-secondary-background border border-border rounded-base shadow-shadow p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2">
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            {wallet.name}
          </h1>
          <p className="text-xs bg-main px-2 py-1 rounded">
            {wallet.createdDate?.toLocaleDateString?.() ?? "Unknown"}
          </p>
        </div>

        {wallet.phrase.length > 0 && (
          <div className="border border-border rounded-base overflow-hidden">
            {/* Accordion Header */}
            <div
              className="flex justify-between items-center p-3 bg-background cursor-pointer hover:bg-secondary-background transition-colors duration-200"
              onClick={togglePhrase}
            >
              <span className="text-sm font-medium">Recovery Phrase</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyPhrase();
                  }}
                  className="p-1 hover:bg-background rounded transition-colors duration-200"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {isPhraseExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Accordion Content (Animated) */}
            <div
              className={`transition-all duration-200 ease-in-out overflow-hidden ${
                isPhraseExpanded
                  ? "max-h-96 overflow-y-auto opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 bg-background border-t border-border overflow-x-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4 bg-secondary-background rounded">
                  {wallet.phrase.map((word, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-2 py-1"
                    >
                      <span className="text-xs text-muted-foreground w-4">
                        {index + 1}.
                      </span>
                      <span className="text-sm font-medium">{word}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Accounts Section */}
      {showAccounts && (
        <div className="bg-secondary-background border border-border rounded-base shadow-shadow">
          <div className="p-6 pb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">Accounts</h2>
              <Button
                onClick={() => handleAddAccount()}
                variant="neutral"
                size="sm"
              >
                Add Account
              </Button>
            </div>
            <div className="w-full bg-border h-px rounded mt-2"></div>
          </div>

          <div className="p-6 pt-0">
            <div className="flex flex-wrap gap-4 mt-4">
              {wallet.accounts.map((account) => {
                return (
                  <Link
                    key={account.id}
                    to={`/${walletId}/${account.name}`}
                    state={{ wallet, account }}
                    className="w-full sm:w-[48%] lg:w-[31%]"
                  >
                    <AccountCard account={account} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add Coin */}
      {showCoins && (
        <div className="bg-secondary-background border border-border rounded-base shadow-shadow max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="p-6 pb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">Coins</h2>
              <Button
                onClick={() => handleCancel()}
                variant="neutral"
                size="sm"
              >
                Cancel
              </Button>
            </div>
            <div className="w-full bg-border h-px rounded mt-2"></div>
          </div>

          <div className="p-6 pt-0">
            <Input
              placeholder="Search coins..."
              value={filterCoin}
              onChange={(e) => handleFilterCoin(e.target.value)}
            />

            <div className="flex flex-wrap gap-4 mt-4">
              {coin.map((coin: CoinType) => {
                return <CoinCard key={coin.coin_type} coin={coin} />;
              })}
            </div>
          </div>
        </div>
      )}

      {/* Outlet for nested routes */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default WalletCoinList;
