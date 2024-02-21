import BingoBoard from "./BingoBoard";

const BingoApp: React.FC = () => {
  const pokemonBingoBoard: string[][] = [
    ["Zapdos", "Charmander", "Squirtle", "Bulbasaur", "Jigglypuff"],
    ["Eevee", "Snorlax", "Mewtwo", "Gyarados", "Magikarp"],
    ["Blastoise", "Articuno", "Pikachu", "Moltres", "Venusaur"],
    ["Raichu", "Dragonite", "Lugia", "Ho-Oh", "Mew"],
    ["Meowth", "Psyduck", "Gengar", "Charizard", "Machamp"],
  ];

  return (
    <div className="bingo-app">
      <BingoBoard board={pokemonBingoBoard} />
    </div>
  );
};

export default BingoApp;
