import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'jwt token missing , check frontend !',
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log('something went wrong while checking auth token', error);
    return res.status(401).json({
      success: false,
      message: 'invalid token',
    });
  }
}
