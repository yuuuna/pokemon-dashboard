import Layout from "@/components/layout";
import { useCallback, useEffect, useState } from "react";
import styles from './pokedex.module.scss';

class Pokemon {
  name: string = '';
  id: number = 0;
}

// 取得到清單資料，後續可考慮帶入世代，並抽出去
function GetData() {

  const fetchPokemonList = () => {
    // TODO: 目前寫死第一世代
    const data = fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151').then((res) => res.json());
    return data
  };

  const fetchPokemonData = async (name: string) => {
    const data = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json());
    return data;
  };

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const gridData = useCallback(() => {
    setPokemons([]);
    setIsLoading(true);
    fetchPokemonList().then(async (data) => {
      const lists: Pokemon[] = [];

      await Promise.all(data.results.map(async (pokemon: Pokemon) => {
        const p = await fetchPokemonData(pokemon.name);
        lists[p.id] = p;
      }));
      setPokemons(lists);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    gridData();
  }, []);

  return {
    pokemons,
    isLoading
  }

}

export default function Pokedex() {

  const { pokemons, isLoading } = GetData();
  // TODO: Loading 做個圖片呈現
  if (isLoading) {
    return null;
  }
  const pokemonData = pokemons.map(function (pokemon) {
    return (
      <div className={styles.card} key={pokemon.id}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + pokemon.id + ".svg"} alt={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} />
      </div>
    )
  });

  return (
    <Layout>
      <div className={styles.cardArea}>
        {pokemonData}
      </div>
    </Layout>
  )
}