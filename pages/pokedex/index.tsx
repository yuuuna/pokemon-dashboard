import Layout from "@/components/layout";
import { useCallback, useEffect, useState } from "react";
import styles from './pokedex.module.scss';

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

  const [pokemons, setPokemons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const gridData = useCallback(() => {
    setPokemons([]);
    setIsLoading(true);
    fetchPokemonList().then(async (data) => {
      const lists: any[] = [];

      await Promise.all(data.results.map(async (pokemon: any) => {
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
    return <>Loading...</>;
  }
  console.log(pokemons);
  const pokemonData = pokemons.map(function (pokemon) {
    return (
      <div className={styles.card + ` type-${pokemon.types[0].type.name}`} key={pokemon.id}>
        <div className={styles.cardTitle}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </div>
        <div className={styles.cardImage}>
          <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + pokemon.id + ".svg"} alt={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} />
        </div>
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
