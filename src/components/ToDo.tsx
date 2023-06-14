import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
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
            // return oldToDos.map((oldToDo) =>
            //     oldToDo.id === id
            //         ? { ...oldToDo, category: newCategory }
            //         : oldToDo
            // );
        });
    };
    return (
        <li>
            <span style={{ color: "white", padding: 10 }}>{text}</span>
            {category !== Categories.TO_DO && (
                <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
            )}
            {category !== Categories.DOING && (
                <button onClick={() => onClick(Categories.DOING)}>Doing</button>
            )}
            {category !== Categories.DONE && (
                <button onClick={() => onClick(Categories.DONE)}>Done</button>
            )}
        </li>
    );
}

export default ToDo;
