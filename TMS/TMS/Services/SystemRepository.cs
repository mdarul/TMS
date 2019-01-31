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

        public IEnumerable<Team> GetTeams()
        {
            return _context.Teams.ToList();
        }

        public Team GetTeam(int teamId)
        {
            return _context.Teams.ToList().FirstOrDefault(o => o.Id == teamId);
        }

        public void AddTeam(Team team)
        {
            _context.Teams.Add(team);
            SaveChanges();
        }

        public void DeleteTeam(Team team)
        {
            _context.Teams.Remove(team);
            SaveChanges();
        }

        public IEnumerable<Vacation> GetVacations()
        {
            return _context.Vacations.ToList();
        }

        public IEnumerable<Vacation> GetVacationsForUser(int userId)
        {
            return _context.Vacations.ToList().Where(o => o.UserId == userId);
        }

        public Vacation GetVacation(int vacationId)
        {
            return _context.Vacations.ToList().FirstOrDefault(o => o.Id == vacationId);
        }

        public void AddVacation(Vacation vacation)
        {
            _context.Vacations.Add(vacation);
            SaveChanges();
        }

        public void DeleteVacation(Vacation vacation)
        {
            _context.Vacations.Remove(vacation);
            SaveChanges();
        }

        public IEnumerable<SickLeave> GetSickLeaves()
        {
            return _context.SickLeaves.ToList();
        }

        public IEnumerable<SickLeave> GetSickLeavesForUser(int userId)
        {
            return _context.SickLeaves.Where(o => o.UserId == userId);
        }

        public SickLeave GetSickLeave(int sickLeaveId)
        {
            return _context.SickLeaves.ToList().FirstOrDefault(o => o.Id == sickLeaveId);
        }

        public void AddSickLeave(SickLeave sickLeave)
        {
            _context.SickLeaves.Add(sickLeave);
            SaveChanges();
        }

        public void DeleteSickLeave(SickLeave sickLeave)
        {
            _context.SickLeaves.Remove(sickLeave);
            SaveChanges();
        }

        public IEnumerable<Management> GetManagers()
        {
            return _context.Management.ToList();
        }

        public Management GetManager(int id)
        {
            return _context.Management.ToList().FirstOrDefault(o => o.Id == id);
        }

        public void AddManager(Management manager)
        {
            _context.Management.Add(manager);
            SaveChanges();
        }

        public void DeleteManager(Management manager)
        {
            _context.Management.Remove(manager);
            SaveChanges();
        }

        public IEnumerable<Payment> GetPayments()
        {
            return _context.Payments.ToList();
        }

        public Payment GetPayment(int id)
        {
            return _context.Payments.ToList().FirstOrDefault(o => o.Id == id);
        }

        public void AddPayment(Payment payment)
        {
            _context.Payments.Add(payment);
            SaveChanges();
        }

        public void DeletePayment(Payment payment)
        {
            _context.Payments.Remove(payment);
            SaveChanges();
        }

        public IEnumerable<Comment> GetComments()
        {
            return _context.Comments.ToList();
        }

        public Comment GetComment(int id)
        {
            return _context.Comments.ToList().FirstOrDefault(o => o.Id == id);
        }

        public void AddComment(Comment comment)
        {
            _context.Add(comment);
            SaveChanges();
        }

        public void DeleteComment(Comment comment)
        {
            _context.Comments.Remove(comment);
            SaveChanges();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
