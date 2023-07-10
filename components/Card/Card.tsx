import styles from './Card.module.scss';
import Image from 'next/image';

/**
 * 取得 Pokemon 圖鑑編號(補 0)
 * @param id 
 * @returns 圖鑑編號
 */
function GetPokemonId(id: number) {
  let idString = '';
  if (id >= 1000) {
    idString = id.toString();
  } else {
    idString = ('00' + id.toString()).substr(-3);
  }
  return `#${idString}`;
}

/**
 * 取得 Pokemon 圖片路徑
 * @param id 
 * @returns string 路徑
 */
function GetPokemonImg(id: number) {
  const isNewLasts = (id >= 650);
  const spriteSource = (isNewLasts ? 'official-artwork' : 'dream-world');
  const spriteType = (isNewLasts ? '.png' : '.svg');
  const srcUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/' + spriteSource + '/' + id + spriteType;
  return srcUrl;
}

export default function Card({ pokemon }: any) {
  if (!pokemon) {
    return null;
  }
  const { name, id, types } = pokemon;
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <div className={styles.card + ` type-${types[0].type.name}`}>
        <div className={styles.cardTypeArea}>
          {types.map(function (item: any) {
            return (
              <div className={styles.cardType} key={id + '-' + item.type.name}>
                <Image src="/images/types/fire.png" alt="1" width="30" height="30" />
              </div>
            )
          })}
        </div>
        <div className={styles.cardIdWrap}>
          <div className={styles.cardId}>{GetPokemonId(id)}</div>
        </div>
        <div className={styles.cardTitle}>
          {pokemonName}
        </div>
        <div className={styles.cardImage}>
          <img src={GetPokemonImg(id)} alt={pokemonName} />
        </div>
      </div>
    </>
  );
}