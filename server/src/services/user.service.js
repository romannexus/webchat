import Users from "../models/user.model.js";
import bcrypt from "bcrypt";

const createUser = async (username, email, password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await Users.create({
            username,
            email,
            password: hashedPassword,
        });

        return user;
    } catch (error) {
        throw error;
    }
};

const findAll = async () => {
    try {
        const users = await Users.find();

        return users;
    } catch (error) {
        throw error;
    }
};

const findOne = async (username) => {
    try {
        const user = await Users.findOne({ username });

        return user;
    } catch (error) {
        throw error;
    }
};

const checkPassword = async (user, password) => {
    try {
        const isMatch = await bcrypt.compare(password, user.password);

        return isMatch;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (username) => {
    try {
        const deleteUser = await Users.deleteOne({ name: username });

        if (!deleteUser) {
            console.log("error");
        }

        return deleteUser;
    } catch (error) {
        throw error;
    }
};

export default {
    createUser,
    findAll,
    findOne,
    checkPassword,
    deleteUser,
};
