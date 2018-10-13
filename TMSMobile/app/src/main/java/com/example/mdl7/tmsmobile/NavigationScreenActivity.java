package com.example.mdl7.tmsmobile;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class NavigationScreenActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.navigation);
    }

    public void performTasksClicked(View view){
        Intent intent = new Intent(this, TasksListActivity.class);
        startActivity(intent);
    }

    public void performHoursClicked(View view) {
        Intent intent = new Intent(this, WorkTimeActivity.class);
        startActivity(intent);
    }
}
