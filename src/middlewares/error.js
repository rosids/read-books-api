const statusCode = {
  badRequest: 400,
  notFound: 404,
  internalServer: 500,
};

module.exports = (err, _req, res, _next) => {
  if (err.isFindById) {
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

  console.error(err.message);

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};