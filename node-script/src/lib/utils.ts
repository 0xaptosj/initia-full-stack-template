import "dotenv/config";
import { env } from "process";
import { Client } from "pg";
import { MnemonicKey, RESTClient, Wallet } from "@initia/initia.js";

export const INITIA_LCD = env.INITIA_LCD!;
export const CHAIN_ID = env.CHAIN_ID!;

const initiaClient = new RESTClient(INITIA_LCD, {
  chainId: CHAIN_ID,
  gasPrices: "0.15uinit", // default gas prices
  gasAdjustment: "1.75", // default gas adjustment for fee estimation
});

const POSTGRES_CLIENT = new Client({
  // user: "your_username",
  // host: "localhost",
  database: "example-indexer",
  // password: "your_password",
  // port: 5432,
});

export const getInitiaClient = () => initiaClient;

export const getAccount = () => {
  if (!env.MNEMONIC && env.MNEMONIC === "to_fill") {
    throw new Error("Please fill in your mnemonic in the .env file");
  }

  return new MnemonicKey({
    mnemonic: env.MNEMONIC,
    account: 0, // (optional) BIP44 account number. default = 0
    index: 0, // (optional) BIP44 index number. default = 0
    coinType: 118, // (optional) BIP44 coinType. default = 118
  });
};

export const getWallet = () => new Wallet(initiaClient, getAccount());

export const getPostgresClient = async () => {
  await POSTGRES_CLIENT.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("Connection error", err.stack));

  return POSTGRES_CLIENT;
};
