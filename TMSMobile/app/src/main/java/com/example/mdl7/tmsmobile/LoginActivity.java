package com.example.mdl7.tmsmobile;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

import java.nio.charset.StandardCharsets;

public class LoginActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
    }

    public void performLogin(View view) {
        EditText serverTextBox = findViewById(R.id.login_server);
        EditText userNameTextBox = findViewById(R.id.login_user);
        EditText passwordTextBox = findViewById(R.id.login_password);

//        String server = serverTextBox.getText().toString();
//        String user = userNameTextBox.getText().toString();
//        String password = passwordTextBox.getText().toString();

        String server = Secret.server;
        String user = Secret.user;
        String password = Secret.password;

        RequestQueue queue = Volley.newRequestQueue(this);
        String URL = "http://" + server + "/api/users/checkCredentials/" + user + "/" + password;
        final LoginActivity context = this;

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, URL, null,
                response -> {
                    ApplicationSettings.getInstance().setUser(new User(response));
                    ApplicationSettings.getInstance().setServer(server);
                    Intent intent = new Intent(context, NavigationScreenActivity.class);
                    startActivity(intent);
                }, null);

        request.setRetryPolicy(new DefaultRetryPolicy(10000, DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        queue.add(request);
    }
}
