using LMS.ClientApp.Services;
using LMS.Models;

namespace LMS.ClientApp.Dialogs
{
    public partial class StudyProgramEditorDialog(ApiConsumer consumer,
                                                 DialogService dialogService,
                                                 AppState state)
    {
        StudyProgram? model;

        protected override void OnInitialized()
        {
            state.EditingStudyProgramChanged += State_EditingStudyProgramChanged;
        }

        private void State_EditingStudyProgramChanged()
        {
            model = state.EditingStudyProgram;
            StateHasChanged();
        }

        public async Task SaveAsync()
        {
            if (model is null) return;

            if (model.Id == 0)
            {
                var id = await consumer.CreateStudyProgramAsync(model);
                await dialogService.StudyProgramEditor.CloseAsync(id);
            }
            else
            {
                await consumer.UpdateStudyProgramAsync(model);
                await dialogService.StudyProgramEditor.CloseAsync(model.Id);
            }
        }
    }

}
