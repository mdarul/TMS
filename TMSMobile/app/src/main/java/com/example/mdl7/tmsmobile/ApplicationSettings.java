package com.example.mdl7.tmsmobile;

public class ApplicationSettings {

    private static ApplicationSettings applicationSettings = null;
    private User user;
    private String server;

    public static final int TASK_SELECT = 0;
    public static final String TASK_INFO = "TASK_INFO";
    public static final String TASK_INFO_FOR_WORK_TIME = "TASK_INFO_FOR_WORK_TIME";

    public static ApplicationSettings getInstance(){
        if(applicationSettings == null) applicationSettings = new ApplicationSettings();
        return applicationSettings;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }
}
