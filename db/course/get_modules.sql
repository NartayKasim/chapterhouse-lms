SELECT courses.*, modules.module_id, modules.module_title, modules.module_description, modules.module_order, modules.module_content FROM courses
JOIN modules 
ON modules.course_id = courses.course_id
WHERE courses.course_id = $1;