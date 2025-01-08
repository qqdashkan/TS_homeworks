enum Action {
  createUser = 'CREATE_USER',
  deleteUser = 'DELETE_USER',
  updateUser = 'UPDATE_USER',
  blockUser = 'BLOCK_USER',
}

interface createUser {
  type: 'CREATE_USER';
  payload: { name: string; age: number };
}

interface deleteUser {
  type: 'DELETE_USER';
  payload: { userId: number };
}

interface updateUser {
  type: 'UPDATE_USER';
  payload: { userId: number; name?: string; age?: number };
}

interface blockUser {
  type: 'BLOCK_USER';
  payload: { userId: number; reason: string };
}

function handleAction(
  action: createUser | deleteUser | updateUser | blockUser | never
): void | never {
  if (action.type === Action.createUser) {
    const { name, age } = action.payload;
    console.log('Name: ' + name, 'Age: ' + age);
  } else if (action.type === Action.deleteUser) {
    const { userId } = action.payload;
    console.log(`User ${userId} has been deleted`);
  } else if (action.type === Action.updateUser) {
    const { userId, name, age } = action.payload;
    console.log(
      `User ${userId} data has been updated. Name: ${name}, age: ${age}`
    );
  } else if (action.type === Action.blockUser) {
    const { userId, reason: messege } = action.payload;
    console.log(`User ${userId} has been banned. Reason: ${messege}`);
  } else throw new Error('Invalid action type');
}
