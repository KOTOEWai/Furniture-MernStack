const validate = (schema) => (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      const errors = err.errors.map((e) => ({
        path: e.path[1],
        message: e.message
      }));
      
      return res.status(400).json({ status: 'error', errors });
    }
  };
  
  module.exports = validate;