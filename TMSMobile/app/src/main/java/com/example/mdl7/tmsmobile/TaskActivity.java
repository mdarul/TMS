package com.example.mdl7.tmsmobile;

import android.app.Activity;
import android.content.Context;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.Spinner;

public abstract class TaskActivity extends Activity {

    Task task;
    EditText taskTitleEditView;
    EditText taskContentEditView;
    Spinner taskStageSpinner;

    protected void hideKeyboard() {
        InputMethodManager inputManager = (InputMethodManager)
                getSystemService(Context.INPUT_METHOD_SERVICE);
        try {
            inputManager.hideSoftInputFromWindow(getCurrentFocus().getWindowToken(),
                    InputMethodManager.HIDE_NOT_ALWAYS);
        } catch (Exception e) { }
    }

    protected void updateTaskValues() {
        this.task.setTitle(taskTitleEditView.getText().toString());
        this.task.setContent(taskContentEditView.getText().toString());
        this.task.setStage(taskStageSpinner.getSelectedItem().toString());
        this.task.setUserId(ApplicationSettings.getInstance().getUser().getId());
    }

    protected String getErrorMessage() {
        String errorMsg = "";

        String taskTitle = taskTitleEditView.getText().toString();
        String taskContent = taskContentEditView.getText().toString();

        if(taskTitle.isEmpty()) errorMsg += "Task title is empty\n";
        if(taskContent.isEmpty()) errorMsg += "Task content is empty\n";

        return errorMsg;
    }
}
