import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "./slices/userSlice";

// Individual persist configurations
const userPersistConfig = { key: "userState", storage, whitelist: ["user", "token", "role"] };


// Persisted reducers
export const persistedReducers = {
  userState: persistReducer(userPersistConfig, userReducer),

};
