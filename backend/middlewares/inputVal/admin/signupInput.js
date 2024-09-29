const zod = require("zod");

const valSchema = zod.object({
  uname: zod.string().email(),
  pwd: zod.string().superRefine((val, ctx) => {
    if (val.length < 6) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "The password should contain atleast 6 characters",
        path: [],
      });
    }
    return val;
  }),
});

const signupInputval = (req, res, next) => {
  const { uname, fname, lname, phno, pwd } = req.body;

  const check = valSchema.safeParse({
    uname,
    pwd,
  });

  // if errors found
  if (!check.success) {
    return res.status(404).json({
      success: false,
      error: check.error.errors,
    });
  }

  // else proceed
  next();
};

module.exports = signupInputval;
