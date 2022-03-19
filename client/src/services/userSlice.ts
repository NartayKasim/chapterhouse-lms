import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Course {
   course_id: number;
   user_id: number;
   course_title: string;
   course_description: string;
}

interface User {
   user_id: number | null;
   courses: Course[];
}

const initialState: User = {
   user_id: null,
   courses: [],
};

export const createCourse = createAsyncThunk(
   "user/createCourse",
   async (courseName: string) => {
      const response = await axios.post("/api/course/create", { courseName });
      return response.data;
   }
);

export const editCourseTitle = createAsyncThunk(
   "user/editCourseTitle",
   async (courseObj: {
      course_id: number;
      course_title: string;
      user_id: number;
   }) => {
      const response = await axios.put("/api/course/rename", {
         course_id: courseObj.course_id,
         course_title: courseObj.course_title,
         user_id: courseObj.user_id,
      });
      return response.data;
   }
);

export const addCourseDescription = createAsyncThunk(
   "user/addCourseDescription",
   async (course: {
      course_id: number;
      course_description: string;
      user_id: number;
   }) => {
      const response = await axios.post("/api/course/description", { course });
      return response.data;
   }
);

export const deleteCourse = createAsyncThunk(
   "user/deleteCourse",
   async (courseObj: { course_id: number; user_id: number }) => {
      await axios.post("/api/course/delete", { courseObj });
      return courseObj.course_id;
   }
);

export const logOutUser = createAsyncThunk("user/logOut", async () => {
   await axios.delete("/api/user/logout");
   return;
});

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      acquireUser(state, action) {
         state.user_id = action.payload.user_id;
         state.courses = action.payload.courses;
         return state;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createCourse.fulfilled, (state, action) => {
            state.courses.push(action.payload);
         })
         .addCase(addCourseDescription.fulfilled, (state, action) => {
            const courses = state.courses.filter(
               (course) => course.course_id !== action.payload.course_id
            );
            if (courses) {
               state.courses = [...courses, action.payload];
            }
         })
         .addCase(logOutUser.fulfilled, () => {
            return initialState;
         })
         .addCase(editCourseTitle.fulfilled, (state, action) => {
            const newState = state.courses.filter(
               (course) => course.course_id !== action.payload.course_id
            );
            newState.unshift(action.payload);
            state.courses = newState;
            return state;
         })
         .addCase(deleteCourse.fulfilled, (state, action) => {
            const newState = state.courses.filter(
               (course) => course.course_id !== action.payload
            );
            state.courses = newState;
            return state;
         });
   },
});

export default userSlice.reducer;
export const { acquireUser } = userSlice.actions;
