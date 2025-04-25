import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/adminSlice";

// Individual persist configurations
const userPersistConfig = {
  key: "userState",
  storage,
  whitelist: ["user", "token", "role"],
};
const adminPersistConfig = {
  key: "adminState",
  storage,
  whitelist: ["admin", "token", "role"],
};

// Persisted reducers
export const persistedReducers = {
  userState: persistReducer(userPersistConfig, userReducer),
  adminState: persistReducer(adminPersistConfig, adminReducer),
};
