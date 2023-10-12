const jwt = require('jsonwebtoken');
module.exports = (req, resp, next) => {
    try {
        // Check if the "Authorization" header is present in the request
        const token = req.headers['authorization'];
        console.log(token);
        // check if the token is missing
        if (!token) {
            return resp.status(401).json({ message: 'Unauthorized - Token missing' })
        }
        const bearerToken = token.split(' ')[1];
        // Verify the JWT token  { ignoreExpiration: true }, 
        jwt.verify(bearerToken, 'theSceret', (err, user) => {
            if (err) {
                return resp.status(401).json({ message: 'Unauthorized - Invalid token' });
            }

            // Attach the authenticated user data to the request object
            req.user = user;

            //Continue to the next middleware or route handler
            next();
        })


    } catch (error) {
        console.error('Error verifying token:', error);
        resp.status(500).json({ message: 'Internal server error' });
    }

}; 