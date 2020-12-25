# 리덕스
 전역 상태를 관리할 때 굉장히 효과적이며 프로젝트의 규모가 클 경우에 자주 사용함, 미들웨어라는 기능을 제공하여 비동기 작업을 훨씬 효율적으로 관리할 수 있게 도와줌
 
## 액션
상태에 어떠한 변화가 필요하면 액션(action)이라는 것이 발생 **액션 객체는 type 필드를 반드시 가지고 있어야함**
 
## 액션 생성 함수
 어떠한 변화를 일으켜야 할 때마다 액션 객체를 만들어야하는 데 매번 액션 객체를 직접 작성하기 번거로울 수 있으므로 함수로 만들어서 관리
  
## 리듀서
 리듀서(reducer)는 변화를 일으킨느 함수로 액션을 만들어서 발생시키면 리튜서가 현재상태와 전달받은 액션 객체를 파라미터로 받아와 새로운 상태를 만들어 반환해줌
  
## 스토어
 프로젝트에 리덕스를 저용하기 위해서 스토어(store)를 만듬, **한 개의 프로젝트는 단 하나의 스토어만 가질수 있으며** 스토어안에는 애플리케이션 상태와 리듀서가 들어가 있음
  
## 디스패치
 디스패치(dispatch)는 스토어의 내장 함수 중 하나로. '액션을 발생시키는 것'이라고 이해하면 됨 **dispatch(action)과 같은 형태를 액션 객체를 파라미터로 넣어서 호출
 
## 구독
 구독(subscribe)도 스토어의 내장 함수 중 하나로 액션이 디스패치되어 상태가 업데이트될 때마다 호출됨
 
### 리덕스의 세 가지 규칙
- 단일 스토어: 하나의 애플리케이션 안에는 하나의 스토어가 들어있음 // 특정 부분을 완전히 분리시킬 때 여러 개를 만들 수도 있지만, 권장하지 않음
- 읽기 전용 상태: 리덕스 상태는 불변성을 지켜준다. 내부적으로 데이터가 변겨오디는 것을 감지하기 위해 얕은 비교 검사를 하여 겉핥기 식 비료를 통해 좋은 성능을 유지
- 리듀서는 순수한 함수
  - 리듀서 함수는 이전상태와 액션 객체를 파라미터로 받음
  - 파라미터 외의 값에는 의존하면 안됨
  - 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환
  - 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환


## Couter module 만들기

### modules/counter.js
```js
/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* 초기 상태 선언 */
const initialState = {
  number: 0,
  diff: 1
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
const counter = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff
      };
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff
      };
    default:
      return state;
  }
}

export default counter;
```

## module/index.js
```js
import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({
  counter,
});

export default rootReducer;
```

## index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer); // 스토어를 만듭니다.
console.log(store.getState()); // 스토어의 상태를 확인해봅시다.

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
```
