import React from "react";
import tw, { styled } from "twin.macro";
import useTodos, { fetchTodos } from "../src/hooks/useTodos";
import useCreateTodo from '../src/hooks/useCreateTodo';
import useUpdateTodo from '../src/hooks/useUpdateTodo';
import useDeleteTodo from '../src/hooks/useDeleteTodo';
import Todo from '../src/components/Todo'
import Layout from '../src/components/Layout'


const InputContainer = styled.div`
  ${tw`flex mt-4`}
  input {
    ${tw`shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-900`}
  }
  button {
    ${tw`flex-shrink-0 p-2 border-2 rounded text-indigo-600 border-indigo-400 hover:text-white hover:bg-indigo-300`}
  }
`;


const Ul = tw.ul`
  mt-8
`;

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
  const { isLoading, data } = useTodos();
  const { mutate } = useCreateTodo();
  const { mutate: remove } = useDeleteTodo()
  const todoRef = React.useRef(null);
  const submit = async () => {
    if (todoRef.current?.value !== '') {
      const title = todoRef.current.value;
      mutate({
        title
      });
      todoRef.current.value = '';
    }
  };


  const onRemove = async (todoId) => {
    remove(todoId)
  }

  return (
    <Layout title="TODO List">
      <InputContainer>
        <input placeholder="Tasks" ref={todoRef} />
        <button onClick={submit}>Add</button>
      </InputContainer>
      {isLoading ? "...Loading" : null}
      <List items={data || []} onRemove={onRemove} />

    </Layout>

  );
}