# 메소드와 'this'

객체 프로퍼티에 할당된 함수를 *메서드(method)* 라고 부름

`메서드 내부에서 this 키워드를 사용하면 객체에 접근할 수 있음`
```js
let user = {
  name: "John",
  age: 30,
  sayHi() {
    // 'this'는 '현재 객체'를 나타냅니다.
    alert(this.name);

};

user.sayHi(); // John
```
```js
let user = {
  name: "John",
  age: 30,
  sayHi() {
    alert(user.name); // 'this' 대신 'user'를 이용함
  }
};
```
user를 복사해` 다른 변수에 할당(admin = user)`하고, user는 전혀 다른 값으로 덮어썼다고 가정

`sayHi()는 원치 않는 값(null)을 참조`
```js
let user = {
  name: "John",
  age: 30,
  sayHi() {
    alert( user.name ); // Error: Cannot read property 'name' of null
  }
};


let admin = user;
user = null; // user를 null로 덮어씁니다.

admin.sayHi(); // sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생했습니다.
```

## 자바스크립트의 this

```js
// 아래와 같이 코드를 작성해도 문법 에러가 발생하지 않음
function sayHi() {
  alert( this.name );
}
```

`this 값은 런타임에 결정, 실행 컨텍스틍 따라 달라짐`

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (점과 대괄호는 동일하게 동작함)
```

### 객체 없이 호출하기: this == undefined
```js
function sayHi() {
  alert(this);
}
sayHi(); // undefined
```
위와 같은 코드를 엄격 모드에서 실행하면, `this엔 undefined가 할당`. 
`this.name으로 name에 접근하려고 하면 에러가 발생`. 그런데 `엄격 모드가 아닐 때는 this가 전역 객체를 참조`. `브라우저 환경에선 window라는 전역 객체를 참조`. 이런 동작 차이는 "use strict"가 도입된 배경이기도 함.

### 자유로운 this가 만드는 결과

자바스크립트에서 this는 런타임에 결정됨. 메서드가 어디서 정의되었는지에 상관없이 this는 ‘점 앞의’ 객체가 무엇인가에 따라 ‘자유롭게’ 결정.

함수(메서드)를 하나만 만들어 여러 객체에서 재사용할 수 있다는 것은 장점이지만, 이런 유연함이 실수로 이어질 수 있다는 것은 단점임.

## 'this’가 없는 화살표 함수
화살표 함수는 `일반 함수와는 달리 ‘고유한’ this를 가지지 않음`. `화살표 함수에서 this를 참조하면, 화살표 함수가 아닌 ‘평범한’ 외부 함수에서 this 값을 가져옴`.

아래 예시에서 함수 arrow()의 this는 외부 함수 user.sayHi()의 this가 됨.
```js
let user = {
  firstName: "보라",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // 보라
```

## 요약

`this 값은 런타임에 결정`
- 함수를 선언할 때 this를 사용할 수 있음. 다만, 함수가 호출되기 전까지 this엔 값이 할당되지 않음.
- 함수를 복사해 객체 간 전달할 수 있음.
- 함수를 객체 프로퍼티에 저장해 object.method()같이 ‘메서드’ 형태로 호출하면 this는 object를 참조.