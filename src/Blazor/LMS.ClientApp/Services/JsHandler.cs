using Microsoft.JSInterop;

namespace LMS.ClientApp.Services
{
    public static class JsHandler
    {

        public static event Action<string>? DialogClosed;

        [JSInvokable]
        public static void InvokeDialogClosed(string id)
        {
            DialogClosed?.Invoke(id);
        }

    }
}
