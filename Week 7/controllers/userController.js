const User=require('../models/user');


exports.getUserData = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.session.user.email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Rendering and passing data to view->user
        res.render('user/user', { user });
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).send("Error fetching user data");
    }
};