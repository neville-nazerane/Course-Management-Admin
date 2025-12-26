using LMS.Models;
using System.Net.Http.Json;




var client = new HttpClient
{
    BaseAddress = new("http://localhost:5100")
};


var teachers = await client.GetFromJsonAsync<IEnumerable<Teacher>>("teachers");


teachers = await client.GetFromJsonAsync<IEnumerable<Teacher>>("teachers");