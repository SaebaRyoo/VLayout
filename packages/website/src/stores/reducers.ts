import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import editor from '@/features/Editor/editor.slice';
import toolbar from '@/features/Toolbar/toolbar.slice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, editor);
export default {
  editor: persistedReducer,
  toolbar,
};
