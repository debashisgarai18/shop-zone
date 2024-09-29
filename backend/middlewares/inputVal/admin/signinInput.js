const zod = require("zod");

// input validation
const inputSchema = zod.object({
  uname: zod.string().email(),
  pwd: zod.string().min(6),
});

const signinInputVal = (req, res, next) => {
  const { uname, pwd } = req.body;
  const checked = inputSchema.safeParse({
    uname,
    pwd,
  });

  if (checked.success) {
    next();
  } 
  else {
    res.status(404).json({
      message: checked.error.errors,
    });
    return
  }
};

module.exports = signinInputVal;
