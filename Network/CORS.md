# CORS 

**교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)**는 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제

교차 출처 요청의 예시: https://domain-a.com 의 프론트 엔드 JavaScript 코드가 XMLHttpRequest를 사용하여 https://domain-b.com/data.json을 요청하는 경우.

![CORS](https://mdn.mozillademos.org/files/14295/CORS_principle.png)

보안 상의 이유로, 브라우저는 스크립트에서 시작한 교차 출처 HTTP 요청을 제한합니다. 예를 들어, **XMLHttpRequest**와 **Fetch API**는 동일 출처 정책을 따릅니다. 즉, 이 API를 사용하는 웹 애플리케이션은 자신의 출처와 동일한 리소스만 불러올 수 있으며, 다른 출처의 리소스를 불러오려면 그 출처에서 올바른 CORS 헤더를 포함한 응답을 반환해야 합니다.

## 자주 볼 수 있는 error
**Access to XMLHttpRequest at 'URL 주소' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource**