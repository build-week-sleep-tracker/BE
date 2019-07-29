
function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'This resource requires authentication' });
  }
}

module.exports = {
  restricted,
};
