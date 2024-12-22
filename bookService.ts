import { IBook, books } from './books';
import { IAuthor, authors } from './authors';

interface IBookService {
  getBooks(): Array<IBook>;
  getBookById(id: number): IBook | undefined;
  getAuthors(): Array<IAuthor>;
  getAuthorById(id: number): IAuthor | undefined;
  getBooksByAuthor(value: number | string): Array<IBook> | undefined;
  getAuthorByBookId(id: number): string | undefined;
  search(property: string): Array<IBook> | undefined;
}

class Library implements IBookService {
  name: string;
  books: Array<IBook> = books;
  authors: Array<IAuthor> = authors;

  constructor(name: string) {
    this.name = name;
  }

  getBooks(): Array<IBook> {
    return this.books;
  }

  getBookById(id: number): IBook | undefined {
    return this.books.find((book) => book.id === id);
  }

  getAuthors(): Array<IAuthor> {
    return this.authors;
  }

  getAuthorById(id: number): IAuthor | undefined {
    return this.authors.find((author) => author.id === id);
  }

  getBooksByAuthor(value: number | string): Array<IBook> | undefined {
    const author = this.authors.find((author) =>
      typeof value === 'number' ? author.id === value : author.name === value
    );
    return author?.booksByAuthor;
  }

  getAuthorByBookId(id: number): string | undefined {
    const author = this.authors.find((author) =>
      author.id === id ? author : undefined
    );
    return author?.name;
  }
  search(property: string): Array<IBook> | undefined {
    return this.books.filter((book) => Object.values(book).includes(property));
  }
}

const myLibrary = new Library('KyivLibrary');

console.log(myLibrary.getBooks());
console.log(myLibrary.getBookById(8));
console.log(myLibrary.getAuthors());
console.log(myLibrary.getAuthorById(9));
console.log(myLibrary.getAuthorByBookId(5));
console.log(myLibrary.getBooksByAuthor('Ryon Alster'));
console.log(myLibrary.search('Thriller'));
console.log(myLibrary.search('Alpha Dog'));
console.log(myLibrary.search('11/15/2009'));
console.log(myLibrary.search('Maurita Konertz'));
