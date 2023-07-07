import { useCallback, useEffect, useState } from "react";
import styles from './pokedex.module.scss';

export default function Pokedex() {

  const [pokemonsList, setPokemonsList] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151);


  function ReGetData({ a = 0, b = 20 }) {
    setOffset(a);
    setLimit(b);
  }

  function GetData() {
    const fetchPokemonList = async () => {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).then((res) => res.json());
      return data
    };

    const fetchPokemonData = async (name: string) => {
      const data = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json());
      return data;
    };

    const gridData = useCallback(async () => {
      setPokemonsList([]);
      setIsSuccess(true);
      await fetchPokemonList().then(async (data) => {
        const lists: any[] = [];

        await Promise.all(data.results.map(async (pokemon: any) => {
          const p = await fetchPokemonData(pokemon.name);
          lists[p.id] = p;
        }));
        setPokemonsList(lists);
        setIsSuccess(false);
      });
    }, [offset, limit]);

    useEffect(() => {
      gridData();
    }, [offset, limit]);

    return {
      pokemons: pokemonsList,
      isLoading: isSuccess
    }

  }

  const { pokemons, isLoading } = GetData();

  function GetPokemonId(id: number) {
    let idString = '';
    if (id >= 1000) {
      idString = id.toString();
    } else {
      idString = ('00' + id.toString()).substr(-3);
    }
    return (
      <>
        #{idString}
      </>
    );
  }

  // TODO: Loading 做個圖片呈現
  const pokemonData = isLoading ? <>Loading...</> : pokemons.map(function (pokemon) {
    return (
      <div className={styles.card + ` type-${pokemon.types[0].type.name}`} key={pokemon.id}>
        <div className={styles.cardIdWrap}>
          <div className={styles.cardId}>{GetPokemonId(pokemon.id)}</div>
        </div>
        <div className={styles.cardTitle}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </div>
        <div className={styles.cardImage}>
          <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/" + (pokemon.id < 650 ? "dream-world" : "official-artwork") + "/" + pokemon.id + (pokemon.id < 650 ? ".svg" : ".png")} alt={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} />
        </div>
      </div>
    )
  });

  return (
    <>
      <div className={styles.area}>
        <div>地區</div>
        <div className={styles.areaList}>
          {/* TODO: 改迴圈 & 增加圖鑑 icon */}
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 0, b: 151 })}>關東</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 151, b: 100 })}>城都</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 251, b: 135 })}>豐原</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 386, b: 107 })}>神奧</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 493, b: 156 })}>合眾</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 649, b: 72 })}>卡洛斯</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 721, b: 88 })}>阿羅拉</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 809, b: 89 })}>伽勒爾</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 898, b: 7 })}>洗翠</div>
          <div className={styles.areaItem} onClick={() => ReGetData({ a: 905, b: 105 })}>帕底亞</div>
        </div>
      </div>
      <div className={styles.cardArea}>
        {pokemonData}
      </div>
    </>
  )
}
