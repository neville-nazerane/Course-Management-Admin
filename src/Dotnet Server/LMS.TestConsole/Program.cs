using Bogus;
using Bogus.DataSets;
using LMS.Models;
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
                            .RuleFor(t => t.Title, f => MakeTitle(f.Person.Gender))
                            .RuleFor(t => t.DateOfBirth, f => f.Person.DateOfBirth)
                            .RuleFor(t => t.HiredOn, f => DateTime.Now.AddDays(-1 * f.Random.Number(5)));

var studentFaker = new Faker<Student>();

var courseFaker = new Faker<Course>();


#endregion



var teachers = teacherFaker.Generate(50);


foreach (var teacher in teachers)
{
    using var res = await client.PostAsJsonAsync("teacher", teacher);
    Console.WriteLine(res);
}





string? MakeTitle(Name.Gender gender)
{
    var num = rnd.Next(10);

    if (num < 5)
        return "Dr";
    else if (num == 9)
        return null;
    else return gender == Name.Gender.Male ? "Mr" : "Mrs";
}









