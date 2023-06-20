import PokemonDetails from "./screens/PokemonDetails";
import Home from "./screens/Home";
import Pokedex from "./screens/Pokedex";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="pokedex" element={<Pokedex />} />
        <Route path="pokemon/:name" element={<PokemonDetails/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
