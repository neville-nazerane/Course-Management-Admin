
using LMS.ClientApp.Services;
using LMS.ClientApp.Utilities;
using LMS.Models;
using System.Data;
using System.Text.Json;

namespace LMS.ClientApp.Pages
{
    public partial class Teachers(ApiConsumer consumer,
                                  DialogService dialogService,
                                  AppState state)
    {
        IEnumerable<Teacher> teachers = [];

        protected override async Task OnInitializedAsync()
        {
            teachers = (await consumer.GetTeachersAsync()) ?? [];
        }

        async Task AddAsync()
        {
            state.SetEditingTeacher(new()
            {
                FirstName = string.Empty,
                LastName = string.Empty,
                DateOfBirth = DateTime.Now.AddYears(-2),
                HiredOn = DateTime.Now,
            });
            var id = await dialogService.TeacherEditor.OpenAsync();
            if (id != 0)
            {
                var newTeacher = await consumer.GetTeacherAsync(id);
                if (newTeacher is null) return;
                teachers = [..teachers.Union([newTeacher])];
                StateHasChanged();
            }
        }

        async Task EditTeacherAsync(Teacher teacher)
        {
            state.SetEditingTeacher(await teacher.DeepCopyAsync());
            var id = await dialogService.TeacherEditor.OpenAsync();
            if (id == 0) return;
            var updated = await consumer.GetTeacherAsync(id);
            if (updated is null)
            {
                Console.WriteLine("Teacher went missing");
                return;
            }
            teachers = [..teachers.Select(t => t.Id == id ? updated : t)];
            StateHasChanged();
        }

        async Task DeleteAsync(Teacher teacher)
        {
            state.SetConfirmMessage($"Are you sure you want to delete {teacher.FirstName}?");
            var res = await dialogService.Confirmation.OpenAsync();
            if (res)
            {
                await consumer.DeleteTeacherAsync(teacher.Id);
                teachers = [.. teachers.Where(t => t.Id != teacher.Id)];
                StateHasChanged();
            }
        }

    }
}
