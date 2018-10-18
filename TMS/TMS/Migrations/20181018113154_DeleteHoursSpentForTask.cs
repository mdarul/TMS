using Microsoft.EntityFrameworkCore.Migrations;

namespace TMS.Migrations
{
    public partial class DeleteHoursSpentForTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoursSpent",
                table: "Tasks");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "HoursSpent",
                table: "Tasks",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
