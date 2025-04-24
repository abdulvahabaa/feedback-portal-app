import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";

// Individual persist configurations
const themePersistConfig = { key: "themeState", storage, whitelist: ["mode"] };
const userPersistConfig = { key: "userState", storage, whitelist: ["user", "token", "role"] };


// Persisted reducers
export const persistedReducers = {
  userState: persistReducer(userPersistConfig, userReducer),
  themeState: persistReducer(themePersistConfig, themeReducer),
};
