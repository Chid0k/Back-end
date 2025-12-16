const authMiddleware = (req, res, next) => {
  console.log("SS: " + req.session);
  if (req.session.user) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Vui lòng đăng nhập để tiếp tục.",
    });
  }
};

module.exports = authMiddleware;
