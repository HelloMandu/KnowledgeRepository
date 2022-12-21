# null 병합 연산자 '??'

프로젝트를 진행하던 도중 ?? 연산자가 아닌 || 연산자를 사용한 경우를 발견했다. 둘의 차이점을 알아보자

a ?? b의 평가 결과는 다음과 같습니다.
- a가 null도 아니고 undefined도 아니면 a
- 그 외의 경우는 b

```js
x = (a !== null && a !== undefined) ? a : b;
```

## 자바스크립트 '||'의 추가기능

```js
result = value1 || value2 || value3;
```

- 가장 왼쪽 피연산자부터 피연산자를 평가합니다.
- 각 피연산자를 불린형으로 변환 후 true이면 연산을 멈추고 해당 피연산자의 원래 값을 반환합니다.
- 피연산자 모두를 평가한 경우(모든 피연산자가 false로 평가되는 경우)엔 마지막 피연산자를 반환합니다.

```js
console.log('' || 0) // 0
console.log( '' || 1 ); // 1
console.log( null || 1 || 0 ); // 1
```


## '??'와 '||'의 차이

- ||는 첫 번째 truthy 값을 반환합니다.
- ??는 첫 번째 정의된(defined) 값을 반환합니다.

null과 undefined, 숫자 0과 문자열 ''을 구분 지어 다뤄야 할 때 이 차이점은 매우 중요한 역할을 합니다
```js
const value = 0;

console.log(value || 100); // 100
console.log(value ?? 100); // 0

const value2 = '';

console.log(value2 || '100'); // 100
console.log(value2 ?? '100'); // 0
```