const userController = require("./controllers/userController");
const courseController = require("./controllers/courseController");

const express = require("express");
const massive = require("massive");
const cookieSession = require("cookie-session");
const path = require("path");

require("dotenv").config({ path: "./.env" });
const { SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());
app.use(express.static(path.join("public")));

massive({
   connectionString: CONNECTION_STRING,
   ssl: {
      rejectUnauthorized: false,
   },
})
   .then((db) => {
      app.set("db", db);
      console.log("database connected");
   })
   .catch((err) => console.log(err));

app.use(
   cookieSession({
      name: "session",
      keys: ["key1", "key2"],
      maxAge: 24 * 60 * 60 * 1000,
   })
);

if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

app.use((req, res, next) => {
   res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.post("/api/user/register", userController.register);
app.post("/api/user/login", userController.login);
app.delete("/api/user/logout", userController.logout);

app.post("/api/course/create", courseController.createCourse);
app.put("/api/course/rename", courseController.editCourseTitle);
app.post("/api/course/description", courseController.addCourseDescription);
app.post("/api/course/delete", courseController.deleteCourse);
app.get("/api/module/:course_id", courseController.getModules);
app.post("/api/module/create", courseController.createModule);
app.put("/api/module/rename", courseController.editModuleTitle);
app.post("/api/module/description", courseController.addModuleDescription);
app.post("/api/module/content", courseController.addModuleContent);
app.post("/api/module/delete", courseController.deleteModule);
app.put("/api/module/sort", courseController.sortModules);

app.listen(SERVER_PORT, () => console.log("Server Port: " + SERVER_PORT));
