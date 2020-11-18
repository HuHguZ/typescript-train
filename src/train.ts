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
    lastname: string;
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

type PartialSome<T, U extends keyof T> = {
    [P in Exclude<keyof T, U>]?: T[P];
};

type PartialSomeAll<T, U extends keyof T> = {
    [P in keyof T]: P extends U ? T[P] : T[P] | undefined ;
};

type PersonSubsetSome = PartialSome<PersonSubset, 'lastname'>;









type PersonSubsetSome2 = PartialSomeAll<PersonSubset, 'lastname'>;

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

const obj = { name: 'sdfas', age: { both: 'sdfds' } };

//рекурсивный партиал, который все подключи-объекты делает опциональными

type inferType = Partial<typeof obj>;

const constObj1 = { name: 'Ilya' as const, lastname: false };
const constObj2 = { name: 'Vanya' as const, lastname: true };

((obj: typeof constObj1 | typeof constObj2) => {
    switch (obj.name) {
        case 'Vanya':
            obj.lastname;
            break;
        default:
            obj.lastname;
            break;
    }
})(constObj1);

type Genre = {
    name: string
};

type DramAndBass<T> = T extends Genre ? Partial<Genre> : T extends number ? 'number' : T extends boolean ? 'boolean' : unknown;
const obj5: DramAndBass<Genre | 23> = { name: 'dram and bass' };

export interface Callback {
    (...args: any[]): any;
}

const debounce = <F extends Callback>(cb: F, milliseconds: number) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<F>): void => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            cb(...args);
        }, milliseconds);
    };
};

const func = (a: number, b: number): number => a + b;
const debouncedF = debounce(func, 100);

const inferObj = {
    a: (b: number): boolean => { return true; },
    b: { name: 'sdsd' }
};

type SomeType<T> = T extends { [key: string]: infer U } ? U extends Callback ? ReturnType<U> : U : never;
const hiphop: SomeType<typeof inferObj> = true;

type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;

type T11 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;
//   ^ = type T1 = string
type T12 = Bar<{ a: (x: { name: string }) => void; b: (x: { lastname: string }) => void }>;
//   ^ = type T2 = never
type inttt = string & number

type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

type Foo2<T> = T extends [infer U, (a: infer U) => void] ? U : never;

type FR = Foo2<[{ name: string }, (a: { name: string, lastname: number }) => void]>;

type T22 = Foo<{ a: string; b: string }>;
//   ^ = type T1 = string
type T23 = Foo<{ a: string; b: number }>;
//   ^ = type T2 = string | number

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type Recursive<T> = T extends Promise<infer U> ? U : T;
type BigPromise = Promise<Promise<string>>; 

type RecursiveTest = Recursive<BigPromise>;

type T70 = Unpacked<string>;
//   ^ = type T0 = string
type T71 = Unpacked<string[]>;
//   ^ = type T1 = string
type T72 = Unpacked<() => string>;
//   ^ = type T2 = string
type T73 = Unpacked<Promise<string>>;
//   ^ = type T3 = string
type T74 = Unpacked<Promise<string>[]>;
//   ^ = type T4 = Promise
type T75 = Unpacked<number> | Unpacked<Unpacked<Promise<string>[]>>;
//   ^ = type T5 = string