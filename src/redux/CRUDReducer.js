import { ADD_DATA, UPDATE_DATA, DELETE_DATA, INITIAL_DATA } from "./constants";

const initialState = {
    data: [],
};

const dataReducer = (state = initialState, action) => {
    console.log([...state.data, action.payload])
    switch (action.type) {
        case INITIAL_DATA:
            return { data: [...action.data] };
        case ADD_DATA:
            return {
                data: [...state.data, action.payload],
            };
        case UPDATE_DATA:
            const updatedData = state.data.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
            return {
                data: updatedData,
            };
        case DELETE_DATA:
            const filteredData = state.data.filter((item) => item.id !== action.payload.id);
            return {
                data: filteredData,
            };
        default:
            return state;
    }
};

export default dataReducer;