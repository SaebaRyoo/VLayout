import { RootState } from '@/src/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Schema } from 'r-material';

// Define a type for the slice state
interface EditorState {
  curSchemaId: string;
  schemaList: Schema[];
}

// Define the initial state using that type
const initialState: EditorState = {
  curSchemaId: '',
  schemaList: [],
};

export const EditorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCurSchemaId: (state, action: PayloadAction<string>) => {
      state.curSchemaId = action.payload;
    },
    addSchemas: (state, action: PayloadAction<Schema>) => {
      state.schemaList.push(action.payload);
    },
    updateSchemaPos: (
      state,
      action: PayloadAction<{ x: number; y: number; id: string }>
    ) => {
      const index = state.schemaList.findIndex(
        (schema) => schema.id === action.payload.id
      );

      const schema = state.schemaList[index];
      schema.style.left = action.payload.x;
      schema.style.top = action.payload.y;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSchemas, setCurSchemaId, updateSchemaPos } =
  EditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSchemaList = (state: RootState) => state.editor.schemaList;

// export const selectCurSchema = (schemaList: Schema[], id: string) =>
//   schemaList.find((schema) => schema.id === id);

export default EditorSlice.reducer;
