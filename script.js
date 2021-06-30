let library = [];

function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

function addBookToLibrary(book) {
    let bookIndex = library.length;
    library.push(book);
    let bookTable = document.querySelector('.book-table')
    let newRow = document.createElement("tr");

    for (let key in book){
        let cellText = document.createTextNode(book[key]);
        let cell = document.createElement('td');

        cell.appendChild(cellText);
        newRow.appendChild(cell);
    }

    let readButton = document.createElement('input')
    readButton.setAttribute('type', 'button')
    readButton.setAttribute('value', 'Read')
    readButton.addEventListener(type="click", (e => {
        book.read = !book.read;
        newRow.children[3].innerText = book.read;
        updateStorage();
    }))

    let removeButton = document.createElement('input')
    removeButton.setAttribute('type', 'button')
    removeButton.setAttribute('value', 'Remove')
    removeButton.addEventListener(type="click", e => {
        library.splice(bookIndex, 1);
        newRow.remove();
        updateStorage();
    })

    newRow.appendChild(readButton);
    newRow.appendChild(removeButton);

    bookTable.appendChild(newRow);

}

function updateStorage() {
    localStorage.setItem('books', JSON.stringify(library))
}

function newBook(e) {
    let book = new Book(prompt("Enter the book title:"),
                        prompt("Enter the name of the author:"),
                        parseInt(prompt("Enter the number of pages:")),
                        prompt("Have you read the book? (blank for no, anything for yes)") !== "");

    addBookToLibrary(book);
}

document.querySelector('.new-book-button').addEventListener(type="click", newBook)

let stored = localStorage.getItem('books')
if (stored !== null) {
    let bookArray = JSON.parse(stored);
    bookArray.forEach(book => {
        addBookToLibrary(book)
    });
}
