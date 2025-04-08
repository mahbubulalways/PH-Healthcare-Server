import { Server } from "http";
import app from "./app";
import { config } from "./config";

const port = config.SERVER_PORT || 5000;
async function main() {
  try {
    const server: Server = app.listen(5000, () => {
      console.log("PH Health Care App is Running Port on 5000");
    });
  } catch (error) {
    console.log(error);
  }
}
main();
