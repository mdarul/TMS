import { CREATE_USER, SELECT_SCREEN, PUSH_WORKTIME } from "./constants"

export function createUser(user) {
    return { type: CREATE_USER, user }
}

export function showScreen(screen) {
    return { type: SELECT_SCREEN, screen }
}

export function pushWorktimeData(worktime) {
    return { type: PUSH_WORKTIME, worktime }
}