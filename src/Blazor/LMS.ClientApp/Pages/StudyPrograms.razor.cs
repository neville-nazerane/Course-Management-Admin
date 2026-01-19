using LMS.ClientApp.Services;
using LMS.ClientApp.Utilities;
using LMS.Models;

namespace LMS.ClientApp.Pages
{
    public partial class StudyPrograms(ApiConsumer consumer,
                                      DialogService dialogService,
                                      AppState state)
    {
        IEnumerable<StudyProgram> studyPrograms = [];

        protected override async Task OnInitializedAsync()
        {
            studyPrograms = (await consumer.GetStudyProgramsAsync()) ?? [];
        }

        async Task AddAsync()
        {
            state.SetEditingStudyProgram(new()
            {
                Name = string.Empty,
                Code = string.Empty,
            });

            var id = await dialogService.StudyProgramEditor.OpenAsync();
            if (id != 0)
            {
                var newProgram = await consumer.GetStudyProgramAsync(id);
                if (newProgram is null) return;
                studyPrograms = [.. studyPrograms.Union([newProgram])];
                StateHasChanged();
            }
        }

        async Task EditAsync(StudyProgram program)
        {
            state.SetEditingStudyProgram(await program.DeepCopyAsync());
            var id = await dialogService.StudyProgramEditor.OpenAsync();
            if (id == 0) return;

            var updated = await consumer.GetStudyProgramAsync(id);
            if (updated is null)
            {
                Console.WriteLine("StudyProgram went missing");
                return;
            }

            studyPrograms = [.. studyPrograms.Select(p => p.Id == id ? updated : p)];
            StateHasChanged();
        }

        async Task DeleteAsync(StudyProgram program)
        {
            state.SetConfirmMessage($"Are you sure you want to delete {program.Name}?");
            var res = await dialogService.Confirmation.OpenAsync();
            if (res)
            {
                await consumer.DeleteStudyProgramAsync(program.Id);
                studyPrograms = [.. studyPrograms.Where(p => p.Id != program.Id)];
                StateHasChanged();
            }
        }
    }

}
