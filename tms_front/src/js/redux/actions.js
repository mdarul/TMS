import { CREATE_USER, SELECT_SCREEN } from "./constants"

export function createUser(user) {
    return { type: CREATE_USER, user }
}

export function showScreen(screen) {
    return { type: SELECT_SCREEN, screen }
}