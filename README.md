# SKINEARTH-Frontend 🌍

<img src="./main.png" alt="SKINEARTH" />

<br>
피부 컨디션 트래킹 & 예보 서비스 **SKINEARTH**의 프론트엔드입니다.

사용자는 매일 냉난방 노출, 화면 사용, 수면, 스트레스, 식사 규칙성과 같은 생활 환경과 피부 상태를 기록합니다.

프론트엔드는 회원가입과 개인화 온보딩부터 일일 기록, 피부 온도 지수 히스토리, 내일의 피부 예보, 맞춤 미션까지 사용자가 SKINEARTH의 주요 기능을 이용할 수 있는 화면과 인터랙션을 제공합니다.

<br>

## 주요 기능

| 기능 | 설명 |
| --- | --- |
| `auth` | 회원가입 및 로그인 |
| `onboarding` | 서비스 소개 및 사용자 개인화 설문 |
| `home` | 오늘의 기록 상태와 피부 컨디션 정보 확인 |
| `daily record` | 생활 환경 및 피부 상태 기록 |
| `history` | 피부 온도 지수 및 누적 기록 확인 |
| `forecast` | 생활 환경 입력 및 피부 컨디션 예보 결과 확인 |
| `mission` | 맞춤형 데일리 미션 조회 및 수행 |
| `mypage` | 사용자 정보 및 서비스 이용 상태 확인 |

<br>

## 담당 화면

| 이름 | 담당 |
| --- | --- |
| 박서현 | 로그인, 회원가입, 온보딩, 홈 페이지, 히스토리 페이지 |
| 박영서 | 온보딩, 기록 페이지, 예보 페이지, 미션 페이지, 마이페이지 |

<br>

## 기술 스택

| Category | Stack |
| --- | --- |
| Language | JavaScript |
| Library | React 19 |
| Routing | React Router DOM |
| Styling | styled-components |
| Build Tool | Vite |
| Lint | Oxlint |
| Deployment | Vercel |

<br>

## 화면 흐름

```text
Splash
  ↓
Onboarding
  ↓
Signup / Login
  ↓
Personalization Survey
  ↓
First Record Guide
  ↓
Home
  ├── Log
  │    └── Log Complete
  │
  ├── Orbit History
  │
  ├── Prediction
  │    ├── Prediction Loading
  │    └── Prediction Result
  │
  ├── Mission
  │
  └── MyPage
```

<br>

## 프로젝트 구조

```text
SKINEARTH-Frontend
├── .github/
├── dist/
├── src/
│   ├── api/
│   │   ├── apiClient.js
│   │   ├── auth.js
│   │   ├── badge.js
│   │   ├── dailyRecord.js
│   │   ├── dataReset.js
│   │   ├── forecast.js
│   │   ├── history.js
│   │   ├── home.js
│   │   ├── mission.js
│   │   ├── myPage.js
│   │   ├── onboarding.js
│   │   └── personalization.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AuthInput.jsx
│   │   ├── NavBar.jsx
│   │   ├── OnboardingSlide.jsx
│   │   ├── OrbitTrendChart.jsx
│   │   ├── PpJourneyCard.jsx
│   │   └── SurveyProgress.jsx
│   │
│   ├── data/
│   │   └── missionData.js
│   │
│   ├── pages/
│   │   ├── AuthPage.jsx
│   │   ├── FirstRecordGuidePage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LogCompletePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── LogPage.jsx
│   │   ├── MissionPage.jsx
│   │   ├── MyPage.jsx
│   │   ├── OnboardingPage.jsx
│   │   ├── OrbitHistoryPage.jsx
│   │   ├── PersonalizationSurveyPage.jsx
│   │   ├── PredictionLoadingPage.jsx
│   │   ├── PredictionPage.jsx
│   │   ├── PredictionResultPage.jsx
│   │   ├── SignupPage.jsx
│   │   └── SplashPage.jsx
│   │
│   ├── styles/
│   │   ├── AuthPage.styles.js
│   │   ├── FirstRecordGuidePage.styles.js
│   │   ├── global.css
│   │   ├── HomePage.styles.js
│   │   ├── LogCompletePage.styles.js
│   │   ├── LogPage.styles.js
│   │   ├── MissionPage.styles.js
│   │   ├── MyPage.styles.js
│   │   ├── NavBar.styles.js
│   │   ├── OnboardingPage.styles.js
│   │   ├── OrbitHistoryPage.styles.js
│   │   ├── PersonalizationSurveyPage.styles.js
│   │   ├── PredictionLoadingPage.styles.js
│   │   ├── PredictionPage.styles.js
│   │   ├── PredictionResultPage.styles.js
│   │   └── SplashPage.styles.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── .oxlintrc.json
├── index.html
├── main.png
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
```

<br>

## API 연동

백엔드 REST API와 연동하여 사용자 인증, 일일 기록, 예보, 미션 및 히스토리 데이터를 처리합니다.

API 요청 코드는 기능별로 `src/api` 디렉터리에서 관리합니다.

```text
api/
├── apiClient.js        # 공통 API 요청 설정
├── auth.js             # 인증
├── badge.js            # 사용자 단계
├── dailyRecord.js      # 일일 기록
├── dataReset.js        # 사용자 데이터 초기화
├── forecast.js         # 피부 예보
├── history.js          # 기록 히스토리
├── home.js             # 홈 데이터
├── mission.js          # 맞춤 미션
├── myPage.js           # 마이페이지
├── onboarding.js       # 온보딩 상태
└── personalization.js  # 개인화 정보
```

상세 API 명세는 Swagger에서 확인할 수 있습니다.

- [SKINEARTH API Documentation](https://skinearth-api.up.railway.app/swagger-ui/index.html#/)

<br>

## 배포

- [SKINEARTH Service](https://skinearth.vercel.app)

<br>

## 로컬 실행

### 1. Repository Clone

```bash
git clone https://github.com/SKINEARTH/SKINEARTH-Frontend.git
cd SKINEARTH-Frontend
```

### 2. Package Install

```bash
npm install
```

### 3. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 백엔드 API 주소를 설정합니다.

```env
VITE_API_BASE_URL=
```

| 환경변수 | 설명 |
| --- | --- |
| `VITE_API_BASE_URL` | SKINEARTH Backend API Base URL |

### 4. Run Development Server

```bash
npm run dev
```

개발 서버 실행 후 터미널에 출력되는 로컬 주소로 접속합니다.

<br>

## Workspace

- 🎨 **Figma** — [SKINEARTH Design](https://www.figma.com/design/5b2ECQHwHiDOmTeSK2TIZR/SKINEARTH?node-id=16-2036&t=G9BvdVLDOGvjDSWy-1)
- 📝 **Notion** — [SKINEARTH Workspace](https://daisy-licorice-73f.notion.site/likelion-skinearth?pvs=74)
- 📑 **Swagger** — [SKINEARTH API Documentation](https://skinearth-api.up.railway.app/swagger-ui/index.html#/)