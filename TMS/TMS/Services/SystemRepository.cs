using System;
using System.Collections.Generic;
using System.Linq;
using TMS.Models.Entities;

namespace TMS.Services
{
    public class SystemRepository : ISystemRepository
    {
        private SystemContext _context;

        public SystemRepository(SystemContext context)
        {
            this._context = context;
        }

        public IEnumerable<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public User GetUser(int userId)
        {
            return _context.Users.ToList().FirstOrDefault(o => o.Id == userId);
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void DeleteUser(User user)
        {
            _context.Users.Remove(user);
            SaveChanges();
        }

        public IEnumerable<Task> GetTasks()
        {
            return _context.Tasks.ToList();
        }

        public IEnumerable<Task> GetTasksForUser(int userId)
        {
            return _context.Tasks.Where(o => o.UserId == userId);
        }

        public Task GetTask(int taskId)
        {
            return _context.Tasks.ToList().FirstOrDefault(o => o.Id == taskId);
        }

        public void AddTask(Task task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
        }

        public void DeleteTask(Task task)
        {
            _context.Tasks.Remove(task);
            SaveChanges();
        }

        public IEnumerable<WorkTime> GetWorkTimes()
        {
            return _context.WorkTimes.ToList();
        }

        public IEnumerable<WorkTime> GetWorkTimesForUser(int userId)
        {
            return _context.WorkTimes.Where(o => o.UserId == userId);
        }

        public WorkTime GetWorkTime(int userId, int workTimeId)
        {
            return _context.WorkTimes.ToList().FirstOrDefault(o => o.Id == workTimeId && o.UserId == userId);
        }

        public void AddWorkTime(WorkTime workTime)
        {
            _context.WorkTimes.Add(workTime);
            _context.SaveChanges();
        }

        public void DeleteWorkTime(WorkTime workTime)
        {
            _context.WorkTimes.Remove(workTime);
            SaveChanges();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
