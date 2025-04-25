import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import Header from "./components/Header";
import FilmList from "./features/films/filmList";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/filmes" element={<FilmList />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
