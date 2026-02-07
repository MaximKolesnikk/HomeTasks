import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllExhibits } from '../../api/exhibitActions';

interface Post {
  id: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  user: { id: number; username: string };
  comments: any[];
}

interface PostState {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

const initialState: PostState = {
  posts: [],
  totalPages: 1,
  currentPage: 1,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number = 1) => {
    const response = await getAllExhibits(page);
    return { data: response.data, lastPage: response.lastPage };
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.posts = [action.payload, ...state.posts];
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload.data;
      state.totalPages = action.payload.lastPage;
    });
  },
});

export const { addPost, setPage } = postSlice.actions;
export default postSlice.reducer;