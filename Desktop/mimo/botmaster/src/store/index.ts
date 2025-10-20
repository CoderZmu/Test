import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略这些action类型的序列化检查
        ignoredActions: ['your/action/type'],
        // 忽略这些路径的序列化检查
        ignoredPaths: ['items.dates'],
      },
    }),
});

// 从store本身推断出`RootState`和`AppDispatch`类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

