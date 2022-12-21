# Object와 Map

map은 자주 사용하는 key&value 쌍의 데이터 구조입니다.
```typescript
const map = new Map<string, string>([
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3'],
])

console.log(map.get('key1'));
```
하지만 자바스크립트를 사용할 때 Object를 이용해 map과 비슷하게 사용할 수 있습니다.
```typescript
const map = {};
map['key1'] = 'value1';
map['key2'] = 'value2';
map['key3'] = 'value3';

console.log(map['key1']);
```
둘 중 어떤걸 사용하는 게 좋을까요? 저라면 Map을 더 선호할 것 같습니다.   
제가 생각한 Map을 사용했을 때 이점을 설명드리겠습니다.

## Map이 Object보다 좋은 점

### 1. 다양한 타입의 key
Object의 key는 기호나 문자만을 가질 수 있습니다. 하지만 Map은 다양한 타입의 key를 사용할 수 있습니다.
```typescript
const numberMap = new Map<number, string>([
    [1, 'value1'],
    [2, 'value2'],
])

console.log(numberMap.get(1)) // 'value1'

const fooFunc = () => console.log('foo');
const barFunc = () => console.log('bar');
const functionMap = new Map<Function, string>([
    [fooFunc, 'value1'],
    [barFunc, 'value2'],
])

console.log(numberMap.get(fooFunc)) // 'value1'

const fooObj = { name: 'foo' };
const barObj = { name: 'bar' };
const ObjectMap = new Map<Object, string>([
    [fooObj, 'value1'],
    [barObj, 'value2'],
])

console.log(numberMap.get(fooObj)) // 'value1'
```


### 2. Map에서 제공하는 다양한 함수
Map interface를 확인해보면 제공하는 다양한 기본 함수들이 있습니다.    
Object를 사용할 때보다 훨씬 직관적이고 이해하기 쉬운 코드를 작성할 수 있을 것 같습니다.
```typescript
interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    readonly size: number;
}
```

### 주의할 점
Map을 사용할때 Object를 사용하는 것처럼 쓰이는 경우가 있습니다.    
Map을 사용할때 Object를 사용하듯이 사용하면 제대로 동작하지 않습니다.
```javascript
const wrongMap = new Map()
wrongMap['bla'] = 'blaa'
wrongMap['bla2'] = 'blaaa2'

console.log(wrongMap)  // Map { bla: 'blaa', bla2: 'blaaa2' }

wrongMap.has('bla')    // false
wrongMap.delete('bla') // false
console.log(wrongMap)  // Map { bla: 'blaa', bla2: 'blaaa2' }
```

### 의문점
- Map은 내부 구현이 red-black트리로 되었는 걸로 이해하고 있는데 조금 더 자세히 알아봐야 할 것 같습니다.
- Object key를 이용한 것과 Map을 이용한 것 중 어떤 방법이 성능적으로 더 좋을까? javascript 두 방법의 내부 동작 방식을 이해하고 다시 포스팅 하겠습니다.