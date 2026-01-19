using LMS.ClientApp.Models;
using Microsoft.JSInterop;

namespace LMS.ClientApp.Services
{
    public class DialogService(AppState state, IJSRuntime js)
    {

        public async Task<bool> ShowConfirmAsync()
        {
            state.NotifyChanged();
            await js.InvokeVoidAsync("window.openModal", "#confirm-dialog");
            return false;
        }

    }
}
