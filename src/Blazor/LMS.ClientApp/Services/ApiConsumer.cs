using LMS.Models;
using System.Net.Http.Json;

namespace LMS.ClientApp.Services
{
    public class ApiConsumer(HttpClient client)
    {
        
        private readonly HttpClient _client = client;

        public Task<IEnumerable<Teacher>?> GetTeachersAsync()
            => _client.GetFromJsonAsync<IEnumerable<Teacher>>("teachers");

        public Task<Teacher?> GetTeacherAsync(int id)
            => _client.GetFromJsonAsync<Teacher>($"teacher/{id}");

        public async Task<int> CreateTeacherAsync(Teacher teacher)
        {
            using var res = await _client.PostAsJsonAsync("teacher", teacher);
            res.EnsureSuccessStatusCode();
            var str = await res.Content.ReadAsStringAsync();
            return Convert.ToInt32(str);
        }

        public async Task UpdateTeacherAsync(Teacher teacher)
        {
            using var res = await _client.PutAsJsonAsync("teacher", teacher);
            res.EnsureSuccessStatusCode();
        }

        public async Task<bool> DeleteTeacherAsync(int id)
        {
            using var res = await _client.DeleteAsync($"teacher/{id}");
            res.EnsureSuccessStatusCode();
            var str = await res.Content.ReadAsStringAsync();
            Console.WriteLine(str);
            return Convert.ToBoolean(str);
        }

        public Task<IEnumerable<Student>?> GetStudents()
            => _client.GetFromJsonAsync<IEnumerable<Student>>("students");

        public Task<Student?> GetStudent(int id)
            => _client.GetFromJsonAsync<Student>($"student/{id}");

        public async Task<int> CreateStudentAsync(Student student)
        {
            using var res = await _client.PostAsJsonAsync("student", student);
            res.EnsureSuccessStatusCode();
            var str = await res.Content.ReadAsStringAsync();
            return Convert.ToInt32(str);
        }

        public async Task UpdateStudentAsync(Student student)
        {
            using var res = await _client.PutAsJsonAsync("student", student);
            res.EnsureSuccessStatusCode();
        }

        public async Task<bool> DeleteStudentAsync(int id)
        {
            using var res = await _client.DeleteAsync($"student/{id}");
            res.EnsureSuccessStatusCode();
            var str = await res.Content.ReadAsStringAsync();
            return Convert.ToBoolean(str);
        }

    }
}
