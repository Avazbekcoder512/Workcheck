import crypto from "crypto";
import { ALGORITHM, CRYPTO_KEY } from "../config/config.js";
import util from "util";

export const cryptoManeger = {
  token: {
    generate: (payload) => {
      const string = new URLSearchParams(payload).toString();
      const iv = crypto.randomBytes(8).toString("hex");
      const cipher = crypto.createCipheriv(ALGORITHM, CRYPTO_KEY, iv);
      let encrypted = cipher.update(string, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted + ":" + iv;
    },

    verify: (token) => {
      try {
        const [encrypted, iv] = token.split(":");
        const decipher = crypto.createCipheriv(ALGORITHM, CRYPTO_KEY, iv);
        let decrypt = decipher.update(encrypted, "hex", "utf8");
        decrypt += decipher.final("utf8");
        return Object.fromEntries(new URLSearchParams(decrypt));
      } catch (error) {
        return undefined;
      }
    },
  },

  pass: {
    hash: async (password, salt) => {
      const saltInUse = salt || crypto.randomBytes(16).toString("hex");
      const hashBuffer = await util.promisify(crypto.scrypt)(
        password,
        saltInUse,
        32
      );

      return `${hashBuffer.toString("hex")}:${saltInUse}`;
    },

    verify: async (password, hash) => {
      const hashed = await cryptoManeger.pass.hash(
        password,
        hash.split(":")[1]
      );
      return hashed === hash;
    },
  },
};
