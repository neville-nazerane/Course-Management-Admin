
namespace LMS.ClientApp.Services
{
    public class AppState
    {

        public string? ConfirmMessage { get; private set; }

        public event Action? ConfirmMessageChanged;

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

    }
}
