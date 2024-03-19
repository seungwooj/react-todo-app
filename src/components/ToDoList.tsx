import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  categoriesState,
  categoryState,
  isDarkAtom,
  toDoSelector,
} from "../atoms";
import ToDo from "./ToDo";
import { useEffect } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const ToggleBtn = styled.button`
  font-size: 18px;
  color: "red";
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const Form = styled.form`
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: ${(props) => props.theme.cardColor};
  display: flex;
`;

const Select = styled.select`
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 18px;
`;

const Option = styled.option`
  padding: 5px;
`;

const Button = styled.button`
  font-size: 18px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  margin-left: 1rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid #ccc;
`;

function ToDoList() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);

  const toggleState = () => {
    setIsDark((oldIsDark) => !oldIsDark);
  };

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
    <Container>
      <Header>
        <Title>To Dos : {category}</Title>
        <ToggleBtn onClick={toggleState}>{isDark ? "☀️" : "🌙"}</ToggleBtn>
      </Header>

      <hr />
      <Form>
        <Select value={category} onInput={onInput}>
          {categories.map((availCategory) => (
            <Option value={availCategory}>{availCategory}</Option>
          ))}
        </Select>
        <Button onClick={addCategory}>Add new</Button>
      </Form>
      <CreateToDo />
      <hr />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </Container>
  );
}

export default ToDoList;
