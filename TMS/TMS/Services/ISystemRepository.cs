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

        IEnumerable<Team> GetTeams();
        Team GetTeam(int teamId);
        void AddTeam(Team team);
        void DeleteTeam(Team team);

        IEnumerable<Vacation> GetVacations();
        IEnumerable<Vacation> GetVacationsForUser(int userId);
        Vacation GetVacation(int vacationId);
        void AddVacation(Vacation vacation);
        void DeleteVacation(Vacation vacation);

        IEnumerable<SickLeave> GetSickLeaves();
        IEnumerable<SickLeave> GetSickLeavesForUser(int userId);
        SickLeave GetSickLeave(int sickLeaveId);
        void AddSickLeave(SickLeave sickLeave);
        void DeleteSickLeave(SickLeave sickLeave);


        IEnumerable<Management> GetManagers();
        Management GetManager(int id);
        void AddManager(Management manager);
        void DeleteManager(Management manager);

        void SaveChanges();
    }
}
