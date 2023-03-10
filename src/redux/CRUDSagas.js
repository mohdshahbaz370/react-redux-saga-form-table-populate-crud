import { put, takeLatest, all, takeEvery } from "redux-saga/effects";
import { ADD_DATA_SAGA, ADD_DATA, UPDATE_DATA_SAGA, UPDATE_DATA, DELETE_DATA_SAGA, DELETE_DATA, INITIAL_DATA_SAGA, INITIAL_DATA } from './constants'

function* initialData() {
    let data = yield fetch('http://localhost:8000/users');
    data = yield data.json();
    console.warn("action is called", data)
    yield put({ type: INITIAL_DATA, data })
}

function* addData(action) {
    yield put({ type: ADD_DATA, payload: action.payload });
}

function* updateData(action) {
    yield put({ type: UPDATE_DATA, payload: action.payload });
}

function* deleteData(action) {
    yield put({ type: DELETE_DATA, payload: action.payload });
}

function* rootSaga() {
    yield all([
        takeLatest(INITIAL_DATA_SAGA, initialData),
        takeLatest(ADD_DATA_SAGA, addData),
        takeLatest(UPDATE_DATA_SAGA, updateData),
        takeLatest(DELETE_DATA_SAGA, deleteData),
    ]);
}

export default rootSaga;
