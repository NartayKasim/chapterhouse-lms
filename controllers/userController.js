const bcrypt = require("bcryptjs");

module.exports = {
   register: async (req, res) => {
      let { email, password } = req.body;
      const db = req.app.get("db");

      const emailValidation = async (email) => {
         const parseEmail = email.split("");
         const hasAtSymbol = parseEmail.includes("@");
         const hasDotSymbol = parseEmail.includes(".");
         const isMinLength = parseEmail.length >= 6;
         const isAlreadyRegistered = await db.user.get_by_email([email]);

         if (!hasAtSymbol || !hasDotSymbol || !isMinLength) {
            return "Please enter a valid email address.";
         } else if (isAlreadyRegistered[0]) {
            return "An account with that email already exists";
         }
         return "";
      };

      const passwordValidation = (password) => {
         if (password.length < 5) {
            return "Please enter a password which is at least 5 characters long.";
         }
         return "";
      };

      const checkEmail = await emailValidation(email);
      const checkPassword = await passwordValidation(password);

      if (checkEmail.length !== 0) {
         return res.status(501).send(checkEmail);
      }

      if (checkPassword.length !== 0) {
         return res.status(501).send(checkPassword);
      }

      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);

      const createUser = await db.user.register_user([email, password]);

      if (!createUser[0]) {
         return res.status(501).send("Unable to register user.");
      }
      user = createUser[0];
      req.session.user = user.user_id;
      res.status(200).send({ user_id: user.user_id, courses: null });
   },

   login: async (req, res) => {
      const { email, password } = req.body;
      const db = req.app.get("db");

      if (!email || !password) {
         return res
            .status(401)
            .send("Please enter a valid email and password.");
      }

      const retrieveUser = await db.user.get_by_email([email]);
      let user = retrieveUser[0];

      if (!user) {
         return res
            .status(401)
            .send("Entered email or password did not match our records.");
      }
      const isAuthenticated = bcrypt.compareSync(password, user.user_password);
      if (!isAuthenticated) {
         return res
            .status(401)
            .send("Entered email or password did not match our records.");
      }
      delete user.user_password;
      const courses = await db.course.get_courses([user.user_id]);
      req.session.user = { user_id: user.user_id, courses: courses };
      res.status(200).send(req.session.user);
   },

   logout: (req, res) => {
      req.session = null;
      res.sendStatus(200);
   },
};
