using LMS.ClientApp.Services;
using Microsoft.JSInterop;

namespace LMS.ClientApp.Layout
{
    public partial class MainLayout(AppState appState, IJSRuntime js) : IDisposable
    {
        
        protected override void OnInitialized()
        {
            appState.StateChanged += AppState_StateChanged;
            base.OnInitialized();
        }

        private void AppState_StateChanged()
        {
            StateHasChanged();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await js.InvokeVoidAsync("window.init");
        }

        public void Dispose()
        {
            appState.StateChanged -= AppState_StateChanged;
        }

    }
}
