import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

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
            {category !== "TO_DO" && (
                <button onClick={() => onClick("TO_DO")}>To Do</button>
            )}
            {category !== "DOING" && (
                <button onClick={() => onClick("DOING")}>Doing</button>
            )}
            {category !== "DONE" && (
                <button onClick={() => onClick("DONE")}>Done</button>
            )}
        </li>
    );
}

export default ToDo;
