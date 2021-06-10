## Props
 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소. props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있음
 
## children
 태그 사이의 내용을 보여주는 props
 
## state
 컴포넌트 내부에서 바뀔 수 있는 값, props는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값이며 자식 컴포넌트에선 바꿀 수 없다 // *부모 컴포넌트의 메서드 호출시 유동적으로 사용가능*
 
## 리액트에서 이벤트
 1. 이름은 camelCase로 작성 **onclick -> onClick**
 2. 이벤트에 자바스크리브 코드를 전달하는 것이 아닌, 함수 형태의 값을 전달(함수의 주소를 전달)
 3. DOM 요소에만 이벤트를 설정할 수 있음

- 이벤트 종류
 - Clipboard
 - Composition
 - Keyboard
 - Focus
 - Form
 - Mouse
 - Selection
 - Touch
 - UI
 - Wheel
 - Media
 - Image
 - Animation
 - Transition
 
 ### ref?
 DOM을 직접적으로 건드려야 할 때 // focus를 줄 때 주로 사용