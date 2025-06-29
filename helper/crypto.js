import crypto, { verify } from "crypto";
import { ALGORITHM, CRYPTO_KEY, REFRESH_KEY } from "../config/config.js";
import util from "util";

export const cryptoManeger = {
  refresh: {
    generate: payload => {
      const string = (new URLSearchParams(payload)).toString()
      const iv = crypto.randomBytes(16).toString('hex')
      const cipher = crypto.createCipheriv(ALGORITHM, REFRESH_KEY, Buffer.from(iv, 'hex'))
      let encrypted = cipher.update(string, 'utf-8', 'hex')
      encrypted += cipher.final('hex')
      return encrypted + ':' + iv
    },

    verify: (token) => {
      try {
        const [encrypted, iv] = token.split(':')
        const decipher = crypto.createDecipheriv(ALGORITHM, REFRESH_KEY, Buffer.from(iv, 'hex'))
        let decrypt = decipher.update(encrypted, 'hex', 'utf-8')
        decrypt += decipher.final('utf-8')
        return Object.fromEntries(new URLSearchParams(decrypt))
      } catch (error) {
        return undefined
      }
    }
  },

  token: {
    generate: payload => {
      const string = (new URLSearchParams(payload)).toString();
      const iv = crypto.randomBytes(16).toString("hex");
      const cipher = crypto.createCipheriv(ALGORITHM, CRYPTO_KEY, Buffer.from(iv, 'hex'));
      let encrypted = cipher.update(string, "utf-8", "hex");
      encrypted += cipher.final("hex");
      return encrypted + ":" + iv;
    },

    verify: (token) => {
      try {
        const [encrypted, iv] = token.split(":");
        const decipher = crypto.createDecipheriv(ALGORITHM, CRYPTO_KEY, Buffer.from(iv, 'hex'));
        let decrypt = decipher.update(encrypted, "hex", "utf-8");
        decrypt += decipher.final("utf-8");
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
