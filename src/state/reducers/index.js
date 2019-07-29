import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import fetchReducer from "./fetchReducer"

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['']
}

const reducers = combineReducers({
    fetchReducer
})

export default persistReducer(rootPersistConfig, reducers)