

window.openModal = (selector) => {
    var modal = bootstrap.Modal.getOrCreateInstance(selector)
    modal.show();
}

window.closeModal = (selector) => {
    var modal = bootstrap.Modal.getOrCreateInstance(selector)
    modal.hide();
}

window.init = () => {
    document.querySelectorAll('.modal').forEach(modalEl => {
        modalEl.addEventListener('hidden.bs.modal', () => {
            DotNet.invokeMethodAsync("LMS.ClientApp", "InvokeDialogClosed", modalEl.id);
        });
    });
}