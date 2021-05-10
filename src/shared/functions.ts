import { saltRounds } from './constants';
import logger from './Logger';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000);
};

export const mapPayloadToRepo = (payload: any, Repo: any) => {
  if (typeof Repo === 'function') {
    const repoInstance = new Repo();
    for (const [key, value] of Object.entries(payload)) {
      repoInstance[key] = value;
    }
    return repoInstance;
  }
  if (typeof Repo === 'object') {
    const copyRepo = { ...Repo };
    for (const [key, value] of Object.entries(payload)) {
      copyRepo[key] = value;
    }
    return copyRepo;
  }
};

export const wrapPromise = (promise: Promise<string>) => {
  return promise.then((val) => [val, null]).catch((e) => [null, e]);
};

export const encryptPassword = (plainText: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainText, saltRounds, function (err: any, hash: string) {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
};

export const decryptpassword = (
  plainText: string,
  hashedPassword: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(
      plainText,
      hashedPassword,
      function (err: any, result: boolean) {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

export const createToken = (
  payload: any,
  key: string,
  expiresIn = 60 * 60
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      key,
      { expiresIn: expiresIn },
      function (err: any, token: string) {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });
};

export const verifyToken = (token: string, key: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, function (err: any, decoded: any) {
      if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
        return reject(err);
      }
      resolve(decoded);
    });
  });
};
