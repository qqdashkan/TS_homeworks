import { IAuthor } from './authors';

export interface IBook {
  id: number;
  name: string;
  authorName: IAuthor['name'];
  categorie: string;
  releaseDate: string;
}
export let books = [
  {
    id: 1,
    name: 'The Man Who Played God',
    authorName: 'Thomasin Wanjek',
    categorie: 'Comedy|Drama|Musical',
    releaseDate: '7/14/2024',
  },
  {
    id: 2,
    name: 'Torrente 3: El protector',
    authorName: 'Christoffer Crang',
    categorie: 'Thriller',
    releaseDate: '8/17/2020',
  },
  {
    id: 3,
    name: 'Late Autumn (Akibiyori)',
    authorName: 'Thomasin Wanjek',
    categorie: 'Comedy',
    releaseDate: '2/6/1999',
  },
  {
    id: 4,
    name: 'Deadly Mantis, The',
    authorName: 'Ryon Alster',
    categorie: 'Drama|Romance',
    releaseDate: '11/3/2012',
  },
  {
    id: 5,
    name: 'Three Worlds (Trois mondes)',
    authorName: 'Thomasin Wanjek',
    categorie: 'Comedy|Crime',
    releaseDate: '1/17/2020',
  },
  {
    id: 6,
    name: 'Alpha Dog',
    authorName: 'Ryon Alster',
    categorie: 'Drama',
    releaseDate: '12/18/1964',
  },
  {
    id: 7,
    name: 'Liliom',
    authorName: 'Ryon Alster',
    categorie: 'Drama',
    releaseDate: '2/14/2000',
  },
  {
    id: 8,
    name: "Dr. Bronner's Magic Soapbox",
    authorName: 'Ryon Alster',
    categorie: 'Drama|Horror|Thriller',
    releaseDate: '8/1/2004',
  },
  {
    id: 9,
    name: 'Dirty Dozen, The: The Fatal Mission',
    authorName: 'Christoffer Crang',
    categorie: 'Horror|Thriller',
    releaseDate: '11/15/2009',
  },
  {
    id: 10,
    name: 'Otra Familia, La',
    authorName: 'Maurita Konertz',
    categorie: 'Documentary',
    releaseDate: '4/3/2021',
  },
];
