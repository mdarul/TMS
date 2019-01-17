using Microsoft.EntityFrameworkCore.Migrations;

namespace TMS.Migrations
{
    public partial class ManagementFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Management_Teams_TeamId",
                table: "Management");

            migrationBuilder.DropIndex(
                name: "IX_Management_TeamId",
                table: "Management");

            migrationBuilder.AlterColumn<int>(
                name: "TeamId",
                table: "Management",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Management_TeamId",
                table: "Management",
                column: "TeamId",
                unique: true,
                filter: "[TeamId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Management_Teams_TeamId",
                table: "Management",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Management_Teams_TeamId",
                table: "Management");

            migrationBuilder.DropIndex(
                name: "IX_Management_TeamId",
                table: "Management");

            migrationBuilder.AlterColumn<int>(
                name: "TeamId",
                table: "Management",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Management_TeamId",
                table: "Management",
                column: "TeamId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Management_Teams_TeamId",
                table: "Management",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
