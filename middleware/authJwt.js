const jwt = require('jsonwebtoken');

class AuthJwt {
    async authJwt(req, res, next) {
        try {
            if(req.cookies && req.cookies.userToken) {
                jwt.verify(req.cookies.userToken, 'M3S3CR3PKY5', (err, data) => {
                    if(!err){
                        req.user = data;
                        console.log('Req.user ======>');
                        console.log(req.user);
                        next();
                    } else {
                        console.log(err);
                    }
                })
            }else {
                next();
            }
        }catch(err) {
            // console.log(err);
            throw err;
        }
    }
}

module.exports = new AuthJwt();