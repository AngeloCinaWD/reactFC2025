import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// url per api appwrite
const BASE_URL = import.meta.env.VITE_APPWRITE_BASE_URL;

// creo un client appwrite per comunicare col DB
const client = new Client().setEndpoint(BASE_URL).setProject(PROJECT_ID);

const database = new Databases(client);
export const updateSearchCount = async (searchTerm, movie) => {
  // 1. use appwrite SDK to check if the search term exists in the database
  try {
    // se non passo nulla nell'array con la query mi vengono ritornati tutti i documents della collection
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ]);

    // 2. if it exists update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0];

      // aggiorno il count di questo documento
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      // 3. if not, create the document and update the count as 1
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: movie.poster_path
          ? import.meta.env.VITE_MOVIE_POSTER_URL + movie.poster_path
          : null,
        movie_title: movie.title,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// metodo che restituisce i film secondo quante volte un film è stato cercato
export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);

    return result.documents;
  } catch (error) {
    console.log(error);
  }
};
