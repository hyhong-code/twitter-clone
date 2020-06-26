class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // For testing

    // Constructing new CustomError does not polute stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
