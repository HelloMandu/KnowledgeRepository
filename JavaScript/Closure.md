# 클로저(Closure)

자바스크립트는 함수 지향 언어. 함수를 동적으로 생성할 수 있고, 생성한 함수를 다른 함수에 인수로 넘길 수 있으며, 생성된 곳이 아닌 곳에서 함수를 호출할 수도 있음.

## 중첩함수

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```
 새로운 객체의 프로퍼티 형태로나 중첩 함수 그 자체로 반환. 이렇게 반환된 함수는 어디서든 호출해 사용할 수 있음. 물론 이때도 `외부 변수에 접근할 수 있다`.

 ## Lexical Environment(렉시컬 환경)

 ### 단계 1: 변수
 자바스크립트에선 실행 중인 함수, 코드 블록 `{...}`, 스크립트 전체는 `렉시컬 환경(Lexical Environment)` 이라 불리는 내부 숨김 연관 객체(internal hidden associated object)를 가진다.

 1. 환경 레코드(Environment Record) – 모든 지역 변수를 프로퍼티로 저장하고 있는 객체입니다. this 값과 같은 기타 정보도 여기에 저장.
 2. 외부 렉시컬 환경(Outer Lexical Environment) 에 대한 참조 – 외부 코드와 연관됨

![변수](https://ko.javascript.info/article/closure/closure-variable-phrase.svg)

1. 스크립트가 시작되면 스크립트 내에서 선언한 변수 전체가 렉시컬 환경에 올라감(pre-populated).
 - 이때 변수의 상태는 특수 내부 상태(special internal state)인 'uninitialized’가 됨. . 자바스크립트 엔진은 ‘uninitialized’ 상태의 변수를 인지하긴 하지만, let을 만나기 전까진 이 변수를 참조할 수 없음.
2. let phrase에 값을 할당하기 전이기 때문에 프로퍼티 값은 undefined입니다. phrase는 이 시점 이후부터 사용할 수 있음.
3. phrase에 값이 할당.
4. phrase의 값이 변경.

#### 요약
- 변수는 특수 내부 객체인 환경 레코드의 프로퍼티. 환경 레코드는 현재 실행 중인 함수와 코드 블록, 스크립트와 연관되어 있음.
- 변수를 변경하면 환경 레코드의 프로퍼티가 변경.

### 단계 2: 함수 선언문
함수 선언문(function declaration)으로 선언한 함수는 일반 변수와는 달리 `바로 초기화`됨
함수 선언문으로 선언한 함수는 `렉시컬 환경이 만들어지는 즉시 사용할 수 있음`

![함수선언문](https://ko.javascript.info/article/closure/closure-function-declaration.svg)

이런 동작 방식은 함수 선언문으로 정의한 함수에만 적용되므로 `let say = function(name)...`같이 함수를 변수에 할당한 `함수 표현식(Function Expression)은 해당하지 않음`.

### 단계 3: 내부와 외부 렉시컬 환경

![함수렉시컬환경](https://ko.javascript.info/article/closure/lexical-environment-simple-lookup.svg)
함수를 호출해 실행하면 새로운 렉시컬 환경이 자동으로 만들어짐, 함수가 호출 중인 동안은 호출 중인 `함수를 위한 내부 렉시컬 환경과 내부 렉시컬 환경이 가리키는 외부(전역) 렉시컬 환경 두 개를 갖게 됨. 그리고 내부 렉시컬 환경은 외부 렉시컬 환경에 대한 참조를 가진다.`

**코드에서 변수에 접근할 땐, 먼저 내부 렉시컬 환경을 검색 범위로 잡은 뒤 내부 렉시컬 환경에서 원하는 변수를 찾지 못하면 검색 범위를 내부 렉시컬 환경이 참조하는 외부 렉시컬 환경으로 확장. 이 과정은 검색 범위가 전역 렉시컬 환경으로 확장될 때까지 반복**

- 전역 렉시컬 환경에 도달할 때까지 변수를 찾지 못하면 엄격 모드에선 에러가 발생
- 비 엄격 모드에선 정의되지 않은 변수에 값을 할당하려고 하면 에러가 발생하는 대신 새로운 전역 변수가 만들어지는데, 이는 하위 호환성을 위해 남아있는 기능

### 단계 4: 반환 함수
```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```
현재는 중첩함수가 생성되기만 하고 실행은 되지 않은 상태

![반환함수](https://ko.javascript.info/article/closure/closure-makecounter-environment.svg)
counter.[[Environment]]엔 {count: 0}이 있는 렉시컬 환경에 대한 `참조가 저장`됩니다. 호출 장소와 상관없이 함수가 자신이 태어난 곳을 기억할 수 있는 건 [[Environment]] 프로퍼티 때문임. [[Environment]]는 함수가 생성될 때 딱 한 번 그 값이 세팅

counter()를 호출하면 각 호출마다 새로운 렉시컬 환경이 만들어짐. 그리고 이 렉시컬 환경은 counter.[[Environment]]에 저장된 렉시컬 환경을 외부 렉시컬 환경으로서 참조
![반환함수실행](https://ko.javascript.info/article/closure/closure-makecounter-nested-call.svg)

실행 흐름이 중첩 함수의 본문으로 넘어오면 count 변수가 필요함
1. 먼저 자체 렉시컬 환경에서 변수를 찾음. 
2. 익명 중첩 함수엔 지역변수가 없기 때문에 이 렉시컬 환경은 비어있는 상황(<empty>)
3. counter()의 렉시컬 환경이 참조하는 외부 렉시컬 환경에서 count를 찾음
4. 변숫값 갱신은 변수가 저장된 외부 렉시컬 환경에서 이뤄짐.
![반환함수실행후](https://ko.javascript.info/article/closure/closure-makecounter-nested-call-2.svg)

## 결론

클로저는 `외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미`. 몇몇 언어에선 클로저를 구현하는 게 불가능하거나 특수한 방식으로 함수를 작성해야 클로저를 만들 수 있음. 하지만 자바스크립트에선 모든 함수가 자연스럽게 클로저가 됨. *'new Function' 문법은 예외.*
자바스크립트의 함수는 숨김 프로퍼티인 [[Environment]]를 이용해 자신이 어디서 만들어졌는지를 기억. 함수 내부의 코드는 [[Environment]]를 사용해 외부 변수에 접근.
