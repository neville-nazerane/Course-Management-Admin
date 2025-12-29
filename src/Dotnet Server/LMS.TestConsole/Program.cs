using Bogus;
using Bogus.DataSets;
using LMS.Models;
using LMS.TestConsole.Utils;
using System.Data;
using System.Net.Http.Json;

#region Setup


var client = new HttpClient
{
    BaseAddress = new("https://localhost:7283")
};


var teacherFaker = new Faker<Teacher>().SetupDefaults();

var studentFaker = new Faker<Student>().SetupDefaults();

var courseFaker = new Faker<Course>().SetupDefaults();


#endregion



//await ClearTeachersAsync();

//await GenerateTeachersAsync();

await ClearCoursesAsync();

await GenerateCoursesAsync();





#region Functions

async Task ClearTeachersAsync()
{
    await foreach (var teacher in client.GetFromJsonAsAsyncEnumerable<Teacher>("teachers"))
    {
        if (teacher is not null)
        {
            using var r = await client.DeleteAsync($"teacher/{teacher.Id}");
            Console.WriteLine(r.StatusCode);
        }
    }
}

async Task GenerateTeachersAsync(int count = 20)
{
    var teachers = teacherFaker.Generate(count);

    foreach (var teacher in teachers)
    {
        using var res = await client.PostAsJsonAsync("teacher", teacher);
        Console.WriteLine(res);
    }
}

async Task ClearCoursesAsync()
{
    var courses = await client.GetFromJsonAsync<IEnumerable<Course>>("courses");

    if (courses is null) return;
    foreach (var course in courses)
    {
        using var res = await client.DeleteAsync($"course/{course.Id}");
        Console.WriteLine(res.StatusCode);
    }
}

async Task GenerateCoursesAsync(int count = 20)
{
    if (count > CustomData.CourseNames.Count)
    {
        count = CustomData.CourseNames.Count;
        Console.WriteLine($"WARNING: Count capped to {count}.");
    }

    var courses = courseFaker.Generate(count);

    foreach (var course in courses)
    {
        using var res = await client.PostAsJsonAsync("course", course);
        Console.WriteLine(res.StatusCode);
    }
}


#endregion