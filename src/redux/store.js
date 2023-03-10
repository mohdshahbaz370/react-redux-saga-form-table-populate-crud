// import {createStore} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import rootSaga from './CRUDSagas'
import createSagaMiddleware from 'redux-saga';

// const store = createStore(rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;

// import { createStore, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import dataReducer from "./CRUDReducer";
// import rootSaga from "./CRUDSagas";

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(dataReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(rootSaga);

// export default store;
