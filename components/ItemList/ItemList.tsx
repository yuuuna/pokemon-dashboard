import { Loading } from "@/components/Loading";
import { fetchItemCategory } from "@/src/api";
import itemCategorys from '@/src/item-category.json';
import { useCallback, useEffect, useState } from "react";
import styles from './ItemList.module.scss';

function GetItemList() {
  const [itemsList, setItemsList] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const itemList = useCallback(async () => {
    setItemsList([]);
    setIsSuccess(true);
    const list: any[] = [];

    await Promise.all(itemCategorys.map(async (data: any) => {
      await fetchItemCategory({ name: data.category }).then(async (item) => {
        item.items = await item.items.filter(function (d: any) {
          return !data.exclude.includes(d.name);
        });
        item.name = data.name;
        list[data.sort] = item;
      });

    }));

    setItemsList(list);
    setIsSuccess(false);
  }, []);

  useEffect(() => {
    itemList();
  }, []);

  return {
    items: itemsList,
    isLoading: isSuccess
  }
}

export default function ItemList() {
  const { items, isLoading } = GetItemList();

  return (
    <>
      {
        isLoading ?
          (<Loading />) :
          (
            <div className={styles.item}>
              {items.map(function (item) {
                return (
                  <div key={item.id} className={styles.itemArea}>
                    <div className={styles.itemTitle}><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.items[0].name}.png`} title={item.items[0].name} alt={item.items[0].name} />{item.name}</div>
                    <div className={styles.itemList}>{item.items.map(function (data: any) {
                      return (
                        <img key={data.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${data.name}.png`} title={data.name} alt={data.name} />
                      )
                    })}
                    </div>
                  </div>
                )
              })}
            </div>
          )
      }
    </>
  )
}