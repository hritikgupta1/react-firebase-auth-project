import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db } from './config/firebase';
import { auth } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const [movieList, setMovieList] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const moviesCollectionRef = collection(db, "movies");

  //New movie state

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(false);

  //update title state
  const [updatedTitle, setUpdateTitle] = useState("");


  const onSubmitMovie = async () => {
    try {

      await addDoc(moviesCollectionRef, { title: newMovieTitle, releaseDate: newReleaseDate, receivedOscar: newMovieOscar, userId: auth?.currentUser?.uid });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  //get movie
  const getMovieList = async () => {

    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  //delete movie
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  //Update movie title
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };

  useEffect(() => {

    
    // getMovieList();

    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
      if (user) getMovieList();
    });

    return () => unsubscribe(); // Clean up listener

  }, [onSubmitMovie]);

  return (
    <div className='App'>
      <h1 className="app-title">CRUD Movies Database</h1>
      <Auth />

      {isAuth && (
        <>
          <div className="movie-form">
            <input placeholder='Movie title...' type="text" onChange={(e) => setNewMovieTitle(e.target.value)} />
            <input placeholder='Release Year...' type="number" onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
            <label>
              <input type="checkbox" checked={newMovieOscar} onChange={(e) => setNewMovieOscar(e.target.checked)} />
              Received Oscar
            </label>
            <button onClick={onSubmitMovie}>Submit Movie</button>
          </div>

          <div className="movie-list">
            {movieList.map((movie) => (
              <div key={movie.id} className="movie-card">
                <h2 className={movie.receivedOscar ? "green" : "red"}>{movie.title}</h2>
                <p><strong>Release Year:</strong> {movie.releaseDate}</p>
                <div className="actions">
                  <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                  <input placeholder="New Title..." type="text" onChange={(e) => setUpdateTitle(e.target.value)} />
                  <button onClick={() => updateMovieTitle(movie.id)}>Update</button>
                </div>
              </div>
            ))}
          </div>

        </>
      )}
    </div>

  );
}

export default App
