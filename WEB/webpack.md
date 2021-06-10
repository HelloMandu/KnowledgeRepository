# WebPack

## 웹팩이란?

웹팩이란 최신 프런트엔드 프레임워크에서 가장 많이 사용되는 `모듈 번들러(Module Bundler)`.

모듈 번들러란 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미.

## 모듈 번들링
웹 애플리케이션을 구성하는 몇십, 몇백개의 자원들을 하나의 파일로 병합 및 압축 해주는 동작을 의미
![webpack](https://joshua1988.github.io/webpack-guide/assets/img/webpack-bundling.e79747a1.png)

> 빌드, 번들링, 변환 모두 같은 의미

## 웹팩으로 해결하려는 문제
- 자바스크립트 변수 유효 범위: ES6의 Modules문법과 웹팩의 모듈 번들링으로 해결
- 브라우저별 HTTP 요청 숫자의 제약: 여러 개의 파일을 하나로 합쳐 브라우저별 HTTP 요청 숫자 제약을 피함
- 사용하지 않는 코드의 관리
- Dynamic Loading & Lazy Loading 미지원: Code Splitting 기능을 이용해 모듈을 원하는 타이밍에 로딩

# Node.js & NPM

## Node.js
Node.js는 **브라우저 밖에서도 자바스크립트를 실행할 수 있는 환경을 의미**(***자바스크립트 런타임***). Node.js가 나오기 전까지는 자바스크립트가 브라우저의 동작을 제어하는데 사용되었고 브라우저에서만 실행할 수 있었지만 이제는 Node.js로 자바스크립트를 브라우저 밖에서도 실행할 수 있음

```js
// app.js
console.log('hi');
```

```bash
node app.js
```

## NPM
NPM(Node Package Manager)는 명령어로 자바스크립트 라이브러리를 설치하고 관리할 수 있는 패키지 매니저

실행 명령어
```bash
npm init -y
```
명령어 실행 후 생성되는 package.json
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## NPM 지역 설지
```bash
npm install <package name> --save-prod
```
지역 설치 명령어의 경우 명령어 옵션으로 `--save-prod`를 붙이지 않아도 동일한 효과가 남. 또한, `install 대신 i를 사용해도 됨`
```bash
npm i <package name>
```

## NPM 지역 설치 경로
위 명령어로 라이브러리를 설치하면 해당 프로젝트의` node_modules` 라는 폴더 아래에 해당 라이브러리 파일들이 설치되어 있는 것을 확인할 수 있음.

## NPM 전역 설치
```bash
npm install <package name> --global
```

## NPM 전역 설치 경로
```bash
# window
%USERPROFILE%\AppData\Roaming\npm\node_modules
# mac
/usr/local/lib/node_modules
```

## NPM 지역 설치 옵션

```bash
npm install <package name> --save-prod
npm install <package name> --save-dev
```
축약된 명령어
```bash
npm i <package name>
npm i <package name> -D
```

```json
// package.json
{
  // 아무 옵션이 업는 경우 npm i <package name>
  "dependencies": {
    "<package name>": "^3.4.1"
  },
  // 설치 옵션으로 -D를 넣은 경우 npm i <package name> -D
  "devDependencies": {
    "jquery": "^3.4.1"
  }
}
```

## 개발용 라이브러리와 배포용 라이브러리

배포용 라이브러리(dependencies)는 `npm run build`시 최종 애플리케이션 코드안에 포함되지만, 개발용 라이브러리(devDependencies)는 배포할 때 애플리케이션 코드에서 빠지게 됨

### 배포할 때 빠져도 좋은 라이브러리
- webpack: 빌드 도구
- eslint: 코드 문법 검사 도구
- imagemin: 이미지 압축 도구

## NPM 커스텀 명령어
```json
// package.json
{
  ...
  "scripts": {
    "hello": "echo hi"
  }
}
```

```bash
npm run hello
```
결과: 콘솔에 hi가 출력

> `npm run 명령어 이름` 형식으로 실행

# 웹팩의 4가지 주요 속성
- entry
- output
- loader
- plugin

# Entry
웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로.
```js
// webpack.config.js
module.exports = {
  entry: './src/index.js'
}
```
웹팩을 실행했을 때 폴더 밑의 `./src/index.js`을 대상으로 웹팩이 빌드를 수행하는 코드

## Entry파일에 들어가야하는 내용

`entry` 속성에 지정된 파일에는 웹 애플리케이션의 전반적인 구조와 내용이 담겨져 있어야 함. 웹팩이 해당 파일을 가지고 웹 애플리케이션에서 사용되는 모듈들의 연관 관계를 이해하고 분석하기 때문에 애플리케이션을 동작시킬 수 있는 내용들이 담겨져 있어야 함.

```js
// index.js
import LoginView from './LoginView.js';
import HomeView from './HomeView.js';
import PostView from './PostView.js';

function initApp() {
  LoginView.init();
  HomeView.init();
  PostView.init();
}

initApp();
```
![entry](https://joshua1988.github.io/webpack-guide/assets/img/webpack-entry.90e26197.png)

## Entry 유형
```js
entry: {
  login: './src/LoginView.js',
  main: './src/MainView.js'
}
```
위와 같이 엔트리 포인트를 분리하는 경우는 싱글 페이지 애플리케이션이 아닌 특정 페이지로 진입했을 때 서버에서 해당 정보를 내려주는 형태의 멀티 페이지 애플리케이션에 적합하다.

# Output
output 속성은 웹팩을 돌리고 난 결과물의 파일 경로를 의미
```js
// webpack.config.js
module.exports = {
  output: {
    filename: 'bundle.js'
  }
}
```

## Output 속성 옵션 형태
최소한 `filename`은 지정해줘야 하며 일반적으로 아래와 같이 `path` 속성을 함께 정의함
```js
// webpack.config.js
var path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  }
}
```
같지만 다른 표현 방식
```js
output: './dist/bundle.js'
```

## Output 파일 이름 옵션

1. 결과 파일 이름에 entry 속성을 포함하는 옵션
```js
module.exports = {
  output: {
    filename: '[name].bundle.js'
  }
};
```
2. 결과 파일 이름에 웹팩 내부적으로 사용하는 모듈 ID를 포함하는 옵션
```js
module.exports = {
  output: {
    filename: '[id].bundle.js'
  }
};
```
3. 매 빌드시 마다 고유 해시 값을 붙이는 옵션
```js
module.exports = {
  output: {
    filename: '[name].[hash].bundle.js'
  }
};
```
4. 웹팩의 각 모듈 내용을 기준으로 생생된 해시 값을 붙이는 옵션
```js
module.exports = {
  output: {
    filename: '[chunkhash].bundle.js'
  }
};
```

# Loader
로더(Loader)는 웹팩이 웹 애플리케이션을 해석할 때 `자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성`
```js
// webpack.config.js
module.exports = {
  module: {
    rules: []
  }
}
```

## Loader가 필요한 이유
```js
// app.js
import './common.css';

console.log('css loaded');
```
```css
/* common.css */
p {
  color: blue;
}
```
```js
// webpack.config.js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
}
```
`위 파일을 웹팩으로 빌드하게 되면 아래와 같은 에러가 발생`

## CSS Loader 적용하기
```bash
npm i css-loader -D
```
```js
// webpack.config.js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  }
}
```
- test: 로더를 적용할 파일 유형 (일반적으로 정규 표현식 사용)
- use: 해당 파일에 적용할 로더의 이름

## 자주 사용되는 로더 종류
- Babel Loader
- Sass Loader
- File Loader
- Vue Loader
- TS Loader

로더를 여러 개 사용하는 경우
```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      // ...
    ]
  }
}
```

## 로더 적용 순서

로더는 기본적으로 `오른쪽에서 왼쪽 순`으로 적용
```js
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }
  ]
}
```
 scss 파일에 대해 먼저 Sass 로더로 전처리(scss 파일을 css 파일로 변환)를 한 다음 웹팩에서 CSS 파일을 인식할 수 있게 CSS 로더를 적용하는 코드. CSS 파일이 웹 애플리케이션에 인라인 스타일 태그로 추가되는 것을 원한다면 아래와 같이 style 로더도 추가할 수 있음
```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: { modules: true }
        },
        { loader: 'sass-loader' }
      ]
    }
  ]
}
```
같지만 다른 표현

# Plugin
플러그인(plugin)은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성. 

로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면, 플러그인은 해당 결과물의 형태를 바꾸는 역할을 한다고 보면 됨.

```js
// webpack.config.js
module.exports = {
  plugins: []
}
```
플러그인의 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가될 수 있음

```js
// webpack.config.js
var webpack = require('WEB/webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.ProgressPlugin()
    ]
}
```
- HtmlWebpackPlugin: 웹팩으로 빌드한 결과물로 HTML파일을 생성해주는 플러그인
- ProgressPlugin: 웹팩의 빌드 진행율을 표시해주는 플러그인

### 자주 사용하는 플러그인
- split-chunks-plugin
- clean-webpack-plugin
- image-webpack-loader
- webpack-bundle-analyzer-plugin

# 웹팩 동작 요약
![wrapup](https://joshua1988.github.io/webpack-guide/assets/img/diagram.519da03f.png)

- Entry: 웹팩을 실행할 대상 파일. 진입점
- Output: 웹팩의 결과물에 대한 정보를 입력하는 속성. 일반적으로 filename과 path를 정의
- Loader: CSS, 이미지와 같은 비 자바스크립트 파일을 웹팩이 인식할 수 있게 추가하는 속성. 로더는 오른쪽에서 왼쪽 순으로 적용
- Plugin: 웹팩으로 변환한 파일에 추가적인 기능을 더하고 싶을 때 사용하는 속성. 웹팩 변환 과정 전반에 대한 제어권을 갖고 있음
