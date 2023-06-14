import { useState } from "react";

function ToDoList() {
    const [toDO, setToDo] = useState("");
    const [toDoError, setToDoError] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setToDoError("");
        setToDo(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (toDO.length < 10) {
            setToDoError("toDo should be longer");
        }
        console.log(toDO);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={toDO}
                    placeholder="Write a to do"
                />
                <button>Add</button>
                {toDoError !== "" ? toDoError : null}
            </form>
        </div>
    );
}

export default ToDoList;
