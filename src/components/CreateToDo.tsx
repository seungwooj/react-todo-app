import { useForm } from "react-hook-form";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { useEffect } from "react";
import { styled } from "styled-components";

interface IForm {
    toDo: string;
}

const Form = styled.form`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    background-color: ${(props) => props.theme.accentColor};
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.accentColor};
    }
`;

function CreateToDo() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
            { text: toDo, id: Date.now(), category },
            ...oldToDos,
        ]);
        setValue("toDo", "");
    };

    useEffect(() => {
        localStorage.setItem("toDos", JSON.stringify(toDos));
    }, [toDos]);

    return (
        <Form onSubmit={handleSubmit(handleValid)}>
            <Input
                {...register("toDo", { required: "Please write a To Do" })}
                placeholder="Write a todo"
            />
            <Button>Add</Button>
        </Form>
    );
}

export default CreateToDo;
