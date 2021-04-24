## LifeCycle
라이프사이클은 총 세가지
 - 마운트
 - 업데이트
 - 언마운트
 
### 마운트
 DOM이 생성되고 웹 브라우저상에 나타나는 것을 마운트(Mount)라고 하며 이때 호출하는 메소드는 다음과 같다
 - constructor: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메소드
 - getDerivedStateFromProps: props에 있는 값을 state에 넣을 때 사용하는 메소드
 - render: 우리가 준비한 UI를 렌더링하는 메소드
 - componentDidMount: 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메소드
 
### 업데이트
 컴포넌트는 다음과 같은 총 네가지 경우에 업데이트
 1. props가 바뀔 때
 2. state가 바뀔 때
 3. 부모 컴포넌트가 리렌더링될 때
 4. this.forceUpdate로 강제로 렌더링을 트리거할 때
 
### LifeCycle method 종류

- render : 컴포넌트 모양새를 정의, 유일한 필수 메소드
- constructor: 컴포넌트의 생성자 메소드로 컴포넌트를 만들 때 처음으로 실행
- getDerivedStateFromProps: 리액트 v16.3 이후에 생긴 메소드로 props로 받아 온 값을 state에 동기화시키는 용도로 사용되며 마운트, 업데이트될 떄 호출
- componentDidMount: 컴포넌트를 만들고 렌더링을 마친 후 실행
- shouldComponentUpdate: props || state를 변경했을 때, 리렌더링을 시작할지 여부를 지정 must return true || false
- getSnapshotBeforeUpdate: render한 결과물을 반영하기 직전에 호출외며 업데이트하기 직전의 값을 참고할 일이 있을 때 활용
- componentDidUpdate: 리렌더링을 완료한 후 실행
- componentWillUnMount: 컴포넌트를 DOM에서 제거할 때 실행
- componentDidCatch: 렌더링 도중 에러가 발생했을 때 먹통이 되지 않고 UI를 보여 줄 수 있게 해줌

![image](https://user-images.githubusercontent.com/45222982/93907999-0c53c080-fd39-11ea-8bcf-ecb9cf8ed194.png)
