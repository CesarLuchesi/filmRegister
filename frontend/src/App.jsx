import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchfilms } from "./features/films/filmSlice";
import { useEffect } from "react";

function App() {
  const films = useSelector((state) => state.films);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchfilms());
  }, [dispatch]);
  console.log({ films });

  return (
    <div>
      <h1>Meu Cinema</h1>
      {films.loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {films.list.map((film) => (
            <li key={film.id}>{film.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
