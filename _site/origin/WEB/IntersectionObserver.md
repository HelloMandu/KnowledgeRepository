# Intersection Obserber API

- 페이지 스크롤 시 이미지를 Lazy-loading(지연 로딩)할 때
- Infinite scrolling(무한 스크롤)을 통해 스크롤할 때 새로운 콘텐츠를 불러올 때
- 광고의 수익을 계산하기 위해 광고의 가시성을 참고할 때
- 사용자가 결과를 볼 것인지에 따라 애니메이션 동작 여부를 결정할 때

```js
new IntersectionObserver(callback[, options]);
```

## Paramters
- callback: 관측 요소가 타켓 요소와 교차되었을 때 실행할 함수로 두 개의 파라미터를 입력받음
  - entries: 더 보이거나 덜 보이게 되면서 통과한 역치를 나타내는,IntersectionObserverEntry 객체의 배열.
  - observer: 자신을 호출한 IntersectionObserver.
- options: 옵저버를 조정할 수 있는 옵션 객체. 지정하지 않는다면 옵저버는 문서의 뷰포트를 루트로 사용하고, 여백은 없이, 역치는 0(1픽셀이라도 변하면 콜백을 호출)이 됨
  - root: crollable Element 또는 null
  - rootMargin: 교차점을 계산할 때, 계산 목적으로 루트를 줄이거나 늘리는 경우, 루트의 bounding_box에 추가 할 오프셋 세트를 지정하는 문자열( CSS margin 속성의 구문과 거의 동일)
- threshold: 관측 대상에 대한 전체 상자 영역(루트)에 대한 교차 영역의 비율을 지정하며, 0.0과 1.0 사이의 숫자 하나 혹은 숫자 배열. 0.0 값은 대상의 단일 픽셀이라도 보여지면, 대상이 보이는 것으로 계산되는 것을 의미

```js
// option 설정
const options = {
  // root: null, // viewport
  root: document.querySelector('.container'),
  rootMargin: '10px', // '10px 10px 10px 10px'
  threshold: [0, 1], // 관측 요소가 교차영역에 진입했을 때, 교차 영역에 관측 요소가 100% 있을 때 observer가 반응.
};

// IntersectionObserver 생성
const io = new IntersectionObserver((entries, observer) => {
  // IntersectionObserverEntry 객체 리스트와 observer 본인(self)를 받음
  // 원하는 동작 작성
  entries.forEach((entry) => {
    console.log('entry:', entry);
    console.log('observer:', observer);
  });
}, options);
```

## Methods
- IntersectionObserver.observe(targetElement): 타겟 엘리먼트에 대한 IntersectionObserver를 등록할 때(관찰을 시작할 때) 사용
- IntersectionObserver.unobserve(targetElement): 타겟 엘리먼트에 대한 관찰을 멈추고 싶을 때 사용하면 됩니다. 예를 들어 Lazy-loading(지연 로딩)을 할 때는 한 번 처리를 한 후에는 관찰을 멈춰도 됨
- IntersectionObserver.disconnect(): 다수의 엘리먼트를 관찰하고 있을 때, 이에 대한 모든 관찰을 멈추고 싶을 때 사용
- IntersectionObserver.takerecords(): IntersectionObserverEntry 객체의 배열을 리턴