## 첫 번째 인터페이스 (Our First Interface)
```
interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```
LabeledValue 인터페이스는 이전 예제의 요구사항을 똑같이 기술하는 이름으로 사용할 수 있습니다. 이 인터페이스는 여전히 문자열 타입의 label 프로퍼티 하나를 가진다는 것을 의미합니다. 다른 언어처럼 printLabel에 전달한 객체가 이 인터페이스를 구현해야 한다고 명시적으로 얘기할 필요는 없습니다. 여기서 중요한 것은 형태뿐입니다. 함수에 전달된 객체가 나열된 요구 조건을 충족하면, 허용됩니다.

타입 검사는 프로퍼티들의 순서를 요구하지 않습니다. 단지 **인터페이스가 요구하는 프로퍼티들이 존재하는지와 프로퍼티들이 요구하는 타입을 가졌는지만을 확인**합니다.

## 선택적 프로퍼티 (Optional Properties)
**인터페이스의 모든 프로퍼티가 필요한 것은 아닙니다. 어떤 조건에서만 존재하거나 아예 없을 수도 있습니다.** 선택적 프로퍼티들은 객체 안의 몇 개의 프로퍼티만 채워 함수에 전달하는 "option bags" 같은 패턴을 만들 때 유용합니다
```
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```
## 읽기전용 프로퍼티 (Readonly properties)
처음 생성될 때만 수정 가능
```
interface Point {
    readonly x: number;
    readonly y: number;
}
```
TypeScript에서는 모든 변경 메서드(Mutating Methods)가 제거된 Array<T>와 동일한 ReadonlyArray<T> 타입을 제공합니다. 그래서 생성 후에 배열을 변경하지 않음을 보장할 수 있습니다.
```
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 오류!
ro.push(5); // 오류!
ro.length = 100; // 오류!
a = ro; // 오류!
```
예제 마지막 줄에서 ReadonlyArray를 일반 배열에 재할당이 불가능한 것을 확인할 수 있습니다. 타입 단언(type assertion)으로 오버라이드하는 것은 가능합니다:
```
a = ro as number[];
```
## readonly vs const
readonly와 const 중에 어떤 것을 사용할 지 기억하기 가장 쉬운 방법은 변수와 프로퍼티중 어디에 사용할지 질문해 보는 것입니다. **변수는 const를 사용하고 프로퍼티는 readonly를 사용**합니다

## 초과 프로퍼티 검사 (Excess Property Checks)
```
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
```
width 프로퍼티는 적합하고, color 프로퍼티는 없고, 추가 colour 프로퍼티는 중요하지 않기 때문에, 이 프로그램이 올바르게 작성되었다고 생각할 수 있습니다.

하지만, TypeScript는 이 코드에 버그가 있을 수 있다고 생각합니다. 객체 리터럴은 다른 변수에 할당할 때나 인수로 전달할 때, 특별한 처리를 받고, 초과 프로퍼티 검사 (excess property checking)를 받습니다. 만약 객체 리터럴이 "대상 타입 (target type)"이 갖고 있지 않은 프로퍼티를 갖고 있으면, 에러가 발생합니다.

이 검사를 피하는 방법은 정말 간단합니다. 가장 간단한 방법은 타입 단언을 사용하는 것입니다:
```
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```
특별한 경우에, 추가 프로퍼티가 있음을 확신한다면, 문자열 인덱스 서명(string index signatuer)을 추가하는 것이 더 나은 방법입니다. 만약 SquareConfig color와 width 프로퍼티를 위와 같은 타입으로 갖고 있고, 또한 다른 프로퍼티를 가질 수 있다면, 다음과 같이 정의할 수 있습니다.
```
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

## 함수 타입 (Function Types)

인터페이스는 JavaScript 객체가 가질 수 있는 넓은 범위의 형태를 기술할 수 있습니다. **프로퍼티로 객체를 기술하는 것 외에, 인터페이스는 함수 타입을 설명할 수 있습니다.**
```
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```
```
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}
```

함수 매개변수들은 같은 위치에 대응되는 매개변수끼리 한번에 하나씩 검사합니다. 만약 타입을 전혀 지정하지 않고 싶다면, SearchFunc 타입의 변수로 직접 함수 값이 할당되었기 때문에 TypeScript의 문맥상 타이핑 (contextual typing)이 인수 타입을 추론할 수 있습니다. 이 예제에서, 함수 표현의 반환 타입이 반환하는 값으로 추론됩니다. (여기서는 false와 true)

```
let mySearch: SearchFunc;

// error: Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
// Type 'string' is not assignable to type 'boolean'.
mySearch = function(src, sub) {
  let result = src.search(sub);
  return "string";
};
```
함수 표현식이 숫자 나 문자열을 반환했다면, 타입 검사는 반환 타입이 SearchFunc 인터페이스에 정의된 반환 타입과 일치하지 않는다는 에러를 발생시킵니다.

## 인덱서블 타입 (Indexable Types)
인터페이스로 함수 타입을 설명하는 방법과 유사하게, a[10] 이나 ageMap["daniel"] 처럼 타입을 "인덱스로" 기술할 수 있습니다. 인덱서블 타입은 인덱싱 할때 해당 반환 유형과 함께 객체를 인덱싱하는 데 사용할 수 있는 타입을 기술하는 인덱스 시그니처 (index signature)를 가지고 있습니다.
```
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```
## 인터페이스 구현하기 (Implementing an interface)
```
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) { }
}
```

# ****다시볼것****
## 클래스의 스태틱과 인스턴스의 차이점 (Difference between the static and instance sides of classes)

클래스와 인터페이스를 다룰 때, ***클래스는 두 가지 타입을 가진다***는 것을 기억하는 게 좋습니다: ***스태틱 타입과 인스턴스 타입***입니다. 생성 시그니처 (construct signature)로 인터페이스를 생성하고, 클래스를 생성하려고 한다면, 인터페이스를 implements 할 때, 에러가 발생하는 것을 확인할 수 있을 겁니다:
```
//생성자 정의
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```
클래스가 인터페이스를 implements 할 때, 클래스의 인스턴스만 검사하기 때문입니다. 생성자가 스태틱이기 때문에, 이 검사에 포함되지 않습니다.

대신에, 클래스의 스태틱 부분을 직접적으로 다룰 필요가 있습니다. 이번 예제에서, ClockConstructor는 생성자를 정의하고, ClockInterface는 인스턴스 메서드를 정의하는 두 인터페이스를 정의합니다. 그리고, 편의를 위해, 전달된 타입의 인스턴스를 생성하는 createClock 생성자 함수를 정의합니다:
```
//생성자 interface
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
//method interface
interface ClockInterface {
    tick(): void;
}

// 생성자 method
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```
또 다른 방법
```
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
      console.log("beep beep");
  }
}
```
***이 방법이 더 편해보이는데...?***
## 인터페이스 확장하기 (Extending Interfaces)
클래스처럼, 인터페이스들도 확장(extend)이 가능합니다. 이는 한 인터페이스의 멤버를 다른 인터페이스에 복사하는 것을 가능하게 해주는데, 인터페이스를 재사용성 높은 컴포넌트로 쪼갤 때, 유연함을 제공해줍니다.
```
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```
```
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

TODO: 하이브리드 타입, 클래스를 확장한 인터페이스 다시보고 기록할 것
