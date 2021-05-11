import logger from '@shared/Logger';
import { validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const validateOrRejectDtos = (dto: any, payloadFrom = 'body') => {
  return async function (req: Request, res: Response, next: NextFunction) {
    let payload = null;

    if (payloadFrom === 'body') {
      payload = req.body;
    }

    if (payloadFrom === 'query') {
      payload = req.query;
    }

    try {
      await validateOrReject(new dto(payload));
      console.log('working');

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
