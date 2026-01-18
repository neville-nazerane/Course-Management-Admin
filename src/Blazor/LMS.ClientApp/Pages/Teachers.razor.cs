
using LMS.ClientApp.Services;
using LMS.Models;

namespace LMS.ClientApp.Pages
{
    public partial class Teachers(ApiConsumer consumer)
    {
        IEnumerable<Teacher> teachers = [];

        protected override async Task OnInitializedAsync()
        {
            teachers = (await consumer.GetTeachers()) ?? [];
        }

    }
}
