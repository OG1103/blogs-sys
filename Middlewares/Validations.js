const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    // Property options "body,params,query"
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      // Format Joi errors into a readable response
      const errors = error.details.map((detail) => ({
        message: detail.message,
      }));
      return res.status(400).json({ errors });
    }

    next(); // Proceed to the next middleware
  };
};

export default validateRequest;
