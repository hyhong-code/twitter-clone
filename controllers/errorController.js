const CustomError = require('../utils/customError');

// Development enviroment
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Production enviroment
const sendErrorProd = (err, res) => {
  // Identified operatinal error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unkown error
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

// Handle mongoose ObjectID casting error
const handleCastErrorDB = (error) => {
  const message = `Invalid value ${error.value} for field ${error.path}`;
  return new CustomError(message, 400);
};

// Handle mongoose Duplicate keys error
const handleDuplicateKeyDB = (error) => {
  const message = Object.keys(error.keyValue)
    .map(
      (key) =>
        `Value "${error.keyValue[key]}" is already taken for field "${key}"`
    )
    .join(', ');
  return new CustomError(`Duplicate key: ${message}`, 400);
};

// Handle mongoose Validation error
const handleValidationErrorDB = (error) => {
  const message = Object.values(error.errors)
    .map((err) => err.message)
    .join(', ');
  return new CustomError(`Invalid input: ${message}`, 400);
};

const handleInvalidJWTError = () =>
  new CustomError(`Invalid token, please login again`, 401);

const handleJWTExpiredError = () =>
  new CustomError(`Token expired, please login again`, 401);

const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.name = err.name; // err.name is enumerable field
    error.message = err.message; // err.message is enumerable field
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateKeyDB(error);
    if (error.errors) error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleInvalidJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};

module.exports = errorController;
