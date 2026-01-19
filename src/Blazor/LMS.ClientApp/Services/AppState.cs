
using LMS.Models;

namespace LMS.ClientApp.Services
{
    public class AppState
    {

        public string? ConfirmMessage { get; private set; }
        public Teacher? EditingTeacher { get; private set; }


        public event Action? ConfirmMessageChanged;
        public event Action? EditingTeacherChanged;

        public event Action? StateChanged;

        public void NotifyChanged()
        {
            StateChanged?.Invoke();
        }

        public void SetConfirmMessage(string msg)
        {
            ConfirmMessage = msg;
            ConfirmMessageChanged?.Invoke();
        }

        public void SetEditingTeacher(Teacher? teacher)
        {
            EditingTeacher = teacher;
            EditingTeacherChanged?.Invoke();
        }

    }
}
