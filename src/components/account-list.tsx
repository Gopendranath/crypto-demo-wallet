import { useParams, useLocation } from "react-router-dom";
import type { AccountType, WalletType } from "../lib/wallet-data";
import { wallets } from "../lib/wallet-data";

type AccountLocationState = {
  wallet?: WalletType;
  account?: AccountType;
};

const AccountList = () => {
  const { walletId, coinId } = useParams();
  const location = useLocation();
  const locationState = location.state as AccountLocationState | null;

  const walletFromState = locationState?.wallet;
  const wallet =
    walletFromState ?? wallets.find((item) => item.name === walletId);
  const accountFromState = locationState?.account;
  const account =
    accountFromState ?? wallet?.accounts.find((item) => item.name === coinId);

  if (!wallet || !account) {
    return <div>No account data available</div>;
  }

  return (
    <section className="mx-auto max-w-[900px] my-16 px-6 flex flex-col gap-6">
      <header>
        <h2 className="text-2xl font-semibold">{account.name}</h2>
      </header>

      <div className="rounded-lg border p-4 space-y-2">
        <p>
          <span className="font-medium">Public address:</span>{" "}
          {account.pubAddress || "Not set"}
        </p>
        <p>
          <span className="font-medium">Private address:</span>{" "}
          {account.privAddress || "Not set"}
        </p>
        <p>
          <span className="font-medium">Created on:</span>{" "}
          {account.createdDate?.toLocaleDateString?.() ?? "Unknown"}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Assets</h3>
        {account.assets.length === 0 ? (
          <p className="text-sm text-muted-foreground">No assets available.</p>
        ) : (
          <ul className="space-y-2">
            {account.assets.map((asset) => (
              <li
                key={asset.symbol}
                className="flex items-center justify-between rounded border p-3"
              >
                <span className="font-medium">{asset.symbol}</span>
                <span>{asset.balance}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AccountList;
