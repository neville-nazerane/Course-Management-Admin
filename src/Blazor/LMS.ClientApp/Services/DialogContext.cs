using Microsoft.JSInterop;

namespace LMS.ClientApp.Services
{

    public class DialogContext<TResult>(IJSRuntime js, 
                                        string selector)
    {

        TaskCompletionSource<TResult>? completionSource;

        public async Task OpenAsync()
        {
            completionSource?.TrySetCanceled();
            completionSource = new();
            await js.InvokeVoidAsync("window.openModal", selector);
        }

        public async Task CloseAsync(TResult result)
        {
            completionSource?.TrySetResult(result);
            completionSource = null;
            await js.InvokeVoidAsync("window.closeModal", selector);
        }

    }
}
