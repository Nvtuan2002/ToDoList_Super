import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import authReducer from '@/redux/auth' //import authSlice
import modalReducer from '@/redux/modal' //import modalSlice
import taskListReducer from '@/redux/taskList' //import taskListSlice

// Kết hợp các reducer thành rootReducer
const rootReducers = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  taskList: taskListReducer
})

const persistConfig = {
  key: 'root', //key lưu trữ
  storage, // lưu vào localstorage
  whilelist: ['auth'], // chỉ lưu auth
}

//quản lý lưu trữ và khôi phục
const persistedReducer = persistReducer(persistConfig, rootReducers)

//tạo kho store với reducer là persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
})

// Tạo persistor để quản lý quá trình lưu trữ
export const persistor = persistStore(store)