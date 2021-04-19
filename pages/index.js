import Link from "next/link";
import React from "react";
import tw, { styled } from "twin.macro";
import useTodos from "./hooks/useTodos";

const BASE_ID = "appy79pGZl0D8nLjr";
const baseURL = `https://api.airtable.com/v0/${BASE_ID}/Table%201`;

const useUpdateTodo = (todo) => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const { id } = todo;
  const getUrl = React.useCallback(() => {
    return `${baseURL}/${id}/?api_key=${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`;
  }, [id]);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(getUrl(), {
      method: "PATCH",
      body: JSON.stringify(todo)
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [getUrl]);
  return {
    data,
    isLoading,
    isError
  };
};

const useCreateTodo = () => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const getUrl = React.useCallback(() => {
    return `${baseURL}/?api_key=${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`;
  }, []);

  const mutateAsync = (data) => {
    setIsLoading(true);
    fetch(getUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        res.json();
      })
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };
  return {
    data,
    isLoading,
    isError,
    mutateAsync
  };
};

const useGetTodo = (id) => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const getUrl = React.useCallback(() => {
    return `${baseURL}/${id}/?api_key=${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`;
  }, [id]);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(getUrl())
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [getUrl]);
  return {
    data,
    isLoading,
    isError
  };
};

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
const List = ({ items }) => {
  return (
    <Ul>
      {items.map((item) => {
        const status = item.fields.Status;
        return (
          <Item key={item.id} status={status}>
            <p>{item.fields.Title}</p>
            {status === "Todo" ? <BtnDone>Done</BtnDone> : null}
            {status === "Done" ? <BtnNotDone>Not Done</BtnNotDone> : null}
            <BtnRemove>Remove</BtnRemove>
          </Item>
        );
      })}
    </Ul>
  );
};

export default function IndexPage() {
  const { isLoading, data, fetch } = useTodos();
  const { mutateAsync } = useCreateTodo();

  const todoRef = React.useRef(null);
  const submit = async () => {
    if (todoRef.current) {
      const Title = todoRef.current.value;
      await mutateAsync({
        fields: {
          Title,
          Status: "Todo"
        }
      });
      fetch();
    }
  };

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Page>
      <Container>
        <Title>TODO List</Title>
        <InputContainer>
          <input placeholder="Tasks" ref={todoRef} />
          <button onClick={submit}>Add</button>
        </InputContainer>
        {isLoading ? "...Loading" : <List items={data} />}
      </Container>
    </Page>
  );
}
