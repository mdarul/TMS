import { UPDATE_USER } from "./constants"

export function updateUser(payload) {
    return { type: UPDATE_USER, payload }
}