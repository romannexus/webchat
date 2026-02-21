import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const createUser = async (username, password, email) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export default {
    createUser,
};
