import logger from '@shared/Logger';
import { Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

export const errorHandler = (fn: Function) => {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch((e: any) => {
      if (typeof e === 'string') {
        return res.status(BAD_REQUEST).json({
          error: e,
        });
      }
      if (e.name === 'QueryFailedError') {
        return res.status(BAD_REQUEST).json({
          error: e.detail,
        });
      }
      // logger.err('message: ' + e.detail);
      next(e);
    });
  };
};
