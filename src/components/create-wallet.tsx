import { ModeToggle } from "@/components/mode-toggle";
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
import { coinTypes, wallets } from "../lib/wallet-data";


const CreateWallet = () => {
  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };


  useEffect(() => {
    console.log(wallets);
  }, []);

  
  return (
    <div className="min-h-dvh bg-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-size-[70px_70px] px-5 pt-[70px] prose-h4:xl:text-2xl prose-h4:lg:text-xl prose-h4:text-lg">
      <nav className="fixed top-0 left-0 z-50 w-full px-5">
        <div className="rounded-base border-border text-foregronud bg-secondary-background w400:h-[unset] w400:flex-col w400:gap-3 w400:py-3 z-50 mx-auto mt-5 flex h-[70px] w-full max-w-[860px] items-center justify-between border-2 px-5">
          <a href="/">
            <h2 className="font-heading w500:text-2xl w400:text-xl text-3xl">
              Wallet
            </h2>
          </a>

          <div className="w500:text-base w400:text-sm flex items-center text-lg">
            <ModeToggle />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[860px] my-16 px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl w500:text-2xl w400:text-xl text-gray-900 dark:text-gray-100">
            {wallets.length > 0 ? "Create Your First HD Wallet" : "Create a new HD wallet"}
          </h2>
          <p className="font-body text-base w500:text-lg w400:text-base text-gray-600 dark:text-gray-400">
            {wallets.length > 0 ? "Create a new wallet to store your crypto assets." : "Create a new HD wallet to store your crypto assets."}
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
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="mx-auto max-w-[860px] my-16 px-6 flex flex-col gap-6">
        <p>Your wallets</p>
        <div className="flex flex-col gap-2">
          {wallets.map((wallet) => (
            <div key={wallet.id}>
              <p>{wallet.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;
