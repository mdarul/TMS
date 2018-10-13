package com.example.mdl7.tmsmobile;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class TaskEditActivity extends Activity {

    private Task task;

    @Override
    public void onCreate(Bundle savedInstance) {
        super.onCreate(savedInstance);
        setContentView(R.layout.task_edit);

        Intent intent = getIntent();
        this.task = intent.getParcelableExtra(ApplicationSettings.TASK_INFO);

        fillLayout();
    }

    @Override
    public void onResume(){
        super.onResume();
        fillLayout();
    }

    private void fillLayout() {
        TextView taskIdTextView = findViewById(R.id.task_edit_task_id);
        EditText taskTitleEditView = findViewById(R.id.task_edit_title);
        EditText taskContentEditView = findViewById(R.id.task_edit_content);
        EditText taskHourSpentEditView = findViewById(R.id.task_edit_hours_spent);
        Spinner taskStageSpinner = findViewById(R.id.task_edit_stage_spinner);


        taskIdTextView.setText("Task Id: " + String.valueOf(task.getId()));
        taskTitleEditView.setText(task.getTitle());
        taskContentEditView.setText(task.getContent());
        taskHourSpentEditView.setText(String.valueOf(task.getHoursSpent()));


        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.task_stages, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        taskStageSpinner.setAdapter(adapter);

        taskStageSpinner.setSelection(Arrays.asList(getResources().getStringArray(R.array.task_stages)).indexOf(this.task.getStage()));
    }

    public void SaveTask(View view) {
        updateTaskValues();
        final TaskEditActivity context = this;
        final JSONObject jsonObject = task.toJsonObject();
        RequestQueue queue = Volley.newRequestQueue(this);

        String url = "http://" + ApplicationSettings.getInstance().getServer() + "/api/tasks/" + task.getId();
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.PUT, url, null,
                (response) -> {
                    context.onDestroy();
                },
                (error) -> {
                    context.onDestroy();
                }
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
                    return jsonObject.toString().getBytes("UTF-8");
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

    private void updateTaskValues() {
        EditText taskTitleEditView = findViewById(R.id.task_edit_title);
        EditText taskContentEditView = findViewById(R.id.task_edit_content);
        EditText taskHourSpentEditView = findViewById(R.id.task_edit_hours_spent);
        Spinner taskStageSpinner = findViewById(R.id.task_edit_stage_spinner);

        this.task.setTitle(taskTitleEditView.getText().toString());
        this.task.setContent(taskContentEditView.getText().toString());
        this.task.setHoursSpent(Integer.valueOf(taskHourSpentEditView.getText().toString()));
        this.task.setStage(taskStageSpinner.getSelectedItem().toString());
    }

}
