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

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const categoryState = atom<string>({
    key: "category",
    default: defaultCategories[0],
});

export const categoriesState = atom<string[]>({
    key: "categories",
    default: defaultCategories,
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});
