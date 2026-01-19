using LMS.ClientApp.Services;

namespace LMS.ClientApp.Layout
{
    public partial class MainLayout(AppState appState) : IDisposable
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

        public void Dispose()
        {
            appState.StateChanged -= AppState_StateChanged;
        }

    }
}
