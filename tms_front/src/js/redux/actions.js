import { CREATE_USER } from "./constants"

export function createUser(user) {
    return { type: CREATE_USER, user }
}