using Bogus;
using Bogus.DataSets;
using LMS.Models;
using LMS.TestConsole.Utils;
using System.Collections.Immutable;
using System.Data;
using System.Net.Http.Json;

#region Setup


var client = new HttpClient
{
    BaseAddress = new("https://localhost:7283")
};


var teacherFaker = new Faker<Teacher>().SetupDefaults();



var courseFaker = new Faker<Course>().SetupDefaults();

var studyProgramFaker = new Faker<StudyProgram>().SetupDefaults();


#endregion



//await ClearTeachersAsync();

//await GenerateTeachersAsync(5);

//await ClearCoursesAsync();

//await GenerateCoursesAsync(20);

//await ClearStudyProgramsAsync();

//await GenerateStudyProgramsAsync(20);

await GenerateStudentsAsync(100);


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

async Task GenerateTeachersAsync(int count)
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

async Task GenerateCoursesAsync(int count)
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

async Task ClearStudyProgramsAsync()
{
    var programs = await client.GetFromJsonAsync<IEnumerable<StudyProgram>>("study-programs");

    if (programs is null) return;
    foreach (var program in programs)
    {
        using var res = await client.DeleteAsync($"study-program/{program.Id}");
        Console.WriteLine(res.StatusCode);
    }
}

async Task GenerateStudyProgramsAsync(int count)
{
    if (count > CustomData.StudyProgramNames.Count)
    {
        count = CustomData.StudyProgramNames.Count;
        Console.WriteLine($"WARNING: Count capped to {count}.");
    }

    var programs = studyProgramFaker.Generate(count);

    foreach (var program in programs)
    {
        using var res = await client.PostAsJsonAsync("study-program", program);
        Console.WriteLine(res.StatusCode);
    }
}

async Task ClearStudentsAsync()
{
    var students = await client.GetFromJsonAsync<IEnumerable<Student>>("students");

    if (students is null) return;
    foreach (var student in students)
    {
        using var res = await client.DeleteAsync($"student/{student.Id}");
        Console.WriteLine(res.StatusCode);
    }
}

async Task GenerateStudentsAsync(int count)
{
    var programs = await client.GetFromJsonAsync<IEnumerable<StudyProgram>>("study-programs");

    if (programs is null || !programs.Any())
    {
        Console.WriteLine("WARNING: No programs to create students");
        return;
    }

    var programIds = programs.Select(program => program.Id).ToArray();

    var studentFaker = new Faker<Student>()
                                .SetupDefaults()
                                .RuleFor(r => r.StudyProgramId, f => f.Random.ArrayElement(programIds));

    var students = studentFaker.Generate(count);

    foreach (var student in students)
    {
        using var res = await client.PostAsJsonAsync("student", student);
        Console.WriteLine(res.StatusCode);
    }
}

#endregion