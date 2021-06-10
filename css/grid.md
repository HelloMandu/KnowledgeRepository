# CSS Grid

기본구조
```html
<div class="container">
	<div class="item">A</div>
	<div class="item">B</div>
	<div class="item">C</div>
	<div class="item">D</div>
	<div class="item">E</div>
	<div class="item">F</div>
	<div class="item">G</div>
	<div class="item">H</div>
	<div class="item">I</div>
</div>
```
- 부모 요소인 div.container를 Grid Container(그리드 컨테이너)
- 자식 요소인 div.item들을 Grid Item(그리드 아이템)

![그리드](https://studiomeal.com/wp-content/uploads/2020/01/03-2.jpg)
- 그리드 컨테이너 (Grid Container): display: grid를 적용하는, Grid의 전체 영역. Grid 컨테이너 안의 요소들이 Grid 규칙의 영향을 받아 정렬.
- 그리드 아이템 (Grid Item): Grid 컨테이너의 자식 요소들. Grid 규칙에 의해 배치.
- 그리드 트랙 (Grid Track): Grid의 행(Row) 또는 열(Column)
- 그리드 셀 (Grid Cell): Grid의 한 칸을 가리키는 말. <div>같은 실제 html 요소는 그리드 아이템이고, 이런 Grid 아이템 하나가 들어가는 “가상의 칸(틀)”.
- 그리드 라인(Grid Line): Grid 셀을 구분하는 선.
- 그리드 번호(Grid Number): Grid 라인의 각 번호.
- 그리드 갭(Grid Gap): Grid 셀 사이의 간격.
- 그리드 영역(Grid Area): Grid 라인으로 둘러싸인 사각형 영역으로, 그리드 셀의 집합.

## display: grid;
```css
.container {
	display: grid;
	/* display: inline-grid; */
}
```

## 그리드 형태 정의
- grid-template-rows는 행(row)의 배치
- grid-template-columns는 열(column)의 배치
```css
.container {
	grid-template-columns: 200px 200px 500px;
	/* grid-template-columns: 1fr 1fr 1fr */
	/* grid-template-columns: repeat(3, 1fr) */
	/* grid-template-columns: 200px 1fr */
	/* grid-template-columns: 100px 200px auto */

	grid-template-rows: 200px 200px 500px;
	/* grid-template-rows: 1fr 1fr 1fr */
	/* grid-template-rows: repeat(3, 1fr) */
	/* grid-template-rows: 200px 1fr */
	/* grid-template-rows: 100px 200px auto */
}
```

## repeat 함수
repeat는 반복되는 값을 자동으로 처리할 수 있는 함수.

`repeat(반복횟수, 반복값)`
```css
.container {
	grid-template-columns: repeat(5, 1fr);
	/* grid-template-columns: 1fr 1fr 1fr 1fr 1fr */
}
```

repeat(5, 1fr) === 1fr 1fr 1fr 1fr 1fr

repeat(3, 1fr 4fr 2fr); 이런 식의 패턴도 가능.

## minmax 함수
최솟값과 최댓값을 지정할 수 있는 함수
```css
.container {
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, minmax(100px, auto));
}
```
minmax(100px, auto): 최소한 100px, 최대는 자동으로(auto) 늘어나게

## auto-fill과 auto-fit
auto-fill과 auto-fit은 column의 개수를 미리 정하지 않고 설정된 너비가 허용하는 한 최대한 셀을 채움
```css
.container {
	grid-template-columns: repeat(auto-fill, minmax(20%, auto));
	/* grid-template-columns: repeat(auto-fit, minmax(20%, auto)); */
}
```

## 간격
- row-gap
- column-gap
- gap
- 
```css
.container {
	row-gap: 10px;
	/* row의 간격을 10px로 */
	column-gap: 20px;
	/* column의 간격을 20px로 */
}
```
```css
.container {
	gap: 10px 20px;
	/* row-gap: 10px; column-gap: 20px; */
}
```
```css
.container {
	gap: 20px;
	/* row-gap: 20px; column-gap: 20px; */
}
```
**IE지원안댐**

## 그리드 형태 자동정의

- grid-auto-rows
- grid-auto-columns
```css
.container {
	grid-template-rows: repeat(3, minmax(100px, auto));
}
/*row 개수를 미리 알 수 없는 경우*/
.container {
	grid-auto-rows: minmax(100px, auto);
}
```

## 각 셀의 영역지정

- grid-column-start
- grid-column-end
- grid-column
- grid-row-start
- grid-row-end
- grid-row

![그리드 영역](https://studiomeal.com/wp-content/uploads/2020/01/07-2.jpg)

### 빨간색 영역
```css
.item {
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 2;
}
```
```css
.item:nth-child(1) {
	grid-column: 1 / 3;
	grid-row: 1 / 2;
}
```

몇 개의 셀을 차지하게 할 것인지를 지정해줄 수도 있음
```css
.item:nth-child(1) {
	/* 1번 라인에서 2칸 */
	grid-column: 1 / span 2;
	/* 1번 라인에서 3칸 */
	grid-row: 1 / span 3;
}
```
## 영역 이름으로 그리드 정의
- grid-template-areas: 영역(Grid Area)에 이름을 붙이고, 그 이름을 이용해서 배치하는 방법

![그리드 이름](https://studiomeal.com/wp-content/uploads/2020/01/08-2.jpg)

```css
.container {
	grid-template-areas:
		"header header header"
		"   a    main    b   "
		"   .     .      .   "
		"footer footer footer";
}
```
```css
.header { grid-area: header; }
.sidebar-a { grid-area: a; }
.main-content { grid-area: main; }
.sidebar-b { grid-area: b; }
.footer { grid-area: footer; }
/* 이름 값에 따옴표가 없는 것에 주의 */
```

## 세로방향 정렬
- align-items
아이템들을 세로(column축) 방향으로 정렬 **컨테이너에 적용**
```css
.container {
	align-items: stretch;
	/* align-items: start; */
	/* align-items: center; */
	/* align-items: end; */
}
```

## 가로방향 정렬
- justify-items
아이템들을 가로(row축) 방향으로 정렬 **컨테이너에 적용**
```css
.container {
	justify-items: stretch;
	/* justify-items: start; */
	/* justify-items: center; */
	/* justify-items: end; */
}
```

### place-items
align-items와 justify-items를 같이 쓸 수 있는 단축 속성
```css
.container {
	place-items: center start;
}
```

## 아이템 그룹 세로 정렬
- align-content (flex align-item과 유사)
```css
.container {
	align-content: stretch;
	/* align-content: start; */
	/* align-content: center; */
	/* align-content: end; */
	/* align-content: space-between; */
	/* align-content: space-around; */
	/* align-content: space-evenly; */
}
```

## 아이템 그룹 가로 정렬
- justify-content (flex justify-content과 유사)
```css
.container {
	justify-content: stretch;
	/* justify-content: start; */
	/* justify-content: center; */
	/* justify-content: end; */
	/* justify-content: space-between; */
	/* justify-content: space-around; */
	/* justify-content: space-evenly; */
}
```

### place-content
align-content와 justify-content를 같이 쓸 수 있는 단축 속성
```css
.container {
	place-content: space-between center;
}
```

## 개별 아이템 세로 정렬
- align-self
```css
.item {
	align-self: stretch;
	/* align-self: start; */
	/* align-self: center; */
	/* align-self: end; */
}
```

## 개별 아이템 가로 정렬
- justify-self
```css
.item {
	justify-self: stretch;
	/* justify-self: start; */
	/* justify-self: center; */
	/* justify-self: end; */
}
```

### place-self
align-self와 justify-self를 같이 쓸 수 있는 단축 속성
```css
.item {
	place-self: start center;
}
```