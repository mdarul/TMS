import { UPDATE_USER } from "./constants"

export function updateUser(user) {
    console.log({ type: UPDATE_USER, user });
    return { type: UPDATE_USER, user }
}