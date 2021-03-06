const statusCode = {
  badRequest: 400,
  notFound: 404,
  internalServer: 500,
};

module.exports = (err, _req, res, _next) => {
  if (err.idNotFound) {
    return res.status(statusCode.notFound).json({
      error: {
        status: statusCode.notFound,
        message: err.message,
      },
    });
  }
  
  if (err.isInvalidId) {
    return res.status(statusCode.notFound).json({
      error: {
        status: statusCode.notFound,
        message: err.message,
      },
    });
  }

  if (err.isDelete) {
    return res.status(statusCode.badRequest).json({
      error: {
        status: statusCode.badRequest,
        message: err.message,
      },
    });
  }

  if (err.isUpdated) {
    return res.status(statusCode.badRequest).json({
      error: {
        status: statusCode.badRequest,
        message: err.message,
      },
    });
  }

  console.error(err.message);

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};