# `<input type='file'>`

- 값: DOMString
- 이벤트: change, input
- 공통특성: required
- 추가특성: accept, capture, files, mutiple
- IDL특성: files, value
- DOM 인터페이스: HTMLInputElement
- 메서드: select()

## 값
파일 입력 칸의 `value` 특성은 선택한 파일의 경로를 나타내는 DOMString을 담습니다. 사용자가 여러 개의 파일을 선택한 경우 value는 파일 목록의 첫 번째 파일을 가리키며, 나머지 파일은 요소의 HTMLInputElement.files 속성으로 가져올 수 있습니다.

## 추가특성
- accept: 허용하는 파일 유형을 나타내는 하나 이상의 고유 파일 유형 지정자
- capture: 이미지 또는 비디오 데이터를 캡처할 때 사용할 방법
- files: 선택한 파일을 나열하는 FileList
- multiple: 지정할 경우 사용자가 여러 개의 파일을 선택할 수 있음

### accept
 Word 파일을 허용하는 형태
```html
<input type="file" id="docpicker" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
```

### capture
accept 특성이 이미지나 비디오 캡처 데이터를 요구할 경우, capture 특성으로는 어떤 카메라를 사용할지 지정할 수 있습니다. user 값은 전면 카메라(사용자를 향한 카메라)와 마이크를, environment 값은 후면 카메라와 마이크를 사용해야 함을 나타냅니다. capture 특성을 누락한 경우 사용자 에이전트가 어떤 쪽을 선택할지 스스로 결정

### files
선택한 모든 파일을 나열하는 FileList 객체입니다. `multiple` 특성을 추가해야함

### multiple
파일 선택 창에서 복수의 파일을 선택할 수 있음

## 고유 파일 유형 지정자
 `<input>`에서 선택할 수 있는 파일의 종류를 설명하는 문자열
 ```html
 <input type="file" accept="image/*,.pdf">
 ```
 - 마침표로 시작하는 유효한 파일 이름 확장자: `.jpg`, `.pdf`, `.doc`
 - 확장자를 포함하지 않은 유효한 MIME 유형 문자열.
 - 모든 오디오 파일: `audio/*`
 - 모든 비디오 파일: `audio/*`
 - 모등 이미지 파일: `image/*`

## 파일 입력 칸 사용하기
```html
<form method="post" enctype="multipart/form-data">
 <div>
   <label for="file">Choose file to upload</label>
   <input type="file" id="file" name="file" multiple>
 </div>
 <div>
   <button>Submit</button>
 </div>
</form>
```
`file 스타일링 할때 유용하다`
<form method="post" enctype="multipart/form-data">
 <div>
   <label for="file">Choose file to upload</label>
   <input type="file" id="file" name="file" multiple>
 </div>
 <div>
   <button>Submit</button>
 </div>
</form>

