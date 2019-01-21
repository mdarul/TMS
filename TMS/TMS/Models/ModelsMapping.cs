using System;
using System.Collections.Generic;
using System.Linq;
using TMS.Models.DTO;
using TMS.Models.DTO.Management;
using TMS.Models.DTO.Payment;
using TMS.Models.DTO.SickLeave;
using TMS.Models.DTO.Task;
using TMS.Models.DTO.Team;
using TMS.Models.DTO.Vacation;
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
                TeamId = user.TeamId,
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
                TeamId = user.TeamId,
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
                TeamId = userDto.TeamId,
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

        public static SickLeaveDTO GetSickLeaveDto(SickLeave sickLeave)
        {
            return new SickLeaveDTO()
            {
                Id = sickLeave.Id,
                UserId = sickLeave.UserId,
                StartTime = sickLeave.StartTime,
                EndTime = sickLeave.EndTime
            };
        }

        public static SickLeave GetSickLeaveEntity(SickLeaveForCreationDTO sickLeave)
        {
            return new SickLeave()
            {
                UserId = sickLeave.UserId,
                StartTime = sickLeave.StartTime,
                EndTime = sickLeave.EndTime
            };
        }

        public static VacationDTO GetVacationeDto(Vacation vacation)
        {
            return new VacationDTO()
            {
                Id = vacation.Id,
                UserId = vacation.UserId,
                StartTime = vacation.StartTime,
                EndTime = vacation.EndTime
            };
        }

        public static Vacation GetVacationEntity(VacationForCreationDTO vacationDto)
        {
            return new Vacation()
            {
                UserId = vacationDto.UserId,
                StartTime = vacationDto.StartTime,
                EndTime = vacationDto.EndTime
            };
        }

        public static TeamDTO GetTeamDto(Team team)
        {
            return new TeamDTO()
            {
                Id = team.Id,
                ManagerId = team.ManagerId,
                Name = team.Name
            };
        }

        public static Team GetTeamEntity(TeamForCreationDTO teamDto)
        {
            return new Team()
            {
                ManagerId = teamDto.ManagerId,
                Name = teamDto.Name
            };
        }

        public static ManagementDTO GetManagementDto(Management management)
        {
            return new ManagementDTO()
            {
                ManagerId = management.ManagerId,
                TeamId = management.TeamId
            };
        }

        public static Management GetManagementEntity(ManagementForCreationDTO managementDto)
        {
            return new Management()
            {
                ManagerId = managementDto.ManagerId,
                TeamId = managementDto.TeamId
            };
        }

        public static PaymentDTO GetPaymentDto(Payment payment)
        {
            return new PaymentDTO()
            {
                HourlyRate = payment.HourlyRate,
                contractType = payment.contractType,
                jobTimePortion = payment.jobTimePortion
            };
        }

        public static Payment GetPaymentEntity(PaymentForCreationDTO paymentDto)
        {
            return new Payment()
            {
                HourlyRate = paymentDto.HourlyRate,
                contractType = paymentDto.contractType,
                jobTimePortion = paymentDto.jobTimePortion
            };
        }
    }
}
