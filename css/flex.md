# CSS Flex

## 기본구조
- 부모 요소인 div.container를 Flex Container(플렉스 컨테이너),
- 자식 요소인 div.item들을 Flex Item(플렉스 아이템).
```html
<div class="container">
	<div class="item">helloflex</div>
	<div class="item">abc</div>
	<div class="item">helloflex</div>
</div>
```

# Container 속성

## display: flex;
```css
.container {
	display: flex;
	/* display: inline-flex; */
}
```
Flex 아이템들은 가로 방향으로 배치, 자신이 가진 내용물의 inline요소 처럼 width 만큼만 차지하게 됨. height는 컨테이너의 높이만큼 늘어남.
![inline-flex](https://studiomeal.com/wp-content/uploads/2020/01/08-1.jpg)

## flex-direction 배치 방향 설정
```css
.container {
	flex-direction: row;
	/* flex-direction: column; */
	/* flex-direction: row-reverse; */
	/* flex-direction: column-reverse; */
}
```
- row (기본값): 아이템들이 행(가로) 방향으로 배치.
- row-reverse: 아이템들이 역순으로 가로 배치.
- column: 아이템들이 열(세로) 방향으로 배치.
- column-reverse: 아이템들이 역순으로 세로 배치.

## flex-wrap 줄넘김 처리 설정
```css
.container {
	flex-wrap: nowrap;
	/* flex-wrap: wrap; */
	/* flex-wrap: wrap-reverse; */
}
```
- nowrap(기본값): 줄바꿈x.
- wrap: 줄바꿈O
- wrap-reverse: 아이템을 역순으로 배치하여 줄바꿈.

## flex-flow 
flex-direction과 flex-wrap을 한꺼번에 지정할 수 있는 단축 속성
```css
.container {
	flex-flow: row wrap;
	/* 아래의 두 줄을 줄여 쓴 것 */
	/* flex-direction: row; */
	/* flex-wrap: wrap; */
}
```

## justify-content
메인축 방향으로 아이템 정렬
```css
.container {
	justify-content: flex-start;
	/* justify-content: flex-end; */
	/* justify-content: center; */
	/* justify-content: space-between; */
	/* justify-content: space-around; */
	/* justify-content: space-evenly; */
}
```
- flex-start (기본값): 아이템들을 시작점으로 정렬합니다. **flex-direction이 row(가로 배치)일 때는 왼쪽, column(세로 배치)일 때는 위.**
- flex-end: 아이템들을 끝점으로 정렬 **flex-direction이 row(가로 배치)일 때는 오른쪽, column(세로 배치)일 때는 아래**
- center: 아이템들을 가운데로 정렬.
- space-between: 아이템들의 “사이(between)”에 균일한 간격.
- space-around: 아이템들의 “둘레(around)”에 균일한 간격.
- space-evenly: 아이템들의 사이와 양 끝에 균일한 간격.
![inline-flex](https://studiomeal.com/wp-content/uploads/2020/01/10-1.jpg)
### 주의! IE와 엣지(Edge)에서는 지원되지 않음👎

## align-items
수직축 방향으로 아이템을들 정렬
```css
.container {
	align-items: stretch;
	/* align-items: flex-start; */
	/* align-items: flex-end; */
	/* align-items: center; */
	/* align-items: baseline; */
}
```
- stretch (기본값): 아이템들이 수직축 방향으로 끝까지 쭈욱 늘어남.
- flex-start: 아이템들을 시작점으로 정렬합니다. **flex-direction이 row(가로 배치)일 때는 위, column(세로 배치)일 때는 왼쪽이에요.**
- flex-end: 아이템들을 끝으로 정렬 **flex-direction이 row(가로 배치)일 때는 위, column(세로 배치)일 때는 왼쪽**
- center: 아이템들을 가운데로 정렬.
- baseline: 아이템들을 텍스트 베이스라인 기준으로 정렬.

## align-content
flex-wrap: wrap;이 설정된 상태에서, 아이템들의 행이 2줄 이상 되었을 때의 수직축 방향 정렬을 결정하는 속성
```css
.container {
	flex-wrap: wrap;
	align-content: stretch;
	/* align-content: flex-start; */
	/* align-content: flex-end; */
	/* align-content: center; */
	/* align-content: space-between; */
	/* align-content: space-around; */
	/* align-content: space-evenly; */
}
```

# Item 속성

## flex-basis
flex-basis는 Flex 아이템의 기본 크기를 설정합니다(flex-direction이 row일 때는 너비, column일 때는 높이).
```css
.item {
	flex-basis: auto; /* 기본값 */
	/* flex-basis: 0; */
	/* flex-basis: 50%; */
	/* flex-basis: 300px; */
	/* flex-basis: 10rem; */
	/* flex-basis: content; */
}
```

```css
.item {
	flex-basis: 100px;
}
```

## flex-grow 유연하게 늘리기
아이템이 flex-basis의 값보다 커질 수 있는지를 결정하는 속성
```css
.item {
	flex-grow: 1;
	/* flex-grow: 0; */ /* 기본값 */
}
```
**0보다 큰 값이 세팅이 되면 해당 아이템이 유연한(Flexible) 박스로 변하고 원래의 크기보다 커지며 빈 공간을 메우게 됨**
```css
/* 1:2:1의 비율로 세팅할 경우 */
.item:nth-child(1) { flex-grow: 1; }
.item:nth-child(2) { flex-grow: 2; }
.item:nth-child(3) { flex-grow: 1; }
```

## flex-shrink 유연하게 줄이기
flex-shrink는 flex-grow와 쌍을 이루는 속성으로, 아이템이 flex-basis의 값보다 작아질 수 있는지를 결정

**일단 0보다 큰 값이 세팅이 되면 해당 아이템이 유연한(Flexible) 박스로 변하고 flex-basis보다 작아짐**
```css
.item {
	flex-basis: 150px;
	flex-shrink: 1; /* 기본값 */
}
```

## flex
flex-grow, flex-shrink, flex-basis를 한 번에 쓸 수 있는 축약형 속성
```css
.item {
	flex: 1;
	/* flex-grow: 1; flex-shrink: 1; flex-basis: 0%; */
	flex: 1 1 auto;
	/* flex-grow: 1; flex-shrink: 1; flex-basis: auto; */
	flex: 1 500px;
	/* flex-grow: 1; flex-shrink: 1; flex-basis: 500px; */
}
```