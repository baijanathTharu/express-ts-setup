import {
  PRIVATE_KEY_FOR_ACCESSTOKEN,
  PRIVATE_KEY_FOR_REFRESHTOKEN,
  saltRounds,
} from './constants';
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

export const wrapPromise = (promise: Promise<string | boolean>) => {
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
        // console.log('res: ', result);
        // console.log('err: ', err);
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

export const createTokens = async (payload: any) => {
  // Todo: create tokens
  const [accessToken, accessTokenErr] = await wrapPromise(
    createToken(payload, PRIVATE_KEY_FOR_ACCESSTOKEN, 60 * 60)
  );
  if (accessTokenErr) throw accessTokenErr;

  const [refreshToken, refreshTokenErr] = await wrapPromise(
    createToken(payload, PRIVATE_KEY_FOR_REFRESHTOKEN, 60 * 60 * 24 * 7)
  );
  if (refreshTokenErr) throw refreshTokenErr;

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (token: string, key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, function (err: any, decoded: any) {
      // console.log({ ...err });
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

/**
 * This removes password from response
 *
 * @param responseObj responseToBeSent
 * @returns
 */
export const sanitizeResponse = (responseObj: any) => {
  const { password = undefined, ...rest } = { ...responseObj };
  return rest;
};
