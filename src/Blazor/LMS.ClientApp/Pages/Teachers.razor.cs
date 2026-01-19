
using LMS.ClientApp.Services;
using LMS.Models;

namespace LMS.ClientApp.Pages
{
    public partial class Teachers(ApiConsumer consumer,
                                  DialogService dialogService,
                                  AppState state)
    {
        IEnumerable<Teacher> teachers = [];

        protected override async Task OnInitializedAsync()
        {
            teachers = (await consumer.GetTeachers()) ?? [];
        }

        async Task AddAsync()
        {
        }

        public async Task DeleteAsync(Teacher teacher)
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
