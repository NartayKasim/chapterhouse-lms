import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface NewModule {
   course_id: number;
   module_title: string;
   module_order: number;
   module_id?: number;
}

export interface Module {
   course_id: number;
   user_id: number;
   course_title: string;
   course_description: string;
   module_id: number;
   module_order: number;
   module_title: string;
   module_description: string;
   module_content: string;
}

interface CourseModules {
   modules: Module[] | null;
}

export const getModules = createAsyncThunk(
   "modules/getModules",
   async (course_id: number) => {
      const response = await axios.get(`/api/module/${course_id}`);
      return response.data.sort(
         (a: Module, b: Module) => a.module_order - b.module_order
      );
   }
);

export const createModule = createAsyncThunk(
   "modules/createModule",
   async (moduleObj: NewModule) => {
      const { course_id, module_title, module_order } = moduleObj;
      const response = await axios.post("/api/module/create", {
         course_id,
         module_title,
         module_order,
      });
      return response.data;
   }
);

export const editModuleTitle = createAsyncThunk(
   "modules/editModuleTitle",
   async (moduleObj: {
      module_id: number;
      module_title: string;
      user_id: number;
   }) => {
      const response = await axios.put("/api/module/rename", {
         module_id: moduleObj.module_id,
         module_title: moduleObj.module_title,
         user_id: moduleObj.user_id,
      });
      return response.data;
   }
);

export const addModuleDescription = createAsyncThunk(
   "modules/addModuleDescription",
   async (moduleObj: {
      module_id: number;
      module_description: string;
      user_id: number;
   }) => {
      const response = await axios.post("/api/module/description", {
         ...moduleObj,
      });
      return response.data;
   }
);

export const addModuleContent = createAsyncThunk(
   "modules/addModuleContent",
   async (moduleObj: {
      module_id: number;
      module_content: string;
      user_id: number;
   }) => {
      const response = await axios.post("/api/module/content", {
         ...moduleObj,
      });
      return response.data;
   }
);

export const moveModule = createAsyncThunk(
   "modules/moveModule",
   async (moduleArr: NewModule[]) => {
      await axios.put("/api/module/sort", { modules: moduleArr });
      return moduleArr[0].course_id;
   }
);

export const deleteModule = createAsyncThunk(
   "modules/deleteModule",
   async (module_id: number) => {
      await axios.post("/api/module/delete", { module_id });
      return module_id;
   }
);

const initialState: CourseModules = {
   modules: null,
};

export const moduleSlice = createSlice({
   name: "modules",
   initialState,
   reducers: {
      clearModules() {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createModule.fulfilled, (state, action) => {
            if (Array.isArray(state.modules)) {
               state.modules.push(action.payload);
               return state;
            } else return state;
         })
         .addCase(getModules.fulfilled, (state, action) => {
            state.modules = [];
            state.modules = [...action.payload];
            return state;
         })
         .addCase(editModuleTitle.fulfilled, (state, action) => {
            if (state.modules) {
               const filteredModules = state.modules?.filter(
                  (module) => module.module_id !== action.payload.module_id
               );
               state.modules = [action.payload, ...filteredModules];
            } else {
               state.modules = [action.payload];
            }
            return state;
         })
         .addCase(addModuleDescription.fulfilled, (state, action) => {
            if (state.modules) {
               for (const module of state.modules) {
                  if (module.module_id === action.payload.module_id) {
                     module.module_description =
                        action.payload.module_description;
                  }
               }
            }
            return state;
         })
         .addCase(addModuleContent.fulfilled, (state, action) => {
            if (state.modules) {
               for (const module of state.modules) {
                  if (module.module_id === action.payload.module_id) {
                     module.module_content = action.payload.module_content;
                  }
               }
            }
            return state;
         })
         .addCase(deleteModule.fulfilled, (state, action) => {
            if (state.modules) {
               const newState = state.modules.filter(
                  (module) => module.module_id !== action.payload
               );
               state.modules = newState;
               return state;
            }
         })
         .addCase(moveModule.fulfilled, () => {
            return;
         });
   },
});

export default moduleSlice.reducer;
export const { clearModules } = moduleSlice.actions;
