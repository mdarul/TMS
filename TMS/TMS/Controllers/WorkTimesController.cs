using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using TMS.Models;
using TMS.Models.DTO;
using TMS.Models.DTO.WorkTime;
using TMS.Models.Entities;
using TMS.Services;

namespace TMS.Controllers
{
    [Route("api")]
    public class WorkTimesController: Controller
    {
        private readonly ISystemRepository _repo;

        public WorkTimesController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        #region Resource manipulation

        [HttpGet("workTimes")]
        public IActionResult GetWorkTimes()
        {
            var workTimes = _repo.GetWorkTimes();
            if (workTimes == null || !workTimes.Any()) return NotFound();

            return Ok(workTimes.Select(ModelsMapping.GetWorkTimeDto));
        }

        [HttpGet("users/{userId}/workTimes")]
        public IActionResult GetWorkTimesForUser(int userId)
        {
            if (_repo.GetUser(userId) == null) return NotFound();
            var workTimes = _repo.GetWorkTimesForUser(userId);
            if (workTimes == null || !workTimes.Any()) return NotFound();

            return Ok(workTimes.Select(ModelsMapping.GetWorkTimeDto));
        }

        [HttpGet("users/{userId}/workTimes/{workTimeId}")]
        public IActionResult GetWorkTimeForUser(int userId, int workTimeId)
        {
            if (_repo.GetUser(userId) == null) return NotFound();
            var workTime = _repo.GetWorkTime(userId, workTimeId);
            if (workTime == null) return NotFound();

            return Ok(ModelsMapping.GetWorkTimeDto(workTime));
        }

        [HttpPost("users/{userId}/workTimes/")]
        public IActionResult AddWorkTime(int userId, [FromBody] WorkTimeForCreationDTO workTimeFromRequest)
        {
            if (_repo.GetUser(userId) == null) return NotFound("User not found");
            if (!ModelState.IsValid) return BadRequest("Invalid model");

            _repo.AddWorkTime(ModelsMapping.GetWorkTimeEntity(workTimeFromRequest));
            return Ok();
        }

        [HttpDelete("users/{userId}/workTimes/{workTimeId}")]
        public IActionResult DeleteWorkTime(int userId, int workTimeId)
        {
            if (_repo.GetUser(userId) == null) return NotFound();
            var workTimeToDelete = _repo.GetWorkTime(userId, workTimeId);
            if (workTimeToDelete == null) return NotFound();

            _repo.DeleteWorkTime(workTimeToDelete);
            return Ok();
        }

        [HttpPatch("users/{userId}/workTimes/{workTimeId}")]
        public IActionResult PatchWorkTime(int userId, int workTimeId,
            [FromBody] JsonPatchDocument<WorkTimeForPartialUpdateDTO> patchDocument)
        {
            if (_repo.GetUser(userId) == null) return NotFound();
            var workTimeToUpdate = _repo.GetWorkTime(userId, workTimeId);
            if (workTimeToUpdate == null) return NotFound();

            var workTimeWithUpdatedValues = ModelsMapping.GetWorkTimeForPartialUpdateDto(workTimeToUpdate);
            patchDocument.ApplyTo(workTimeWithUpdatedValues);
            if (!ModelState.IsValid) return BadRequest();

            ValuesUpdater.ApplyPatchToWorkTimeEntity(workTimeToUpdate, workTimeWithUpdatedValues);
            _repo.SaveChanges();
            return Ok();
        }

        [HttpPut("users/{userId}/workTimes/{workTimeId}")]
        public IActionResult PutWorkTime(int userId, int workTimeId, [FromBody] WorkTimeForCreationDTO workTimeFromRequest)
        {
            if (workTimeFromRequest == null) return BadRequest("task is null");
            if (!ModelState.IsValid) return BadRequest("model is not valid");

            var workTimeFromDb = _repo.GetWorkTime(userId, workTimeId);
            if (workTimeFromDb == null) return NotFound();

            ValuesUpdater.UpdateWorkTimeFromDto(workTimeFromDb, workTimeFromRequest);
            _repo.SaveChanges();

            return Ok(ModelsMapping.GetWorkTimeDto(workTimeFromDb));
        }

        #endregion

        [HttpGet("users/{userId}/tasks/{taskId}/workTimes/unclosed")]
        public IActionResult GetUnclosedWorkingTime(int userId, int taskId)
        {
            if (_repo.GetUser(userId) == null) return NotFound();
            if (_repo.GetTask(taskId) == null) return NotFound();

            var userWorkTimes = _repo.GetWorkTimesForUser(userId);
            if (userWorkTimes == null || !userWorkTimes.Any()) return NotFound();

            var unfinishedWorkTime = userWorkTimes.FirstOrDefault(o => !EntitiesUtils.IsDateEmpty(o.WorkStartTime) && EntitiesUtils.IsDateEmpty(o.WorkEndTime));
            if (unfinishedWorkTime == null) return NotFound();

            return Ok(ModelsMapping.GetWorkTimeDto(unfinishedWorkTime));
        }

        [HttpGet("users/{userId}/workTimes/subordinates")]
        public IActionResult GetSubordinatesWorkTimes(int userId)
        {
            var users = _repo.GetUsers();

            var user = _repo.GetUser(userId);
            if (user == null) return NotFound();

            var usersIdsList = new List<int>();
            GetSubordinatesIDs(users, usersIdsList, user);

            var workTimes = new List<WorkTimeDTO>();
            foreach (var id in usersIdsList)
            {
                workTimes.AddRange(_repo.GetWorkTimesForUser(id).Select(ModelsMapping.GetWorkTimeDto));
            }

            return Ok(workTimes);
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
