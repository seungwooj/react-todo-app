import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesState, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
    const categories = useRecoilValue(categoriesState);
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (newCategory: IToDo["category"]) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: newCategory };

            const newToDos = [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
            return newToDos;
        });
    };
    return (
        <li>
            <span style={{ color: "white", padding: 10 }}>{text}</span>
            {categories.map((availCategory) => (
                <button
                    disabled={availCategory === category}
                    key={availCategory}
                    onClick={() => onClick(availCategory)}
                >
                    {availCategory}
                </button>
            ))}
        </li>
    );
}

export default ToDo;
