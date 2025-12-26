using LMS.WebAPI.Endpoints;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello LMS!");


app.MapTeacherEndpoints();
app.MapStudentEndpoints();
app.MapCourseEndpoints();
app.MapStudyProgramEndpoints();

await app.RunAsync();
