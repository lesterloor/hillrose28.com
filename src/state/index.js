import { createStore, compose, applyMiddleware } from 'redux'

import { persistStore } from 'redux-persist'

import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
)

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }