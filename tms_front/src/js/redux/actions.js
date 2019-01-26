import { 
    CREATE_USER, 
    SELECT_SCREEN, 
    PUSH_DATA
} from "./constants"

export function createUser(user) {
    return { type: CREATE_USER, user }
}

export function showScreen(screen) {
    return { type: SELECT_SCREEN, screen }
}

export function pushData(subType, data) {
    console.log(subType);
    console.log(data);
    return { type: PUSH_DATA, subType, data }
}