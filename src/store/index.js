import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from '@redux-devtools/extension';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducer} from '../reducers'; // Import root reducer
import {rootSaga} from '../sagas'; // Import root saga

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with saga middleware and dev tools
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// Run the root saga
sagaMiddleware.run(rootSaga);

// Create a persistor
const persistor = persistStore(store);

export {store, persistor};
