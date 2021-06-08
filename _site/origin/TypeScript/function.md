# 함수 (Function)
TypeScript 함수는 JavaScript와 마찬가지로 ***기명 함수(named function)과 익명 함수(anonymous function)***로 만들 수 있습니다. 

## 함수 타입 작성하기 (Writing the function type)
```
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```
## 타입의 추론 (Inferring the types)
```
// myAdd는 전체 함수 타입을 가집니다
let myAdd = function(x: number, y: number): number { return  x + y; };

// 매개변수 x 와 y는 number 타입을 가집니다
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```
이러한 타입 추론 형태를 "contextual typing" 이라 부릅니다. 이를 통해 여러분의 프로그램에서 타입을 유지하기 위한 노력을 줄일 수 있습니다.

## 선택적 매개변수와 기본 매개변수 (Optional and Default Parameter)
```
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");                  // 지금은 바르게 동작
let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");         // 정확함
```

## 나머지 매개변수 (Rest Parameters)
```
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

// employeeName 은 "Joseph Samuel Lucas MacKinzie" 가 될것입니다.
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

## this
JavaScript에서, **this는 함수가 호출될 때 정해지는 변수**입니다. 매우 강력하고 유연한 기능이지만 이것은 항상 함수가 실행되는 콘텍스트에 대해 알아야 한다는 수고가 생깁니다. 특히 함수를 반환하거나 인자로 넘길 때의 혼란스러움은 악명 높습니다.

```
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: 아래 함수는 이제 callee가 반드시 Deck 타입이어야 함을 명시적으로 지정합니다.
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
TypeScript는 createCardPicker가 Deck 객체에서 호출된다는 것을 알게 됐습니다. 이것은 this가 any 타입이 아니라 Deck 타입이며 따라서 --noImplicitThis 플래그가 어떤 오류도 일으키지 않는다는 것을 의미합니다.

## 콜백에서 this 매개변수 (this parameters in callbacks)
나중에 호출할 콜백 함수를 라이브러리에 전달할 때 this 때문에 오류가 발생할 수 있습니다. 라이브러리는 콜백을 일반 함수처럼 호출하므로 this는 undefined가 됩니다. 일부 작업에서는 this 매개변수를 콜백 오류를 막는데 사용할 수 있습니다. 먼저 라이브러리 작성자는 콜백 타입을 this로 표시를 해주어야 합니다.

```
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
```
```
class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        // 이런, `this`가 여기서 쓰이는군요. 이 콜백을 쓰면 런타임에서 충돌을 일으키겠군요
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // 오류!
```
```
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // void 타입이기 때문에 this는 이곳에서 쓸 수 없습니다!
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```
이러한 작업은 화살표 함수가 외부의 this를 사용하기 때문에 가능하므로 this: void일 것으로 기대하는 무언가라면 전달에 문제가 없습니다. Handler 타입 객체마다 하나의 화살표 함수가 작성된다는 점이 단점입니다. 반면, 메서드들은 하나만 작성되어 Handler의 프로토타입에 붙습니다. 그들은 Handler 타입의 모든 객체 간에 공유됩니다.

## 오버로드 (Overloads)
```
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // 인자가 배열 또는 객체인지 확인
    // 만약 그렇다면, deck이 주어지고 card를 선택합니다.
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // 그렇지 않다면 그냥 card를 선택합니다.
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
컴파일러가 알맞은 타입 검사를 하기 위해서, JavaScript와 비슷한 프로세스를 따릅니다. 오버로드 목록에서 첫 번째 오버로드를 진행하면서 제공된 매개변수를 사용하여 함수를 호출하려고 시도합니다. 만약 일치하게 된다면 해당 오버로드를 알맞은 오버로드로 선택하여 작업을 수행합니다. 이러한 이유로 가장 구체적인 것부터 오버로드 리스팅을 하는 것이 일반적입니다.

위 예제에서 function pickCard(x): any는 오버로드 목록에 해당되지 않음을 유의하세요, 그래서 두 가지 오버로드만을 가집니다: 객체를 받는것 하나와 숫자를 받는 것 하나. 다른 매개변수 타입으로 pickCard를 호출하는 것은 오류가 발생합니다.