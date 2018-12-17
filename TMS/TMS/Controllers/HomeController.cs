using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TMS.Models.Entities;
using TMS.Services;
using Task = TMS.Models.Entities.Task;

namespace TMS.Controllers
{
    public class HomeController : Controller
    {
        private readonly ISystemRepository _repo;

        public HomeController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        public IActionResult Index()
        {
            _repo.SaveChanges();
            return View("login");
        }

        #region Populate data

        [HttpPost("populateUsers")]
        public IActionResult PopulateUsers()
        {
            var userList = new List<User>()
            {
                new User()
                {
                    Name = "Jan",
                    Surname = "Kowalski",
                    Type = 1,
                    Login = "jkow",
                    Password = "admin1",
                },
                new User()
                {
                    Name = "Janusz",
                    Surname = "Malina",
                    Type = 1,
                    Login = "janusz",
                    Password = "admin123",
                },
                new User()
                {
                    Name = "Robert",
                    Surname = "Nowak",
                    Type = 0,
                    Login = "jnowak",
                    Password = "admin1",
                },
                new User()
                {
                    Name = "Halina",
                    Surname = "Kowalska",
                    Type = 0,
                    Login = "hkow",
                    Password = "admin9",
                },
                new User()
                {
                    Name = "Jan",
                    Surname = "Kowalski",
                    Type = 0,
                    Login = "jkow",
                    Password = "admin5",
                }
            };
            userList.ForEach(o => _repo.AddUser(o));

            return Ok();
        }

        [HttpPost("populateTasks")]
        public IActionResult PopulateTasks()
        {
            var taskList = new List<Task>()
            {
                new Task()
                {
                    Title = "Fix 1",
                    Content = "fix needed pls",
                    Stage = "New"
                },
                new Task()
                {
                    Title = "Task 5",
                    Content = "do something",
                    Stage = "Pending"
                },
                new Task()
                {
                    Title = "Some peculiar stuff",
                    Content = "bla",
                    Stage = "Clarification"
                },
                new Task()
                {
                    Title = "Task 21",
                    Content = "bla123",
                    Stage = "Finished"
                },
            };
            taskList.ForEach(o => _repo.AddTask(o));

            return Ok();
        }

        [HttpPost("populateWorkTimes")]
        public IActionResult PopulateWorkTimes()
        {
            var workTimesList = new List<WorkTime>()
            {
                new WorkTime()
                {
                    WorkStartTime = new DateTime(2017, 5, 25, 9, 12, 30),
                    WorkEndTime = new DateTime(2017, 5, 25, 17, 13, 20),
                    UserId = 1
                },
                new WorkTime()
                {
                    WorkStartTime = new DateTime(2017, 5, 26, 8, 15, 30),
                    WorkEndTime = new DateTime(2017, 5, 26, 15, 14, 20),
                    UserId = 1
                }
            };
            workTimesList.ForEach(o => _repo.AddWorkTime(o));

            return Ok();
        }

        #endregion
    }
}