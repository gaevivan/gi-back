export default function jwtMiddleware(request, response, next) {
  const token = request.headers.jwt;
  if (!token) {
      response.status(401).send('invalid token');
  }
  verifyJWT(token).then(decodedToken => {
      request.userId = decodedToken.userId;
      next();
  }).catch(err => {
      response.status(401).send(err);
  });
}