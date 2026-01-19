using LMS.ClientApp.Models;

namespace LMS.ClientApp.Services
{
    public class AppState
    {

        public event Action? StateChanged;

        public void NotifyChanged()
        {
            StateChanged?.Invoke();
        }

    }
}
