import Users from "../models/UsersSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!email && !password && !name) {
      return res.json({
        status: false,
        message: "required feilds",
      });
    }
    
    const hashPass = await bcrypt.hash(req.body.password, 10);
    console.log(hashPass);
    const data1 = { name, email, password: hashPass,role:req.body.role };
    const user = new Users(data1);
    const data = await user.save();
    if(data){
      console.log('yeh line chali');
      
      const token = jwt.sign(
      { id: data._id, email: data.email,role:data.role},
      process.env.JWT_SECRET,
      function (err, token) {
        console.log('error',err);
        console.log('newtoken--->',token);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
        });
        console.log("isline tak aya");

      return  res.json({
      status: true,
      message: "user created successfully",
      user: data,
      token:token
    });
      },
    );
     
    }
   

   
  } catch (error) {
    console.log("error in creating user-->", error);

    res.json({
      status: false,
      message: error.message,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    console.log('req.user--->',req.user);
    
    // all data
    const user = await Users.find();
    // const user = await Users.find({name:"sana"}) // specific data
    res.json({
      status: true,
      message: "user fetched successfully",
      data: user,
    });
    console.log(user);
  } catch (error) {
    console.log("error in fetching user-->", error.message);

    res.json({
      status: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    // all data
    const { id } = req.params;
    const user = await Users.findById(id);
    if (user == null) {
      console.log("chk raha");

      return res.json({
        status: false,
        message: "connot find user",
      });
    }

    res.json({
      status: true,
      message: "user fetched successfully",
      data: user,
    });
    console.log(user);
  } catch (error) {
    console.log("error in fetching user-->", error.message);

    res.json({
      status: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    // all data
    const { id } = req.params;
    console.log("req.body---", req.body);
    //  token from frontend
    const token = req.headers?.authorization.split(" ")[1];
    //token validation
    if (!token) {
      return res.json({
        status: false,
        message: "token not provided",
        statuscode: 404,
      });
    }

    // token verifitvatiopbdfegjuts
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedddd----> ", decoded);

    // if token match sucess then update user
    if (decoded.id == id) {
      const updatedUser = await Users.findByIdAndUpdate(id, req.body);
      console.log("data after updating-----> ", updatedUser);
      return res.json({
        status: true,
        message: "user updated succesfully",
        updatedData: updatedUser,
      });
    } else {
      // if token is not valid response return
      return res.json({
        status: false,
        message: "invalid token",
      });
    }

    console.log("nhi gya tok", decoded.id == id);
  } catch (error) {
    console.log("error in updating user-->", error.message);

    res.json({
      status: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    // all data
    const { id } = req.params;

    const user = await Users.findByIdAndDelete(id);

    console.log("data after delete-----> ", user);

    res.json({
      status: true,
      message: "user deleted successfully",
    });
    console.log(user);
  } catch (error) {
    console.log("error in deleting user-->", error.message);

    res.json({
      status: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        status: false,
        message: "all fields are required",
      });
    }
    const user = await Users.findOne({ email: email });
    if (user == null) {
      return res.json({
        status: false,
        message: "cannot find user",
      });
    }
    
    const decoded =await bcrypt.compare(password,user.password)
     if(decoded){
   const token = jwt.sign(
      { id: user._id, email: user.email,role:user.role},
      process.env.JWT_SECRET,
      function (err, token) {
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
        });
        console.log("isline tak aya");

       return res.json({
          status: true,
          message: "user login successfully",
          user: user,
          token: token,
        });
      },
    );
     }else{
      res.status(404).json({
          status: false,
          message: 'invalid credentials',
       
        });
     }
     
     
  
    console.log("JWT SECRET-->", process.env.JWT_SECRET);
    console.log("isline takkk aya");
  

    // console.log("logindata---->", user);
  } catch (error) {
    console.log("error in login user-->", error.message);

    res.json({
      status: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    console.log("yeh line bhi chali hai");

    res.json({
      status: true,
      message: "user logout successfully",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};


const UserProfile =async (req,res)=>{
  console.log(req.user);
  try {
    if(req.user){
   return res.status(200).json({
    status:true,
    user:req.user
   })
    }
  } catch (error) {
    res.status(200).json({
    status:true,
    message :error.message
   })
  }
    
}

export {
  addUser,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  logout,
  UserProfile
};
