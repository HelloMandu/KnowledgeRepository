# Todo Project
![image](https://user-images.githubusercontent.com/45222982/93972330-07305900-fdad-11ea-9c3e-ef90ed07a345.png)

## Components
- TodoTemplate: root component
- TodoInsert: 새로운 항복 입력, 추가
- TodoListItem: TodoList에 보여질 각 항목에 대한 정보
- TodoList: map을 이용해 TodoListItem컴포넌트로 변환하여 보여줌

## NOTE
 - props로 전달해야 할 함수를 만들때는 useCallback을 사용하여 감싸는 것을 습관화 할 것
 - form태그를 사용하면 enter도 가능하지만 e.preventDefault()를 이용해 새로고침 방지해야함
 - 크롬 개발자도구 performance 녹화 기능을 통해 성능을 측정가능 **자주사용하자**
 - **부모 컴포넌트의 state가 변경되면 자식 컴포넌트 또한 렌더링되기 때문에 React.memo를 통해 props가 바뀌지 않았다면 리렌더링 하지 않도록 설정**
 - **useState를 쓸 때 함수형 업데이트 기능을 사용하자, 그러면 useCallback을 사용할 때 두번째 파라미터를 비워둘 수 있다**
 - **useReducer을 사용해서 업데이트 하는 방법도 좋은 방법임**
 - **리스트 관련 컴포넌트를 작성할 때는 리스트 아이템과 리스트 두가지 컴포넌트를 꼭 최적화**
 - **react_virtualized를 이용해 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 함**
