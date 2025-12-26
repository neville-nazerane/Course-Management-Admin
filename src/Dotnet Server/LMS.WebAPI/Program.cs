using LMS.WebAPI.Endpoints;
using LMS.WebAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var dbConnectionString = builder.Configuration["dbPath"];
if (string.IsNullOrEmpty(dbConnectionString))
{
    Directory.CreateDirectory("data");
    dbConnectionString = @"Data Source=data/db.data";
}

builder.Services.AddDbContext<AppDbContext>(c => c.UseSqlite(dbConnectionString));
builder.Services.AddOpenApi();

var app = builder.Build();

app.MapGet("/", () => "Hello LMS!");

app.MapOpenApi("openapi.json");

app.MapTeacherEndpoints();
app.MapStudentEndpoints();
app.MapCourseEndpoints();
app.MapStudyProgramEndpoints();


await InitAsync(app.Services);

await app.RunAsync();


static async Task InitAsync(IServiceProvider serviceProvider)
{
    await using var scope = serviceProvider.CreateAsyncScope();
    await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureCreatedAsync();
}