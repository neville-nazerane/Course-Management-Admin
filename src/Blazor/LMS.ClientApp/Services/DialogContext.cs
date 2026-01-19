using Microsoft.JSInterop;

namespace LMS.ClientApp.Services
{

    public class DialogContext<TResult>(IJSRuntime js, 
                                        string id)
    {

        public string Id { get; } = id;

        TaskCompletionSource<TResult>? completionSource;

        string Selector => $"#{Id}";

        public async Task<TResult> OpenAsync()
        {
            completionSource?.TrySetCanceled();
            completionSource = new();
            await js.InvokeVoidAsync("window.openModal", Selector);
            return await completionSource.Task;
        }

        public async Task CloseAsync(TResult result)
        {
            completionSource?.TrySetResult(result);
            completionSource = null;
            await js.InvokeVoidAsync("window.closeModal", Selector);
        }

    }
}
