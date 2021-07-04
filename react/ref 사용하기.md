# ref 속성값 활용하기

리액트를 작업하다 보면 돔 요소에 직접 접근해야 할 때가 있다. 이때 ref 속성값을 이용해 자식 요소에 직접 접근할 수 있다.
클래스형 컴포넌트에선 ref 속성값을 이용해 해당 컴포넌트의 인스턴스를 가리킬 수 있다. 따라서 ref.current 로 해당 클래스의 메서드를 호출할 수 있다.   
함수형 컴포넌트는 인스턴스로 만들어지지 않지만 useImperativeHandle 훅을 사용해 변수와 함수를 외부로 노출시킬 수 있다.   

다음은 ref 속성값을 이용해서 돔 요소를 제어하는 코드다.
```jsx
function Input(){
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [])
    return <input ref={inputRef} type={"text"}/>
}
```

## ref 속성값의 다양한 활용법을 알아보자.   
대표적으로 3가지가 있다.
- ref 속성값을 사용하는 방법
- forwardRef 함수로 ref 속성값을 직접 처리하는 방법
- ref 속성값으로 함수를 사용하는 방법
- 렌더링과 무관한 값을 사용할 때

### 함수형 컴포넌트에서 ref 속성값 활용하기
```jsx
function Input({inputRef}){
    return <input ref={inputRef} type={"text"}/>
}

function Form(){
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [])
    return(
        <div>
            <TextInput inputRef={inputRef}/>
            <button onClick={() => inputRef.current?.focus()}>포커싱</button>
        </div>
    )
}
```
여기서 Input 컴포넌트는 inputRef 속성값을 input 요소의 ref 속성값으로 넣고 있는데 좋은 방법이 아니다.    
Input 컴포넌트의 내부 구조를 알아야하기 때문이다. 따라서 위와 같은 방법은 꼭 필요한 경우에만 사용하는 것이 좋다.

### forwardRef 함수로 ref 속성값을 직접 처리하기
```jsx
const Input = forwardRef((props, ref) => {
    return <input ref={ref} type={"text"}/>
})

function Form(){
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [])
    return(
        <div>
            <TextInput ref={inputRef}/>
            <button onClick={() => inputRef.current?.focus()}>포커싱</button>
        </div>
    )
}
```
forwardRef 함수를 이용하면 부모 컴포넌트에서 넘어온 ref 속성값을 직접 처리할 수 있다.
함수형 컴포넌트에선 ref를 props로 넘기는게 불가능하지만 forwardRef를 이용하면 사용할 수 있다.


### ref 속성값으로 함수 사용하기
```jsx
function Form(){
    const [text, setText] = useState(INIT_TEXT);
    const [showText, setShowText] = useState(false);
    const initialRef = useCallback((ref) => {
        ref && setText(INIT_TEXT)
    })
    return(
        <div>
            {showText &&( 
                <input 
                    type={"text"}
                    ref={initialRef}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />)}
            <button onClick={() => setShowText(showText => !showText)}>
                보기/가리기
            </button>
        </div>
    )
}
```
showText의 값에 따라 input 요소가 제거되거나 생성된다.    
ref 속성값으로 입력한 함수는 해당 요소가 생성, 제거될 때마다 호출된다. (생성시 참조변수, 제거시 null)   
여기서 initialRef함수에 useCallback을 사용했다. useCallback을 사용하지 않으면 어떻게 될까?

```
useCallback을 사용하지 않으면 input 요소에 텍스트를 입력해도 INIT_TEXT만 보일 것이다. 이는 리렌더링이 될때마다 새로운 함수를 ref 속성값으로 넣기 때문인데   
ref 속성값으로 새로운 함수가 들어오면 이전 함수에 null 인수를 넣어 호출하고, 새로운 함수에 참조값을 넣어서 호출하기 때문이다.
```

### 렌더링과 무관한 값 저장
```jsx
function Counter() {
    const [count, setCount] = useState(0);
    const timer = useRef(0);

    useEffect(() => {
        timer.current = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);
        return () => {
            clearInterval(timer.current);
        }
    }, []);

    const onClickStop = () => {
        clearInterval(timer.current);
    };

    return (
        <div>
            <div>{count}</div>
            <button onClick={onClickStop}>멈춰!</button>
        </div>
    );
}
```
컴포넌트 내부의 값 중에서는 렌더링과는 무관한 값도 있는데 이런 값들을 저장할 때 useRef를 사용한다.    
위 예는 setInterval이 반환하는 값을 가지고 있다가 적절한 타이밍에 clear해주기 위해 사용한다.

## 마무리
useRef는 개인적으로 useState 다음으로 많이 쓰이는 hook 중 하나인 것 같다.   
UX를 위해 input focus 를 준다거나 렌더링과 무관한 값을 사용할때 자주 사용되는 것 같다.
그렇지만 불필요하게 자주 사용하면 좋지 않으니 꼭 필요한 상황에만 쓸 수 있도록 하자!
