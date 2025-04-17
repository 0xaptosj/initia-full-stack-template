# Message board contract

This is a simple message board contract that allows users to post messages on-chain and read messages from the chain. For both `create` and `update` endpoints, contract emits Create event and Update event respectively, then indexer will parse these events and store the message in the database for frontend to query efficiently.
