## 자주 사용하는 JavaScript 배열 

1. concat : 기존의 push함수는 기존 배열 자체를 변경해 주는 반면, 새로운 배열을 만들어 준다는 차이점 // **React는 불변성을 유지해주어야함**
2. map : 배열 값을 사용하여 JSX코드로 된 배열을 새로 생성 // **key값을 사용해 데이터의 유일성을 설정해야함**
3. filter : 특정 조건을 만족하는 원소들만 쉽게 분류할 수 있음

```jsx
import React, {useState} from 'react';

const IterationSample = () =>{
    const [names, setNames] = useState([
        {id: 1, text:'눈사람'},
        {id: 2, text:'얼음'},
        {id: 3, text:'눈'},
        {id: 4, text:'바람'},
    ]);
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(5);
    const onChange = (e)=>{setInputText(e.target.value);}
    const onClick = ()=>{
        const nextNames = names.concat({
            id:nextId,
            text:inputText
        });
        setNextId(nextId + 1);
        setNames(nextNames);
        setInputText('');
    }
    const onRemove = (id)=>{
        const nextNames = names.filter(name => name.id !== id);
        setNames(nextNames);
    }
    const namesList = names.map(name=><li key={name.id} onDoubleClick={()=>onRemove(name.id)}>{name.text}</li>);
    return (
        <div>
            <input value={inputText} onChange={onChange}/>
            <button onClick={onClick}>추가</button>
            <ul>{namesList}</ul>
        </div>
    )
}

export default IterationSample;
```