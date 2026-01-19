using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace LMS.ClientApp.Services
{
    public class DialogService : IDisposable
    {
        private readonly Dictionary<string, Func<Task>> closers = [];

        public DialogContext<bool> Confirmation { get; }

        public DialogService(IJSRuntime js)
        {
            AddCloser(Confirmation = new(js, "confirm-dialog"));

            JsHandler.DialogClosed += DialogClosed;
        }

        void AddCloser<TResult>(DialogContext<TResult> context)
        {
            closers.Add(context.Id, () => context.CloseAsync(default));
        }

        async void DialogClosed(string id)
        {
            if (!closers.TryGetValue(id, out var value))
            {
                Console.WriteLine("Did not find context for " + id);
                return;
            }
            await value.Invoke();
        }

        public void Dispose()
        {
            JsHandler.DialogClosed -= DialogClosed;
        }
    }
}
