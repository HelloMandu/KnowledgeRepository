# News-Viewer

![image](https://user-images.githubusercontent.com/45222982/94003133-d1539a80-fdd5-11ea-9d82-348b61bdb072.png)

## axios
 - 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트로서 HTTP 요청을  Promise 기반으로 처리
 
## API 연동시 유의사항
 - useEffect에 등록하는 함수는 async로 작성하면 안댐, **대신 async 함수를 따로 만들어서 사용할 것**
 
## 커스텀 Hook

```
import { useState, useEffect } from "react";

export default function usePromise(promiseCreator, deps) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, deps);
  return [loading, resolved, error];
}
```
```
  const [loading, response, error] = usePromise(()=>{
    const query = (category === 'all' ? '' : `&category=${category}`);
    return axios.get(`http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=dabeec94a62a4c2688397e5a0f0f56dc`);
  }, [category])
  ```
