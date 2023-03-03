import { configureStore, ThunkAction, Action, PreloadedState } from '@reduxjs/toolkit';
import rootReducer from './reducers'

/**
 * creates a Redux store, and also automatically
 * configure the Redux DevTools extension so
 * that you can inspect the store while developing.
 **/
const store = configureStore({
  reducer: rootReducer
});

// 用于单元测试
export function setupStore(preloadedState: PreloadedState<RootState> | {} = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
