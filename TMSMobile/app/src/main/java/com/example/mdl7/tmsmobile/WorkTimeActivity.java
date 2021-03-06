package com.example.mdl7.tmsmobile;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class WorkTimeActivity extends Activity {

    private Task task;
    private WorkTime workTime;

    @Override
    public void onCreate(Bundle savedInstance) {
        super.onCreate(savedInstance);
        setContentView(R.layout.work_hours);
        lookForUnfinishedTask();
    }

    @Override
    public void onResume(){
        super.onResume();
        lookForUnfinishedTask();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent resultIntent) {
        if(requestCode == ApplicationSettings.TASK_SELECT) {
            if(resultCode == Activity.RESULT_OK) {
                this.task = resultIntent.getParcelableExtra(ApplicationSettings.TASK_INFO_FOR_WORK_TIME);
                this.workTime = null;
                updateLayout();
            }
        }
    }

    public void StartWorkingTime(View view) {
        workTime = new WorkTime();
        workTime.setUserId(ApplicationSettings.getInstance().getUser().getId());
        workTime.setTaskId(task.getId());
        workTime.setWorkStartTime(new Date());
        postWorkingTimeToServer();
        updateLayout();

    }

    public void StopWorkingTime(View view) {
        UpdateWorkHoursAndPutToServer();
    }

    public void linkTask(View view) {
        Intent intent = new Intent(this, WorkTimeTaskSelectActivity.class);
        startActivityForResult(intent, ApplicationSettings.TASK_SELECT);
    }

    public void addNewTask(View view) {
        Intent intent = new Intent(this, TaskCreateActivity.class);
        startActivity(intent);
    }

    private void lookForUnfinishedTask() {
        RequestQueue queue = Volley.newRequestQueue(this);
        final String URL = "http://" + ApplicationSettings.getInstance().getServer() + "/api/users/" +
                ApplicationSettings.getInstance().getUser().getId() + "/tasks/unclosed";

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, URL, null,
                (response) -> {
                    this.task = new Task(response);
                    lookForUnfinishedWorkHours();
                },
                (error) -> {
                    updateLayout();
                });

        request.setRetryPolicy(new DefaultRetryPolicy(10000, DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(request);
    }

    private void UpdateWorkHoursAndPutToServer() {
        RequestQueue queue = Volley.newRequestQueue(this);
        final String URL = "http://" + ApplicationSettings.getInstance().getServer()
                + "/api/users/" + ApplicationSettings.getInstance().getUser().getId()
                + "/tasks/" + task.getId() + "/workTimes/unclosed";

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, URL, null,
                (response) -> {
                    this.workTime = new WorkTime(response);
                    this.workTime.setWorkEndTime(new Date());
                    createConfirmationDialog();
                },
                (error) -> updateLayout()
                );

        request.setRetryPolicy(new DefaultRetryPolicy(10000, DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(request);
    }

    private void lookForUnfinishedWorkHours() {
        RequestQueue queue = Volley.newRequestQueue(this);
        final String URL = "http://" + ApplicationSettings.getInstance().getServer()
                + "/api/users/" + ApplicationSettings.getInstance().getUser().getId()
                + "/tasks/" + task.getId() + "/workTimes/unclosed";

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, URL, null,
                (response) -> {
                    this.workTime = new WorkTime(response);
                    updateLayout();
                },
                (error) -> updateLayout()
                );

        request.setRetryPolicy(new DefaultRetryPolicy(10000, DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(request);
    }

    private void updateLayout() {
        TextView taskTextView = findViewById(R.id.work_hours_task_id);
        Button taskLinkButton = findViewById(R.id.button_link_task);

        if(task == null) {

        }
        else {
            taskTextView.setText("Task id:" + task.getId());
            taskLinkButton.setText("Link other task");
            updateTimeButtonsLayouts();
        }
    }

    private void updateTimeButtonsLayouts() {
        Button startButtonEnabled = findViewById(R.id.start_button_enabled);
        Button startButtonDisabled = findViewById(R.id.start_button_disabled);
        Button stopButtonEnabled = findViewById(R.id.stop_button_enabled);
        Button stopButtonDisabled = findViewById(R.id.stop_button_disabled);

        if(workTime == null){
            startButtonEnabled.setVisibility(View.VISIBLE);
            startButtonDisabled.setVisibility(View.GONE);
            stopButtonEnabled.setVisibility(View.GONE);
            stopButtonDisabled.setVisibility(View.VISIBLE);
        }
        else if(!workTime.isStartTimeDefault() && (workTime.isEndTimeDefault() || workTime.getWorkEndTime() == null)) {
            startButtonEnabled.setVisibility(View.GONE);
            startButtonDisabled.setVisibility(View.VISIBLE);
            stopButtonEnabled.setVisibility(View.VISIBLE);
            stopButtonDisabled.setVisibility(View.GONE);
        }
        else {
            startButtonEnabled.setVisibility(View.VISIBLE);
            startButtonDisabled.setVisibility(View.GONE);
            stopButtonEnabled.setVisibility(View.GONE);
            stopButtonDisabled.setVisibility(View.VISIBLE);
        }
    }

    private void postWorkingTimeToServer() {
        RequestQueue queue = Volley.newRequestQueue(this);

        final String URL = "http://" + ApplicationSettings.getInstance().getServer()
                + "/api/users/" + ApplicationSettings.getInstance().getUser().getId()
                + "/workTimes/";

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, URL, null, null, null) {
            @Override
            public Map<String, String> getHeaders()
            {
                Map<String, String> headers = new HashMap<String, String>();
                headers.put("Accept", "application/json");
                headers.put("Content-Type", "application/json");

                return headers;
            }

            @Override
            public String getBodyContentType() {
                return "application/json";
            }

            @Override
            public byte[] getBody() {
                try {
                    return workTime.toJsonObject().toString().getBytes("UTF-8");
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
                return null;
            }
        };

        request.setRetryPolicy(new DefaultRetryPolicy(10000, DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(request);
    }

    private void putWorkingTimeToServer() {
        RequestQueue queue = Volley.newRequestQueue(this);

        final String URL = "http://" + ApplicationSettings.getInstance().getServer()
                + "/api/users/" + ApplicationSettings.getInstance().getUser().getId()
                + "/workTimes/" + workTime.getId();

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.PUT, URL, null,
                response -> {
                    if(!workTime.isEndTimeDefault()) workTime = null;
                    updateLayout();
                }, error -> {
                    if(!workTime.isEndTimeDefault()) workTime = null;
                    updateLayout();
        }) {
            @Override
            public Map<String, String> getHeaders()
            {
                Map<String, String> headers = new HashMap<>();
                headers.put("Accept", "application/json");
                return headers;
            }

            @Override
            public String getBodyContentType() {
                return "application/json";
            }

            @Override
            public byte[] getBody() {
                try {
                    return workTime.toJsonObject().toString().getBytes("UTF-8");
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
                return null;
            }
        };

        request.setRetryPolicy(new DefaultRetryPolicy(10000,
                DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(request);
    }

    private void createConfirmationDialog() {
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(this);
        alertDialog.setMessage("Do you want to edit saved dates?\nStart: "
                + WorkTime.parseDateToJsonDateTime(workTime.getWorkStartTime())
                + "\nEnd: " + WorkTime.parseDateToJsonDateTime(workTime.getWorkEndTime()));

        final WorkTime workTimeFinal = this.workTime;
        final Context contextFinal = this;

        alertDialog.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Intent intent = new Intent(contextFinal, WorkTimeEditActivity.class);
                intent.putExtra(ApplicationSettings.WORKTIME_INFO, workTimeFinal);
                startActivity(intent);
            }
        });
        alertDialog.setNegativeButton("No", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                putWorkingTimeToServer();
            }
        });

        alertDialog.create().show();
    }
}
