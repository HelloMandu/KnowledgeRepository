# Loading

```js
const getPaymentInfo = useCallback(
        async () => {
            onLoading('payment');
            try {
                const { data } = await requestApi(...params);
                if (data.msg === 'success') {
                    console.log('success')
                } else {
                    console.log('failed')
                }
            } catch (e) {
                console.log(e);
            }
            offLoading('payment');
        },
    [],
);
```
다음과 같이 데이터를 요청하는 동안 로딩하는 경우가 많다.

## 문제점
전역 상태로 로딩을 관리 할 때 network오류나 서버에 문제가 생겼을 때 catch문이 실행되어 무한 로딩이 생기는 경우가 발생

## 해결
```js
const getPaymentInfo = useCallback(
        async () => {
            onLoading();
            try {
                const { data } = await requestApi(...params);
                if (data.msg === 'success') {
                    console.log('success')
                } else {
                    console.log('failed')
                }
            } catch (e) {
                console.log(e);
            } finally{ 
                offLoading(); // 로딩제거
            }
        },
    [],
);
```
위와 같이 catch문에 걸렸을 때 무한 로딩이 되지 않도록 오류가 생겨도 error처리를 하고 로딩이 꺼질 수 있도록 수정할 것

## 해결 2
***주로 loading과 error를 전역이 아닌 api호출 할 때마다 관리를 하는 게 더 조을 듯 하다***

## 의문점
```js
function *getUserSaga(action) {
    yield put(startLoading(GET_USER));
    try {
        const { payload: JWT_TOKEN } = action;
        const user = yield call(requestPOSTUserInfo, JWT_TOKEN);
        yield put({
            type: GET_USER_SUCCESS,
            payload: user.data
        });
    } catch (e) {
        yield put({
            type: GET_USER_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_USER));
};
```
다음과 같이 제너레이터 함수를 이용한 redux-saga를 통해 예외 처리를 하는 경우에는 catch문에 걸리더라도 error처리 후 next()가 실행되기 때문에 문제가 없엇다