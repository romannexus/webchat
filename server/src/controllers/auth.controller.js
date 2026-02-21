import userService from "../services/user.service.js";

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, repeatedPassword } = req.body;
        if (!email || !username || !password || !repeatedPassword)
            return res.status(400).json({
                error: "Email, password, and password confirmation are required.",
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

export default { registerUser };
