import { UPDATE_USER} from "./constants";


const initalState = {
    user1: null,
};

export function rootReducer(state = initalState, action) {
    if(action.type === UPDATE_USER) {
        return { user1: state.user1 }
    }

    return state;
}