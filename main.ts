type User = {
  name: string;
  age: number;
};

function fetchData(): unknown {
  return {
    name: 'Oleg',
    age: 55,
  };
}

const user: User = fetchData() as User;

function printPersonInfo(person: any): asserts person is User {
  if ('name' in person && 'age' in person) {
    const { name, age } = person;
    console.log(`Name: ${name}, age: ${age}`);
  } else throw new Error('Not an user');
}

printPersonInfo(user);
