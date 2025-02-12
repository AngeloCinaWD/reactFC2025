import { Client, Databases, ID, Query } from 'appwrite';

// creiamo un file .js per controllare che la connessione ad appwrite funzioni
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// url per api appwrite
const BASE_URL = import.meta.env.VITE_APPWRITE_BASE_URL;

// creo un client appwrite per comunicare col DB
const client = new Client().setEndpoint(BASE_URL).setProject(PROJECT_ID);

const database = new Databases(client);

// esporto una funzione con un console log delle tre variabili
// export const updateSearchCount = async () => {
//   console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);
// };

// questa funzione serve per tenere traccia di quale film è stato più cercato
// accetta 2 parametri: il termine di ricerca ed il film associato alla ricerca (il primo film che viene trovato secondo il parametro di ricerca)
export const updateSearchCount = async (searchTerm, movie) => {
  // 1. use appwrite SDK to check if the search term exists in the database
  try {
    // cerco nel db con quell'id, nella collection con quella id un document con quel valore di searchTerm per l'attributo searchTerm che ho creato nella collection
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
        poster_url: import.meta.env.VITE_MOVIE_POSTER_URL + movie.poster_path,
        movie_title: movie.title,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
