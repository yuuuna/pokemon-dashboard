import styles from './PokemonModal.module.scss';

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

export default function PokemonModal({ pokemon, showModal, closeModal }: any) {

  if (!showModal) {
    return null;
  }
  console.log(pokemon);
  const { name, id, types, stats } = pokemon;
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent} >
          <div className={styles.modalHeader} >
            <div className={styles.close} onClick={closeModal}>
              ⓧ {showModal}
            </div>
            <span>{GetPokemonId(id)} / {pokemonName}</span>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.pokemonMain}>
              <div className={styles.mainImage}>
                <img src={GetPokemonImg(id)} alt={pokemonName} />
              </div>
              <div className={styles.mainInfo}>
                <div>
                  屬性：{types.map(function (item: any) {
                    return (
                      <span key={id + '-' + item.type.name}>
                        {item.type.name}、
                      </span>
                    )
                  })}
                </div>
                <div>
                  種族值：
                  {stats.map(function (stat: any) {
                    return (
                      <div key={id + '-' + stat.stat.name}>{stat.base_stat} / 600</div>
                    )
                  })}
                </div>
              </div>
            </div>
            {/* <div className={styles.pokemonImages}>
              images
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}