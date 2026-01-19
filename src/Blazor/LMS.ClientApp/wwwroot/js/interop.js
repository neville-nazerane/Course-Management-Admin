

window.openModal = (selector) => {
    var modal = bootstrap.Modal.getOrCreateInstance(selector)
    modal.toggle();
}