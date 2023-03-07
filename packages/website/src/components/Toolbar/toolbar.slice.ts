import { RootState } from '@/src/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface EditorState {
  canvas: {
    width: number;
    height: number;
  };
}

// Define the initial state using that type
const initialState: EditorState = {
  canvas: {
    width: 375,
    height: 667,
  },
};

export const ToolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    setCanvasWidth: (state, action: PayloadAction<number>) => {
      state.canvas.width = action.payload;
    },
    setCanvasHeight: (state, action: PayloadAction<number>) => {
      state.canvas.height = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCanvasWidth, setCanvasHeight } = ToolbarSlice.actions;

export default ToolbarSlice.reducer;
