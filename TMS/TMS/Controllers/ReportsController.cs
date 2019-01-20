using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using OfficeOpenXml.Table;
using TMS.Services;

namespace TMS.Controllers
{
    [Route("api/reports")]
    public class ReportsController: Controller
    {
        private const string xlsxContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        private readonly ISystemRepository repo;

        public ReportsController(ISystemRepository repository)
        {
            this.repo = repository;
        }

        [HttpGet("{yearNumber}/{monthNumber}")]
        public FileResult GetTest2(int yearNumber, int monthNumber)
        {
            var date = DateTime.Now.ToString().Replace('-', '.').Replace(':', '.').Replace(' ', '-');
            var fileName = $"report-{monthNumber}.{yearNumber}-{date}.xlsx";
            var path = Path.Combine(
                Directory.GetCurrentDirectory(),
                @"wwwroot\Reports", fileName);
            var fileInfo = new FileInfo(path);

            using (var package = CreateExcelPackage(yearNumber, monthNumber))
            {
                package.SaveAs(fileInfo);
            }

            Stream stream = System.IO.File.OpenRead(path);
            return File(stream, xlsxContentType, fileName);
        }

        private ExcelPackage CreateExcelPackage(int year, int month)
        {
            var package = new ExcelPackage();
            package.Workbook.Properties.Title = "Work time report";
            package.Workbook.Properties.Author = "Derulo";
            package.Workbook.Properties.Subject = "Work time report";
            package.Workbook.Properties.Keywords = "Work time";


            var worksheet = package.Workbook.Worksheets.Add("WorkTime");

            worksheet.Cells[1, 1].Value = "ID";
            worksheet.Cells[1, 2].Value = "Name";
            worksheet.Cells[1, 3].Value = "Worked hours";
            worksheet.Cells[1, 4].Value = "Vacation hours";
            worksheet.Cells[1, 5].Value = "Sick leave hours";

            var users = repo.GetUsers();
            int i = 2;
            foreach (var user in users)
            {
                worksheet.Cells[i, 1].Value = user.Id;
                worksheet.Cells[i, 2].Value = string.Concat(user.Name, " ", user.Surname);
                worksheet.Cells[i, 3].Value = GetWorkHoursForUser(user.Id, year, month);
                worksheet.Cells[i, 4].Value = GetVacationHoursForUser(user.Id, year, month);
                worksheet.Cells[i, 5].Value = GetSickLeavesHoursForUser(user.Id, year, month);
                i++;
            }

            return package;
        }

        private int GetWorkHoursForUser(int userId, int year, int month)
        {
            return (int) repo.GetWorkTimesForUser(userId)
                .Where(o => o.WorkStartTime.Year == year && o.WorkStartTime.Month == month)
                .Select(o => o.WorkEndTime.Subtract(o.WorkStartTime).TotalSeconds / 3600)
                .Sum();
        }

        private int GetVacationHoursForUser(int userId, int year, int month)
        {
            return (int)repo.GetVacationsForUser(userId)
                .Where(o => o.StartTime.Year == year && o.StartTime.Month == month)
                .Select(o => o.EndTime.Subtract(o.StartTime).TotalSeconds / 3600)
                .Sum() / 3; // get 8 hours from each day
        }

        private int GetSickLeavesHoursForUser(int userId, int year, int month)
        {
            return (int)repo.GetSickLeavesForUser(userId)
                .Where(o => o.StartTime.Year == year && o.StartTime.Month == month)
                .Select(o => o.EndTime.Subtract(o.StartTime).TotalSeconds / 3600)
                .Sum() / 3; // get 8 hours from each day
        }
    }
}
