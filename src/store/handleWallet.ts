import { create } from "zustand";
import { wallets } from "../lib/wallet-data";
import type {
  WalletType,
  AccountType,
  AssetType,
  CoinType,
} from "../lib/wallet-data";
import { generateMnemonic } from "bip39";
import { createSolanaAccount, createEtherAccount } from "../lib/create-account";

interface WalletStore {
  walletData: WalletType[];
  createWallet: (num: number, name: string) => WalletType;
  removeWallet: (id: number) => void;
  addAccount: (coin: string, walletId: number, accountIndex: number) => Promise<void>;
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  walletData: wallets,
  createWallet: (num: number, name: string) => {
    const mnemonic = generateMnemonic(num);
    const newWallet: WalletType = {
      id: (get() as any).walletData.length,
      name: name,
      phrase: mnemonic.split(" "),
      createdDate: new Date(),
      accounts: [],
    };

    set({ walletData: [...(get() as any).walletData, newWallet] });
    return newWallet;
  },
  removeWallet: (id: number) => {
    set((state) => ({
      walletData: state.walletData.filter((wallet) => wallet.id !== id),
    }));
  },
  addAccount: async (coin: string, walletId: number, accountIndex: number) => {
    switch (coin) {
      case "BTC":
        break;
      case "ETH":
        await createEtherAccount(get().walletData[walletId].phrase.join(" "), accountIndex)
        break;
      case "SOL":
        await createSolanaAccount(get().walletData[walletId].phrase.join(" "), accountIndex)
        break;
      case "DOGE":
        break;
      case "BNB":
        break;
      case "MATIC":
        break;
      default:
        break;
    }
  },
}));
