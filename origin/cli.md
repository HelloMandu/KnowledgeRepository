# CLI(Command Line Interface)

## NPM, YARN

| npm | yarn | 설명 |
|---|---|---|
| npm init | yarn init | 프로젝트 초기화 |
| npm install | yarn or yarn install | package.json의 패키지 설치 |
| npm install -save [package name] | yarn add [package name] | 패키지를 프로젝트 의존성 수준으로 추가 (dependencies) |
| npm install -save -dev [package name] | yarn add -D[or -dev] [package name] | 패키지를 프로젝트 개발 의존성 수준으로 추가(Devdependencies) |
| npm install -global [package name] | yarn global add [package name] | 패키지를 전역 수준으로 추가 |
| npm update -save | yarn upgrage | 프로젝트의 패키지 업데이트 |
| npm run [script name] | yarn [script name] | package.json의 scripts에 지정된 명령 실행 |
| npm uninstall -save [package name] | yarn remove [package name] | 패키지 삭제 |
| npm cache clean | yarn cache clean | 캐시삭제 |

## Git

### 생성하기
| CLI | 설명 |
|---|---|
| git init [project_name] | 새로운 로컬 저장소 생성 |
| git clone [url] | 저장소 가져오기 |

### 살펴보기
| CLI | 설명 |
|---|---|
| git status | 작업 디렉토리에 변경된 파일 보기 |
| git diff | 변경된 staged 파일 보기 |
| git log | 변경 이력 보기 |

### 브랜치 작업하기
| CLI | 설명 |
|---|---|
| git branch | 로컬 브랜치 보기 |
| git branch -av | 로컬, 원결 브랜치 보기 |
| git checkout <branch> | 브랜치 변경 |
| git branch <new-branch> | 브랜치 생성 |
| git branch -d <branch> | 부랜치 삭제 |
| git checkout --track <remote/branch> | 원격 브랜치를 추적하는 새로운 브랜치 만들기 |
| git branch -u <remote/branch> | 원격 브랜치 추적하기 |
| git tag <tag-name> | 현재 커밋에 태그 달기 |

### 변경하기
| CLI | 설명 |
|---|---|
| git add [file] | 파일의 변경사항 커밋에 반영 |
| git add . or -A | 모든 변경 사항을 다음 커밋에 반영 |
| git commit -m "commit message" | 커밋하기 |
| git commit -a | 모든 변경사항을 반영하면서 커밋하기 |
| git commit --amend | 마지막 커밋 수정하기(published commit에는 하지 말 것!) |

### 취소하기
| CLI | 설명 |
|---|---|
| git reset [--hard HEAD] | 작업 디렉토리 reset하기 |
| git revert <commit> | 커밋 되돌아가기 |

### 동기화하기
| CLI | 설명 |
|---|---|
| git fetch <remote> | 원격 저장소의 변경사항 가져오기 |
| git pull <remote> <branch> | 원격 저장소의 변경사항을 가져오고 머지하기 |
| git pull --rebase | 원격 저장소의 변경사항을 가져오고 리베이스하기 |
| git push <remote> <branch> | 원격 저장소에 변경사항 push |
| git push --tags | 원격 저장소에 태그 발행하기 |

### 병합, 리베이스하기
| CLI | 설명 |
|---|---|
| git merge <branch> | 병합하기 |
| git rebase <branch> | 리베이스하기 |

### 변경사항 저장하고 복원하기
| CLI | 설명 |
|---|---|
| git stash | 임시로 변경사항 저장하기 |
| git stash pop | 임시 변경사항 복원하기 |
| git stash list | 임시 변경사항 보기 |