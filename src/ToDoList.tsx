import { useState } from "react";

function ToDoList() {
    const [toDO, setToDo] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setToDo(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            </form>
        </div>
    );
}

export default ToDoList;
