import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export default {
  PORT: process.env.PORT || 8080,
  DB_URL:
    process.env.DB_URL ||
    "mongodb+srv://SoluTion:PBeZGF2EgKK8quPB@xcluster.ebpd1zl.mongodb.net/neoChat?retryWrites=true&w=majority",
};
