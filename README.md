## useQuery Branch

In this branch you can see how to setup and add react-query to be used in the project.
[This PR](https://github.com/matiasfha/react-query-example/pull/2) shows the big difference in code and logic, there is a ton of code removed just by using the `useQuery` hook from the library.

Is important to notice that `useQuery` receives two parameters.

1. **A query key** this is a way to uniquely identify the data inside the cache. in the `useTodos` the key is a string `"todos"` and in `useTodo` the query is made from an array using the `id` of the item. `["todos",todo.id]`
2. **A promise base function** to retrieve the data we can use any Promise-like function, in this case is an `axios` call.


## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/next.js/tree/canary/examples/hello-world)

## How to use

1. Clone this repo
2. `cd`into the folder
3. run `yarn dev` 