import type { AccountType } from "@/lib/wallet-data";

const AccountCard = ({ account }: { account: AccountType }) => {
  return (
    <div
      className="
                bg-background 
                border-2 border-border 
                rounded-base 
                shadow-shadow
                hover:translate-y-[3px] 
                hover:shadow-none 
                transition-all duration-200
                cursor-pointer
                p-4 flex justify-between items-center
                hover:bg-secondary-background
                active:translate-y-[4px]
              "
    >
      {/* Left side — Account Name + Symbol */}
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-base leading-tight">
          {account.name}
        </span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {account.assets?.[0]?.symbol ? (
            <span className="px-2 py-[2px] bg-main text-main-foreground rounded">
              {account.assets?.[0]?.symbol}
            </span>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )}
        </div>
      </div>

      {/* Right side — Balance */}
      <div className="flex flex-col items-end gap-1">
        <span className="font-bold text-sm leading-tight">
          {account.assets?.[0]?.balance?.toFixed(4) ?? "0.0000"}
        </span>
        <span className="text-[11px] text-muted-foreground">Balance</span>
      </div>
    </div>
  );
};

export default AccountCard;
