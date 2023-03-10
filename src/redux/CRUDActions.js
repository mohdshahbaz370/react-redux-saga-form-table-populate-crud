import { ADD_DATA_SAGA, ADD_DATA, UPDATE_DATA_SAGA, UPDATE_DATA, DELETE_DATA_SAGA, DELETE_DATA, INITIAL_DATA_SAGA } from './constants'
export const addDataSagaAction = (data) => ({
    type: ADD_DATA_SAGA,
    payload: data,
});

// export const addDataAction = (data) => ({
//     type: ADD_DATA,
//     payload: data,
// });

export const updateDataSagaAction = (data) => ({
    type: UPDATE_DATA_SAGA,
    payload: data,
});

// export const updateDataAction = (data) => ({
//     type: UPDATE_DATA,
//     payload: data,
// });

export const deleteDataSagaAction = (data) => ({
    type: DELETE_DATA_SAGA,
    payload: data,
});

// export const deleteDataAction = (id) => ({
//     type: DELETE_DATA,
//     payload: id,
// });

export const initialDataSagaAction = () => ({
    type: INITIAL_DATA_SAGA
})