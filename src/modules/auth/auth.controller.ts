import {
  PRIVATE_KEY_FOR_ACCESSTOKEN,
  PRIVATE_KEY_FOR_REFRESHTOKEN,
} from '@shared/constants';
import {
  createTokens,
  decryptpassword,
  sanitizeResponse,
  verifyToken,
  wrapPromise,
} from '@shared/functions';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getUserByEmailOrUsername, getUserService } from '../user/user.service';

const { NOT_FOUND, FORBIDDEN, EXPECTATION_FAILED } = StatusCodes;

export async function loginController(req: Request, res: Response) {
  const { username, email, password } = req.body as any;

  /**
   * get user by email or username from database to verify the password
   */
  const user = await getUserByEmailOrUsername(email, username);

  /**
   * user not registered
   */
  if (!user) {
    return res.status(NOT_FOUND).json({
      message: 'account not found - please signup first',
    });
  }

  const hashedPassword = user.password;

  const [isMatching, err] = await wrapPromise(
    decryptpassword(password, hashedPassword)
  );

  /**
   * error in comparing password
   */
  if (err) throw err;

  /**
   *  password not matching
   */
  if (!isMatching) {
    return res.status(FORBIDDEN).json({
      message: 'password is wrong - please try again',
    });
  }

  /**
   * pasword matched
   */
  if (isMatching) {
    // password is correct now send the user
    // create tokens
    const tokens = await createTokens(sanitizeResponse(user));

    res.json({ data: sanitizeResponse(user), ...tokens });
  }
}

export async function tokenController(
  req: Request,
  res: Response
): Promise<void> {
  /**
   * check and verify tokens for authorization
   */
  const accessToken = req.headers['x-access-token'] as string;
  const refreshToken = req.headers['x-refresh-token'] as string;

  if (!accessToken) {
    res.status(FORBIDDEN).json({
      message: 'not authorized',
    });
    return;
  }
  const [decodedAccess, accessErr] = await wrapPromise(
    verifyToken(accessToken, PRIVATE_KEY_FOR_ACCESSTOKEN)
  );

  if (accessErr && accessErr.name === 'TokenExpiredError') {
    // verify refresh token
    const [decoded, err] = await wrapPromise(
      verifyToken(refreshToken, PRIVATE_KEY_FOR_REFRESHTOKEN)
    );

    // Todo: refresh token is expired
    // console.log('e: ', { ...err });
    if (err && err.name === 'TokenExpiredError') {
      res.status(EXPECTATION_FAILED).json({
        message: 'refresh token expired',
        error: err.message,
      });
      return;
    }

    if (err && err.name === 'JsonWebTokenError') {
      res.status(EXPECTATION_FAILED).json({
        message: 'token error',
        error: err.message,
      });
      return;
    }

    if (err) throw err;

    // if refresh token is verified then generate new tokens
    // console.log('decoded: ', decoded);
    const userId = decoded.id;
    const user = await getUserService(userId);

    // const payload = { ...user };

    // console.log('u: ', payload);

    // res.json({ msg: 'ok' });

    const tokens = await createTokens({ ...user });

    res.json({
      ...tokens,
    });
    return;
  }
  res.json({ msg: 'token is ok' });
}
