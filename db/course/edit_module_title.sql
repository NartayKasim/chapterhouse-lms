UPDATE modules SET module_title = $2 WHERE module_id = $1 RETURNING *;