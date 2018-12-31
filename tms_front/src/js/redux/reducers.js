import { CREATE_USER } from "./constants";


const initalState = {};

export function rootReducer(state = initalState, action) {
    if (action.type === CREATE_USER) {
        return (        
            {user: action.user}
        );
    }
    
    return state;
}