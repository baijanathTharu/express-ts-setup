import logger from '@shared/Logger';
import { Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

export const errorHandler = (fn: Function) => {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch((e: any) => {
      if (typeof e === 'string') {
        res.status(BAD_REQUEST).json({
          message: e,
        });
        return;
      }
      next(e);
    });
  };
};
