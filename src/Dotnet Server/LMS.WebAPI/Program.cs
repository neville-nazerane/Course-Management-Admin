using LMS.WebAPI.Endpoints;
using LMS.WebAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

var dbConnectionString = builder.Configuration["dbPath"];
if (string.IsNullOrEmpty(dbConnectionString))
{
    Directory.CreateDirectory("data");
    dbConnectionString = @"Data Source=data/db.data";
}

var services = builder.Services;

services.AddDbContext<AppDbContext>(c => c.UseSqlite(dbConnectionString));

services.AddValidation();

services.AddCors(o =>
{
    o.AddDefaultPolicy(c =>
    {
        c.AllowAnyMethod();
        c.AllowAnyHeader();
        c.AllowAnyOrigin();
        //c.WithOrigins("http://localhost:4200");
    });
});

var app = builder.Build();

app.UseCors();

app.MapGet("/", () => "Hello LMS!");


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