import 
{   CREATE_USER,
    PUSH_WORKTIME,
    USER_SETTINGS,
    LIST_WORKTIMES,
    ADD_WORKTIME,
    ASSIGNED_TASKS,
    ADD_TASK,
    SUBORDINATES_TASKS,
    SUBORDINATES_WORKTIMES,
    SELECT_SCREEN,
    EDIT_WORKTIME,
    ADD_VACATION,
    LIST_VACATIONS,
    EDIT_VACATION,
    ADD_SICK_LEAVE,
    LIST_SICK_LEAVES,
    EDIT_SICK_LEAVE,
    GENERATE_REPORT
} from "./constants";


const initalState = {
    user: JSON.parse("{\"id\":1,\"name\":\"Jan\",\"surname\":\"Kowalski\",\"type\":1,\"bossId\":null,\"boss\":null,\"login\":\"jkow\",\"password\":\"xd\",\"tasks\":null,\"workTimes\":null}"),
    selectedWorktime: null,
    selectedTask: null,
    selectedVacation: null,
    selectedSickLeave: null,
    userSettingsClicked: false,
    listWorktimesClicked: false,
    addWorktimesClicked: false,
    editWorktimeClicked: false,
    assignedTasksClicked: false,
    addTaskClicked: false,
    subordinatesTasksClicked: false,
    subordinatesWorktimesClicked: false,
    addVacationClicked: false,
    listVacationsClicked: false,
    editVacationClicked: false,
    addSickLeaveClicked: false,
    listSickLeavesClicked: false,
    editSickLeaveClicked: false,
    generateReportClicked: false
};

export function rootReducer(state = initalState, action) {
    let stateJSON = getDefaultJSON(state);
    switch(action.type) {
        case CREATE_USER:
            return (        
                { user: action.user }
            );
        case PUSH_WORKTIME:
            console.log("reducer");
            console.log(action.worktime);
            stateJSON.selectedWorktime = action.worktime;
            stateJSON.editWorktimeClicked = true;
            return stateJSON;
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
                    case EDIT_WORKTIME:
                        stateJSON.editWorktimeClicked = true;
                        stateJSON.selectedWorktime = action.selectedWorktime;
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
                    case ADD_VACATION:
                        stateJSON.addVacationClicked = true;
                        return stateJSON;
                    case LIST_VACATIONS:
                        stateJSON.listVacationsClicked = true;
                        return stateJSON;
                    case EDIT_VACATION:
                        stateJSON.editVacationClicked = true;
                        return stateJSON;
                    case ADD_SICK_LEAVE:
                        stateJSON.addSickLeaveClicked = true;
                        return stateJSON;
                    case LIST_SICK_LEAVES:
                        stateJSON.listSickLeavesClicked = true;
                        return stateJSON;
                    case EDIT_SICK_LEAVE:
                        stateJSON.editSickLeaveClicked = true;
                        return stateJSON;
                    case GENERATE_REPORT:
                        stateJSON.generateReportClicked = true;
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
        selectedWorktime: null,
        selectedTask: null,
        selectedVacation: null,
        selectedSickLeave: null,
        userSettingsClicked: false,
        listWorktimesClicked: false,
        addWorktimesClicked: false,
        editWorktimeClicked: false,
        assignedTasksClicked: false,
        addTaskClicked: false,
        subordinatesTasksClicked: false,
        subordinatesWorktimesClicked: false,
        addVacationClicked: false,
        listVacationsClicked: false,
        editVacationClicked: false,
        addSickLeaveClicked: false,
        listSickLeavesClicked: false,
        editSickLeaveClicked: false,
        generateReportClicked: false
    }
}