# Loading

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
            }
            offLoading(); // 로딩제거
        },
    [],
);
```
위와 같이 try~catch문을 이용해 무한 로딩이 되지 않도록 error처리를 하고 로딩이 꺼질 수 있도록 작성할것

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