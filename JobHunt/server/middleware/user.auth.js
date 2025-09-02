import jwt from 'jsonwebtoken'
const isAuthenticated = (req , res , next) => {
   
    try{

        // getting the token
        const token = req.cookies.token;

        if(!token)
        {
            return res.status(401).json({
                message : "User Not Authenticated Well",
                success : false
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        if(!decode)
        {
            return res.status(401).json({
                message : "Invalid Tokens",
                success : false
            })
        }
      // Attach decoded info to request for use in next middlewares or route handlers
      
      req.id = decode.userId;
      next(); // Proceed to the next middleware/route handler

    }catch(error){
       return res.status(500).json({
      message: "Authentication failed",
      success: false
    });
      console.log("Error while updating the profile" , error);
    }
}

export default isAuthenticated;