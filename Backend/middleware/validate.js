const { ZodError } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    // Zod ကနေလာတဲ့ error ဟုတ်မဟုတ် အရင်စစ်မယ်
    if (err instanceof ZodError) {
      const formattedErrors = err.issues.map((e) => ({
        // e.path[1] က body/params/query ထဲက field နာမည်ကို ယူတာပါ
        field: e.path[1] || e.path[0],
        message: e.message
      }));

      return res.status(400).json({
        status: 'fail',
        errors: formattedErrors
      });
    }

    // တခြား unexpected error ဆိုရင် server error အနေနဲ့ ပို့မယ်
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error during validation'
    });
  }
};

module.exports = validate;