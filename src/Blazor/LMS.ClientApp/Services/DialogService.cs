using Microsoft.JSInterop;

namespace LMS.ClientApp.Services
{
    public class DialogService(AppState state, IJSRuntime js)
    {

        public DialogContext<bool> Confirmation { get; } = new(js, "#confirm-dialog");


    }
}
