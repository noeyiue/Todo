import { SubscriptionClient } from 'subscriptions-transport-ws';
import getJWT from './getJWT';
import { todos_data } from '@/layout/type';



export default async function subscriptionTodos(userID: string) {
  const user_jwt = await getJWT(userID);
  const wsClient = new SubscriptionClient(
    'wss://enhanced-chicken-26.hasura.app/v1/graphql',
    {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${user_jwt}`,
        },
      },
    }
  );

  const query = `
    subscription {
      todos {
        isEdit
        isFinish
        task
        taskID
        userID
      }
    }
  `;

  // const observer = {
  //   next: (data: any) => {
  //     const todos = data.data.todos;
  //     // console.log(todos);
  //   },
  //   error: (err: Error) => {
  //     console.error(err);
      
  //   },
  //   complete: () => {
  //     console.log('Subscription finished');
  //   },
  // };

  // const subscription = wsClient.request({ query }).subscribe(observer);
  const subscription = wsClient.request({ query });
  return subscription;
  // To unsubscribe, call subscription.unsubscribe()
}
