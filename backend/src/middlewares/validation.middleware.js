export const validate = (schemaValidator) => {
  return (req, res, next) => {
    const { error, value } = schemaValidator(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: error,
      });
    }
    req.body = value;
    next();
  };
};
