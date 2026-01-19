
namespace LMS.ClientApp.Services
{
    public class AppState
    {

        TaskCompletionSource<bool>? confirmSource;

        public event Action? StateChanged;

        public void NotifyChanged()
        {
            StateChanged?.Invoke();
        }

        public void SendConfirmation(bool result)
        {
            confirmSource?.TrySetResult(result);
            confirmSource = null;
        }

        public Task<bool> WaitForConfirmationAsync()
        {
            confirmSource ??= new();
            return confirmSource.Task;
        }

    }
}
