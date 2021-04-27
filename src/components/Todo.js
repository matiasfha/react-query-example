import React from 'react';
import tw, { styled } from "twin.macro";
import Link from 'next/link'
import useUpdateTodo from '../hooks/useUpdateTodo';

export const Item = styled.li`
  ${tw`flex mb-4 items-center justify-between hover:bg-indigo-200 p-2 rounded-md cursor-pointer`}
  a,p {
    ${tw`text-gray-900`}
    ${(props) => {
        return props.status === "Done" ? tw`line-through text-green-600` : ""
    }
    }
   }
   p {
       ${tw`w-full`}
   }
`;
export const BtnDone = tw.button`
  bg-white flex-shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-600 hover:bg-green-800
`;

export const BtnRemove = tw.button`
bg-white flex-shrink-0 p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-800
`;

export const BtnNotDone = tw.button`
bg-white flex-shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-600 border-gray-600 hover:bg-gray-800
`;
const Todo = ({ todo, onRemove }) => {
    const [state, setState] = React.useState(todo)
    const { mutate: update, data, isSuccess } = useUpdateTodo()

    React.useEffect(function updateInternalData() {
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
        setState((t) => ({
            ...t,
            status: 'Done'
        }))

    }

    const setUnDone = async () => {
        await update({
            id: todo.id,
            status: 'Todo',
            title: todo.Title
        })
        setState(t => ({
            ...t,
            status: 'Todo'
        }))
    }


    return (
        <Item status={state.status}>
            <Link href={`/todo/${state.id}`}><a>{state.title}</a></Link>
            <div>
                {state.status === "Todo" ? <BtnDone onClick={setDone}>Done</BtnDone> : null}
                {state.status === "Done" ? <BtnNotDone onClick={setUnDone}>Not Done</BtnNotDone> : null}
                <BtnRemove onClick={() => onRemove(state.id)}>Remove</BtnRemove>

            </div>
        </Item >
    )
}

export default Todo