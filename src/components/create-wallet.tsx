import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import WalletCard from "./wallet-card";
import type { WalletType } from "../lib/wallet-data";
import { useNavigate } from "react-router-dom";
import { useWalletStore } from "../store/handleWallet"

const CreateWallet = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wallets = useWalletStore(state => state.walletData);
  const createWallet = useWalletStore(state => state.createWallet);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleWalletClick = (wallet: WalletType) => {
    // console.log(wallet.name);
    navigate(`/${wallet.name}`, { state: { wallet } });
  };

  const handleCreateWallet = (num : number, name : string) => {
    createWallet(num, name)
  }

  useEffect(() => {
    // console.log(wallets);
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[900px] my-16 px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl w500:text-2xl w400:text-xl text-gray-900 dark:text-gray-100">
            {wallets.length > 0
              ? "Create a New HD Wallet"
              : "Create Your First HD Wallet"}
          </h2>
          <p className="font-body text-base w500:text-lg w400:text-base text-gray-600 dark:text-gray-400">
            {wallets.length > 0
              ? "Create a HD wallet to store your crypto assets."
              : "Create a new HD wallet to store your crypto assets."}
          </p>
        </div>

        <AlertDialog open={open} onOpenChange={onOpenChange}>
          <AlertDialogTrigger asChild>
            <Button variant="default" className="mt-4 w-fit">
              Create Wallet
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-xl font-semibold">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 flex justify-end gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleCreateWallet(256, "Wallet 1")}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="mx-auto max-w-[900px] my-16 px-6 flex flex-col gap-6">
        <p className="text-2xl font-semibold">Your wallets</p>
        <div className="flex gap-4 sm:gap-6 flex-wrap ">
          {wallets?.map((wallet) => (
            <WalletCard
              key={wallet.id}
              onClick={() => handleWalletClick(wallet)}
              wallet={wallet}
              className="w-full sm:w-60 md:w-55 lg:w-47"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateWallet;
