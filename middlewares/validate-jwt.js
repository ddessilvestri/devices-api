const jwt=require('jsonwebtoken');

const validateJWT = (req,res,next) =>{

    try {
        const token = req.header('x-token');
        
        if(!token){
            return res.status(401).json({
                ok:false,
                msg:'No token in the petition'
            })
        }

        const {uid} = jwt.verify(token,process.env.JWT_KEY);
        req.uid = uid;
        next();


    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Token not valid'
        })
    }
}

module.exports = {
    validateJWT
}