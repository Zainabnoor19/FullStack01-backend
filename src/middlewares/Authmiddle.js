import { response } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/UsersSchema.js";

const userCheck = async (req, res, next) => {
  try {
    const token =
      req.headers?.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
      res.json({
        status: false,
        message: "token not found",
      });
    }
   
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
       console.log('decode.id---->', decoded.id);
      const findUser = await Users.findById(decoded.id).select("-password");
      console.log("finduser--->", findUser);
      if (findUser == null) {
        return res.json({
          status: false,
          message: "user not valid",
        });
      }

    

      req.user = findUser;
      next();
    } else {
     return res.json({
        status: false,
        message: "invalid token",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export { userCheck };
