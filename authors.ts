import { IBook, books } from './books';

export interface IAuthor {
  id: number;
  name: string;
  booksByAuthor: Array<IBook>;
}

function getAuthorBooks(name: string): Array<IBook> {
  const data = books.filter(({ authorName }) => authorName === name);
  return data;
}

export let authors = [
  {
    id: 1,
    name: 'Thomasin Wanjek',
    booksByAuthor: getAuthorBooks('Thomasin Wanjek'),
  },
  {
    id: 2,
    name: 'Thomasin Wanjek',
    booksByAuthor: getAuthorBooks('Thomasin Wanjek'),
  },
  {
    id: 3,
    name: 'Thomasin Wanjek',
    booksByAuthor: getAuthorBooks('Thomasin Wanjek'),
  },
  {
    id: 4,
    name: 'Ryon Alster',
    booksByAuthor: getAuthorBooks('Ryon Alster'),
  },
  {
    id: 5,
    name: 'Ryon Alster',
    booksByAuthor: getAuthorBooks('Ryon Alster'),
  },
  {
    id: 6,
    name: 'Ryon Alster',
    booksByAuthor: getAuthorBooks('Ryon Alster'),
  },
  {
    id: 7,
    name: 'Ryon Alster',
    booksByAuthor: getAuthorBooks('Ryon Alster'),
  },
  {
    id: 8,
    name: 'Christoffer Crang',
    booksByAuthor: getAuthorBooks('Christoffer Crang'),
  },
  {
    id: 9,
    name: 'Christoffer Crang',
    booksByAuthor: getAuthorBooks('Christoffer Crang'),
  },
  {
    id: 10,
    name: 'Maurita Konertz',
    booksByAuthor: getAuthorBooks('Maurita Konertz'),
  },
];
