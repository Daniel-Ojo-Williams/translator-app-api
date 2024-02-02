import { Request, Response, NextFunction } from "express";

type AsyncFunction = (req: Request, res: Response) => Promise<void>;

const asyncWrapper = (func: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res).catch((err) => next(err));
  };
};

export default asyncWrapper;
