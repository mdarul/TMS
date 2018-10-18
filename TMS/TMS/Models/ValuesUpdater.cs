using System;
using System.Collections.Generic;
using System.Linq;
using TMS.Models.DTO;
using TMS.Models.DTO.Task;
using TMS.Models.DTO.WorkTime;
using TMS.Models.Entities;

namespace TMS.Models
{
    public static class ValuesUpdater
    {
        public static void ApplyPatchToUserEntity(User userToUpdate, UserForPartialUpdateDTO userWithUpdatedValues)
        {
            userToUpdate.Name = userWithUpdatedValues.Name;
            userToUpdate.Surname = userWithUpdatedValues.Surname;
            userToUpdate.Type = userWithUpdatedValues.Type;
            userToUpdate.BossId = userWithUpdatedValues.BossId;
            userToUpdate.Login = userWithUpdatedValues.Login;
            userToUpdate.Password = userWithUpdatedValues.Password;
        }

        public static void ApplyPatchToTaskEntity(Task taskToUpdate, TaskForPartialUpdateDTO taskWithUpdatedValues)
        {
            taskToUpdate.Title = taskWithUpdatedValues.Title;
            taskToUpdate.Content = taskWithUpdatedValues.Content;
            taskToUpdate.Stage = taskWithUpdatedValues.Stage;
            taskToUpdate.UserId = taskWithUpdatedValues.UserId;
        }

        public static void ApplyPatchToWorkTimeEntity(WorkTime workTimeToUpdate,
            WorkTimeForPartialUpdateDTO workTimeWithUpdatedValues)
        {
            workTimeToUpdate.UserId = workTimeWithUpdatedValues.UserId;
            workTimeToUpdate.WorkStartTime = workTimeWithUpdatedValues.WorkStartTime;
            workTimeToUpdate.WorkEndTime = workTimeWithUpdatedValues.WorkEndTime;
            workTimeToUpdate.TaskId = workTimeWithUpdatedValues.TaskId;
        }

        public static void UpdateTaskFromDto(Task taskToUpdate, TaskForCreationDTO taskWithUpdatedValues)
        {
            taskToUpdate.Title = taskWithUpdatedValues.Title;
            taskToUpdate.Content = taskWithUpdatedValues.Content;
            taskToUpdate.Stage = taskWithUpdatedValues.Stage;
            taskToUpdate.UserId = taskWithUpdatedValues.UserId;
        }

        public static void UpdateWorkTimeFromDto(WorkTime workTimeToUpdate, WorkTimeForCreationDTO workTimeWithUpdatedValues)
        {
            workTimeToUpdate.TaskId = workTimeWithUpdatedValues.TaskId;
            workTimeToUpdate.UserId = workTimeWithUpdatedValues.UserId;
            workTimeToUpdate.WorkStartTime = workTimeWithUpdatedValues.WorkStartTime;
            workTimeToUpdate.WorkEndTime = workTimeWithUpdatedValues.WorkEndTime;
        }
    }
}
