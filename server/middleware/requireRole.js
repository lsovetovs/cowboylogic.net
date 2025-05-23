export const requireRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user?.role)) {
    return next();
  }
  return res.status(403).json({ message: "Access denied." });
};
