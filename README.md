# **About team gabozaGo**

- FrontEnd: 김수정
- BackEnd: 서동희(ProductManager), 이주현(ProjectManager), 하준수
- 개발기간: 2023.07.17 ~ 2023.07.28
- 깃헙 링크
    - [FrontEnd](https://github.com/wecode-bootcamp-korea/47-2nd-gabozaGo-frontend)
    - [BackEnd](https://github.com/wecode-bootcamp-korea/47-2nd-gabozaGo-backend)

---

# Clone Coding project - [다이닝코드](https://www.diningcode.com/)

- 맛집 추천, 빅데이터 분석, 빅데이터 거래
    - B2B 영역에 있는 빅데이터 분석 및 빅데이터 거래는 현재 구현이 불가능하므로, 엔드유저의 정보에 기반한 추천시스템을 따와 변조한다.

---

# 우리가 구현해야 할 행위 - 관심사 기반 POI 추천 및 중개업

- 유저의 지리적 정보 및 관심사 정보를 통한 해양 레져 액티비티 추천 및 중개

---

# PEFT 분석

### Product: 우리의 프로덕트가 커버하는 제품과 서비스는 어떤 종류의 것일까?

1. eCommerce를 영위: 네트워크 상에서 이루어지는 서비스의 거래
    1. 웹페이지에 게시된 정보를 바탕으로 구매의사결정을 내리게 됨. 따라서 제공 가능한 선에서 서비스에 대한 상세 정보를 제공할 수 있어야 함.
    2. 구매의사 결정 및 지불이 끝났다고 해서 바로 상품을 수령할 수 있지 않으므로, 서비스의 최종 집행에 있어 필요한 정보가 잘 관리되어야 함.
2. 취급품목: 바다 관련 레저 액티비티 서비스 → 바다 근처 지역에서 아웃도어로 즐길 수 있는 레저 활동

### End-user: 우리의 프로덕트는 어떤 사람이 사용하게 될까?

1. 여행 또는 휴가철을 맞아, 바닷가 근처에서 즐길 수 있는 아웃도어 활동을 원하는 consumer
    1. 여행 또는 휴가를 준비하고 있는 중일 가능성이 높다. → 여행/휴가는 소중하기 때문에, 신중한 결정이 필요한 상황이다.
    2. 아웃도어 활동을 원하기 때문에, 본인 또는 함께하는 구성원이 활동적인 성격/특성일 가능성이 높다.
2. 바닷가 근처에서 아웃도어 활동 서비스를 제공하는 provider → 이번 프로젝트의 구현기능 스코프에서는 고려하지 않는다
    1. 사업자 형태를 지니고 있을 가능성이 높다.
    2. 하나의 사업자가 여러 종류의 레저 활동을 제공할 가능성이 높다.

### Feature: 우리의 프로덕트는 어떤 기능을 가지고 있어야할까?

1. 엔드유저(특히 Consumer)의 관심정보 취득 및 관리 → 회원가입, 로그인 기능
    1. 엔드유저의 관심사에 기반한 추천이 근간이므로, 엔드유저가 어떤 관심사를 가지고 있는지 관리할 필요가 있다.
    2. 프로덕트를 이용하는 시점이 엔드유저가 굉장히 기분이 좋은 시점일 것이므로, 회원가입/로그인 씬에서 유저가 최대한 간편하게 회원가입/로그인을 완료할 수 있도록 간편한 절차를 구현한다.
2. 위치 및 관심정보에 따른 액티비티 추천 → 메인페이지 구성
    1. 로그인 한 유저인 경우, 유저가 설정해 둔 지역과 관심사 정보를 기반한 액티비티 추천 리스트를 보여준다.
    2. 로그인 하지 않은 유저인 경우, 기본값으로 설정된 액티비티 추천 리스트를 보여준다.
3. 개별 액티비티에 대한 정보 제공 → 상세페이지 구성
    1. 특정 액티비티에 대한 상세 정보를 제공한다. 제공 범주는 아래와 같다.
        1. 액티비티에 대한 일반정보: 위치, 가격, provider 정보 등
        2. 액티비티에 대한 유저 평가 정보: 별점, 리뷰멘트, 이용사진 등
        3. 액티비티에 대한 예약가능여부 정보: 일자별 잔여 예약가능인원수
4. 원하는 액티비티를 즐길 수 있게 provider와 연결 → 액티비티 예약 및 결제 기능
    1. 유저가 즐기기 원하는 액티비티에 대해 예약 및 결제를 할 수 있게 기능을 지원한다.
        1. 내부 포인트를 통한 액티비티 예약 및 결제 기능을 구현한다.
        2. 외부 결제 PG를 통한 액티비티 예약 및 결제 기능을 구현한다.
    2. 예약이 불가한 경우에 대해 안내한다.
5. 유저가 선택을 고민하고 있는 액티비티 저장 기능 → likes 기능
    1. 유저가 여러 액티비티 중 어떤 것을 취사선택할지 고민하고 있는 상황을 대비해 원하는 액티비티에 대해 임시저장을 해 둘 수 있는 likes 기능을 지원한다.
6. 유저 지원 기능 → 마이페이지 구성
    1. 엔드유저와 관련된 정보들을 확인 및 수정할 수 있는 기능을 제공하여 유저의 편의성을 높인다.
        1. 유저 프로필 확인 및 수정
        2. 유저 likes 목록 확인 및 수정
        3. 유저 예약내역 확인 및 수정

### Tech: 우리가 사용할 기술스택

- 기술스택 → 여기서 편집 후 재설정 필요 https://techstack-generator.vercel.app/
- 동적인 웹페이지 구성 및 '날짜'라는 개념을 적극 활용해야 하는 측면이 있는 만큼, 자바스크립트를 채택하여 동적인 엔드뷰 구성 및 풍부한 생태계에서 오는 각종 라이브러리를 활용한다.
1. 공통: 자바스크립트
    1. FrontEnd: React, Styled Components, AWS S3
        - <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /><img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /><img src="https://techstack-generator.vercel.app/sass-icon.svg" alt="icon" width="65" height="65" /></div>
    2. be : Node.js, Express, MySQL, docker, aws
        - <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /><img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /></div>
    3. 협업툴: Git, GitHub, Slack, Trello, Notion, VSCode → https://shields.io/
        
        <div>
        <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/>
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/>
        <img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/>
        <img src="https://img.shields.io/badge/Trello-0052CC?style=flat&logo=Trello&logoColor=white"/>
        <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/>
        <img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
        </div>
        

---

# 결과물

## 데모영상
<iframe width="560" height="315" src="https://www.youtube.com/embed/AUk8vcQAQRM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 개발 코드

- [FrontEnd](https://github.com/wecode-bootcamp-korea/47-2nd-gabozaGo-frontend)
- [BackEnd](https://github.com/wecode-bootcamp-korea/47-2nd-gabozaGo-backend)

## 참고자료

- Notion Teamspace - [team gabozaGo](https://www.notion.so/7c6ef533597847b39be0eea7092ffdde?pvs=21)
- Trello - [Ticket management](https://trello.com/b/YZxvoPxc/%EA%B0%80%EB%B3%B4%EC%9E%90go)
- LucideChart - [ERD](https://lucid.app/lucidchart/5a1ee4fb-e210-4b0c-8354-e143d9faa8f6/edit?beaconFlowId=97BA0529691CC26A&invitationId=inv_ccc05c96-743a-4fc6-b03f-2295034af238&page=0_0#)

---

# 구현 기능 상세

### I. 엔드유저의 관심정보 취득 및 관리 → 회원가입, 로그인 기능

1. FE 
    1. API키와 RedirectURI를 설정하여 카카오로그인페이지에서 인증코드를 받아 백엔드에 전달하고 백에서 토큰을 받아 회원가입상태로 변경.
    2. 회원가입이 된 상태이지만 유저에게 추가정보를 받고 그 정보를 기반으로 보여줄것이 바뀌도록 구현학기위해 추가정보를 기입하도록 회원가입 페이지를 구현.
    3. 회원가입시 유저의 폰번호 입력(문자나 특수문자를 쓸경우, 11자리를 넘을경우 알림메세지 띄우기)
    4. 유저는 최소 하나의 관심사지역을 선택하고, 최소5개의 관심사를 선택해야 버튼이 활성화되도록 구현. 
2. BE
    1. 구현 시 고려사항
        1. 기획 상 카카오 로그인으로만 회원가입과 로그인을 해야한다.
        2. 카카오 api를 사용해서 정보를 가져오고 우리가 필요한 정보를 따로 받을 수 있게 해야한다.
        3. 로그인 시도할 때 회원이 아니면 바로 회원가입이 되어야한다
        4. 로그인을 시도하고 추가사항을 기입하지 않은 회원을 따로 분류해야한다.
    2. 작동기전
        1. 하나의 api로 할 수 없기에 2개의 api로 나눠서 로그인과 회원가입을 동시에 하게 한다.
        2. 로그인과 동시에 회원가입을 하게하려면 users table을 다 null 로 해놔야 카카오 api에서 가져오는 정보를 바로 집어넣어준다.
        3. 추가사항을 기입한 유저와 기입안한 유저를 분류하기위해 signup_status 컬럼을 하나 더 만들어서 사용해준다.
        4. signup_status가 0이면 추가기입해야하고 1이면 로그인

### II. 위치 및 관심정보에 따른 액티비티 추천 → 메인페이지 구성

1. 수상레저에관련된 이미지를 넣은 캐러셀을 만들어 물놀이이에대한 욕구를 끌어올리고자 함.
    1. 3초간격으로 이미지가 바뀜
    2. 이미지의 중간에 위치설정 버튼을 만듬
        1. 클릭시 모달창으로 위치정보를 바꿀수있으며 아래의 상품리스트(개별액티비티리스트)들도 바뀜 
    3. 상품리스트들은 위치와 유저가 가입할때 고른 관심사태그별로 보여주며, 아직 관심사 설정을 하지않은 유저나 회원이 아닌유저는 모든 목록을 조회 가능.
        1. 태그안의 액티비티들은 별점순으로 볼 수있으며 최대 8개를 슬라이드 및 버튼으로 조회 가능.
2. BE

### III. 개별 액티비티에 대한 정보 제공 → 상세페이지 구성

1. FE 
    1. 상품 상세정보
        1. 유저가 한눈에 볼수 있돌고 받아온 정보들을 배치함.
    2. 찜버튼, 에약하기버튼
        1. 찜버튼 클릭시 짐페이지에 등록되고 다시 찜 클릭시 해제됨
        2. 예약하기 버튼 클릭시 달력과 예약페이지가 모달창으로 나타나도록 구현
    3. 상품 관련 리뷰 리스트 불러오기
    4. 리뷰작성
        1. 리뷰작성시 회원가입된 유저의 정보를 기반으로 작성.
        2. 별점 선택시 1단위로 조절 할 수 있도록 구현
2. BE
    1. 액티비티에 대한 일반정보: 위치, 가격, provider 정보 등
    2. 액티비티에 대한 유저 평가 정보: 별점, 리뷰멘트, 이용사진 등
    3. 액티비티에 대한 일자별 잔여 예약가능인원수 조회 (하준수)
        1. 구현 시 고려사항
            1. 2주간의 일자별 예약 가능 인원수 정보 노출 → 조회를 원하는 상품의 정보 및 시점을 자동으로 캐치해야 함.
            2. 로그인 하지 않은 엔드유저도 조회가 가능해야 함.
            3. 해당 정보를 기반으로 엔드유저가 예약 의사결정을 하기 때문에 정확한 정보를 전달할 필요가 있음.
        2. 작동기전
            1. Router 레벨: 엔드포인트의 패스파라미터로 조회할 액티비티 id 취득
            2. Controller 레벨: 엔드포인트 정보 전달 및 결과물 전달
            3. Service 레벨: API가 호출된 시점을 기준으로 조회기준일자 생성. 해당 범위 내의 일자 정보를 통해 DB 검색 수행 및 결과물 편집. 
            4. Dao 레벨: DB의 orders테이블에 현 시점 유효한 order 정보만 취합하여  서비스 레벨로 전달.
        3. 특기할만한 방법론
            1. 인위적으로 날짜를 입력하는 것이 아닌, API가 호출된 시점을 자동으로 캐치하도록 구성함. → 좀 더 시간적 정합성 있는 정보를 가공할 수 있음.
            2. 서비스 레벨에서 DB의 정보를 재가공함(DB: 일자별 총 예약인원수 → 서비스결과물: 일자별 예약가능인원수). → 엔드뷰에서 좀 더 의미있는 정보를 볼 수 있음.

### IV. 원하는 액티비티를 즐길 수 있게 provider와 연결 → 액티비티 예약 및 결제 기능

1. FE 
    1. 달력 및 예약을 바로 액티비티 페이지에서 할 수 있도록 모달창으로 구현
        1. 오늘포함 지난 날짜 및 내일부터 14일이 지난날은 예약할 수 없도록 회색 및 클릭 금지.
        2. 예약 날짜 선택 후 예약가능한 인원이 0명일경우, 인원이 다찾다는 알림과 함께 다음 창으로 넘어가지 못하도록 구현.
    2. 날짜와 이원수의 조건이 맞으면 결제수단을 선택하는 모달창을 띄움
        1. 포인트결제
            1. 보유포인트가 있을경우 포인트가 부족하다는 알림을 띄우고 다음 절차로 진행할 수 없도록 구현
    3. 결제성공시 결제완료페이지를 모달로 구현
        1. 자세한 내역은 마이페이지에서 확인할 수 있도록 마이페이지의 주문페이지로 가는 버튼을 만듬
2. BE
    1. 액티비티에 대한 예약 및 결제 기능 (하준수)
        1. 구현 시 고려사항
            1. 다음과 같은 예외상황을 상정해야 한다.
                1. 결제에 필요한 정보가 부족한 상태에서 결제 시도
                2. 잔여예약가능인원수를 초과하는 인원으로 결제 시도
                3. 엔드유저가 보유한 결제능력이 결제대상금액에 미달하는 경우
            2. DB의 orders, payments, users 내용들이 연관되어 한 번에 기록/수정 되어야 하기 때문에 transaction으로 구현한다.
        2. 작동기전
            1. Router 레벨: 인가받은 유저인지 여부 확인
            2. Controller 레벨: 예약 및 결제 수행에 필요한 정보 확인 및 전달
            3. Service 레벨: 잔여예약가능인원수 체크 및 충분한 결제포인트 보유 여부 체크하여 예약 및 결제 프로세스 진행
            4. Dao 레벨: 서비스 레벨에서 비즈니스 로직 판단에 필요한 데이터 송부 및 예약결제 과정에 대한 DB 기록 진행
        3. 특기할만한 방법론
            1. queryRunner를 이용하여 결제 일련의 과정을 transaction으로 처리.
    2. DB 자동 업데이트 기능(orders.reservation_status 컬럼 항목)
        1. 구현 시 고려사항
            1. DB의 orders테이블에는 reservation_status라는 컬럼이 있는데, 이는 일자의 도과에 따라 아래와 같은 세 가지 값 중 하나를 지닌다.
                1. beforeReservation / reservationDay / afterReservation
            2. 따라서 별도의 조작 없이 app이 실행중인 경우, 일자가 도과함에 따라 해당 컬럼의 값을 자동으로 업데이트 해 주는 기능이 필요하다.
            3. 프로젝트의 규모를 고려해, 별도의 레이어드 패턴으로 구현하는 것 보다는 utils의 모듈로 처리하는 것이 적절하다.
        2. 작동기전
            1. 매일 0시 1분에 프로세스를 시작한다.
            2. 현재 시점의 일자정보를 구한 뒤, 이를 DB orders 테이블의 유효한 order 건들에 대해 날짜를 비교한 후 reservationDay 또는 afterRservation으로 컬럼 값을 업데이트 한다.
        3. 특기할만한 방법론
            1. node-schedule 라이브러리를 이용한 자동화 기능

### V. 유저가 선택을 고민하고 있는 액티비티 저장 기능 → likes 기능

1. FE 
    1. 상세페이지에서 유저가 찜을 클릭하면 마이페이지에서 확인가능
    2. 찜버튼을 한번 더 누르면 취소됨.
2. BE
    1. 구현 시 고려사항
        1. 해당 유저가 likes(찜)을 했을 시 user_likes에 해당 유저와 type과 target_id를 입력하게 한다.
        2. Type에는 추후에 액티비티 뿐만아니라 가게를 좋아요 할 수 있는 기능을 넣기위에 vachar로 선택을 하고 지금은 한가지 기능이기에 storeActivity로 고정해 준다.
        3. target_id 에는 storeActivity에 관련된 id값을 적어줌으로써 해당 어떤 storeActivity를 알 수 있게 해준다.
        4. 찜기능을 누르면 등록을 한번 더 누르면 삭제 되도록 구현한다.
    2. 작동기전
        1. 찜기능을 눌렀을 때 해당 유저id값과 storeActivity 값을 검색해서 결과값이 없다면 등록을 하고 결과값이 있다면 delete가 되도록 연결한다.

### VI. 유저 지원 기능 → 마이페이지 구성

1. FE 
    1. 버튼 클릭시 유저가 마이페이지에서 볼 수있는 자료들을 구분해서 볼 수 있도록 구현. 
    2. 유저의 프로필 상세정보 조회, 찜 목록조회, 구매내역 확인
2. BE
    1. 유저의 프로필 상세정보 조회
        1. 구현 시 고려사항
            1. Front에서 원하는 값에 따라 내용이 달라진다.
            2. users 테이블값으로만 할 수 없기에  user_spot과 user_activities를  가져와야 한다.
            3. user_spot과 user_activities의 id값으로 spots 과 activities 테이블에서 해당내용의 name을 가져와준다.
            4. 해당값을 가져오기위해서 left join을 사용해서 가져와준다.
    2. 찜 목록 조회
        1. 구현 시 고려사항
            1. Front에서 원하는 값이 무엇인지 물어보고 그값을 가져온다.

---

# 추가적으로 구현해보고 싶었던 것들

### 예약/결제 완료 시 관련내용 안내 메세지 송부 기능

1. 엔드유저가 액티비티에 대한 예약 및 결제를 완료하면, 해당 예약 정보를 엔드유저에게 전달하는 기능. 이 기능을 통해 UX를 증진할 수 있다.

### 상품 검색 기능

1. 사전 입력된 정보를 기반으로 추천리스트를 노출하는 기능 외에도, 엔드유저가 능동적으로 원하는 액티비티를 검색할 수 있는 기능이 추가된다면 엔드유저의 프로덕트에 대한 UX가 향상될 수 있다.
2. 필터링의 응용을 통해 구현할 수 있을 것으로 추측되며, DB의 특정 테이블의 특정 컬럼을 검색할 수 있게 지정하여 구현한다(eg. activities, store_activities, stores 테이블들을 엮어 activities.name 이나 stores.name 의 값들을 검색할 수 있게 한다)
3. 엔드뷰에서는 검색란에 검색할 수 있는 키워드의 예시를 표시하여 어떤 값을 검색할 수 있는지에 대한 단서를 엔드유저에게 제시한다.

### 상품 리뷰 작성, 게재 기능

1. 실제로 액티비티를 이용한 유저가 해당 액티비티에 대한 평가를 남길 수 있는 기능을 제공하여 액티비티에 대한 데이터를 축적할 수 있다. 이렇게 축적된 데이터는 다른 비즈니스에 활용될 여지가 있다. 

### 외부PG API를 이용한 실제 결제 기능

외부PG API를 이용한 결제기능은 두 가지로 필요하다.

1. 엔드유저가 원하는 액티비티에 대해 예약 및 결제하는 경우에, 외부PG를 이용하여 예약 및 결제 진행
    1. 카카오페이 등을 이용하여 엔드유저가 액티비티에 대한 결제를 할 수 있게 한다. → 유저가 기존에 사용하던 익숙한 결제방법을 제공하여, 결제 수단에 대한 심리적 거부감을 낮출 수 있다.
2. 엔드유저가 내부포인트를 충전하고자 할 때, 외부PG를 이용하여 포인트 충전
    1. 내부포인트 결제시스템을 실제 현금으로 이어주는 기능을 만든다. 내부포인트를 충전 할 때, 카카오페이와 같은 유저가 기존에 사용하던 익숙한 결제방법이 아닌 다른 방법을 이용하는 데에 있는 심리적 거부감을 극복하기 위해, 결제금액의 10%를 더 주는 프로모션을 적용할 수 도 있을 것 같다.

### 서비스 provider를 고려한 엔드뷰, 기능들

1. 하나의 store가 여러종류의 activity를 제공할 수 있다고 전제하였으나, 주로 구현된 기능들은 consumer사이드에서의 기능들이다. 
2. 엔드유저를 consumer user와 provider user로 나누어 접근한다면, 각기 다른 엔드뷰와 기능을 제공해야 한다.
    1. provider의 정보를 provider가 직접 수정하거나 관리할 수 있는 기능(예컨대, provider가 제공하는 activity를 인가된 provider가 직접 관리할 수 있게 한다든지)
    2. 중개플랫폼이므로, consumer가 결제한 금액을 provider와 정산하는 절차가 필요하다. 이와 관련되어 프로덕트에 어느 수준까지 반영할 수 있는지 리서치가 필요하다.
    3. provider 관련 기능들이 충분히 고도화 되고 consumer 유저수가 유의미하게 확보가 된다면, provider에게 입점비 등을 받는 식으로 사업의 다변화를 꾀할 수 있을 것이다.

---

# Reference

- 이 프로젝트는 [다이닝코드](https://www.diningcode.com/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트 이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제가 될 수 있습니다.

---
