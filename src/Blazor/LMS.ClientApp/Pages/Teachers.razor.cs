
using LMS.ClientApp.Services;
using LMS.Models;

namespace LMS.ClientApp.Pages
{
    public partial class Teachers(ApiConsumer consumer, DialogService dialogService)
    {
        IEnumerable<Teacher> teachers = [];

        protected override async Task OnInitializedAsync()
        {
            teachers = (await consumer.GetTeachers()) ?? [];
        }

        async Task AddAsync()
        {
            Console.WriteLine("hello world");
            await dialogService.ShowConfirmAsync();
        }

    }
}
