import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = null;

  // 1. Try Bearer token from Authorization header (primary – used by API clients)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. Fall back to httpOnly cookie (set when "Stay logged in" was checked)
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      federatedId: decoded.federatedId,
      displayName: decoded.displayName,
      server: decoded.serverName,
      image: decoded.image,
      role: decoded.role
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

