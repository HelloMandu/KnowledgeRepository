# 고차 컴포넌트 (Higher-Order Components)

- 고차 컴포넌트 (HOC, higher-order component)는 컴포넌트 로직을 재사용하기 위한 React의 고급 기술입니다.
- 고차 컴포넌트는 React API의 일부분이 아니라 컴포넌트적 성격에서 나타나는 패턴입니다.
- 고차 컴포넌트는 컴포넌트를 취하여 새로운 컴포넌트를 반환하는 함수입니다.

```typescript jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
컴포넌트가 UI를 props로 변환하는 반면, 고차 컴포넌트는 컴포넌트를 다른 컴포넌트로 변환합니다.

