import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import { useEffect } from "react";

function ToDoList() {
    // const toDos = useRecoilValue(toDoState);
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const [categories, setCategories] = useRecoilState(categoriesState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as string);
    };
    const addCategory = () => {
        const newCategory = prompt("What is the name of the category?");
        if (newCategory) {
            setCategories([...categories, newCategory]);
            setCategory(newCategory);
        }
    };

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    return (
        <div>
            <h1>To Dos : {category}</h1>
            <hr />
            <form>
                <select value={category} onInput={onInput}>
                    {categories.map((availCategory) => (
                        <option value={availCategory}>{availCategory}</option>
                    ))}
                </select>
            </form>
            <button onClick={addCategory}>Add new</button>
            <CreateToDo />
            <hr />
            <ul>
                {toDos.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
