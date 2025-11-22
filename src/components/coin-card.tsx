import type { CoinType } from '../lib/wallet-data'

const CoinCard = ({coin}: {coin: CoinType}) => {
  return (
    <div className="
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
              ">
        <div>
            <span className="font-semibold text-base leading-tight">
                {coin.name}
            </span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {coin.symbol ? (
                    <span className="px-2 py-0.5 bg-main text-main-foreground rounded">
                        {coin.symbol}
                    </span>
                ) : (
                    <span className="text-muted-foreground">N/A</span>
                )}
            </div>
        </div>
    </div>
  )
}

export default CoinCard