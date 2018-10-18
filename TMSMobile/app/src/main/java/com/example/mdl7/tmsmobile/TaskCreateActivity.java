package com.example.mdl7.tmsmobile;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class TaskCreateActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstance) {
        super.onCreate(savedInstance);
        setContentView(R.layout.task_create);

        Spinner taskStageSpinner = findViewById(R.id.task_create_stage_spinner);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.task_stages, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        taskStageSpinner.setAdapter(adapter);
    }

    public void createTask(View view) {
        Task task = getTaskFromCurrentLayout();
        postTaskToServer(task);
    }

    private Task getTaskFromCurrentLayout() {
        Task task = new Task();

        EditText taskTitleEditView = findViewById(R.id.task_create_title);
        EditText taskContentEditView = findViewById(R.id.task_create_content);
        EditText taskHourSpentEditView = findViewById(R.id.task_create_hours_spent);
        Spinner taskStageSpinner = findViewById(R.id.task_create_stage_spinner);

        task.setTitle(taskTitleEditView.getText().toString());
        task.setContent(taskContentEditView.getText().toString());
        task.setHoursSpent(Integer.valueOf(taskHourSpentEditView.getText().toString()));
        task.setStage(taskStageSpinner.getSelectedItem().toString());
        task.setUserId(ApplicationSettings.getInstance().getUser().getId());

        return task;
    }

    private void postTaskToServer(Task task) {
        final JSONObject postData = task.toJsonObject();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://" + ApplicationSettings.getInstance().getServer() + "/api/tasks/";

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, null,
                (response) -> finish(),
                (error) -> finish()
        ) {
            @Override
            public Map<String, String> getHeaders()
            {
                Map<String, String> headers = new HashMap<String, String>();
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
                    return postData.toString().getBytes("UTF-8");
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
}
