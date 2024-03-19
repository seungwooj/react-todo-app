import { atom, selector } from "recoil";

export let defaultCategories: string[] = ["TO_DO", "DOING", "DONE"];

//enumerables
// export enum Categories {
//     "TO_DO" = "TO_DO",
//     "DOING" = "DOING",
//     "DONE" = "DONE",
//     "CUSTOMIZE" = "CUSTOMIZE",
// }
export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export const isDarkAtom = atom<boolean>({
  key: "isDark",
  default: false,
});

export const categoryState = atom<string>({
  key: "category",
  default: defaultCategories[0],
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: JSON.parse(
    localStorage.getItem("categories") ?? JSON.stringify(defaultCategories)
  ),
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDos") ?? "[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
