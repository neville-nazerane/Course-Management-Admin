using Bogus;
using Bogus.DataSets;
using LMS.Models;
using LMS.TestConsole.Utils;
using System.Net.Http.Json;

#region Setup


var rnd = new Random();

var client = new HttpClient
{
    BaseAddress = new("https://localhost:7283")
};


var teacherFaker = new Faker<Teacher>()
                            .RuleFor(t => t.FirstName, f => f.Person.FirstName)
                            .RuleFor(t => t.LastName, f => f.Person.LastName)
                            .RuleFor(t => t.Title, f => f.MakeTitleByGender())
                            .RuleFor(t => t.DateOfBirth, f => f.Person.DateOfBirth)
                            .RuleFor(t => t.HiredOn, f => DateTime.Now.AddRandomPastDays());

var studentFaker = new Faker<Student>()
                            .RuleFor(t => t.FirstName, f => f.Person.FirstName)
                            .RuleFor(t => t.LastName, f => f.Person.LastName)
                            .RuleFor(t => t.DateOfBirth, f => f.Person.DateOfBirth)
                            .RuleFor(t => t.EnrolledOn, f =>  DateTime.Now.AddRandomPastDays());

var courseFaker = new Faker<Course>();


#endregion




await foreach (var teacher in client.GetFromJsonAsAsyncEnumerable<Teacher>("teachers"))
{
    if (teacher is not null)
    {
        using var r = await client.DeleteAsync($"teacher/{teacher.Id}");
        Console.WriteLine(r.StatusCode);
    }
}


var teachers = teacherFaker.Generate(16);


foreach (var teacher in teachers)
{
    using var res = await client.PostAsJsonAsync("teacher", teacher);
    Console.WriteLine(res);
}


#region Utils





#endregion



