import { gql } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`;

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`;

const SET_AUTHOR_BIRTHYEAR = gql`
  mutation setAuthorBirthyear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
    }
  }
`;

export default { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, SET_AUTHOR_BIRTHYEAR };
