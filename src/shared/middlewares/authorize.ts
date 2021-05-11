import {
  PRIVATE_KEY_FOR_ACCESSTOKEN,
  PRIVATE_KEY_FOR_REFRESHTOKEN,
} from '@shared/constants';
import { verifyToken, wrapPromise } from '@shared/functions';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const { FORBIDDEN, EXPECTATION_FAILED } = StatusCodes;

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * check and verify tokens for authorization
   */
  const accessToken = req.headers['x-access-token'] as string;
  const refreshToken = req.headers['x-refresh-token'] as string;

  if (!accessToken) {
    return res.status(FORBIDDEN).json({
      message: 'not authorized',
    });
  }
  const [decoded, err] = await wrapPromise(
    verifyToken(accessToken, PRIVATE_KEY_FOR_ACCESSTOKEN)
  );

  // Todo: refresh token
  console.log('r: ', refreshToken);
  if (err && err.name === 'TokenExpiredError') {
    return res.status(EXPECTATION_FAILED).json({
      message: 'token expired - please login again',
    });
  }

  if (err) throw err;

  // add username to request
  req.userId = decoded.id;
  next();
};
