using Microsoft.EntityFrameworkCore.Migrations;

namespace TMS.Migrations
{
    public partial class WorkTimeForTasks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TaskId",
                table: "WorkTimes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WorkTimes_TaskId",
                table: "WorkTimes",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkTimes_Tasks_TaskId",
                table: "WorkTimes",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkTimes_Tasks_TaskId",
                table: "WorkTimes");

            migrationBuilder.DropIndex(
                name: "IX_WorkTimes_TaskId",
                table: "WorkTimes");

            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "WorkTimes");
        }
    }
}
