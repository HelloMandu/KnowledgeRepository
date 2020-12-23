# JS Array Method 정리

[Array.from](#arrayfrom)   
[Array.isArray](#arrayisarray)   
[Array.concat](#arrayconcat)   
[Array.copyWithin](#arraycopywithin)   
[Array.entries](#arrayentries)   
[Array.every](#arrayevery)   
[Array.fill](#arrayfill)   
[Array.filter](#arrayfilter)   
[Array.find](#arrayfind)   
[Array.findIndex](#arrayfindindex)   
[Array.forEach](#arrayforEach)   
[Array.indexOf](#arrayindexOf)   
[Array.join](#arrayjoin)   
[Array.keys](#arraykeys)   
[Array.lastIndexOf](#arraylastindexof)   
[Array.map](#arraymap)   
[Array.pop](#arraypop)   
[Array.push](#arraypush)   
[Array.reduce](#arrayreduce)   
[Array.reduceRight](#arrayreduceright)   
[Array.reverse](#arrayreverse)   
[Array.shift](#arrayshift)   
[Array.slice](#arrayslice)   
[Array.some](#arraysome)   
[Array.sort](#arraysort)   
[Array.splice](#arraysplice)   
[Array.toString](#arraytostring)   
[Array.values](#arrayvalues)   

## Array.from()
```js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```
### 구문
```js
Array.from(arrayLike[, mapFn[, thisArg]])
```
### 매개변수
 - arrayLike: 배열로 변환하고자 하는유사 배열 객체나 반복 가능한 객체.
 - mapFnOptional: 배열의 모든 요소에 대해 호출할 맵핑 함수.
thisArgOptional: mapFn 실행 시에 this로 사용할 값.
### 반환 값
새로운 Array 인스턴스.
<hr/>

## Array.isArray()
```js
Array.isArray([1, 2, 3]);  // true
Array.isArray({foo: 123}); // false
Array.isArray('foobar');   // false
Array.isArray(undefined);  // false
```
### 구문
```js
Array.isArray(obj)
```
### 매개변수
 - obj: 검사할 객체.
### 반환 값
객체가 Array라면 true, 아니라면 false.
<hr/>

## Array.concat()
```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```
### 구문
```js
array.concat([value1[, value2[, ...[, valueN]]]])
```
### 매개변수
 - 배열 또는 값
 - 만약 value1 ~ valueN 인자를 생략하면 기존배열의 얕은 복사본을 반환.
### 반환 값
새로운 Array 객체.
<hr/>

## Array.copyWithin()
```js
const array1 = ['a', 'b', 'c', 'd', 'e'];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]

// copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// expected output: Array ["d", "d", "e", "d", "e"]
```
### 구문
```js
arr.copyWithin(target[, start[, end]])
```
### 매개변수
 - target: 복사한 시퀀스(값)를 넣을 위치를 가리키는 0 기반 인덱스. 음수를 지정하면 인덱스를 배열의 끝에서부터 계산합니다.
 - start: 복사를 시작할 위치를 가리키는 0 기반 인덱스. 음수를 지정하면 인덱스를 배열의 끝에서부터 계산합니다.   **기본값은 0으로, start를 지정하지 않으면 배열의 처음부터 복사합니다.**
 - end: 복사를 끝낼 위치를 가리키는 0 기반 인덱스. copyWithin은 end 인덱스 이전까지 복사하므로 end 인덱스가 가리키는 요소는 제외합니다. 음수를 지정하면 인덱스를 배열의 끝에서부터 계산합니다.   **기본값은 arr.length로, end를 지정하지 않으면 배열의 끝까지 복사합니다.**
### 반환 값
수정한 배열.
<hr/>

## Array.entries()
```js
const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]

console.log(iterator1.next().value);
// expected output: Array [1, "b"]
```
### 구문
```js
arr.entries()
```
### 반환 값
Array 반복자 인스턴스 객체.
<hr/>

## Array.every()
```js
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true

```
### 구문
```js
arr.every(callback[, thisArg])
```
### 매개변수
 - callback
### 반환 값
callback이 모든 배열 요소에 대해 참(truthy)인 값을 반환하는 경우 true, 그 외엔 false.
<hr/>

## Array.fill()
```js
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```
### 구문
```js
arr.fill(value[, start[, end]])
```
### 매개변수
 - value: 배열을 채울 값.
 - start: 시작 인덱스, 기본 값은 0
 - end: 끝 인덱스, 기본 값은 this.length.
### 반환 값
변형한 배열.
<hr/>

## Array.filter()
```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```
### 구문
```js
arr.filter(callback(element[, index[, array]])[, thisArg])
```
### 매개변수
 - callback: 각 요소를 시험할 함수. true를 반환하면 요소를 유지하고, false를 반환하면 버립니다.
### 반환 값
테스트를 통과한 요소로 이루어진 새로운 배열. 어떤 요소도 테스트를 통과하지 못했으면 빈 배열을 반환합니다.
<hr/>

## Array.find()
```js
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);
// expected output: 12
```
### 구문
```js
arr.filter(callback(element[, index[, array]])[, thisArg])
```
### 매개변수
 - callback: 배열의 각 값에 대해 실행할 함수.
### 반환 값
주어진 판별 함수를 만족하는 첫 번째 요소의 값. 그 외에는 undefined.
<hr/>

## Array.findIndex()
```js
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```
### 구문
```js
arr.findIndex(callback(element[, index[, array]])[, thisArg])
```
### 매개변수
 - callback: 3개의 인수를 취하여 배열의 각 값에 대해 실행할 함수입니다.
### 반환 값
요소가 테스트를 통과하면 배열의 인덱스. 그렇지 않으면 -1입니다.
<hr/>

## Array.forEach()
```js
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"
```
### 구문
```js
arr.forEach(callback(currentvalue[, index[, array]])[, thisArg])
```
### 매개변수
 - callback:  요소에 대해 실행할 함수. 
### 반환 값
undefined.
<hr/>

## Array.indexOf()
```js
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1

```
### 구문
```js
arr.indexOf(searchElement[, fromIndex])
```
### 매개변수
 - searchElement: 배열에서 찾을 요소입니다.
 - fromIndex: 검색을 시작할 색인입니다.
### 반환 값
배열 내의 요소의 최초의 인덱스. 발견되지 않으면 -1.
<hr/>

## Array.join()
```js
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(''));
// expected output: "FireAirWater"

console.log(elements.join('-'));
// expected output: "Fire-Air-Water"
```
### 구문
```js
arr.join([separator])
```
### 매개변수
 - separator : 배열의 각 요소를 구분할 문자열을 지정합니다. 이 구분자는 필요한 경우 문자열로 변환됩니다. 생략하면 배열의 요소들이 쉼표로 구분됩니다. separator가 빈 문자열이면 모든 요소들이 사이에 아무 문자도 없이 연결됩니다.
### 반환 값
배열의 모든 요소들을 연결한 하나의 문자열을 반환합니다. 만약 arr.length 가 0이라면, 빈 문자열을 반환합니다.
<hr/>

## Array.keys()
```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// expected output: 0
// expected output: 1
// expected output: 2
```
### 구문
```js
arr.keys()
```
### 반환 값
새로운 Array 반복기 객체.
<hr/>

## Array.lastIndexOf()
```js
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));
// expected output: 3

console.log(animals.lastIndexOf('Tiger'));
// expected output: 1
```
### 구문
```js
arr.lastIndexOf(searchElement[, fromIndex])
```
### 매개변수
 - searchElement : 배열에서 찾을 요소.
 - fromIndex : 역순으로 검색을 시작할 인덱스. 배열의 길이에서 1을 뺀 값(arr.length - 1)이 기본값이므로 지정하지 않을 경우 전체 배열을 검색합니다. 주어진 값이 배열의 길이 이상이면 전체 배열을 검색합니다. 값이 음수인 경우, 배열의 마지막부터 시작하는 인덱스로 처리합니다. 다만, 음수를 제공하더라도 검색 순서는 뒤에서 앞입니다. 위의 모든 절차를 거친 최종 계산값이 0 미만인 경우, lastIndexOf()는 항상 -1을 반환합니다. 즉, 배열을 탐색하지 않습니다.
### 반환 값
주어진 값과 일치하는 마지막 요소의 인덱스, 없으면 -1.
<hr/>

## Array.map()
```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]

```
### 구문
```js
arr.map(callback(currentValue[, index[, array]])[, thisArg])
```
### 매개변수
 - callback : 새로운 배열 요소를 생성하는 함수.
### 반환 값
배열의 각 요소에 대해 실행한 callback의 결과를 모은 새로운 배열.
<hr/>

## Array.pop()
```js
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop());
// expected output: "tomato"

console.log(plants);
// expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

plants.pop();

console.log(plants);
// expected output: Array ["broccoli", "cauliflower", "cabbage"]
```
### 구문
```js
arr.pop()
```
### 반환 값
배열에서 제거한 요소. 빈 배열의 경우 undefined 를 반환합니다.
<hr/>

## Array.push()
```js
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count);
// expected output: 4
console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows"]

animals.push('chickens', 'cats', 'dogs');
console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]

```
### 구문
```js
arr.push(element1[, ...[, elementN]])
```
### 매개변수
 - elementN : 배열의 끝에 추가할 요소.
### 반환 값
호출한 배열의 새로운 length 속성.
<hr/>

## Array.reduce()
```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```
### 구문
```js
arr.reduce(callback[, initialValue])
```
### 매개변수
 - callback : 배열의 각 요소에 대해 실행할 함수. 다음 네 가지 인수를 받습니다.
   - accumulator: 누산기accmulator는 콜백의 반환값을 누적합니다. 콜백의 이전 반환값 또는, 콜백의 첫 번째 호출이면서 initialValue를 제공한 경우에는 initialValue의 값입니다.
   - currentValue: 처리할 현재 요소.
   - currentIndex : 처리할 현재 요소의 인덱스. initialValue를 제공한 경우 0, 아니면 1부터 시작합니다.
   - array : reduce()를 호출한 배열.
 - initialValue : callback의 최초 호출에서 첫 번째 인수에 제공하는 값. 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용합니다. 빈 배열에서 초기값 없이 reduce()를 호출하면 오류가 발생합니다.
### 반환 값
누적 계산의 결과 값.
<hr/>

## Array.reduceRight()
```js
const array1 = [[0, 1], [2, 3], [4, 5]].reduceRight(
  (accumulator, currentValue) => accumulator.concat(currentValue)
);

console.log(array1);
// expected output: Array [4, 5, 2, 3, 0, 1]

```
### 구문
```js
arr.reduceRight(callback[, initialValue])
```
### 매개변수
 - callback : 배열의 각 요소에 대해 실행할 함수. 다음 네 가지 인수를 받습니다.
   - previousValue: 콜백의 마지막 호출에서 이전에 리턴 된 값 또는 제공된 경우 initialValue.
   - currentValue: 배열에서 처리중인 현재 요소입니다.
   - index : 처리할 현재 요소의 인덱스.
   - array : reduce()를 호출한 배열.
 - initialValue : 콜백의 최초의 호출의 최초의 인수로서 사용하는 객체입니다.
### 반환 값
누적 계산의 결과 값.
<hr/>

## Array.reverse()
```js
const array1 = ['one', 'two', 'three'];
console.log('array1:', array1);
// expected output: "array1:" Array ["one", "two", "three"]

const reversed = array1.reverse();
console.log('reversed:', reversed);
// expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log('array1:', array1);
// expected output: "array1:" Array ["three", "two", "one"]
```
### 구문
```js
a.reverse()
```
### 반환 값
순서가 반전된 배열.
<hr/>

## Array.shift()
```js
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// expected output: Array [2, 3]

console.log(firstElement);
// expected output: 1

```
### 구문
```js
arr.shift()
```
### 반환 값
배열에서 제거한 요소. 빈 배열의 경우 undefined 를 반환합니다.
<hr/>

## Array.slice()
```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```
### 구문
```js
arr.slice([begin[, end]])
```
### 매개변수
 - begin : 0을 시작으로 하는 추출 시작점에 대한 인덱스를 의미
 - end  : 추출을 종료 할 0 기준 인덱스입니다.
### 반환 값
추출한 요소를 포함한 새로운 배열.
<hr/>

## Array.some()
```js
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```
### 구문
```js
arr.some(callback[, thisArg])
```
### 매개변수
 - callback
### 반환 값
callback이 어떤 배열 요소라도 대해 참인(truthy) 값을 반환하는 경우 true, 그 외엔 false.
<hr/>

## Array.sort()
```js
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]
```
### 구문
```js
arr.sort([compareFunction])
```
### 매개변수
 - compareFunction : 정렬 순서를 정의하는 함수. 생략하면 배열은 각 요소의 문자열 변환에 따라 각 문자의 유니 코드 코드 포인트 값에 따라 정렬됩니다
### 반환 값
정렬한 배열. 원 배열이 정렬되는 것에 유의하세요. 복사본이 만들어지는 것이 아닙니다

```js
function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  }
  if (a is greater than b by the ordering criterion) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```

```js
// 오름차순 정렬
function compareNumbers(a, b) {
  return a - b;
}
```
<hr/>

## Array.splice()
```js
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```
### 구문
```js
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```
### 매개변수
 - start : 배열의 변경을 시작할 인덱스입니다
 - deleteCount : 배열에서 제거할 요소의 수입니다
### 반환 값
제거한 요소를 담은 배열. 하나의 요소만 제거한 경우 길이가 1인 배열을 반환합니다. 아무 값도 제거하지 않았으면 빈 배열을 반환합니다.
<hr/>

## Array.toString()
```js
const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"
```
### 구문
```js
arr.toString()
```
### 반환 값
배열을 표현하는 문자열을 반환합니다.
<hr/>

## Array.values()
```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.values();

for (const value of iterator) {
  console.log(value);
}

// expected output: "a"
// expected output: "b"
// expected output: "c"
```
### 구문
```js
arr.values()
```
### 반환 값
새로운 Array 반복기 객체.
<hr/>