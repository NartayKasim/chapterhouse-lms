const verifyAuthor = (course_id, courses) => {
   const course = courses.filter((course) => course.course_id === course_id);
   if (course[0]) {
      return true;
   }
   return false;
};

module.exports = {
   createCourse: async (req, res) => {
      const { courseName } = req.body;
      const user_id = req.session.user.user_id;
      const db = req.app.get("db");

      const response = await db.course.create_course([user_id, courseName, ""]);
      const course = response[0];

      if (course) {
         res.status(200).send(course);
      } else {
         res.status(501).send("unable to create course");
      }
   },

   editCourseTitle: async (req, res) => {
      const { course_id, course_title, user_id } = req.body;
      const session_id = req.session.user.user_id;
      if (session_id === user_id) {
         const db = req.app.get("db");
         const response = await db.course.edit_course_title([
            course_id,
            course_title,
         ]);
         res.status(200).send(response[0]);
      } else {
         res.sendStatus(403);
      }
   },

   addCourseDescription: async (req, res) => {
      const { course } = req.body;
      const db = req.app.get("db");
      const session_id = req.session.user.user_id;
      if (session_id === course.user_id) {
         const response = await db.course.add_course_description([
            course.course_id,
            course.course_description,
         ]);
         const updatedCourse = response[0];
         res.status(200).send(updatedCourse);
      } else {
         res.sendStatus(403);
      }
   },

   deleteCourse: async (req, res) => {
      const { courseObj } = req.body;
      const session_id = req.session.user.user_id;
      if (courseObj.user_id === session_id) {
         const db = req.app.get("db");
         await db.course.delete_course([courseObj.course_id]);
         res.sendStatus(200);
      } else {
         res.sendStatus(403);
      }
   },

   getModules: async (req, res) => {
      const { course_id } = req.params;
      const db = req.app.get("db");
      const response = await db.course.get_modules([course_id]);
      res.status(200).send(response);
   },

   createModule: async (req, res) => {
      const { course_id, module_title, module_order } = req.body;
      const userCourses = req.session.user.courses;
      const isAuthor = verifyAuthor(course_id, userCourses);
      if (isAuthor) {
         const db = req.app.get("db");
         const response = await db.course.create_module([
            course_id,
            module_title,
            module_order,
         ]);
         return res.status(200).send(response[0]);
      } else {
         res.sendStatus(401);
      }
   },

   editModuleTitle: async (req, res) => {
      const { module_id, module_title, user_id } = req.body;
      const session_id = req.session.user.user_id;
      if (session_id === user_id) {
         const db = req.app.get("db");
         const response = await db.course.edit_module_title([
            module_id,
            module_title,
         ]);
         res.status(200).send(response[0]);
      } else {
         res.sendStatus(403);
      }
   },

   addModuleDescription: async (req, res) => {
      const { module_id, module_description, user_id } = req.body;
      const session_id = req.session.user.user_id;
      if (session_id === user_id) {
         const db = req.app.get("db");
         const response = await db.course.add_module_description([
            module_id,
            module_description,
         ]);
         res.status(200).send(response[0]);
      } else {
         res.sendStatus(403);
      }
   },

   addModuleContent: async (req, res) => {
      const { module_id, module_content, user_id } = req.body;
      const session_id = req.session.user.user_id;
      if (session_id === user_id) {
         const db = req.app.get("db");
         const response = await db.course.add_module_content([
            module_id,
            module_content,
         ]);
         res.status(200).send(response[0]);
      } else {
         res.sendStatus(403);
      }
   },

   deleteModule: async (req, res) => {
      const { module_id } = req.body;
      const db = req.app.get("db");
      await db.course.delete_module([module_id]);
      res.sendStatus(200);
   },

   sortModules: async (req, res) => {
      const { modules } = req.body;
      const db = req.app.get("db");
      await db.course.update_module_order([
         modules[0].module_id,
         modules[0].module_order,
      ]);
      await db.course.update_module_order([
         modules[1].module_id,
         modules[1].module_order,
      ]);
      res.sendStatus(200);
   },
};
