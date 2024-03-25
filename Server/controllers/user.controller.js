const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {generateToken} = require("../utils/jwt");

const register = async (req, res)=>{
    try {
        const body = req.body;
        const hash = await bcrypt.hash(body.password, 10);
        const newUser = new User({...body, password: hash,});
        await newUser.save();
        const token = generateToken({id: newUser._id, email: newUser.email, role:newUser.role})
        res.send({message: "User registered!", user: newUser, token: token})
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
}

const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const checkUser = await User.findOne({email});
        if(checkUser){
             const isMatch = await bcrypt.compare(password, checkUser.password);
             if(isMatch){
                const token = generateToken({id: checkUser._id, email: checkUser.email, role:checkUser.role})
                return res.send({user: checkUser, token});
            } 
        };
        res.status(401).send("Email or password are incorrect");
    } catch (error) {
        console.log({error});
        res.status(400).send("Error");
    }
}

const showUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.send({ user_name: user.user_name ,
                 birth_date: user.birth_date ,
                 profileImg: user.profileImg,
                 email: user.email,
                 id:user._id
                });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

const getUsers = async (req, res) => {
    const role = req.query.role;
    try {
        let users;
        let projection = { user_name: 1, email: 1, bio: 1, gender: 1, _id: 0 }; 
        
        if (role === 'therapist') {
            users = await User.find({ role: 'therapist' }, projection);
        } else if(role === 'user') {
            users = await User.find({role: 'user'}, projection);
        } else{
            users = await User.find({}, projection);
        }
        
        if (!users || users.length === 0) {
            return res.status(404).send({ message: 'Users not found' });
        }

        return res.send({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res)=>{
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        return res.send("Succesfully deleted user");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const updateUser = async(req, res) => {
    const body = req.body;
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, body, {new: true});
        if(user) return res.send(user);
        return res.send("User is not found");
    } catch (error) {
        res.status(400).send("Error");
    }
};

module.exports = { register , login, deleteUser, updateUser, getUsers, showUser}