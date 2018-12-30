import { UPDATE_USER } from "./constants";


const initalState = {
    user: null,
};

export function rootReducer(state = initalState, action) {
    if (action.type === UPDATE_USER) {
        return ({
            user: action.user
        });
    }

    return state;
}