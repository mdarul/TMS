using Microsoft.EntityFrameworkCore.Migrations;

namespace TMS.Migrations
{
    public partial class RenameNewTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VacationStartTime",
                table: "Vacations",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "VacationEndTime",
                table: "Vacations",
                newName: "EndTime");

            migrationBuilder.RenameColumn(
                name: "VacationStartTime",
                table: "SickLeaves",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "VacationEndTime",
                table: "SickLeaves",
                newName: "EndTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Vacations",
                newName: "VacationStartTime");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "Vacations",
                newName: "VacationEndTime");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "SickLeaves",
                newName: "VacationStartTime");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "SickLeaves",
                newName: "VacationEndTime");
        }
    }
}
