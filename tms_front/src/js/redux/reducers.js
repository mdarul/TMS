import 
{   CREATE_USER,
    USER_SETTINGS,
    LIST_WORKTIMES,
    ADD_WORKTIME,
    ASSIGNED_TASKS,
    ADD_TASK,
    SUBORDINATES_TASKS,
    SUBORDINATES_WORKTIMES,
    SELECT_SCREEN
} from "./constants";


const initalState = {
    user: JSON.parse("{\"id\":1,\"name\":\"Jan\",\"surname\":\"Kowalski\",\"type\":1,\"bossId\":null,\"boss\":null,\"login\":\"jkow\",\"password\":\"xd\",\"tasks\":null,\"workTimes\":null}"),
    userSettingsClicked: false,
    listWorktimesClicked: false,
    addWorktimesClicked: false,
    assignedTasksClicked: false,
    addTaskClicked: false,
    subordinatesTasksClicked: false,
    subordinatesWorktimesClicked: false
};

export function rootReducer(state = initalState, action) {
    let stateJSON = getDefaultJSON(state);

    if (action.type === CREATE_USER) {
        return ({ 
            user: action.user 
        });
    }
    switch(action.type) {
        case CREATE_USER:
            return (        
                { user: action.user }
            );
        case SELECT_SCREEN:
                switch(action.screen) {
                    case USER_SETTINGS:
                        stateJSON.userSettingsClicked = true;
                        return stateJSON;
                    case LIST_WORKTIMES:
                        stateJSON.listWorktimesClicked = true;
                        return stateJSON;
                    case ADD_WORKTIME:
                        stateJSON.addWorktimesClicked = true;
                        return stateJSON;
                    case ASSIGNED_TASKS:
                        stateJSON.assignedTasksClicked = true;
                        return stateJSON;
                    case ADD_TASK:
                        stateJSON.addTaskClicked = true;
                        return stateJSON;
                    case SUBORDINATES_TASKS:
                        stateJSON.subordinatesTasksClicked = true;
                        return stateJSON;
                    case SUBORDINATES_WORKTIMES:
                        stateJSON.subordinatesWorktimesClicked = true;
                        return stateJSON;
                    default:
                        return stateJSON;
                }
    }
    
    return state;
}

function getDefaultJSON(state){
    return {
        user: state.user,
        userSettingsClicked: false,
        listWorktimesClicked: false,
        addWorktimesClicked: false,
        assignedTasksClicked: false,
        addTaskClicked: false,
        subordinatesTasksClicked: false,
        subordinatesWorktimesClicked: false
    }
}