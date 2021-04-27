import React from 'react';
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../src/components/Layout'
import useTodo from '../../src/hooks/useTodo';
import useDeleteTodo from '../../src/hooks/useDeleteTodo';
import useUpdateTodo from '../../src/hooks/useUpdateTodo';
import { Item, BtnDone, BtnNotDone, BtnRemove } from '../../src/components/Todo';



export const Back = tw.a`
    cursor-pointer
  bg-white flex-shrink-0 p-2 ml-4 mr-2 hover:text-white text-green-600 border-green-600 hover:bg-green-800
`;

export default function TodoPage() {
    const router = useRouter()
    const { id: todoId } = router.query
    const { isLoading, data, refetch } = useTodo(todoId);
    const { mutate: remove } = useDeleteTodo()
    const { mutate: update } = useUpdateTodo()

    const setDone = async () => {
        await update({
            id: data.id,
            status: 'Done',
            title: data.title
        })
        refetch()
    }

    const setUnDone = async () => {
        await update({
            id: data.id,
            status: 'Todo',
            title: data.Title
        })
        refetch()
    }


    const onRemove = async (todoId) => {
        await remove(todoId)
        router.push('/')
    }

    return (
        <Layout title={`TODO ${todoId}`} backLink={<Link href="/"><Back>&lt; Back</Back></Link>}>
            {isLoading ? '...Loading' : (
                <div>
                    {data ? (
                        <>
                            <Item status={data.status}>
                                <p>{data.title}</p>
                                {data.status === "Todo" ? <BtnDone onClick={setDone}>Done</BtnDone> : null}
                                {data.status === "Done" ? <BtnNotDone onClick={setUnDone}>Not Done</BtnNotDone> : null}
                                <BtnRemove onClick={() => onRemove(data.id)}>Remove</BtnRemove>
                            </Item>
                            <p>{data.description}</p>
                        </>
                    ) : null}
                </div>
            )
            }

        </Layout>
    )
}