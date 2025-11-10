import { Wallet } from "lucide-react";
import { cn } from "../lib/utils";
import type { WalletType } from "../lib/wallet-data";

interface WalletCardProps {
  wallet: WalletType;
  className?: string;
  onClick?: () => void;
}

const WalletCard = ({ wallet, className, onClick }: WalletCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        // base look
        "relative cursor-pointer overflow-hidden rounded-[var(--radius-base)] border-2 border-[var(--color-border)]",
        "bg-[var(--color-secondary-background)] text-[var(--color-foreground)] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        // default neubrutalist shadow
        "shadow-[var(--spacing-boxShadowX)_var(--spacing-boxShadowY)_0_0_var(--color-border)]",
        // hover → pop down & remove shadow
        "hover:translate-x-[var(--spacing-boxShadowX)] hover:translate-y-[var(--spacing-boxShadowY)] hover:shadow-none",
        // active → press a bit deeper
        "active:translate-x-[calc(var(--spacing-boxShadowX)*1.5)] active:translate-y-[calc(var(--spacing-boxShadowY)*1.5)] active:shadow-none",
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--color-border)] bg-[var(--color-main)] text-[var(--color-main-foreground)] shadow-[2px_2px_0_0_var(--color-border)] transition-transform duration-200 group-hover:scale-95">
              <Wallet className="h-6 w-6" />
            </div>

            {/* Wallet Info */}
            <div>
              <h3 className="text-lg font-[var(--font-weight-heading)]">
                {wallet.name}
              </h3>
              <p className="text-sm text-[color-mix(in_oklab,var(--color-foreground)_70%,transparent)]">
                {wallet.accounts.length}{" "}
                {wallet.accounts.length === 1 ? "account" : "accounts"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
