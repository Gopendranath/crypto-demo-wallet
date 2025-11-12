import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateWallet from "@/components/create-wallet";
import WalletCoinList from "./components/wallet-coinlist";
import CoinAccountList from "./components/account-list";
import Header from "./components/header";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-size-[70px_70px] px-5 pt-[70px] prose-h4:xl:text-2xl prose-h4:lg:text-xl prose-h4:text-lg">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<CreateWallet />} />
            <Route path=":walletId" element={<WalletCoinList />}>
              <Route path=":coinId" element={<CoinAccountList />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
