import React from "react";
import tw, { styled } from "twin.macro";
import useTodos from "../src/hooks/useTodos";
import useCreateTodo from '../src/hooks/useCreateTodo';
import useUpdateTodo from '../src/hooks/useUpdateTodo';
import useDeleteTodo from '../src/hooks/useDeleteTodo';

const Page = tw.div`
h-screen w-screen flex items-center justify-center bg-indigo-300 font-sans
`;

const Container = tw.main`
  bg-white rounded shadow p-6 m-4 w-full
`;

const Title = tw.h1`text-gray-900 text-4xl text-center font-bold`;

const InputContainer = styled.div`
  ${tw`flex mt-4`}
  input {
    ${tw`shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-900`}
  }
  button {
    ${tw`flex-shrink-0 p-2 border-2 rounded text-indigo-600 border-indigo-400 hover:text-white hover:bg-indigo-300`}
  }
`;

const Item = styled.li`
  ${tw`flex mb-4 items-center`}
  p {
    ${tw`w-full text-gray-900`}
    ${(props) =>
    props.status === "Done" ? tw`line-through text-green-600` : ""}
  }
`;
const BtnDone = tw.button`
  flex-shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-600 hover:bg-green-800
`;

const BtnRemove = tw.button`
flex-shrink-0 p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-800
`;

const BtnNotDone = tw.button`
flex-shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-600 border-gray-600 hover:bg-gray-800
`;

const Ul = tw.ul`
  mt-8
`;

const Todo = ({ todo, onRemove }) => {
  const [state, setState] = React.useState(todo)
  const [update, updateInfo] = useUpdateTodo()


  const { data, isSuccess } = updateInfo

  React.useEffect(() => {
    if (data && isSuccess) {
      setState(data)
    }

  }, [isSuccess])

  const setDone = async () => {
    await update({
      id: todo.id,
      status: 'Done',
      title: todo.title
    })

  }

  const setUnDone = async () => {
    await update({
      id: todo.id,
      status: 'Todo',
      title: todo.Title
    })
  }


  return (
    <Item status={state.status}>
      <p>{state.title}</p>
      {state.status === "Todo" ? <BtnDone onClick={setDone}>Done</BtnDone> : null}
      {state.status === "Done" ? <BtnNotDone onClick={setUnDone}>Not Done</BtnNotDone> : null}
      <BtnRemove onClick={() => onRemove(state.id)}>Remove</BtnRemove>
    </Item>

  )
}
const List = ({ items, onRemove }) => {
  return (
    <Ul>
      {items.map((item) => {
        return (
          <Todo key={item.id} todo={item} onRemove={onRemove} />
        );
      })}
    </Ul>
  );
};

export default function IndexPage() {
  const { isLoading, data, fetch } = useTodos();
  const { mutate, ...state } = useCreateTodo();
  const [remove, removeInfo] = useDeleteTodo()
  const todoRef = React.useRef(null);
  const submit = async () => {
    if (todoRef.current?.value !== '') {
      const title = todoRef.current.value;
      await mutate({
        title
      });
      todoRef.current.value = '';
      fetch(); // Refetch
    }
  };


  const onRemove = async (todoId) => {
    await remove(todoId)
    fetch()
  }
  console.log({ data, removeInfo })
  return (
    <Page>
      <Container>
        <Title>TODO List</Title>
        <InputContainer>
          <input placeholder="Tasks" ref={todoRef} />
          <button onClick={submit}>Add</button>
        </InputContainer>
        {isLoading ? "...Loading" : null}
        <List items={data || []} onRemove={onRemove} />
      </Container>
    </Page>
  );
}
