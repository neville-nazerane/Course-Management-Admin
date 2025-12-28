using Bogus;
using Bogus.DataSets;
using LMS.Models;
using LMS.TestConsole.Utils;
using System.Net.Http.Json;

#region Setup


var client = new HttpClient
{
    BaseAddress = new("https://localhost:7283")
};


var teacherFaker = new Faker<Teacher>().SetupDefaults();

var studentFaker = new Faker<Student>().SetupDefaults();

var courseFaker = new Faker<Course>();


#endregion


// Clearing teachers
await foreach (var teacher in client.GetFromJsonAsAsyncEnumerable<Teacher>("teachers"))
{
    if (teacher is not null)
    {
        using var r = await client.DeleteAsync($"teacher/{teacher.Id}");
        Console.WriteLine(r.StatusCode);
    }
}

// Creating teachers
var teachers = teacherFaker.Generate(16);


foreach (var teacher in teachers)
{
    using var res = await client.PostAsJsonAsync("teacher", teacher);
    Console.WriteLine(res);
}




