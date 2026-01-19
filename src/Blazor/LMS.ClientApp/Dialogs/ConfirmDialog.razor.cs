using LMS.ClientApp.Services;

namespace LMS.ClientApp.Dialogs
{
    public partial class ConfirmDialog(DialogService service, AppState state) : IDisposable
    {

        protected override void OnInitialized()
        {
            state.ConfirmMessageChanged += StateChanged;
        }

        private void StateChanged()
        {
            StateHasChanged();
        }

        Task YesAsync()
        {
            return service.Confirmation.CloseAsync(true);
        }

        public void Dispose()
        {
            state.ConfirmMessageChanged -= StateChanged;
        }

    }
}
