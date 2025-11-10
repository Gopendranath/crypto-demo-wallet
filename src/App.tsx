import { ThemeProvider } from "@/components/theme-provider";
import CreateWallet from "@/components/create-wallet";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CreateWallet />
    </ThemeProvider>
  );
}

export default App;
