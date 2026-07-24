const User = require('../model/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker')
const fs = require('fs');
const Support = require('../model/supportModel');
const registerUser = async (req, res) => {


    const profileImage = req.file ? req.file.filename : null;
    const { name, email, password, isAdmin, phoneNumber, fromOAuth = false, profileImageUrl } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    const userCount = await User.countDocuments();

    const fakePassword = await bcrypt.hash(password, 10);
    const hashedPassword = await bcrypt.hash(password, 10);
    if (fromOAuth) {
        const user = new User({ name, email, password: fakePassword, isAdmin: userCount === 0 ? true : false, profileImage: profileImageUrl });
        let token = generateToken(user._id, res);
        
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            user,
            token
        });
        return
    } else {
        const user = new User({ name, email, password: hashedPassword, isAdmin: userCount === 0 ? true : false, profileImage: profileImage, phoneNumber });
        let token = generateToken(user._id, res);
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            user,
            token
        });
    }
};
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};


const loginUser = async (req, res) => {
    const { email, password, fromOAuth = false } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    if (fromOAuth) {
        const token = generateToken(user._id, res);
        res.json({
            message: "User logged in successfully",
            user,
            token
        });
        return
    }
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id, res);

        res.json({
            message: "User logged in successfully",
            user,
            token
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
const getUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(todoId);
    if (user) {
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;

    const updatedProfileImage = req.file ? req.file.filename : null;
    const user = await User.findById(userId);
    if (updatedProfileImage) {
        if (user && user.profileImage) {
            fs.unlink(`uploads/userProfile/${user.profileImage}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });

        }
    }

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        user.profileImage = updatedProfileImage || user.profileImage;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.json({
            message: 'User updated successfully',
            updatedUser
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const logoutUser = async (req, res) => {

    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};


const userAuthentication = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const token = generateToken(user._id, res);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User is authenticated', user: user, token: token });
    } catch (error) {
    }
};

// Admin Controllers
const allUsers = async (req, res) => {
    const users = await User.find({}).select('-password');
    const adminUsers = users.filter(user => user.isAdmin === true);
    res.status(200).json({
        message: "All users",
        adminUsers: adminUsers,
        users: users
    });
}
const updateUserToAdmin = async (req, res) => {
    const { userId } = req.params
    const { newStatus } = req.body;
    if (newStatus !== 'admin' && newStatus !== 'user') {
        return res.status(400).json({ message: "Invalid 'newStatus' value. It should be either 'admin' or 'user'." });
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user status
        if (newStatus === 'admin') {
            user.isAdmin = true;
        } else if (newStatus === 'user') {
            user.isAdmin = false;
        }

        // Save the updated user
        const updatedUser = await user.save();

        // Send a success response
        return res.json({
            message: 'User updated successfully',
            updatedUser: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while updating the user' });
    }
};

const deleteUserByAdmin = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', user });
        }
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
};

const contactSupport = async (req, res) => {
    console.log('Contact Support called');
    try{

        const userId = req.user._id ;

        const { message } = req.body;
        if (!message || message.trim() === '') {
            return res.status(400).json({ message: 'Message cannot be empty' });
        }
        const user = await User.findById(userId);
        const support = new Support({
            user: userId,
            message: message,
            status: 'open',
        });
        await support.save();
        return res.status(200).json({ message: 'Message sent successfully' });
    }catch(error){
        console.error('Error in contactSupport:', error);
        return res.status(500).json({ message: 'An error occurred while sending the message' });
    }
}

// Generate random users for testing purposes //
const generateRandomUsers = async (req, res) => {
    try {
        const numberOfUsers = req.query.count || 10; // Default to 10 users if count not specified
        const randomUsers = [];

        for (let i = 0; i < numberOfUsers; i++) {
            const user = new User({
                name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                email: faker.internet.email(),
                password: await bcrypt.hash('password123', 10),
                isAdmin: faker.datatype.boolean({ probability: 0.2 }),
                profileImage: faker.image.avatar(),
                phoneNumber: faker.phone.number(),
                createdAt: new Date(),
                updatedAt: new Date()
            });

            randomUsers.push(user);
        }

        // Save all users to database
        await User.insertMany(randomUsers);

        res.status(201).json({
            message: `Successfully created ${numberOfUsers} random users`,
            users: randomUsers
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error generating random users',
            error: error.message
        });
    }
};


module.exports = { registerUser, getUsers, getUserById, deleteUser, updateUser, loginUser, logoutUser, userAuthentication, allUsers, generateRandomUsers, updateUserToAdmin, deleteUserByAdmin, contactSupport };