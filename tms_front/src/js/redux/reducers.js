import 
{   CREATE_USER,
    SHOW_COMMENTS,
    PUSH_DATA,
    PUSH_WORKTIME,
    PUSH_TASK,
    PUSH_VACATION,
    PUSH_SICK_LEAVE,
    LIST_WORKTIMES,
    ADD_WORKTIME,
    SUBORDINATES_WORKTIMES,
    LIST_TASKS,
    ADD_TASK,
    SUBORDINATES_TASKS,
    TEAM_TASK,
    ADD_VACATION,
    LIST_VACATIONS,
    EDIT_VACATION,
    TEAM_VACATIONS,
    ADD_SICK_LEAVE,
    LIST_SICK_LEAVES,
    EDIT_SICK_LEAVE,
    TEAM_SICK_LEAVES,
    GENERATE_REPORT,
    SELECT_SCREEN
} from "./constants";


const initalState = {
    user: JSON.parse("{\"id\":1,\"name\":\"Jan\",\"surname\":\"Kowalski\",\"type\":1,\"bossId\":null,\"boss\":null,\"login\":\"jkow\",\"password\":\"xd\",\"tasks\":null,\"workTimes\":null}"),
    selectedWorktime: null,
    selectedTask: null,
    selectedVacation: null,
    selectedSickLeave: null,
    selectedTaskForComments: null,
    showCommentsClicked: false,
    listWorktimesClicked: false,
    addWorktimesClicked: false,
    editWorktimeClicked: false,
    subordinatesWorktimesClicked: false,
    listTasksClicked: false,
    addTaskClicked: false,
    editTaskClicked: false,
    subordinatesTasksClicked: false,
    teamTaskClicked: false,
    addVacationClicked: false,
    listVacationsClicked: false,
    editVacationClicked: false,
    teamVacationsClicked: false,
    addSickLeaveClicked: false,
    listSickLeavesClicked: false,
    editSickLeaveClicked: false,
    teamSickLeavesClicked: false,
    generateReportClicked: false
};

export function rootReducer(state = initalState, action) {
    let stateJSON = getDefaultJSON(state);
    switch(action.type) {
        case CREATE_USER:
            return (        
                { user: action.user }
            );
        case SHOW_COMMENTS:
                stateJSON.showCommentsClicked = true;
                stateJSON.selectedTaskForComments = action.task;
                return stateJSON;
        case PUSH_DATA:
            switch(action.subType) {
                case PUSH_WORKTIME:
                    stateJSON.selectedWorktime = action.data;
                    stateJSON.editWorktimeClicked = true;
                    return stateJSON;
                case PUSH_TASK:
                    stateJSON.selectedTask = action.data;
                    stateJSON.editTaskClicked= true;
                    return stateJSON;
                case PUSH_VACATION:
                    stateJSON.selectedVacation = action.data;
                    stateJSON.editVacationClicked = true;
                    return stateJSON;
                case PUSH_SICK_LEAVE:
                    stateJSON.selectedSickLeave = action.data;
                    stateJSON.editSickLeaveClicked = true;
                    return stateJSON;
            }
        case SELECT_SCREEN:
                switch(action.screen) {
                    case LIST_WORKTIMES:
                        stateJSON.listWorktimesClicked = true;
                        return stateJSON;
                    case ADD_WORKTIME:
                        stateJSON.addWorktimesClicked = true;
                        return stateJSON;
                    case LIST_TASKS:
                        stateJSON.listTasksClicked = true;
                        return stateJSON;
                    case TEAM_TASK:
                        stateJSON.teamTaskClicked = true;
                        return stateJSON;
                    case ADD_TASK:
                        stateJSON.addTaskClicked = true;
                        return stateJSON;
                    case SUBORDINATES_TASKS:
                        stateJSON.subordinatesTasksClicked = true;
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
                    case TEAM_VACATIONS:
                        stateJSON.teamVacationsClicked = true;
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
                    case TEAM_SICK_LEAVES:
                        stateJSON.teamSickLeavesClicked = true;
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
        selectedTaskForComments: null,
        showCommentsClicked: false,
        listWorktimesClicked: false,
        addWorktimesClicked: false,
        editWorktimeClicked: false,
        listTasksClicked: false,
        editTaskClicked: false,
        teamTaskClicked: false,
        addTaskClicked: false,
        subordinatesTasksClicked: false,
        subordinatesWorktimesClicked: false,
        addVacationClicked: false,
        editVacationClicked: false,
        listVacationsClicked: false,
        teamVacationsClicked: false,
        addSickLeaveClicked: false,
        editSickLeaveClicked: false,
        listSickLeavesClicked: false,
        teamSickLeavesClicked: false
    }
}