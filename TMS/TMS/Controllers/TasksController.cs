using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using TMS.Models;
using TMS.Models.DTO;
using TMS.Models.DTO.Task;
using TMS.Models.Entities;
using TMS.Services;
using Task = System.Threading.Tasks.Task;

namespace TMS.Controllers
{
    [Route("api")]
    public class TasksController: Controller
    {
        private ISystemRepository _repo;

        public TasksController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        #region Resource manipulation

        [HttpGet("tasks")]
        public IActionResult GetTasks()
        {
            var tasks = _repo.GetTasks();
            if (tasks == null || !tasks.Any()) return NotFound();

            return Ok(tasks.Select(ModelsMapping.GetTaskDto));
        }

        [HttpGet("users/{userId}/tasks")]
        public IActionResult GetTasksForUser(int userId)
        {
            if(_repo.GetUser(userId) == null) return NotFound();

            var userTasks = _repo.GetTasksForUser(userId).Select(o => ModelsMapping.GetTaskDto(o));
            if (userTasks == null || !userTasks.Any()) return NotFound();

            return Ok(userTasks);
        }

        [HttpPost("tasks")]
        public IActionResult AddTask([FromBody] TaskForCreationDTO taskFromRequest)
        {
            if (taskFromRequest == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();

            _repo.AddTask(ModelsMapping.GetTaskEntity(taskFromRequest));
            return Ok();
        }

        [HttpDelete("tasks/{taskId}")]
        public IActionResult DeleteTask(int taskId)
        {
            var taskToDelete = _repo.GetTask(taskId);
            if (taskToDelete == null) return NotFound();

            _repo.DeleteTask(taskToDelete);
            return Ok();
        }

        [HttpPatch("tasks/{taskId}")]
        public IActionResult PatchTask(int taskId, [FromBody] JsonPatchDocument<TaskForPartialUpdateDTO> patchDocument)
        {
            var taskToUpdate = _repo.GetTask(taskId);
            if (taskToUpdate == null) return NotFound();

            var taskWithUpdatedValues = ModelsMapping.GetTaskForPartialUpdateDto(taskToUpdate);
            patchDocument.ApplyTo(taskWithUpdatedValues);
            if (!ModelState.IsValid) return BadRequest();

            ValuesUpdater.ApplyPatchToTaskEntity(taskToUpdate, taskWithUpdatedValues);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpPut("tasks/{taskId}")]
        public IActionResult PutTask(int taskId, [FromBody] TaskForCreationDTO taskFromRequest)
        {
            if (taskFromRequest == null) return BadRequest("task is null");
            if (!ModelState.IsValid) return BadRequest("model is not valid");

            var taskFromDb = _repo.GetTask(taskId);
            if (taskFromDb == null) return NotFound();

            ValuesUpdater.UpdateTaskFromDto(taskFromDb, taskFromRequest);
            _repo.SaveChanges();

            return Ok(taskFromDb);
        }

        #endregion

        [HttpGet("users/{userId}/tasks/unclosed")]
        public IActionResult GetIUnclosedTaskForUser(int userId)
        {
            if (_repo.GetUser(userId) == null) return NotFound();

            var userTasks = _repo.GetTasksForUser(userId).Select(o => ModelsMapping.GetTaskDto(o));
            if (userTasks == null || !userTasks.Any()) return NotFound();

            var userWorkTimes = _repo.GetWorkTimesForUser(userId);
            if (userWorkTimes == null || !userWorkTimes.Any()) return NotFound();

            var unfinishedWorkTime = userWorkTimes.FirstOrDefault(o => !EntitiesUtils.IsDateEmpty(o.WorkStartTime) && EntitiesUtils.IsDateEmpty(o.WorkEndTime));
            if (unfinishedWorkTime == null) return NotFound();
            var unfinishedTask = userTasks.FirstOrDefault(o => o.Id == unfinishedWorkTime.TaskId);
            if (unfinishedTask == null) return NotFound();

            return Ok(unfinishedTask);
        }

        [HttpGet("users/{userId}/tasks/subordinates")]
        public IActionResult GetSubordinatesTasks(int userId)
        {
            var users = _repo.GetUsers();

            var user = _repo.GetUser(userId);
            if (user == null) return NotFound();

            var usersIdsList = new List<int>();
            GetSubordinatesIDs(users, usersIdsList, user);

            var tasks = new List<TaskDTO>();
            foreach (var id in usersIdsList)
            {
                tasks.AddRange(_repo.GetTasksForUser(id).Select(ModelsMapping.GetTaskDto));
            }

            return Ok(tasks);
        }

        private void GetSubordinatesIDs(IEnumerable<User> allUsers, List<int> idList, User currentBoss)
        {
            foreach (var user in allUsers)
            {
                if (user.BossId != null && user.BossId == currentBoss.Id)
                {
                    idList.Add(user.Id);
                    GetSubordinatesIDs(allUsers, idList, user);
                }
            }
        }
    }
}
