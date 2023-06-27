# <span id='top'> 🛩️ Tripillow</span>

## 1. 📱 서비스 소개 
<img width="1920" alt="tripillow_thumbnail" src="https://github.com/FRONTENDSCHOOL5/final-15-Tripillow/assets/88657261/990fc913-0ed3-4663-ab76-e9d2b00e7fd6">

Tripillow는 **여행 경험을 공유하고, 개인 간의 여행용품과 외화를 거래하는 SNS 플랫폼**입니다. <br/>
Trip(여행) + Pillow(베개)를 합친 Tripillow는  방구석 여행을 컨셉으로 간편하게 타인의 여행 후기를 통해 간접적으로 여행을 즐길 수 있습니다. <br/>
Pillower, Pillowing 기능을 활용하여, 친구를 맺은 사용자들은 자신의 여행 후기를 기록할 뿐만 아니라 친구의 여행 후기도 확인할 수 있습니다. <br/> 
자신의 홈 피드에서 Pillowing한 사람들의 게시물을 확인 할 수 있고, 댓글과 좋아요 기능을 통해서 서로 소통할 수 있습니다. <br/>
더 이상 사용하지 않는 여행 용품과 외화를 간편하게 거래할 수 있습니다.

>**Tripillow를 통해 국내, 해외 방구석 여행러들과 소통해보세요 💙🛩️**

>### 배포 URL
>www.test.com
>### 테스트 계정
>ID: sudo@sudo.com <br/>
>PW: 123123

<br/>

## 2. 👥 팀 소개


|                                    **FE 김희민**                                    |                                    **FE 이윤석**                                    |                                 **FE 이도하**                                 |                                    **FE 임다솜**                                    |
| :---------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/124167002?v=4" height=180 > | <img src="https://avatars.githubusercontent.com/u/118046282?s=96&v=4" height=180 > | <img src="https://avatars.githubusercontent.com/u/88657261?v=4" height=180 > | <img src="https://avatars.githubusercontent.com/u/81025416?v=4" height=180 > |
|                        [🔗 GitHub](https://github.com/hmkimm)<br/> 팀장                         |                        [🔗 GitHub](https://github.com/ystone-dev)<br/> 기획 리더                         |           [🔗 GitHub](https://github.com/haron-lee)<br/> 디자인, 기술 리더          |                        [🔗 GitHub](https://github.com/bringvotrevin)<br/> 개발 리더                         |


<p align="right"><a href="#top">(🔼 Top)</a></p>


## 3. 🗓️ 개발 기간 (23년 6월 12일 ~ 23년 6월 27일)
 
### 📌 주차별 프로젝트 마일스톤    
|주차||
|----|----|
|**1주차**<br>(6/1 ~ 6/7)|- 주제 선정, 기술 스택 및 협업툴 결정 (`Notion`, `Discord`, `Figma`, `Figjam`)<br>- GitProject, GitIssue 템플릿 적용, Figma 디자인 작업 및 기획, 컨벤션 설정|
|**2주차**<br>(6/8 ~ 6/14)|- 초기 개발환경 세팅<br>- 로그인, 회원가입 페이지 마크업 & 스타일링 페어프로그래밍으로 구현|
|**3주차**<br>(6/15 ~ 6/21)|- 페이지 단위로 업무를 분담하여 작업 시작|
|**4주차**<br>(6/22 ~ 6/27)|- 필수 기능 구현 1차 완료<br>- 추가기능 구현(게시글 카테고리 기능)<br>- 배포<br>- 프로젝트를 시연해보며 보이는 에러 수정<br>- README 작성|

<p align="right"><a href="#top">(🔼 Top)</a></p>
<br>

## 4. 🌳 개발 환경
### 🛠️ 기술스택

<p  align="left">

<img  src="https://img.shields.io/badge/react-2D333B?style=for-the-badge&logo=react&logoColor=61DAFB">
<img  src="https://img.shields.io/badge/Recoil-2D333B?style=for-the-badge&logo=react&logoColor=3578E5">
<img  src="https://img.shields.io/badge/Styled component-2D333B?style=for-the-badge&logo=styledcomponents&logoColor=#DB7093">

<img  src="https://img.shields.io/badge/javascript-2D333B?style=for-the-badge&logo=javascript&logoColor=#F7DF1E">
<img  src="https://img.shields.io/badge/prettier-2D333B?style=for-the-badge&logo=prettier&logoColor=#F7B93E">

</p>

- 보다 간편한 컴포넌트 상태 관리와 접근을 위해 Recoil을 사용했습니다.
- Styled Components를 사용해서 컴포넌트 내에서 스타일을 캡슐화하며 모듈성과 재사용성을 높이고 컴포넌트 스타일을 보다 쉽게 ​​관리했습니다.
- 일관된 코드 스타일과 코드 마찰 감소를 위해 Prettier를 사용했습니다.

<br />
 
### Git Branch
🚀 Git Issue 작성 - Develop branch에서 branch 분기 후 작업
  <br/>
  
### GitHub Flow
🚀 main : 배포가 될 branch입니다.
🚀 develop : 기능 개발이 완료된 branch가 합쳐지는 곳으로, 2명의 조원의 승인 후에 merge됩니다.

<br />

<p align="right"><a href="#top">(🔼 Top)</a></p>

## 6. 📁 폴더 구조

```
📁 Tripillow
├──📁 .github
├──📁 node_modules
├──📁 public
├──📁 src
│    ├──📁 Assets
│   ├──📁 Components
│   ├──📁 Hooks
│   ├──📁 Mock
│   ├──📁 Pages
│   │   ├──📁 Chat
│   │   ├──📁 Post
│   │   ├──📁 Product
│   │   └──📁 Profile    
│   ├──📁 Recoil
│  	├──📁 Styles
│   └──📁 Utils
├──📄 App.js
├──📄 GlobalStyle.jsx
├──📄 index.js
├──📄 .gitignore
├──📄 .prettierrc.js
├──📄 package-lock.json
├──📄 package.json
└──📄 README.md
```

<p align="right"><a href="#top">(🔼 Top)</a></p>

<br />

## 7. 🙏 팀 컨벤션
### 커밋 컨벤션
 
```
- Feat: 새로운 기능 추가
- Fix: 버그 수정
- Docs: 문서 수정 (예 : readme.md, json 파일 등 수정/ 문서 관련 라이브러리 설치 등)
- Design: CSS 등 사용자 UI 디자인 변경
- Style: 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
- Refactor: 코드 리팩토링
- Test: 테스트 코드, 리팩토링 테스트 코드 추가
- Comment: 필요한 주석 추가 및 변경
- Chore: 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
- Rename: 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
- Remove: 파일을 삭제하는 작업만 수행한 경우
- !BREAKING CHANGE: 커다란 API 변경의 경우
- !HOTFIX: 급하게 치명적인 버그를 고쳐야 하는 경우
```

<br/>

 ### 코드 컨벤션
 통일성 있는 코드 작성을 위해 다양한 코드 컨벤션을 정해 사용했습니다.
 <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/> 

```
{
	bracketSpacing:  true,
	jsxBracketSameLine:  false,
	jsxSingleQuote:  true,
	singleQuote:  true,
	proseWrap:  'preserve',
	semi:  true,
	printWidth:  120,
	endOfLine:  'lf',
	useTabs:  false,
	tabWidth:  2,
	trailingComma:  'all',
	arrowParens:  'always',
};
```

<p align="right"><a href="#top">(🔼 Top)</a></p>

</br>
