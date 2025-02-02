//#1
type StatusName = 'success' | 'error';

interface IResult<Status> {
  status: Status;
  data?: string;
  error?: string;
}

const successResult: IResult<StatusName> = {
  status: 'success',
  data: 'Some data',
};

const errorResult: IResult<StatusName> = {
  status: 'error',
  error: 'Some error',
};

function handleResult<T extends IResult<StatusName>>(
  result: T
): string | undefined | never {
  if (result.status === 'error') {
    throw new Error(result.error);
  } else return result.data;
}

//#2
class Queue<T> {
  private data: T[] = [];

  enqueue(item: T): number {
    return this.data.push(item);
  }

  dequeue(): T | undefined {
    return this.data.shift();
  }

  peek(): T | undefined {
    return this.data[0];
  }

  size(): number {
    return this.data.length;
  }
}

//#3
function compareFn<K>(someArray: K[]): K[] {
  return someArray.sort((a, b) => {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  });
}

function sortArray<T>(arr: T[]): T[] {
  return compareFn(arr);
}

//#4
interface IPlayer {
  name: string;
}

function extractProperty<T extends IPlayer>(value: T): string {
  return value.name;
}

//#5
interface Identifiable {
  id: number;
}

interface IUser extends Identifiable {
  name: string;
  id: number;
}

interface IProduct extends Identifiable {
  title: string;
  id: number;
}

class Repository<T extends Identifiable> {
  protected array: Array<T> = [];

  add(item: T): number {
    return this.array.push(item);
  }

  getById(id: T['id']): T | undefined {
    return this.array.find((item) => item.id === id);
  }

  removeById(id: T['id']): boolean {
    if (this.getById(id)) {
      this.array = this.array.filter((item) => item.id !== id);
      return true;
    } else return false;
  }

  getAll(): Array<T> {
    return this.array;
  }
}

const oleg: IUser = {
  name: 'Oleg',
  id: 1254,
};

const petro: IUser = {
  name: 'Petro',
  id: 1255,
};

const book: IProduct = {
  title: 'book',
  id: 123,
};

const toy: IProduct = {
  title: 'toy',
  id: 122,
};

const repository = new Repository();
repository.add(oleg);
repository.add(petro);

repository.add(book);
repository.add(toy);

repository.getAll();
repository.getById(123);
repository.removeById(122);
repository.getAll();
