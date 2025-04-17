import { bcs } from "@initia/initia.js";
import { getAccount, getInitiaClient } from "../lib/utils";

const run = async () => {
  let account = getAccount();
  getInitiaClient()
    .move.view(
      account.accAddress,
      "message_board",
      "get_primary_message_content",
      [],
      [bcs.address().serialize(account.accAddress).toBase64()]
    )
    .then((result) => {
      console.log("Message content: ", result);
    })
    .catch((error) => {
      console.error("Error fetching message content: ", error);
    });
};

run();
