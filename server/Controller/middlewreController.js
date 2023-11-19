const jwt = require('jsonwebtoken')

const middlewreController = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split("Bearer ")[1];
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                  console.error(err)
                    res.status(403).json({ message: "Chưa đăng nhập" });
                } else {
                    req.user = user;
                    next();
                }
            });
        } else {
            res.status(401).json({ message: "Mã token bị sai" });
        }
    } else {
        res.status(401).json({ message: "Mã token bị sai" });
    }
},

    verifyAdmin: (req, res, next) => {
        if (req.user.role === '2') {
            next()
        } else {
            res.status(403).json("Bạn không được cấp quyền admin")
        }
    },
    verifyTokenAndAdmin: (req, res, next) => {
        middlewreController.verifyToken(req, res, () => {
            middlewreController.verifyAdmin(req, res, next)
        })
    },
    
}

module.exports = middlewreController
