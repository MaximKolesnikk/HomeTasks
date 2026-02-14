import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllExhibits } from '../../api/exhibitActions';
import { addComment } from '../../api/commentActions';

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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';  
  error?: string | null;                                
}

const initialState: PostState = {
  posts: [],
  totalPages: 1,
  currentPage: 1,
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await getAllExhibits(page);
      return { data: response.data, lastPage: response.lastPage };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка загрузки постов');
    }
  }
);
export const addCommentThunk = createAsyncThunk(
  'posts/addComment',
  async (
    { exhibitId, text }: { exhibitId: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const newComment = await addComment(exhibitId, text);
      return {
        postId: Number(exhibitId),   
        comment: newComment,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Не удалось добавить комментарий');
    }
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
    builder
      
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.data;
        state.totalPages = action.payload.lastPage;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

     
      .addCase(addCommentThunk.pending, (state) => {
      
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const postIndex = state.posts.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].comments = [
            ...state.posts[postIndex].comments,
            comment,
          ];
        }
      })
      .addCase(addCommentThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addPost, setPage } = postSlice.actions;

export default postSlice.reducer;