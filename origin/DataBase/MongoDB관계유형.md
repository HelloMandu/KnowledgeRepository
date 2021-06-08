# Document 관계 데이터 저장 유형

## Embedded
Embedded 저장 방법은 2가지 종류의 Document가 있을 때, 1개의 Document 데이터를 다른 Document key의 value에 저장하는 방법
```json
// Person 
{
   _id: "joe",
   name: "Joe Bookreader",
   address: {
      street: "123 Fake Street",
      city: "Faketon",
      state: "MA",
      zip: "12345"
  }
}

// Address
{
   pataron_id: "joe",
   street: "123 Fake Street",
   city: "Faketon",
   state: "MA",
   zip: "12345"
}
```
`Person.address` 에 Address Document가 통째로 저장

## Reference
Embedded 방식과 달리 Document를 통째로 저장하는것이 아니라 참조 할 수 있도록 ID를 저장
```json
// Publisher
{
   _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA"
}

// Book
{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",

   publisher_id: "oreilly" // <- Publisher._id
}
```

# Document 관계 유형

## One-to-One
단순한 1:1 관계. Embedded 예시를 든 것처럼 Person이 실제 주민등록등본상에 거주지가 Address 인 것으로 시나리오를 가정하는 관계 유형

## One-to-Many

### Embedded 방식
`Book.publisher`의 value 에는 `Publisher` 데이터가 통째로 저장
```json
// Publisher
{
   _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA"
}

// Book 1
{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",

   publisher: {
      name: "O'Reilly Media",
      founded: 1980,
      location: "CA"
   }
}

// Book 2
{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",

   publisher: {
      name: "O'Reilly Media",
      founded: 1980,
      location: "CA"
   }
}
```

### Reference 방식
`Book.publisher_id` 의 value 는 `Publisher._id value` 가 저장
```json
// Publisher
{
   _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA"
}

// Book 1
{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",

   publisher_id: "oreilly" // <- Publisher._id
}

// Book 2
{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",

   publisher_id: "oreilly" // <- Publisher._id
}
```

## `Scenario 1`
만약 publisher 의 ‘name’ 을 변경하거나 ‘age’ 라는 데이터를 추가해야 하는 경우에 DB를 수정

- Embedded 방식: Publisher, Book 의 Document 를 모두 수정해서 데이터의 일관성을 유지. 복잡하거나 데이터가 자주 변경되는 상황이 생긴다면 일관성을 유지하지가 어려워 질 수 있음.

- Reference 방식: Publisher Document 만 수정해주면 참조하고 있는 모든 Document 는 수정할 필요가 없음. 자연스럽게 데이터의 일관성이 유지.

## `Scenario 2`
- Publisher Document 개수: 100개
- Book Document 개수: 100만개
100만개의 Book Document 를 Publisher 정보를 포함하여 불러오는 상황

- Embedded 방식: Book Document를 가져 올 때, Publisher 정보를 통째로 가져올 수 있음.
- Reference 방식: Publisher_id에 해당되는 Publisher 정보를 포함하도록 요청해서 가져와야 하기 때문에 **한 번의 요청만으로는 Publisher 정보를 가져 올 수는 없음**. 즉, 추가적인 요청을 해야함.

## Many-to-Many

Book.publisher_id value 가 1개 이상의 Publisher.id를 참조
```json
// Publisher 1
{
   _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA"
}

// Publisher 2
{
   _id: "devhak",
   name: "devhak'Reilly Media",
   founded: 1980,
   location: "CA"
}


// Book 1
{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",

   publisher_id: ["oreilly", "devhak"] // <- Publisher._id
}

// Book 2
{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",

   publisher_id: ["oreilly", "devhak"] // <- Publisher._id
}
```