# 요소를 보이지 않게 만드는 세 가지 일반적인 CSS 속성
display: none

opacity: 0

visibility: hidden

차이점

| |display: none|visibility: hidden|opacity: 0|
|---|---|---|---|
|영역차지|X|O|O|
|이벤트(ex.클릭)|X|X|O|
|tab focus|X|X|O|
|자식요소 영향|O|X|O|

- display:none 속성은 공간을 차지하지 않습니다. 렌더 트리에 포함되지 않습니다.
- visibility:hidden은 opacity: 0하고 pointer-events: none의 조합처럼 사용됩니다.
- opacity: 0은 탭 순서로 요소에 액세스 할 수 있습니다.
- display: none과 opacity: 0은 자식 요소에 영향을 미칩니다. visibility: hidden반면에는 자식 요소의 가시성을 변경하지 않습니다.
- display: none은 페이지의 공간을 차지하지 않아 clientHeight, clientWidth, height, offsetHeight, offsetWidth, scrollHeight, scrollWidth, width, getBoundingClientRect()는 0입니다.