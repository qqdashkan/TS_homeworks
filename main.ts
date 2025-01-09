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
  if (person === null && typeof person !== 'object') {
    throw new Error(`${person} must be of type object`);
  } else if (!('name' in person) && typeof person.name !== 'string') {
    throw new Error(`${person.name} must be of type string`);
  } else if (!('age' in person) && typeof person.age !== 'number') {
    throw new Error(`${person.age} must be of type number`);
  }

  const { name, age } = person;
  console.log(`Name: ${name}, age: ${age}`);
}

printPersonInfo(user);
