

window.openModal = (selector) => {
    var modal = bootstrap.Modal.getOrCreateInstance(selector)
    modal.show();
}

window.closeModal = (selector) => {
    var modal = bootstrap.Modal.getOrCreateInstance(selector)
    modal.hide();
}