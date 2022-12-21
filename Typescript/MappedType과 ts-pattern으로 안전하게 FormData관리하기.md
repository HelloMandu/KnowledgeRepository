# MappedType과 ts-pattern으로 안전하게 패턴매칭하기

React에서 상태관리 로직을 작성할 때 업데이트 로직을 컴포넌트로부터 분리시키기위해 useReducer 훅을 주로 사용합니다.   
개인적으론 복잡한 상태관리 로직이 있거나 FormData를 관리할 때 유용하게 사용하는데요.  
이번 포스팅에서는 액션이 많고 복잡한 경우 MappedType과 ts-pattern을 사용해 개발경험을 향상 시킨 사례에 대해 설명드리겠습니다.

먼저 일반적으로 흔히 알고있는 useReducer의 사용법을 살펴보겠습니다.
```tsx
// 회원가입 type
type Register = {
  email: string;
  password: string;
  name: string;
  contactNo: string;
  address: string;
  birthDate: Date;
}

// 회원가입 Action
type RegisterAction =
  | { type: 'email', payload: string }
  | { type: 'password', payload: string }
  | { type: 'name', payload: string }
  | { type: 'contactNo', payload: string }
  | { type: 'address', payload: string }

// 회원가입 reducer
const registerReducer = (state: Register, action: RegisterAction) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload }
    case 'password':
      return { ...state, password: action.payload }
    case 'name':
      return { ...state, name: action.payload }
    case 'contactNo':
      return { ...state, contactNo: action.payload }
    case 'address':
      return { ...state, address: action.payload }
    default:
      return state
  }
}


const RegisterForm = () => {
  const [register, dispatch] = useReducer(registerReducer, initialState);
  return (...);
}
```

혹시 코드를 보고 이상한 점을 찾으셨나요? **RegisterAction** 타입에 **birthDate** 관련 액션이 누락되었습니다.   
만약 예시코드보다 더 복잡한 상태관리 로직이 있다면 **RegisterAction**에는 더 많은 액션이 있을 것이고 이를 놓치기 쉬울 수 있습니다.   
그리고 reducer를 작성할때마다 매번 action type을 정의하고 reducer를 작성해야하는 번거로움이 있습니다.


## MappedType

이런 문제를 해결하기 위해 [MappedType](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)을 사용할 수 있습니다. MappedType은 기존 타입을 변형하여 새로운 타입을 만들어내는 유용한 기능입니다. 
MappedType을 이용해 **ReducerAction** 타입을 다음과 같이 정의할 수 있습니다.

```ts
type ReducerAction<T extends Record<string, unknown>> = {
  [K in keyof T]-?: { type: K; payload: T[K] };
}[keyof T];
```
 **ReducerAction** 타입을 사용하면 특정 타입에 대한 액션 타입을 추출해낼 수 있습니다.

```ts
type Register = {
  email: string;
  password: string;
  name: string;
  contactNo: string;
  address: string;
  birthDate: Date;
}
type RegisterAction = ReducerAction<Register>
/*
type RegisterAction =
  | { type: 'email', payload: string }
  | { type: 'password', payload: string }
  | { type: 'name', payload: string }
  | { type: 'contactNo', payload: string }
  | { type: 'address', payload: string }
  | { type: 'birthDate', payload: Date}
*/


type Order = {
  name: string;
  category: string;
  price: number;
}
type OrderAction = ReducerAction<Order>
/*
type OrderAction =
  | { type: 'name', payload: string }
  | { type: 'category', payload: string }
  | { type: 'price', payload: number}
*/
```

이제 다시 기존 코드를 수정해보겠습니다.

```tsx
// 회원가입 type
type Register = {
  email: string;
  password: string;
  name: string;
  contactNo: string;
  address: string;
  birthDate: Date;
}

// 회원가입 Action
type RegisterAction = ReducerAction<Register>

// 회원가입 reducer
const registerReducer = (state: Register, action: RegisterAction) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload }
    case 'password':
      return { ...state, password: action.payload }
    case 'name':
      return { ...state, name: action.payload }
    case 'contactNo':
      return { ...state, contactNo: action.payload }
    case 'address':
      return { ...state, address: action.payload }
    default:
      return state
  }
}


const RegisterForm = () => {
  const [register, dispatch] = useReducer(registerReducer, initialState);
  return (...);
}
```

ReducerAction로부터 RegisterAction 타입을 추출해 더 이상 액션 타입을 정의하지 않아도 됩니다.   
하지만 아직 문제가 하나 남았습니다. RegisterAction 타입의 모든 케이스를 고려하지 않았음에도 컴파일 에러가 발생하지 않습니다.    

## ts-pattern

아쉽게도 타입스크립트에서는 패턴매칭을 지원하지 않는데요. 저는 [ts-pattern](https://github.com/gvergnaud/ts-pattern)에서 제공하는 exhaustive 패턴매칭을 활용해 문제를 해결하였습니다.   
exhaustive 패턴매칭은 모든 케이스를 고려하지 않았을 때 컴파일 에러를 발생시킵니다. 

```tsx
// 회원가입 type
type Register = {
  email: string;
  password: string;
  name: string;
  contactNo: string;
  address: string;
  birthDate?: Date;
}

// 회원가입 Action
type RegisterAction = ReducerAction<Register>

// 회원가입 reducer
const registerReducer = (state: Register, action: RegisterAction) => 
  match(action)
    .with({ type: 'email' }, ({ payload }) => ({ ...state, email: payload }))
    .with({ type: 'password' }, ({ payload }) => ({ ...state, password: payload }))
    .with({ type: 'name' }, ({ payload }) => ({ ...state, name: payload }))
    .with({ type: 'contactNo' }, ({ payload }) => ({ ...state, contactNo: payload }))
    .with({ type: 'address' }, ({ payload }) => ({ ...state, address: payload }))
    .with({ type: 'birthDate' }, ({ payload }) => ({ ...state, birthDate: payload })) // 누락된 경우 컴파일 에러 발생
    .exhaustive()

const RegisterForm = () => {
  const [register, dispatch] = useReducer(registerReducer, initialState);
  return (...);
}
```

## 정리
MappedType을 활용해 반복작업을 줄이고 코드를 간결하게 작성할 수 있게 되었고,   
ts-pattern의 exhaustive 패턴매칭을 활용해 모든 케이스를 고려하지 않았을 경우 컴파일 타임에 에러를 발생시켰습니다.    
타입시스템을 이용해 실수를 방지하고 런타임에 발생할 수 있는 에러를 사전에 방지한다면 더 높은 생상성과 안정성을 동시에 가져갈 수 있을 것입니다.

