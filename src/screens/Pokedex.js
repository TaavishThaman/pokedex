import Header from "../components/Header";
import PokemonList from "../components/PokemonList";

function Pokedex() {
    return (
        <div>
            <Header heading={"Pokedex"}></Header>
            <PokemonList></PokemonList>
        </div>
    );
}

export default Pokedex;