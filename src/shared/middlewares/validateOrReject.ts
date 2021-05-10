import logger from '@shared/Logger';
import { validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const validateOrRejectDtos = (dto: any) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const payload = req.body;

    try {
      await validateOrReject(new dto(payload));
      next();
    } catch (e) {
      logger.err(e);
      if (e.length > 0) {
        return res.json({ errors: e });
      }
      next(e);
    }
  };
};
