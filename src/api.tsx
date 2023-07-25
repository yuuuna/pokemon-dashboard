export const fetchPokemonList = async ({offset, limit}: any) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).then((res) => res.json());
    return data;
};

export const fetchPokemonData = async ({name} : any) => {
    const data = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json());
    return data;
};

export const fetchItemList = async ({offset, limit} : any) => {
    const data = fetch(`https://pokeapi.co/api/v2/item?offset=${offset}&limit=${limit}`).then((res) => res.json());
    return data;
};

export const fetchItemCategory = async ({name} : any) => {
    const data = fetch(`https://pokeapi.co/api/v2/item-category/${name}`).then((res) => res.json());
    return data;
};

export const fetchItemData = async ({name} : any) => {
    const data = fetch(`https://pokeapi.co/api/v2/item/${name}`).then((res) => res.json());
    return data;
};
