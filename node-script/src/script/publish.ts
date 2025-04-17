import { CompilerVersion, MoveBuilder } from "@initia/builder.js";
import { AccAddress, MsgPublish } from "@initia/initia.js";
import * as fs from "fs";

import { getAccount, getInitiaClient, getWallet } from "../lib/utils";

const run = async () => {
  const contractPath = "../move/message-board";
  const account = getAccount();
  const wallet = getWallet();
  const hexAddress = AccAddress.toHex(account.accAddress);
  const cosmosAddress = account.accAddress;

  const builder = new MoveBuilder(contractPath, {
    additionalNamedAddresses: [["message_board_addr", hexAddress]],
    generateAbis: true,
    forceRecompilation: true,
    // bytecodeVersion: BytecodeVersion.V7,
    // languageVersion: LanguageVersion.V2_1,

    // default v2_1 is not working, had to use v2_0
    compilerVersion: CompilerVersion.V2_0,
  });
  await builder.build();

  const testResult = await builder.test({
    filter: "...",
    reportStatistics: true,
    reportStorageOnError: true,
    ignoreCompileWarnings: true,
    computeCoverage: true,
  });
  console.log(testResult); // 'ok'

  const codeBytes = fs.readFileSync(
    "build/message-board/bytecode_modules/message_board.mv"
  );

  const msgs = [
    new MsgPublish(
      cosmosAddress,
      [codeBytes.toString("base64")],
      MsgPublish.Policy.COMPATIBLE
    ),
  ];

  const signedTx = await wallet.createAndSignTx({ msgs });
  getInitiaClient()
    .tx.broadcastSync(signedTx)
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
    });
};

run();
