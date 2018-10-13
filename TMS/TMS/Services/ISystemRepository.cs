using System;
using System.Collections.Generic;
using System.Linq;
using TMS.Models.Entities;

namespace TMS.Services
{
    public interface ISystemRepository
    {
        IEnumerable<User> GetUsers();
        User GetUser(int userId);
        void AddUser(User user);
        void DeleteUser(User user);

        IEnumerable<Task> GetTasks();
        IEnumerable<Task> GetTasksForUser(int userId);
        Task GetTask(int taskId);
        void AddTask(Task task);
        void DeleteTask(Task task);

        IEnumerable<WorkTime> GetWorkTimes();
        IEnumerable<WorkTime> GetWorkTimesForUser(int userId);
        WorkTime GetWorkTime(int userId, int workTimeId);
        void AddWorkTime(WorkTime workTime);
        void DeleteWorkTime(WorkTime workTime);

        void SaveChanges();
    }
}
