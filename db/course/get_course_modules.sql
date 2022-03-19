SELECT modules.* from modules
JOIN courses
ON courses.course_id = modules.course_id
WHERE courses.course_id = $1;