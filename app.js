

 class Book {
   constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    
    
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book)=> UI.addBookToList(book));
      
   
  }


  static addBookToList(book) {
  const list = document.querySelector('#book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.pages}</td>
  
  <td> <a href="#" class="btn btn-danger btn-sm delete">Delete </a></td>
  `;
  list.appendChild(row);
}
   static deleteBook(el) {
     if(el.classList.contains('delete')) {
       el.parentElement.parentElement.remove();
     }
    }
    
    static clearField() {
      document.querySelector('#title').value= '';
      document.querySelector('#author').value= '';
      document.querySelector('#pages').value= '';
      
    }
  }
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books= [];
    } else {

      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

 static removeBook(title) {
  const books = Store.getBooks();
  books.forEach((book, index) => {
    if(book.title === title) {
      book.splice(index, 1);

    }
  });
  localStorage.setItem( 'books' , 
  JSON.stringify(books));
  }
}
document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('#book-form').addEventListener( 'submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  
if (title === '' || author === '' || pages==='')
{ UI.showAlert('Please fill in all fields', 'danger');

} else {
  const book = new Book(title, author, pages);
  UI.addBookToList(book);
  Store.addBook(book);
 

}

});
document.querySelector('#book-list').addEventListener('click', (e)=> {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
});
