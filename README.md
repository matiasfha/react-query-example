
## Optimistic updates Branch

Optimistic updates are a technique meant to improve the UX by updating the cached data to represent the desired change (add, update, remove) before the real change happens in the backend layer.

react-query offers a simple way to implement this technique by tapping into the second parameter accepted by `useMutation`. This is a configuration object that enables us to access to some "lifecycle methods".
- `onMutate` it triggers at same time mutation is trigger, here is where the optimistic update happens
- `onError` it triggers when an error in the promise happens
- `onSettled` it triggers when the promise call is done doesn't matter if in an error or success state. This is the place to refetch the data (invalidateQueries)


[This PR](https://github.com/matiasfha/react-query-example/pull/4) shows the changes required to enable the optimistic updates


## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/next.js/tree/canary/examples/hello-world)

## How to use

1. Clone this repo
2. `cd`into the folder
3. run `yarn dev` 