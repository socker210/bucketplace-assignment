# Bucketplace assignment


## 실행
```
yarn install
```

```
yarn run {dev | prod}
```

```
http://localhost:3000 접속
```


## 구현
### Client
React를 사용하여 개발하였습니다.

### Server
webpack-dev-server를 사용하여 개발하였습니다.

### Style
SCSS를 사용하여 개발하였습니다. postcss의 plugin인 autoprefixer을 사용하여 vendor prefix를 해결하였습니다. class 명칭룰은 BEM을 따랐습니다.

### Eslint
Eslint + standard를 사용하였습니다.

### Test
Jest + Enzyme을 사용하여 유닛테스트를 진행하였습니다.


## 프로젝트 구조
- api/
  - API 폴더
- src/
  - 소스 폴더
  - component/
    - 컴포넌트 폴더
  - pages/
    - 페이지 폴더
  - utils/
    - Util용 폴더
- static/
  - static 파일 폴더


## 명령어
- yarn run dev
  - development 모드로 실행
- yarn run prod
  - production 모드로 실행
- yarn run test
  - 유닛테스트 진행
- yarn run eslint
  - Linter실행 및 fix 진행