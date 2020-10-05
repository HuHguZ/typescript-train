function test<T>(param: T): T {
    return param;
}

type funcType = string | number;

test<funcType>(23);

type intersection = HTMLElement;

const testt: intersection = document.createElement('div');

interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

myIdentity(23);

type Container<T> = { value: T };

const container: Container<number> = { value: Infinity };

type Tree<T> = {
    value: T;
    left?: Tree<T>;
    right?: Tree<T>;
};

const tree: Tree<Array<string>> = { value: ['string'], left: { value: ['string'] } };
tree.right = tree;
console.log(tree);

type LinkedList<Type> = Type & { next?: LinkedList<Type> };

interface Person {
    name: string;
}

const people: LinkedList<Person> = { name: 'ILYA' };

function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map((n) => o[n]);
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}

let taxi: Car = {
    manufacturer: "Toyota",
    model: "Camry",
    year: 2014,
};

// Manufacturer and model are both of type string,
// so we can pluck them both into a typed string array
let makeAndModel: string[] = pluck(taxi, ["manufacturer", "model"]);
console.log(makeAndModel);


// If we try to pluck model and year, we get an
// array of a union type: (string | number)[]
let modelYear = pluck(taxi, ["model", "year"]);

interface Dictionary<T> {
    [key: string]: T;
}

let value: Dictionary<number>["foo"];
//      ^ = let value: number

interface PersonSubset {
    name: string;
    age: number;
}

type PersonReadonly = Partial<Readonly<PersonSubset>>;

type Keys = "option1" | "option2";
type Flags = { [K in Keys]: boolean };

type neverPerson<T> = {
    [P in keyof T]: T[P] | never
};

type Proxy<T> = {
    get(): T;
    set(value: T): void;
};

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
};

function proxify<T>(o: T): Proxify<T> | void {
    // ... wrap proxies ...
}

let props = { rooms: 4 };
let proxyProps = proxify(props);

interface PageInfo {
    title: string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
    about: { title: 'about' },
    contact: { title: "contact" },
    home: { title: "home" },
};

declare function f<T extends boolean>(x: T): T extends true ? string : number;

// Type is 'string | number'
// let x = f(Math.random() < 0.5);

type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends null
  ? "null"
  : T extends Function
  ? "function"
  : "object";

type T0 = TypeName<string>;
//   ^ = type T0 = "string"
type T1 = TypeName<"a">;
//   ^ = type T1 = "string"
type T2 = TypeName<true>;
//   ^ = type T2 = "boolean"
type T3 = TypeName<() => void>;
//   ^ = type T3 = "function"
type T4 = TypeName<string[]>;
//   ^ = type T4 = "object"
type T5 = TypeName<null>;
//   ^ = type T5 = "null"

interface Instance {
    inc(): number;
}

class SingletonCounter {
    private static instance: Instance;
    private static _inc: number = 0;
    private constructor() { }

    static getInstance(): Instance {
        if (!this.instance) {
            this.instance = {
                inc: (): number => {
                    return ++this._inc;
                }
            };
        }
        return this.instance;
    }
}

const singleton = SingletonCounter.getInstance();
const singleton2 = SingletonCounter.getInstance();
console.log(singleton.inc());
console.log(singleton2.inc());
console.log(singleton.inc());
console.log(singleton === singleton2);

