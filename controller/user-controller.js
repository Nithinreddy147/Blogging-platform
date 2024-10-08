import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

import User from '../model/user.js'
import Token from '../model/token.js'

dotenv.config();

export const signupUser = async (request, response) => {
    try {

        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        // const user = request.body;
        const user = {username: request.body.username, name: request.body.name, password: hashedPassword};

        //validating the input with the schema we designed
        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({msg: 'Signup successfull'});

    } catch (error) {
        return response.status(500).json({msg: 'Error while signup the user'});
    }
}


export const loginUser = async (request,response) => {
    let user = await User.findOne({username: request.body.username})
    if(!user) {
        return response.status(400).json({ msg: 'Username deosnot exist'})
    } 
    try {
        let isMatch = await bcrypt.compare(request.body.password, user.password);
        if (isMatch) {
            // In terminal to generate random token: node -> require('crypto').randomBytes(64).toString('hex')
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY)

            const newToken = new Token({token: refreshToken})
            await newToken.save();

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name : user.name, username: user.username})
        }
        else {
            return response.status(400).json({ msg: 'Invalid password' });
        }
    } catch (error) {
        return response.status(500).json({msg: 'Error while login user'})
    }
}

