# React KeyProps

### key props 를 사용하지 않는 경우
리액트는 중간에 요소를 추가하면 그 뒤에 있는 요소가 변경되지 않았다는 것을 알지 못한다. `바나나`가 변경되지 않았다는 것을 알기 위해서는 모든 값을 비교해야 한다. 리액트는 효율적인 연산을 위해 순서 정보를 이용한다.

두번째 요소는 `바나나`였고 이후 `파인애플`로 변경되어 변경사항을 DOMTree 에 적용한다.
세번째 요소는 새로 생겼으므로 DOMTree 에 추가한다.
```jsx
function App(){
    if(flag){
        return(
            <div>
                <p>사과</p>
                <p>바나나</p>
            </div>
        );
    } else{
        return(
            <div>
                <p>사과</p>
                <p>파인애플</p>
                <p>바나나</p>
            </div>
        );
    }
}
```

### key props 를 사용하는 경우

하지만 여기서 key props 를 이용하면 두번째 요소 `파인애플`의 변경사항만 DOMTree 에 적용한다.
key props 를 이용하면 리액트는 같은 키를 가지는 요소끼리만 비교한다.   
따라서 `바나나` 요소가 변경되지 않았다는 것을 알고 `pineapple` 키는 새로 추가됬으므로 실제 돔에는 `파인애플`요소만 추가한다.   
key props 는 리액트가 렌더링을 효율적으로 할 수 있도록 우리가 제공하는 추가 정보이다.
```jsx
function App(){
    if(flag){
        return(
            <div>
                <p key="apple">사과</p>
                <p key="banana">바나나</p>
            </div>
        );
    } else{
        return(
            <div>
                <p key="apple">사과</p>
                <p key="pineapple">파인애플</p>
                <p key="banana">바나나</p>
            </div>
        );
    }
}
```

배열을 사용할때 key props 를 입력하지 않으면 경고문을 자주 봤을 것이다. 대부분의 데이터는 id 값이 존재해 그 값을 key 로 사용할 수 있다.
하지만 id가 없다면 차선책으로 배열 index 를 입력할 수 있는데 배열 중간 요소를 추가하거나 삭제하는 경우 비효율적으로 렌더링된다.
따라서 배열의 중간 요소 추가, 삭제 또는 정렬하는 경우 key 값으로 index 를 사용하는 것은 좋지 않은 방법이다.
```jsx
const arr = ['a', 'b', 'c'];
function App(){
    return(
        <ul>
            {arr.map((v, index) => (
                <li key={index}>v</li>
            ))}
        </ul>
    )
}
```

## 마무리
리스트를 렌더링할 때 key 를 입력하지 않은 경우 주로 경고문을 보게 될 것이다.
key 를 입력해야한다는 것은 알고 있는데 왜 입력해야되는지 어느정도 정리가 된 것 같다.
key 를 사용할 때 index 보단 id 값을 이용하는게 좋은 방법일 듯하다.