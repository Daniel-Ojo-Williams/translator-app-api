import { Request, Response, NextFunction } from 'express';



const globalErrorHandler = async(err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    let message: string = err.message || "Internal server error";
    let statusCode: string | number = err.statusCode || 500;
  
    res.send(statusCode).json(message)
    
  } catch (error: any) {
    console.log(error.message)
  }
}

export default globalErrorHandler;