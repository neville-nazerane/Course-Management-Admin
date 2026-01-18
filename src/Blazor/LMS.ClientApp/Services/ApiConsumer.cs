using LMS.Models;
using System.Net.Http.Json;

namespace LMS.ClientApp.Services
{
    public class ApiConsumer(HttpClient client)
    {
        
        private readonly HttpClient _client = client;

        public Task<IEnumerable<Teacher>?> GetTeachers()
            => _client.GetFromJsonAsync<IEnumerable<Teacher>>("teachers");

    }
}
