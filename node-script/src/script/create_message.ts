import { bcs, MsgExecute } from "@initia/initia.js";
import { getAccount, getInitiaClient, getWallet } from "../lib/utils";

const run = async () => {
  const account = getAccount();
  const wallet = getWallet();
  const msgs = [
    new MsgExecute(
      account.accAddress,
      account.accAddress,
      "message_board",
      "create_message",
      [],
      [bcs.string().serialize("henlo").toBase64()]
    ),
  ];

  const signedTx = await wallet.createAndSignTx({
    msgs,
  });
  getInitiaClient()
    .tx.broadcastSync(signedTx)
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
    });
};

run();
