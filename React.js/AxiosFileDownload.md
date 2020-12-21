## axios로 파일 다운로드 받기

```
export const requestGetImageFile = async (imageUrl) => {
    const URL = DBImageFormat(imageUrl);
    const response = await axios.get(URL, { responseType: 'blob' });
    console.log(response);
    const file = new File([response.data], imageUrl, { lastModified: Date.now() })
    return file;
}
```
ByteArray로 내려주는 값을 받기 위해서는 axios 헤더에 responseType을 추가해야 한다.

## CORS ERROR!!!
위 소스와 같이 요청하면 같은 API서버와 같은 ip가 아닌 이상 CORS error가 난다. 

**Origin null is not allowed by Access-Control-Allow-Origin**

***"크롬에서 로컬로 파일을 열어서는 해결할 수 없다."*** 
브라우저마다 다르지만, 크롬은 SOP(Same Origin Policy)가 엄격해서 file://로 열때 해결할 수 없다고 합니다.

## 해결방법
 - API 서버에서 'Access-Control-Allow-Origin : *'을 추가해주지 않는 이상, 크롬에서 "file://" URL로 API 데이터를 받아올 수 없다.
 - API 서버에서 'Access-Control-Allow-Origin : *'을 추가해주지 않는 이상, 크롬에서 "file://" URL로 API 데이터를 받아올 수 없다.
 - Allow CORS: Access-Control-Allow-Origin 크롬 확장자를 이용한다