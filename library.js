// modal logic
let modal = document.querySelector('#myModal');
let btnModal = document.querySelector('#btnModal');
let spans = document.querySelectorAll('span');
btnModal.onclick = () => modal.style.display = 'block';
spans.forEach(span => span.onclick = () => modal.style.display = 'none');

window.onclick = e => {
    if (e.target === modal) modal.style.display = 'none';
};


const btnAdd = document.querySelector('#btnAddBook');
btnAdd.addEventListener('click', evt => {
    evt.preventDefault();
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let numPages = document.querySelector('#numPages');
    addBookToLibrary(new Book(title.value, author.value, numPages.value));
    title.value = "";
    author.value = "";
    numPages.value = "";
    render();
});

// the constructor...
function Book(title, author, numPages) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.status = ['no read', 'reading', 'read'];
}

function addBookToLibrary(book) {
    localStorage.setItem(putKey(), JSON.stringify(book));
}

function putKey() {
    let value = 0;
    Object.keys(localStorage).forEach(k => (Number(k) >= value) ? value = Number(k) : null);
    return String(value + 1);
}

function changeStatus(ev) {
    let msg = ev.target.textContent;
    let newMsg = '';
    switch (msg) {
        case 'no read':
            newMsg = 'reading';
            break;
        case 'reading':
            newMsg = 'read';
            break;
        case 'read':
            newMsg = 'no read';
            break;
    }
    ev.target.textContent = newMsg;

}

function render() {
    const container = document.querySelector('.container');
    while (container.firstChild) container.removeChild(container.firstChild);
    let booksLocalStorage = Object.keys(localStorage);
    booksLocalStorage.forEach(i => {
        let book = JSON.parse(localStorage.getItem(i));
        renderBook(book, i);
    });
}

function deleteBook(e) {
    let idBook = e.target.parentElement.dataset.book;
    localStorage.removeItem(idBook);
    render();
}

function renderBook(book, index) {
    let div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-book', String(index));
    let h4 = document.createElement('h4');
    h4.textContent = book.title;
    let h5 = document.createElement('h5');
    h5.textContent = book.author;
    let p = document.createElement('p');
    p.textContent = book.numPages;
    let pEstado = document.createElement('p');
    pEstado.classList.add('estado');
    pEstado.textContent = book.status[0];
    pEstado.addEventListener("click", changeStatus);
    let btnDelete = document.createElement('a');
    btnDelete.textContent = 'x';
    btnDelete.addEventListener('click', deleteBook);
    div.append(h4, h5, p, pEstado, btnDelete);
    document.querySelector('.container').appendChild(div);
}

render();