# Object.keys, values, entries

- Object.keys(obj) – 키가 담긴 배열을 반환합니다.
- Object.values(obj) – 값이 담긴 배열을 반환합니다.
- Object.entries(obj) – [key, value] 쌍이 담긴 배열을 반환합니다.

```js
const user = {
  name: "John",
  age: 30
};
```
- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

```js
let user = {
  name: "John",
  age: 30
};

// 값을 순회합니다.
for (let value of Object.values(user)) {
  alert(value); // John, 30
}
```

## 객체 변환하기
 1. Object.entries(obj)를 사용해 객체의 키-값 쌍을 요소로 갖는 배열을 얻습니다.
2. 1.에서 만든 배열에 map 등의 배열 전용 메서드를 적용합니다.
3. 2.에서 반환된 배열에 Object.fromEntries(array)를 적용해 배열을 다시 객체로 되돌립니다.

```js
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // 객체를 배열로 변환해서 배열 전용 메서드인 map을 적용하고 fromEntries를 사용해 배열을 다시 객체로 되돌립니다.
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8
```

```js
const sumSalaries = (salaries) => {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

```js
const count = (obj) => {
  return Object.keys(obj).length;
}

let user = {
  name: 'John',
  age: 30
};

alert( count(user) ); // 2
```