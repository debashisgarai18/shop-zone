const zod = require("zod");

const valSchema = zod.object({
  fname: zod.string(),
  lname: zod.string(),
  //   phno: zod.string().transform((val) => {
  //     if (val.length !== 10) throw new Error("It must have 10 digits!!");
  //     return parseInt(val, 10);
  //   }),
  phno: zod.string().superRefine((val, ctx) => {
    if (val.length !== 10) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "Phone number must have exactly 10 digits!!",
        path: [],
      });
    }
    return parseInt(val, 10);
  }),
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
  const { fname, lname, phno, uname, pwd } = req.body;

  const check = valSchema.safeParse({
    fname,
    lname,
    phno,
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
