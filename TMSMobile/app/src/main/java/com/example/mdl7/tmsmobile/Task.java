package com.example.mdl7.tmsmobile;

import android.os.Parcel;
import android.os.Parcelable;

import org.json.JSONException;
import org.json.JSONObject;

public class Task implements Parcelable {

    private int id;
    private String title;
    private String content;
    private String stage;
    private Integer userId;


    public Task(JSONObject jsonObject) {
        try {
            this.id = jsonObject.getInt("id");
            this.title = jsonObject.getString("title");
            this.content = jsonObject.getString("content");
            this.stage = jsonObject.getString("stage");

            String temporaryUserId = jsonObject.getString("userId");
            this.userId = temporaryUserId.isEmpty() ? null : Integer.parseInt(temporaryUserId);
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public Task() {}

    protected Task(Parcel in) {
        id = in.readInt();
        title = in.readString();
        content = in.readString();
        stage = in.readString();
        if (in.readByte() == 0) {
            userId = null;
        } else {
            userId = in.readInt();
        }
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(id);
        dest.writeString(title);
        dest.writeString(content);
        dest.writeString(stage);
        if (userId == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeInt(userId);
        }
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Task> CREATOR = new Creator<Task>() {
        @Override
        public Task createFromParcel(Parcel in) {
            return new Task(in);
        }

        @Override
        public Task[] newArray(int size) {
            return new Task[size];
        }
    };

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", stage='" + stage + '\'' +
                ", userId=" + userId +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public JSONObject toJsonObject(){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("title", this.title);
            jsonObject.put("content", this.content);
            jsonObject.put("stage", this.stage);
            jsonObject.put("userId", this.userId);
        }
        catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }
}
