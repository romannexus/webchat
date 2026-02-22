import userService from "../services/user.service.js";

export class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    registerUser = async (req, res, next) => {
        try {
            const { username, email, password, repeatedPassword } = req.body;
            if (!email || !username || !password || !repeatedPassword)
                return res.status(400).json({
                    error: "Username, email, password, and password confirmation are required.",
                });
            if (password !== repeatedPassword) {
                return res.status(400).json({
                    error: "Passwords do not match.",
                });
            }
            // password strength
            if (password.length < 8) {
                return res.status(400).json({
                    error: "Password must be at least 8 characters long.",
                });
            }

            // username check
            if (username.length < 3 || username.length > 20) {
                return res.status(400).json({
                    error: "Username must be between 3 and 20 characters.",
                });
            }

            const usernameRegex = /^[a-zA+-Z0-9_]+$/;
            if (!usernameRegex.test(username)) {
                return res.status(400).json({
                    error: "Username can only contain letters, numbers, and underscores.",
                });
            }

            const user = await userService.createUser(
                username,
                email,
                password,
            );

            res.status(201).json({
                message: "User was successfully created.",
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } catch (error) {
            if (
                error.code === "ER_DUP_ENTRY" ||
                error.message.includes("duplicate")
            ) {
                return res.status(409).json({
                    error: "Email already exists.",
                });
            }

            // Pass to Express error handler
            next(error);
        }
    };
}

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, repeatedPassword } = req.body;
        if (!email || !username || !password || !repeatedPassword)
            return res.status(400).json({
                error: "Username, email, password, and password confirmation are required.",
            });
        if (password !== repeatedPassword) {
            return res.status(400).json({
                error: "Passwords do not match.",
            });
        }
        // password strength
        if (password.length < 8) {
            return res.status(400).json({
                error: "Password must be at least 8 characters long.",
            });
        }

        // username check
        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({
                error: "Username must be between 3 and 20 characters.",
            });
        }

        const usernameRegex = /^[a-zA+-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                error: "Username can only contain letters, numbers, and underscores.",
            });
        }

        const user = await userService.createUser(username, email, password);

        res.status(201).json({
            message: "User was successfully created.",
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        if (
            error.code === "ER_DUP_ENTRY" ||
            error.message.includes("duplicate")
        ) {
            return res.status(409).json({
                error: "Email already exists.",
            });
        }

        // Pass to Express error handler
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({
                error: "Username and password are required.",
            });

        const users = await userService.findAll();
        console.log(users);

        const user = await userService.findOne(username);
        console.log(user);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!user.password) {
            return res
                .status(500)
                .json({ message: "User has no password stored" });
        }

        const isMatch = await userService.checkPassword(user, password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
        };

        console.log(req.session.user);

        res.json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (req, res) => {
    try {
        const { user } = req.body;

        const deletedUser = await userService.deleteUser(user);

        return res.status(200).json({ message: "user deleted", deletedUser });
    } catch (error) {
        throw error;
    }
};

const findAll = async (req, res) => {
    try {
        const allUsers = await userService.findAll();
        console.log(allUsers);

        if (!allUsers) {
            console.error("No users were found.");
        }

        return res.status(200).json({ allUsers });
    } catch (error) {
        throw error;
    }
};

const isActive = async (req, res) => {
    try {
        console.log(req.session);
        if (!req.session)
            return res.status(401).json({ message: "Unauthorized." });

        res.json({ message: "Profile accessed", user: req.session });
    } catch (error) {
        throw error;
    }
};

const logOut = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Logout failed" });
            }
            res.json({ message: "Logout successful" });
        });
    } catch (error) {}
};

export default { registerUser, login, deleteUser, findAll, isActive, logOut };
