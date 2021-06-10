# Hooks

## Hook이란?
 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 다양한 작업을 제공
 
## Hook의 종류

| Name | Param | Returns | Description |
|:---:|:---:|:---:|:---:|
| `useState` | initialState | - | 가장 기본적인 Hook으로 함수형 컴포넌트에서도 state를 사용할 수 있게 함 |
| `useEffect` | function, [state] | cleanup**언마운트전이나 업데이트 직전에 작업을 원할시** | 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정, componentDidMount + componentDidUpdate |
| `useReducer` | function, initialState | - | 현재상태, 업데이트를 위해 필요한 정보를 담은 action값을 전달 받아 새로운 상태를 반환하는 함수 **새로운 상태를 만들 시 불변성 유지할 것** |
| `useMemo` | function, [state] | - | 함수형 컴포넌트 내부에서 발생하는 연산을 최적화, 특정한 값이 바뀌었을 때만 연산을 실행하고, 바뀌지 않았다면 재사용 |
| `useCallback` | function, [state] | - | useMemo와 상당히 비슷한 함수, 렌더링 성능을 최적화해야 하는 상황에 사용아며 **이벤트 핸들러 함수를 필요할 때만 생성** |
| `useRef` | variable | - | 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해줌, **ref 값이 바뀌어도 리렌더링 되지 않음** |
| `forwardRef` | function | - | 상위 컴포넌트에서 하위컴포넌트 DOM엘리먼트에 ref를 전달 할 수 있음 |
| `useImperativeHandle` | - | - |  부모에게 자식의 메서드나 상태를 넘겨야하는 상황, **forwardRef랑 같이 사용** |
 
