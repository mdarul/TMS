using Microsoft.EntityFrameworkCore.Migrations;

namespace TMS.Migrations
{
    public partial class paymentsFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "jobTimePortion",
                table: "Payments",
                newName: "JobTimePortion");

            migrationBuilder.RenameColumn(
                name: "contractType",
                table: "Payments",
                newName: "ContractType");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Payments",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_EmployeeId",
                table: "Payments",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Users_EmployeeId",
                table: "Payments",
                column: "EmployeeId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Users_EmployeeId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_EmployeeId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "JobTimePortion",
                table: "Payments",
                newName: "jobTimePortion");

            migrationBuilder.RenameColumn(
                name: "ContractType",
                table: "Payments",
                newName: "contractType");
        }
    }
}
