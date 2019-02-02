import { 
    CREATE_USER, 
    SELECT_SCREEN, 
    PUSH_DATA,
    SHOW_COMMENTS
} from "./constants"

export function createUser(user) {
    return { type: CREATE_USER, user }
}

export function showScreen(screen) {
    return { type: SELECT_SCREEN, screen }
}

export function pushData(subType, data) {
    return { type: PUSH_DATA, subType, data }
}

export function showTaskComments(task) {
    return { type: SHOW_COMMENTS, task}
}