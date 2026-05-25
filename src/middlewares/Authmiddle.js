// import { response } from "express";
// import jwt from "jsonwebtoken";
// import Users from "../models/UsersSchema.js";

// const userCheck = async (req, res, next) => {
//   try {
//     const token =
//       req.headers?.authorization?.split(" ")[1] || req.cookies.token;
//     if (!token) {
//       res.json({
//         status: false,
//         message: "token not found",
//       });
//     }
   
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded) {
//        console.log('decode.id---->', decoded.id);
//       const findUser = await Users.findById(decoded.id).select("-password");
//       console.log("finduser--->", findUser);
//       if (findUser == null) {
//         return res.json({
//           status: false,
//           message: "user not valid",
//         });
//       }

    

//       req.user = findUser;
//       next();
//     } else {
//      return res.json({
//         status: false,
//         message: "invalid token",
//       });
//     }
//   } catch (error) {
//     res.json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// export { userCheck };
import { response } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/UsersSchema.js";

const userCheck = async (req, res, next) => {
  try {
    // Try to get token from multiple sources
    let token = null;
    
    // 1. Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token from Authorization header');
    }
    
    // 2. Check cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log('Token from cookie');
    }
    
    if (!token) {
      return res.json({
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
    console.log("Auth middleware error:", error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

export { userCheck };