//Generics

const promise: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('resolve promise!');
    }, 2000);
});

promise.then(data => {
    console.log(data);
});

function mergeObjects<T extends object, R extends object>(a: T, b: R): T & R {
    return Object.assign({}, a, b);
}

const merged = mergeObjects({ name: 'Ilya', lastname: 'Lukuanov' }, { age: 20 });
// const merged2 = mergeObjects('a', 'b');

console.log(merged);

//==========================

interface ILength {
    length: number
}

function withCount<T extends ILength>(value: T): { value: T, count: string } {
    return {
        value,
        count: `В этом объекте ${value.length} символов`
    };
}

//===================================
function getObjectValue<T extends object, R extends keyof T>(obj: T, key: R) {
    return obj[key];
}

const person = { name: 'Ilya', 2: 3 };

getObjectValue(person, 'name');

class Collection<T extends number | string | boolean> {
    constructor(private _items: T[] = []) {}

    add(item: T) {
        this._items.push(item);
    }

    remove(item: T) {
        this._items = this._items.filter(it => it !== item);
    }

    get items(): T[] {
        return this._items;
    }
}

const collection1 = new Collection<string | number>(['1', '2']);

collection1.add(2);

//======================

interface Car {
    model: string,
    year: number
}

function createAndValidateCar(model: string, year: number): Car {
    const car: Partial<Car> = {};

    if (model.length > 3) {
        car.model = model;
    }

    if (year > 2000) {
        car.year = year;
    }

    return <Car>car;
}

//================
const cars: Readonly<Array<string>> = ['Ford', 'Audi'];

//Decorators

// function Log(constructor: Function) {
//     console.log(constructor);
    
// }

// function Log2(target: any, propName: string | Symbol) {
//     console.log(target, propName);
    
// }

// function Log3(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {
//     console.log(target, propName, descriptor);
// }

interface IComponentDecorator {
    selector: string,
    template: string
}

function Component(config: IComponentDecorator) {
    return function<T extends { new(...args: any[]): object }>(Constructor: T) {
        return class extends Constructor {
            constructor(...args: any[]) {
                super(...args);

                const el = document.querySelector(config.selector)!;
                el.innerHTML = config.template;
            }
        }
    }
}

function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value;

    return {
        configurable: true,
        enumerable: false,
        get() {
            return original.bind(this);
        }
    }
}

@Component({
    selector: 'body',
    template: `
        <div>
            <h1>Header</h1>
            test typescript
            <button id="btn">Click me</button>
        </div>
    `
})
class CardComponent {
    name: string

    get componentName() {
        return this.name;
    }

    constructor(name: string) {
        this.name = name;
    }

    @Bind
    logName(): void {
        console.log(`Component name: ${this.name}`);  
    }
}

const card = new CardComponent('Super Card');

const button = document.querySelector('#btn')!;
button.addEventListener('click', card.logName);

//=========================

type ValidatorType = 'required' | 'email';

interface IValidator {
    [prop: string]: {
        [validateProp: string]: ValidatorType
    }
}

const validators: IValidator = {};

function Required(target: any, propName: string) {
    validators[target.constructor.name] = {
        ...validators[target.constructor.name],
        [propName]: 'required'
    }
}

function validate(obj: any): boolean {
    const objectConfig = validators[obj.constructor.name];

    if (!objectConfig) {
        return true;
    }

    let isValid = true;
    Object.keys(objectConfig).forEach(key => {
        if (objectConfig[key] === 'required') {
            isValid = isValid && !!obj[key];
        }
    });
    return isValid;
}

// class Form {
//     @Required
//     email: string | void

//     constructor(email?: string) {
//         this.email = email;
//     }
// }

// const form = new Form();

// if (validate(form)) {
//     console.log('valid', form);
// } else {
//     console.log('Validation error', form);
// }

// console.log(validators, form);

//Namespaces
/// <reference path="form-namespace.ts" />
namespace Form {
    class MyForm {
        private type: FormType = 'inline'
        private state: FormState = 'active'
    
        constructor(public email: string) {}
    
        getInfo(): FormInfo {
            return {
                type: this.type,
                state: this.state
            }
        }
    }
    
    export const myForm = new MyForm('email@asd.ru');
}

const { myForm } = Form;
console.log(myForm);

