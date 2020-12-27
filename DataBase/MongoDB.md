# Mongo DB

## 스키마와 모델

- 스키마   
mongoose 에서는 **스키마(schema) 와 모델(model)** 이라는 개념이 존재하는데 이는 혼동되기 쉽습니다. 스키마는, 해당 컬렉션의 문서에 어떤 종류의 값이 들어가는지를 정의합니다.

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Book 에서 사용할 서브다큐먼트의 스키마입니다.
const Author = new Schema({
    name: String,
    email: String
});

const Book = new Schema({
    title: String,
    authors: [Author], // 위에서 만든 Author 스키마를 가진 객체들의 배열형태로 설정했습니다.
    publishedDate: Date,
    price: Number,
    tags: [String],
    createdAt: { // 기본값을 설정할땐 이렇게 객체로 설정해줍니다
        type: Date,
        default: Date.now // 기본값은 현재 날짜로 지정합니다.
    }
});
```
 - 모델   
  **모델**은 스키마를 통해서 만드는 인스턴스입니다.
  ```js
  module.exports = mongoose.model('Book', Book);
  ```

## 데이터 생성

```js
exports.create = async (ctx) => {
    // request body 에서 값들을 추출합니다
    const { 
        title, 
        authors, 
        publishedDate, 
        price, 
        tags 
    } = ctx.request.body;

    // Book 인스턴스를 생성합니다
    const book = new Book({
        title, 
        authors,
        publishedDate,
        price,
        tags
    });

    // 만들어진 Book 인스턴스를, 이렇게 수정 할 수도 있습니다.
    // book.title = title;

    //.save() 함수를 실행하면 이 때 데이터베이스에 실제로 데이터를 작성합니다.
    // Promise 를 반환합니다.
    try {
        await book.save();
    } catch(e) {
        // HTTP 상태 500 와 Internal Error 라는 메시지를 반환하고, 
        // 에러를 기록합니다.
        return ctx.throw(500, e);
    }

    // 저장한 결과를 반환합니다.
    ctx.body = book;
};
```

## 데이터 조회
```js
exports.list = async (ctx) => {
    // 변수를 미리 만들어줍니다. 
    // (let 이나 const 는 scope 가 블록단위이기 때문에, try 바깥에 선언을 해줍니다)

    let books;

    try {
        // 데이터를 조회합니다. 
        // .exec() 를 뒤에 붙여줘야 실제로 데이터베이스에 요청이 됩니다.
        // 반환값은 Promise 이므로 await 을 사용 할 수 있습니다.
        books = await Book.find().exec();
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = books;
};
```

## 단일 데이터 조회

```js
exports.get = async (ctx) => {
    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    let book;

    try {
        book = await Book.findById(id).exec();
    } catch (e) {
        return ctx.throw(500, e);
    }

    if(!book) {
        // 존재하지 않으면
        ctx.status = 404;
        ctx.body = { message: 'book not found' };
        return;
    }

    ctx.body = book;
};
```

## 데이터삭제
- .remove: 특정 조건을 만족하는 데이터들을 모두 지웁니다.
- .findByIdAndRemove: id 를 찾아서 지웁니다.
- .findOneAndRemove: 특정 조건을 만족하는 데이터 하나를 찾아서 지웁니다.

```js
exports.delete = async (ctx) => {
    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    try {
        await Book.findByIdAndRemove(id).exec();
    } catch (e) {
        if(e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
    }

    ctx.status = 204; // No Content
};
```

## PUT과 PATCH
PUT 과 PATCH 는 서로 비슷하지만, 역할이 다릅니다. 둘 다 데이터를 변경하는데요, **PUT 의 경우엔 데이터를 통째로 바꿔버리는 메소드**이며, **PATCH 의 경우엔 주어진 필드만 수정하는 메소드**입니다.

### PUT
```js
const Joi = require('joi');
const { Types: { ObjectId } } = require('mongoose');
exports.replace = async (ctx) => {
    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    if(!ObjectId.isValid(id)) {
        ctx.status = 400; // Bad Request
        return;
    }

    // 먼저, 검증 할 스키마를 준비해야합니다.
    const schema = Joi.object().keys({ // 객체의 field 를 검증합니다.
        // 뒤에 required() 를 붙여주면 필수 항목이라는 의미입니다
        title: Joi.string().required(),
        authors: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required() // 이런식으로 이메일도 손쉽게 검증가능합니다
        })),
        publishedDate: Joi.date().required(),
        price: Joi.number().required(),
        tags: Joi.array().items((Joi.string()).required())
    });

    // 그 다음엔, validate 를 통하여 검증을 합니다.
    const result = Joi.validate(ctx.request.body, schema); // 첫번째 파라미터는 검증할 객체이고, 두번째는 스키마입니다.

    // 스키마가 잘못됐다면
    if(result.error) {
        ctx.status = 400; // Bad Request
        ctx.body = result.error;
        return;
    }
        let book;

    try {
        // 아이디로 찾아서 업데이트를 합니다.
        // 파라미터는 (아이디, 변경 할 값, 설정) 순 입니다.
        book = await Book.findByIdAndUpdate(id, ctx.request.body, {
            upsert: true, // 이 값을 넣어주면 데이터가 존재하지 않으면 새로 만들어줍니다
            new: true // 이 값을 넣어줘야 반환하는 값이 업데이트된 데이터입니다.
                      // 이 값이 없으면 ctx.body = book 했을때 업데이트 전의 데이터를 보여줍니다.
        });
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = book;
}
```

### PATCH
```js
exports.update = async (ctx) => {
    const { id } = ctx.params; // URL 파라미터에서 id 값을 읽어옵니다.

    if(!ObjectId.isValid(id)) {
        ctx.status = 400; // Bad Request
        return;
    }

    let book;

    try {
        // 아이디로 찾아서 업데이트를 합니다.
        // 파라미터는 (아이디, 변경 할 값, 설정) 순 입니다.
        book = await Book.findByIdAndUpdate(id, ctx.request.body, {
            // upsert 의 기본값은 false 입니다.
            new: true // 이 값을 넣어줘야 반환하는 값이 업데이트된 데이터입니다. 이 값이 없으면 ctx.body = book 했을때 업데이트 전의 데이터를 보여줍니다.
        });
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = book;
};
```