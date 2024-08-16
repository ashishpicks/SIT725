const User=require('../models/user');

// Controller to get user info json from
/* exports.getUserData = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.session.user.email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user); // Send user details as JSON
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).send("Error fetching user data");
    }
}; */
// Controller to serve user page with EJS
exports.getUserData = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.session.user.email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Render the EJS template and pass user data
        res.render('user/user', { user });
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).send("Error fetching user data");
    }
};