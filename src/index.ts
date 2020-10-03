import { stupid } from './types';

const t: string = 'sadasd';
const sdt: string = 'sadasd';
const bool: boolean = true;

console.log(t.charCodeAt(0).toExponential());
console.log(bool);

const array1: number[][] = [[1], [2], [3]];
const array2: Array<Array<number>> = [[1], [2], [3]];
const array3: (number | string)[][] = [['2'], [2], ['34']];

type genius = true;
//Tuple
const x: [string, number, genius] = ['Ilya', 20, true];

let param: any | void;

param = undefined;

const sayIgorLoh = (bool: stupid): string => 'IgorLoh';

console.log(sayIgorLoh(false));


// const neverFunc = (str: string): never => {
//     while (true) {
        
//     }
// };

const neverFunc = (str: string): never => {
    throw new Error(str);
};

try {
    neverFunc('igor LOH');
} catch (e) {
    console.log(e);
}

//Type
type someType = string | null | undefined;

//Interfaces
interface Igor {
    readonly loh: true,
    readonly name: 'Igor' | 'LOH',
    color?: string
}

const igar: Igor = {
    loh: true,
    name: 'LOH',
    color: 'black'
};

igar.color = '#000000';
const igar2 = <Igor>{};
const igar3 = {} as Igor;
console.log(igar);

interface IGenius extends Igor {
    genius: genius,
    say(phrase: string): void
}

const IgorGenius: IGenius = {
    genius: true,
    loh: true,
    name: "Igor",
    say: function(phrase: string): void {
        console.log(this.name + ': ' + phrase);
    }
};

IgorGenius.say('i am genius');
IgorGenius.say('bye');

interface IClock {
    time: Date,
    test: 2 | 4 | 8 | 16
    setTime(date: Date): Date
}

class Clock implements IClock {
    time: Date = new Date()
    test: 8
    setTime(date: Date): Date {
        this.time = date;
        console.log('new time', this.time);
        return this.time;
    }
}

const clock = new Clock();

clock.setTime(new Date());

//=======================
//a lot of keys object

interface Styles {
    [key: string]: string
}

const css: Styles = {
    borderRadius: '5px',
    marginTop: '-2px',
    position: 'absolute',
    left: '10%'
}

//enums
enum LohDegree {
    Small,
    Normal,
    Large
}

const loh1 = LohDegree.Normal;
console.log(loh1);
const lohReverse = LohDegree[2];
console.log(lohReverse);

enum SocialMedia {
    VK = 'VK',
    Telegram = 'Telegram',
    Instagram = 'Instagram'
}

const social: string = SocialMedia.Telegram;
console.log(social, SocialMedia, LohDegree);

//functions

const toUpperCase = (str: string): string => str.toUpperCase();

console.log(toUpperCase(IgorGenius.name).trim());

interface Position {
    x: number | undefined,
    y: number | undefined
}

interface DefaultPosition extends Position {
    default: string
}

function getPosition(): Position;
function getPosition(a: number): DefaultPosition;
function getPosition(a: number, b: number): Position;

function getPosition(a?: number, b?: number) {
    if (!a && !b) {
        return <Position>{ x: undefined, y: undefined };
    }

    if (!b) {
        return <DefaultPosition>{ x: a, y: undefined, default: 'no y' };
    }

    return <Position>{ x: a, y: b };
}

console.log(getPosition());
console.log(getPosition(3));
console.log(getPosition(3, 8));

//Classes

interface TYPE {
    version: string,
    getInfo(): string
}

class TypeScript implements TYPE {
    readonly defaultVersion: number = 8

    constructor(readonly version: string) {}

    getInfo(): string {
        return `TypeScript version ${this.version}`;
    }
}

const typescript = new TypeScript('2.2.8');

console.log(typescript.getInfo(), typescript.defaultVersion);

class Animal {
    protected voice: string = '' //доступно только внутри класса и потомков
    public color: string = 'black' //по умолчанию
    constructor() {
        this.go();
    }
    private go(): void { //доступны только в том классе, в котором были определены
        console.log('go!');
    }
}
class Cat extends Animal {
    public setVoice(voice: string): void {
        this.voice = voice;
    }
    public getVoice(): string {
        return this.voice;
    }
}

const cat = new Cat();

cat.setVoice('meow');
console.log(cat.getVoice());

//abstract classes
//хз зачем это нужно, когда есть интерфейсы

abstract class Component  {
    abstract render(): void
    abstract info(): string
}

class AppComponent extends Component {
    render(): void {
        console.log('render');
    }
    
    info(): string {
        return 'info!';
    }
}

//Guards

function strip(x: number | string) {
    if (typeof x === 'number') {
        return x.toString(2);
    }

    return x.toUpperCase();
}

class A {
    field = 'test'
}

class B {
    message = 'test2'
}

function handle(res: A | B) {
    if (res instanceof A) {
        return res.field;
    }

    return res.message;
}

//Generics

interface IPoint {
    x: number,
    y: number
}

const interfaceArray: Array<IPoint> = [{ x: 0.2, y: 0.3 }];
const numberArray: Array<number> = [2, 3, 4];

function reverse<T>(array: T[]): T[] {
    return array.reverse();
}

reverse(interfaceArray);
reverse(numberArray);

//Operators

interface Person {
    name: string,
    age: number
}

type PersonKeys = keyof Person;
const name: PersonKeys = 'age'; // age | name

type User = {
    _id: number
    name: string
    email: string
    createdAt: Date
};

type UserKeysNoMeta1 = Exclude<keyof User, '_id' | 'createdAt'>;
type UserKeysNoMeta2 = Pick<User, 'name' | 'email'>;

interface AA {
    test: string
}

interface BB {
    IGOR: string
}

class AbstractIGOR implements AA, BB {
    IGOR = 'loh'
    test = ' sds'
}