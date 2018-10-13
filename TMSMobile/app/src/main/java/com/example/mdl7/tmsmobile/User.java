package com.example.mdl7.tmsmobile;

import org.json.JSONException;
import org.json.JSONObject;

public class User {

    private int id;
    private String name;
    private String surname;
    private int type;
    private Integer bossId = null;
    private String login;
    private String password;


    public User(int id, String name, String surname, int type, Integer bossId, String login, String password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.type = type;
        this.bossId = bossId;
        this.login = login;
        this.password = password;
    }

    public User(JSONObject jsonObject) {
        try {
            this.id = jsonObject.getInt("id");
            this.name = jsonObject.getString("name");
            this.surname = jsonObject.getString("surname");
            this.type = jsonObject.getInt("type");
            this.login = jsonObject.getString("login");
            this.password = jsonObject.getString("password");

            String temporaryBossId = jsonObject.getString("bossId");
            this.bossId = temporaryBossId.isEmpty() || temporaryBossId.equals("null") ? null : Integer.parseInt(temporaryBossId);
        }
        catch (JSONException e) {
            e.printStackTrace();
        }

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Integer getBossId() {
        return bossId;
    }

    public void setBossId(Integer bossId) {
        this.bossId = bossId;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
