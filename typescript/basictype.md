# TypeScript 기본 타입
 - 불리언 (boolean)
 - 숫자 (number)
 - 문자열 (string)
 - 배열 (Array) // 타입 뒤에 [], 제네릭 2가지 방법
    ```
        let list: number[] = [1, 2, 3];
        let list: Array<number> = [1, 2, 3];
    ```
 - 튜플 (tuple)
     - 요소의 타입과 개수가 고정된 배열을 표현할 수 있습니다.
    ```
        // 튜플 타입으로 선언
        let x: [string, number];
        // 초기화
        x = ["hello", 10]; // 성공
        // 잘못된 초기화
        x = [10, "hello"]; // 오류
    ```
 - 열거 (enum)
     ```
        enum Color {Red, Green, Blue}
        let c: Color = Color.Green;
    ```
 - Any (any)
    - any 타입은 기존에 JavaScript로 작업할 수 있는 강력한 방법으로, 컴파일 중에 점진적으로 타입 검사를 하거나 하지 않을 수 있습니다. 혹 다른 언어에서 그렇듯, Object가 비슷한 역할을 할 수 있을 것 같다고 생각할 수도 있습니다. 그런데, Object로 선언된 변수들은 오직 어떤 값이든 그 변수에 할당할 수 있게 해주지만 실제로 메서드가 존재하더라도, 임의로 호출할 수는 없습니다:
    ```
            let notSure: any = 4;
            notSure = "maybe a string instead";
            notSure = false; // 성공, 분명히 부울입니다.
    ```
 - Void (void) : 
     - void는 어떤 타입도 존재할 수 없음을 나타내기 때문에, any의 반대 타입 같습니다. void는 보통 함수에서 반환 값이 없을 때 반환 타입을 표현하기 위해 쓰이는 것을 볼 수 있습니다:
    ```
        function warnUser(): void {
            console.log("This is my warning message");
        }
    ```
 - Null and Undefined
   - TypeScript는 undefined 과 null 둘 다 각각 자신의 타입 이름으로 undefined , null로 사용합니다. void처럼 그 자체로 유용한 경우는 거의 없습니다
   - 기본적으로 null 과 undefined는 다른 모든 타입의 하위 타입니다. 이건, null과 undefined를 number 같은 타입에 할당할 수 있다는 것을 의미합니다.
    - 하지만, --strictNullChecks를 사용하면, null과 undefined는 오직 any와 각자 자신들 타입에만 할당 가능합니다. (예외적으로 undefined는 void에 할당 가능합니다) 이건 많은 일반적인 에러를 방지하는 데 도움을 줍니다. 이 경우, string 또는 null 또는 undefined를 허용하고 싶은 경우 유니언 타입인 string | null | undefined를 사용할 수 있습니다.
    - ***가능한 경우 --strictNullChecks를 사용할 것을 권장합니다. 하지만 핸드북의 목적에 따라, 사용하지 않는다고 가정합니다.***


 - Never
   - never 타입은 절대 발생할 수 없는 타입을 나타냅니다. 예를 들어, never는 함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환 타입으로 쓰입니다. 변수 또한 타입 가드에 의해 아무 타입도 얻지 못하게 좁혀지면 never 타입을 얻게 될 수 있습니다.
   - never타입은 모든 타입에 할당 가능한 하위 타입입니다. 하지만 어떤 타입도 never에 할당할 수 있거나, 하위 타입이 아닙니다.(never 자신은 제외) 심지어 any 도 never에 할당할 수 없습니다.
  ```
        function error(message: string): never {
            throw new Error(message);
        }

        // 반환 타입이 never로 추론된다.
        function fail() {
            return error("Something failed");
        }

        // never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
        function infiniteLoop(): never {
            while (true) {
            }
        }
```
 - 객체 (Object)
   - object는 원시 타입이 아닌 타입을 나타냅니다. 예를 들어, number, string, boolean, bigint, symbol, null, 또는 undefined 가 아닌 나머지를 의미합니다.
  ```
        declare function create(o: object | null): void;

        create({ prop: 0 }); // 성공
        create(null); // 성공

        create(42); // 오류
        create("string"); // 오류
        create(false); // 오류
        create(undefined); // 오류
  ```
 - 타입 단언(Type assertions)
    - 타입 단언(Type assertions) 은 컴파일러에게 "날 믿어, 난 내가 뭘 하고 있는지 알아"라고 말해주는 방법입니다. 타입 단언은 다른 언어의 타입 변환(형 변환)과 유사하지만, 다른 특별한 검사를 하거나 데이터를 재구성하지는 않습니다. 이는 런타임에 영향을 미치지 않으며, 온전히 컴파일러만 이를 사용합니다. 타입 스크립트는 개발자가 필요한 어떤 특정 검사를 수행했다고 인지합니다.
        - "angle-bracket" 문법
        ```
            let someValue: any = "this is a string";
            let strLength: number = (<string>someValue).length;
         ```
        - "as" 문법
        ```
            let someValue: any = "this is a string";
            let strLength: number = (someValue as string).length;
         ```

