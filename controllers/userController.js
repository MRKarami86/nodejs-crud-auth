const User = require('../models/User');
const bcrypt = require('bcrypt');
const {createToken} = require('../utils/jwt');

exports.register = async(req, res)=>{
    const {username , email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    }) ;

    res.json({message : 'User created'});
};

exports.login = async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message: 'Invalid login - user'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).json({message:'Invalid Login - isMatch'});

    const token = createToken(user._id);
    res.json({token});
};

exports.getProfile = async (req, res)=>{
    const user = await User.findById(req.userId).select('_password');
    res.json(user);
}

exports.updateProfile = async (req, res)=>{
    const {username, eamil, password} = req.body;

    const updateData = {};

    if(username) updateData.username = username;
    if(eamil) updateData.eamil = eamil;

    if(password){
        const bcrypt = require('bcrypt');
        updateData.password = await bcrypt.hash(password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
        req.userId,
        updateData,
        {new: true, runValidators: true}
    ).select('-password');

    res.json(updateUser);
};

exports.deleteProfile = async (req, res) =>{
    await User.findByIdAndDelete(req.userId);
    res.json({ message: 'User deleted successfully' });
}