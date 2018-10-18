﻿using System;
using System.Collections.Generic;
using System.Linq;
using TMS.Models.DTO;
using TMS.Models.DTO.Task;
using TMS.Models.DTO.WorkTime;
using TMS.Models.Entities;

namespace TMS.Models
{
    public static class ModelsMapping
    {
        public static UserDTO GetUserDto(User user)
        {
            return new UserDTO()
            {
                Id = user.Id,
                Name = user.Name,
                Surname = user.Surname,
                BossId = user.BossId,
                Type = user.Type,
                Login = user.Login,
                Password = user.Password,
            };
        }

        public static UserForPartialUpdateDTO GetUserForPartialUpdateDto(User user)
        {
            return new UserForPartialUpdateDTO()
            {
                Name = user.Name,
                Surname = user.Surname,
                BossId = user.BossId,
                Type = user.Type,
                Login = user.Login,
                Password = user.Password,
            };
        }

        public static User GetUserEntity(UserForCreationDTO userDto)
        {
            return new User()
            {
                Name = userDto.Name,
                Surname = userDto.Surname,
                BossId = userDto.BossId,
                Type = userDto.Type,
                Login = userDto.Login,
                Password = userDto.Password,
            };
        }

        public static TaskDTO GetTaskDto(Task task)
        {
            return new TaskDTO()
            {
                Id = task.Id,
                Title = task.Title,
                Content = task.Content,
                Stage = task.Stage,
                UserId = task.UserId,
            };
        }

        public static TaskForPartialUpdateDTO GetTaskForPartialUpdateDto(Task task)
        {
            return new TaskForPartialUpdateDTO()
            {
                Title = task.Title,
                Content = task.Content,
                Stage = task.Stage,
                UserId = task.UserId,
            };
        }

        public static Task GetTaskEntity(TaskForCreationDTO taskDto)
        {
            return new Task()
            {
                Title = taskDto.Title,
                Content = taskDto.Content,
                Stage = taskDto.Stage,
                UserId = taskDto.UserId,
            };
        }

        public static WorkTimeDTO GetWorkTimeDto(WorkTime workTime)
        {
            return new WorkTimeDTO()
            {
                Id = workTime.Id,
                WorkStartTime = workTime.WorkStartTime,
                WorkEndTime = workTime.WorkEndTime,
                UserId = workTime.UserId,
                TaskId = workTime.TaskId
            };
        }

        public static WorkTimeForPartialUpdateDTO GetWorkTimeForPartialUpdateDto(WorkTime workTime)
        {
            return new WorkTimeForPartialUpdateDTO()
            {
                WorkStartTime = workTime.WorkStartTime,
                WorkEndTime = workTime.WorkEndTime,
                UserId = workTime.UserId,
                TaskId = workTime.TaskId
            };
        }

        public static WorkTime GetWorkTimeEntity(WorkTimeForCreationDTO workTimeDto)
        {
            return new WorkTime()
            {
                WorkStartTime = workTimeDto.WorkStartTime,
                WorkEndTime = workTimeDto.WorkEndTime,
                UserId = workTimeDto.UserId,
                TaskId = workTimeDto.TaskId
            };
        }
    }
}