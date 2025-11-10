export const wallets = [
  {
    id: 0,
    name: "Wallet 1",
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

export const coinTypes = catchData();
