//wallet-data.ts
export type AssetType = {
  symbol: string;
  balance: number;
};


export type AccountType = {
  id: number;
  name: string;
  pubAddress: string;
  privAddress: string;
  createdDate: Date;
  assets: AssetType[];
};


export type WalletType = {
  id: number;
  name: string;
  phrase: string[];
  createdDate: Date;
  accounts: AccountType[];
};

export const wallets: WalletType[] = [
  {
    id: 0,
    name: "Wallet 1",
    phrase: ["ribbon", "guitar", "clerk", "siren", "trophy", "orbit", "sugar", "echo", "velvet", "sunset", "maze", "glory", "vintage", "pistol", "cradle", "cactus", "frost", "anchor", "lemon", "spirit", "chimney", "forest", "whale", "zebra"],
    createdDate: new Date(),
    accounts: [
      {
        id: 0,
        name: "Account 1",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 1,
        name: "Account 2",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 2,
        name: "Account 3",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 3,
        name: "Account 4",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 4,
        name: "Account 5",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 5,
        name: "Account 6",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 6,
        name: "Account 7",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 7,
        name: "Account 8",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 8,
        name: "Account 9",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 10,
        name: "Account 11",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 11,
        name: "Account 12",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
    ],
  },
  {
    id: 1,
    name: "Wallet 2",
    phrase: [],
    createdDate: new Date(),
    accounts: [
      {
        id: 0,
        name: "Account 1",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 1,
        name: "Account 2",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
    ],
  },
  {
    id: 2,
    name: "Wallet 3",
    phrase: [],
    createdDate: new Date(),
    accounts: [
      {
        id: 0,
        name: "Account 1",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 1,
        name: "Account 2",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
    ],
  },
  {
    id: 3,
    name: "Wallet 4",
    phrase: [],
    createdDate: new Date(),
    accounts: [
      {
        id: 0,
        name: "Account 1",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 1,
        name: "Account 2",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
    ],
  },
  {
    id: 4,
    name: "Wallet 5",
    phrase: [],
    createdDate: new Date(),
    accounts: [
      {
        id: 0,
        name: "Account 1",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 1,
        name: "Account 2",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
    ],
  },
  {
    id: 5,
    name: "Wallet 6",
    phrase: [],
    createdDate: new Date(),
    accounts: [
      {
        id: 0,
        name: "Account 1",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
      {
        id: 1,
        name: "Account 2",
        pubAddress: "",
        privAddress: "",
        createdDate: new Date(),
        assets: [{ symbol: "ETH", balance: 0 }],
      },
    ],
  },
  {
    id: 6,
    name: "Wallet 7",
    phrase: [],
    createdDate: new Date(),
    accounts: [
    ],
  },
];

async function getSlip44Coins() {
  const response = await fetch(
    "https://raw.githubusercontent.com/satoshilabs/slips/master/slip-0044.md"
  );
  const text = await response.text();
  const regex =
    /\|\s*(\d+)\s*\|\s*(0x[0-9a-f]+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/g;
  const coins = [...text.matchAll(regex)].map((m) => ({
    coin_type: Number(m[1]),
    hex: m[2],
    symbol: m[3].trim(),
    name: m[4].trim(),
  }));
  return coins;
}

const cacheKey = "slip44_data";
const cacheExpiry = 7 * 24 * 60 * 60 * 1000;

const catchData = async () => {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, expiry } = JSON.parse(cachedData);
    if (Date.now() < expiry) {
      return data;
    }
  }
  const data = await getSlip44Coins();
  const expiry = Date.now() + cacheExpiry;
  localStorage.setItem(cacheKey, JSON.stringify({ data, expiry }));
  return data;
};

export type CoinType = {
    coin_type: number;
    hex: string;
    symbol: string;
    name: string;
};

export const coinTypes = await catchData();
