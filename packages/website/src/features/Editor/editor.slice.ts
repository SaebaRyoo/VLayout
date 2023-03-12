import { RootState } from '@/src/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Schema } from '@lxnxbnq/r-material';
import nanoid from '@/src/utils/nanoid';
import { clone } from 'ramda';

// Define a type for the slice state
interface EditorState {
  curSchemaId: string;
  schemaList: Schema[];
  copyedSchema: Schema | null;
  rightClick: {
    left: number;
    top: number;
    show: boolean;
  };
}

// Define the initial state using that type
const initialState: EditorState = {
  curSchemaId: '',
  schemaList: [],
  copyedSchema: null,
  // 画布内右击事件
  rightClick: {
    left: 0,
    top: 0,
    show: false,
  },
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
    copySchema: (state) => {
      const index = state.schemaList.findIndex(
        (schema) => schema.id === state.curSchemaId
      );
      const schema = state.schemaList[index];
      state.copyedSchema = schema;
    },
    pasteSchema: (
      state,
      action: PayloadAction<{ left: number; top: number }>
    ) => {
      const { left, top } = action.payload;
      const copyedSchema = clone(state.copyedSchema as Schema);
      copyedSchema.id = nanoid();
      copyedSchema.style.left = left;
      copyedSchema.style.top = top;
      state.schemaList.push(copyedSchema);
    },
    delSchemaById: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const index = state.schemaList.findIndex((schema) => schema.id === id);
      state.schemaList.splice(index, 1);
    },
    swapSchema: (
      state,
      action: PayloadAction<{ curIdx: number; targetIdx: number }>
    ) => {
      const { curIdx, targetIdx } = action.payload;
      const temp = state.schemaList[curIdx];
      state.schemaList[curIdx] = state.schemaList[targetIdx];
      state.schemaList[targetIdx] = temp;
    },
    clearSchemas: (state) => {
      state.schemaList = [];
    },
    // 更新组件坐标
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
    // 根据传入的属性更新组件的值
    updateSchemaByProp: (
      state,
      action: PayloadAction<{
        styleProps: string;
        value: string | number;
        id: string;
      }>
    ) => {
      const { styleProps, value, id } = action.payload;

      const index = state.schemaList.findIndex((schema) => schema.id === id);

      const schema = state.schemaList[index];
      schema.style[styleProps] = value;
    },
    updatePropValue: (state, action: PayloadAction<any>) => {
      const index = state.schemaList.findIndex(
        (schema) => schema.id === state.curSchemaId
      );
      const schema = state.schemaList[index];
      schema.propValue = action.payload;
    },

    updateSchemaSize: (
      state,
      action: PayloadAction<{
        width: number;
        height: number;
        id: string;
      }>
    ) => {
      const { height, width, id } = action.payload;

      const index = state.schemaList.findIndex((schema) => schema.id === id);

      const schema = state.schemaList[index];
      schema.style.width = width;
      schema.style.height = height;
    },
    // 设置画布内右击处理
    toggleRightClick: (state, action: PayloadAction<boolean>) => {
      state.rightClick.show = action.payload;
    },
    setRightClickPos: (
      state,
      action: PayloadAction<{ left: number; top: number }>
    ) => {
      const { left, top } = action.payload;
      state.rightClick.left = left;
      state.rightClick.top = top;
    },
    // 设置事件
    setEvents: (
      state,
      action: PayloadAction<{ value: string; key: string }>
    ) => {
      const { value, key } = action.payload;
      const index = state.schemaList.findIndex(
        (schema) => schema.id === state.curSchemaId
      );
      const schema = state.schemaList[index];
      schema.events[key] = value;
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      const index = state.schemaList.findIndex(
        (schema) => schema.id === state.curSchemaId
      );
      const schema = state.schemaList[index];
      delete schema.events[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSchemas,
  delSchemaById,
  swapSchema,
  clearSchemas,
  setCurSchemaId,
  updateSchemaPos,
  updateSchemaByProp,
  updatePropValue,
  updateSchemaSize,
  toggleRightClick,
  setRightClickPos,
  copySchema,
  pasteSchema,
  setEvents,
  removeEvent,
} = EditorSlice.actions;

// Selectors
export const selectSchemaList = (state: RootState) => state.editor.schemaList;

export const selectCurSchema = (schemaList: Schema[], id: string) =>
  schemaList.find((schema) => schema.id === id);

export default EditorSlice.reducer;
