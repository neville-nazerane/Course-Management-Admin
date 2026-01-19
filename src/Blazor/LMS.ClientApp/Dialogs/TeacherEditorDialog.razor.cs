using LMS.ClientApp.Services;
using LMS.Models;

namespace LMS.ClientApp.Dialogs
{
    public partial class TeacherEditorDialog(ApiConsumer consumer,
                                             DialogService dialogService,
                                             AppState state)
    {

        Teacher? model;

        protected override void OnInitialized()
        {
            state.EditingTeacherChanged += State_EditingTeacherChanged;
        }

        private void State_EditingTeacherChanged()
        {
            model = state.EditingTeacher;
            StateHasChanged();
        }

        public async Task SaveAsync()
        {
            if (model is null) return;

            if (model.Id == 0)
            {
                var id = await consumer.CreateTeacherAsync(model);
                await dialogService.TeacherEditor.CloseAsync(id);
            }
            else
            {
                await consumer.UpdateTeacherAsync(model);
                await dialogService.TeacherEditor.CloseAsync(model.Id);
            }
        }

    }
}
