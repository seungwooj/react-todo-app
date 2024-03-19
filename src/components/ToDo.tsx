import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesState, toDoState } from "../atoms";
import styled from "styled-components";

const TodoText = styled.span`
  color: ${(props) => props.theme.textColor};
  padding: 10px;
`;

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
      <TodoText>{text}</TodoText>
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
