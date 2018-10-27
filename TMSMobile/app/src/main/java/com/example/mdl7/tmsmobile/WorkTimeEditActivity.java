package com.example.mdl7.tmsmobile;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class WorkTimeEditActivity extends Activity {

    private WorkTime workTime;

    @Override
    public void onCreate(Bundle savedInstance) {
        super.onCreate(savedInstance);

        Intent intent = getIntent();
        workTime = intent.getParcelableExtra(ApplicationSettings.WORKTIME_INFO);
        setContentView(R.layout.work_time_edit);
        fillLayout();
    }

    @Override
    public void onResume() {
        super.onResume();
        fillLayout();
    }

    public void saveWorkTime(View view) {
        updateWorkTimeValues();
        putWorkingTimeToServer();
    }

    private void updateWorkTimeValues() {
        EditText dayStart = findViewById(R.id.work_time_edit_start_day);
        EditText hourStart = findViewById(R.id.work_time_edit_start_hours);
        EditText minutesStart = findViewById(R.id.work_time_edit_start_minutes);
        EditText secondsStart = findViewById(R.id.work_time_edit_start_seconds);

        EditText dayStop = findViewById(R.id.work_time_edit_stop_day);
        EditText hourStop = findViewById(R.id.work_time_edit_stop_hours);
        EditText minutesStop = findViewById(R.id.work_time_edit_stop_minutes);
        EditText secondsStop = findViewById(R.id.work_time_edit_stop_seconds);

        Calendar calendarStart = Calendar.getInstance();
        calendarStart.setTime(workTime.getWorkStartTime());

        Calendar calendarStop = Calendar.getInstance();
        calendarStop.setTime(workTime.getWorkEndTime());

        calendarStart.set(Calendar.DAY_OF_MONTH, Integer.valueOf(dayStart.getText().toString()));
        calendarStart.set(Calendar.HOUR_OF_DAY, Integer.valueOf(hourStart.getText().toString()));
        calendarStart.set(Calendar.MINUTE, Integer.valueOf(minutesStart.getText().toString()));
        calendarStart.set(Calendar.SECOND, Integer.valueOf(secondsStart.getText().toString()));

        calendarStop.set(Calendar.DAY_OF_MONTH, Integer.valueOf(dayStop.getText().toString()));
        calendarStop.set(Calendar.HOUR_OF_DAY, Integer.valueOf(hourStop.getText().toString()));
        calendarStop.set(Calendar.MINUTE, Integer.valueOf(minutesStop.getText().toString()));
        calendarStop.set(Calendar.SECOND, Integer.valueOf(secondsStop.getText().toString()));

        workTime.setWorkStartTime(calendarStart.getTime());
        workTime.setWorkEndTime(calendarStop.getTime());
    }


    private void fillLayout() {
        EditText dayStart = findViewById(R.id.work_time_edit_start_day);
        EditText hourStart = findViewById(R.id.work_time_edit_start_hours);
        EditText minutesStart = findViewById(R.id.work_time_edit_start_minutes);
        EditText secondsStart = findViewById(R.id.work_time_edit_start_seconds);

        EditText dayStop = findViewById(R.id.work_time_edit_stop_day);
        EditText hourStop = findViewById(R.id.work_time_edit_stop_hours);
        EditText minutesStop = findViewById(R.id.work_time_edit_stop_minutes);
        EditText secondsStop = findViewById(R.id.work_time_edit_stop_seconds);

        Calendar calendarStart = Calendar.getInstance();
        calendarStart.setTime(workTime.getWorkStartTime());

        Calendar calendarStop = Calendar.getInstance();
        calendarStop.setTime(workTime.getWorkEndTime());

        dayStart.setText(String.valueOf(calendarStart.get(Calendar.DAY_OF_MONTH)));
        hourStart.setText(String.valueOf(calendarStart.get(Calendar.HOUR_OF_DAY)));
        minutesStart.setText(String.valueOf(calendarStart.get(Calendar.MINUTE)));
        secondsStart.setText(String.valueOf(calendarStart.get(Calendar.SECOND)));

        dayStop.setText(String.valueOf(calendarStop.get(Calendar.DAY_OF_MONTH)));
        hourStop.setText(String.valueOf(calendarStop.get(Calendar.HOUR_OF_DAY)));
        minutesStop.setText(String.valueOf(calendarStop.get(Calendar.MINUTE)));
        secondsStop.setText(String.valueOf(calendarStop.get(Calendar.SECOND)));
    }

    private void putWorkingTimeToServer() {
        RequestQueue queue = Volley.newRequestQueue(this);

        final String URL = "http://" + ApplicationSettings.getInstance().getServer()
                + "/api/users/" + ApplicationSettings.getInstance().getUser().getId()
                + "/workTimes/" + workTime.getId();

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.PUT, URL, null,
                response -> finish(),
                error -> finish()
        ) {
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
}
