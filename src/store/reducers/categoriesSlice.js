import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestAPI from "../../API/requests";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data: categoriesInfo } = await RequestAPI.fetchCategories();
      dispatch(setCategories(categoriesInfo));

      const { data: tagsInfo } = await RequestAPI.fetchTags();
      dispatch(setTags(tagsInfo));
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

const initialState = {
  categories: [],
  tags: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setTags(state, action) {
      state.tags = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const { setCategories, setTags } = categoriesSlice.actions;
