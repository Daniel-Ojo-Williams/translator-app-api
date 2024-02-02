

class CustomError extends Error{
  statusCode: string | number;

  constructor(message: string, statusCode: string | number){
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;