package com.example.mdl7.tmsmobile;

import android.os.Parcel;
import android.os.Parcelable;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

public class WorkTime implements Parcelable {
    private int id;
    private int userId;
    private Integer taskId;
    private Date workStartTime;
    private Date workEndTime;

    public static String datePattern = "yyyy-MM-dd'T'HH:mm:ss";
    public static String defaultDateString = "0001-01-01T00:00:00";

    public WorkTime() {}

    public WorkTime(JSONObject jsonObject) {
        try {
            this.id = jsonObject.getInt("id");
            this.userId = jsonObject.getInt("userId");
            this.workStartTime = parseJsonDateTimeToDate(jsonObject.getString("workStartTime"));
            this.workEndTime = parseJsonDateTimeToDate(jsonObject.getString("workEndTime"));

            String temporaryTaskId = jsonObject.getString("taskId");
            this.taskId = temporaryTaskId.isEmpty() || temporaryTaskId.equals("null") ? null : Integer.parseInt(jsonObject.getString("taskId"));
        }
        catch (JSONException e) {
            e.printStackTrace();
        }

    }

    protected WorkTime(Parcel in) {
        id = in.readInt();
        userId = in.readInt();
        if (in.readByte() == 0) {
            taskId = null;
        } else {
            taskId = in.readInt();
        }
        workStartTime = new Date(in.readLong());
        workEndTime = new Date(in.readLong());
    }

    public static final Creator<WorkTime> CREATOR = new Creator<WorkTime>() {
        @Override
        public WorkTime createFromParcel(Parcel in) {
            return new WorkTime(in);
        }

        @Override
        public WorkTime[] newArray(int size) {
            return new WorkTime[size];
        }
    };

    public JSONObject toJsonObject() {
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("userId", this.userId);
            jsonObject.put("taskId", this.taskId);
            jsonObject.put("workStartTime", parseDateToJsonDateTime(this.workStartTime));
            jsonObject.put("workEndTime", parseDateToJsonDateTime(this.workEndTime));
        }
        catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    public Map<String, String> getMap() {
        Map<String, String> map = new LinkedHashMap<>();
        map.put("userId", String.valueOf(this.userId));
        map.put("taskId", String.valueOf(this.taskId));
        map.put("workStartTime", parseDateToJsonDateTime(this.workStartTime));
        map.put("workEndTime", parseDateToJsonDateTime(this.workEndTime));

        return map;
    }

    public static String parseDateToJsonDateTime(Date date) {
        if(date == null) return null;
        SimpleDateFormat parser = new SimpleDateFormat(datePattern);
        return parser.format(date);
    }

    private Date parseJsonDateTimeToDate(String dateTime) {
        SimpleDateFormat parser = new SimpleDateFormat(datePattern);
        try {
            return parser.parse(dateTime);
        }
        catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static boolean isDefault(Date date) {
        SimpleDateFormat parser = new SimpleDateFormat(datePattern);
        try {
            Date defaultDate = parser.parse(defaultDateString);
            return defaultDate.equals(date);
        }
        catch (ParseException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isStartTimeDefault() {
        SimpleDateFormat parser = new SimpleDateFormat(datePattern);
        try {
            Date defaultDate = parser.parse(defaultDateString);
            return defaultDate.equals(workStartTime);
        }
        catch (ParseException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isEndTimeDefault() {
        SimpleDateFormat parser = new SimpleDateFormat(datePattern);
        try {
            Date defaultDate = parser.parse(defaultDateString);
            return defaultDate.equals(workEndTime);
        }
        catch (ParseException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static String getCurrentTimeInFormat() {
        return new SimpleDateFormat(datePattern).format(Calendar.getInstance().getTime());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public Date getWorkStartTime() {
        return workStartTime;
    }

    public void setWorkStartTime(Date workStartTime) {
        this.workStartTime = workStartTime;
    }

    public Date getWorkEndTime() {
        return workEndTime;
    }

    public void setWorkEndTime(Date workEndTime) {
        this.workEndTime = workEndTime;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(id);
        dest.writeInt(userId);
        if (taskId == null) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeInt(taskId);
        }
        dest.writeLong(workStartTime.getTime());
        dest.writeLong(workEndTime.getTime());
    }
}
