package com.example.mdl7.tmsmobile;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;

import java.util.ArrayList;


public class TasksListActivity extends Activity {

    private ListView tasksList;
//    public static final String TASK_INFO = "TASK_INFO";

    @Override
    public void onCreate(Bundle savedInstance) {
        super.onCreate(savedInstance);
        setContentView(R.layout.tasks_list);
        tasksList = findViewById(R.id.tasks_list);
        initTasksList();
    }

    @Override
    public void onResume(){
        super.onResume();
        initTasksList();
    }


    public void addNewTask(View view) {
        Intent intent = new Intent(this, TaskCreateActivity.class);
        startActivity(intent);
    }

    private void initTasksList() {

        RequestQueue queue = Volley.newRequestQueue(this);
        final ListView tasksListView = findViewById(R.id.tasks_list);

        String URL = "http://" + ApplicationSettings.getInstance().getServer() + "/api/users/" +
                ApplicationSettings.getInstance().getUser().getId() + "/tasks";
        final TasksListActivity context = this;

        JsonArrayRequest request = new JsonArrayRequest(Request.Method.GET, URL, null,
                (response) -> {

                    ArrayList<Task> taskList = new ArrayList<>();
                    for (int i = 0; i < response.length(); i++) {
                        try {
                            taskList.add(new Task(response.getJSONObject(i)));
                        }
                        catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }

                    ArrayAdapter<Task> adapter = new ArrayAdapter<>(context, android.R.layout.simple_list_item_1, taskList);
                    tasksListView.setAdapter(adapter);
                    tasksListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                            Intent intent = new Intent(context, TaskEditActivity.class);
                            Task task = (Task) tasksList.getItemAtPosition(i);
                            intent.putExtra(ApplicationSettings.TASK_INFO, task);
                            startActivity(intent);

                        }
                    });
                }, null);

        request.setRetryPolicy(new DefaultRetryPolicy(10000, DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(request);
    }
}
