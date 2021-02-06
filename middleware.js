import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(403).json({ error: "please provide a token" });
  else {
    jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET, (err, value) => {
      if (err) res.status(500).json({ error: "failed to authenticate token" });
      req.user = value.data;
      next();
    });
  }
};
