import { createConnections } from "typeorm";

createConnections()
    .then(() => console.log("[DB] Database running!"))
    .catch((e) => console.log(`[DB] Database not connected! -----> ${e}`))