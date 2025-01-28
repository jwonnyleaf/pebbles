import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest =
  (schema: ZodSchema, property: 'body' | 'params' | 'query') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors.map((e) => e.message) });
        return;
      }
      next(error);
    }
  };
