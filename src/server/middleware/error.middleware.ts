import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

@injectable()
export class ErrorMiddleware {
  handleErrors(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error(err.stack); // Log the error for debugging

    const status = 500;
    const message = 'Internal Server Error';

    res.status(status).json({ success: false, message });
  }
}
