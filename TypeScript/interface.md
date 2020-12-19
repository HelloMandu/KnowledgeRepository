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

