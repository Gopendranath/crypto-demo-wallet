import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Wallet, HDNodeWallet } from "ethers";
import { mnemonicToSeed } from "bip39";

export const createSolanaAccount = async (
  mnemonic: string,
  currentIndex: number
) => {
  const seed = await mnemonicToSeed(mnemonic);
  const path = `m/44'/501'/${currentIndex}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keypair = Keypair.fromSecretKey(secret);
  console.log(keypair.publicKey.toBase58())
  console.log(keypair.secretKey)
};

export const createEtherAccount = async (
  mnemonic: string,
  currentIndex: number
) => {
  const seed = await mnemonicToSeed(mnemonic);
  const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);
  console.log(wallet.address)
};
