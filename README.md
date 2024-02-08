## Weather Dashboard (날씨 대시보드)

#### 📌 프로젝트 소개
openAPI 사용과 데이터 파싱을 공부하기 위해 제작한 대시보드입니다.   
파싱한 데이터로 ```오늘의 날씨```, ```일주일간 기온 차```, ```계절별 미세먼지```, ```월별 날씨 정보``` 를 제공합니다.   

데모 사이트: https://tiny-dodol-ea15f6.netlify.app

<br/>

#### 📅 개발 기간
- 2023년 11월 26일 ~ 2024년 2월 1일
<br/>

#### ⚙️ 사용 기술
- HTML
-  CSS
-  JavaScript
<br/>

#### 📑 프로젝트 상세
![날씨 대시보드 이미지](https://github.com/iam6ukk/WeatherDashboard/assets/84495331/a7cd63bc-23d2-4d69-b287-83bf360734f5)

1. 오늘의 날씨
   - openAPI를 통해 json 데이터를 받아와 서울의 현재 날씨 정보를 나타냄
   - 아이콘, 현재 온도, 체감 온도, 날씨, 습도, 풍속, 일출, 일몰 시각을 출력함
     
2. 일주일간 기온 차
   - 최저, 최고 기온 차를 나타내기 위해 ApexChart 데이터 레이블 차트를 사용함
   - openAPI가 제공하는 일주일 날씨가 현재일 기준 3일 후부터 일주일간의 날씨 정보를 제공함
   - 이에 그래프에 출력되는 주간 일자도 3일후 부터 일주일간의 날짜를 구해 categories 옵션에 전달함

3. 계절별 미세먼지
   - 서울특별시 대기환경정보의 계절별 서울시 미세먼지 평균값을을 토대로 dust 데이터를 생성함
   - ApexChart 원형 그래프를 사용했으며, series와 labels 데이터 레이블에 각각 평균값과 계절 데이터를 전달함
    
4. 월별 날씨 정보
   - 30일 간의 더미 데이터를 생성 후 파싱하여 테이블에 출력함
   - 30일의 데이터를 출력해야하므로 5개씩 6페이지로 페이지네이션을 구현함
<br/>


#### 🧑‍💻 회고 
```월별 날씨 정보```에서 데이터 파싱을 위해 month.json 파일을 page.js 파일에 import한 후 module 타입으로 js import를 했었습니다.   
이 과정에서 cors 오류가 발생하였고 원인을 찾던 중 관련 정보를 얻을 수 있었습니다.
> type을 module로 설정한<script> 태그가 포함된 HTML 파일을 로컬에서 로드할 경우 자바스크립트 모듈 보안 요구사항으로 인해 CORS 오류가 발생한다고 한다. 이 때문에 ajax로 요청한 것임 아님에도 불구하고 CORS 오류가 발생한다.

file:///c: ~  url에 의해 cors block이 되었고 http-server 를 사용해 해결할 수 있었습니다.   
package.json 파일에 포트번호를 설정해주었습니다.
```
"scripts": {
    "start": "npx http-server -p 5500"
  }
```
<br/>

#### 🧩 참조
[OpenWeatherMap](https://openweathermap.org/api)    
[서울특별시 대기환경정보](https://cleanair.seoul.go.kr/statistics/seasonAverage)   
[Javascript module 타입의 cors 문제](https://steadev.tistory.com/72)   
[바닐라 JS, 모듈화 진행 시 CORS 에러 해결 방안](https://klmhyeonwooo.tistory.com/23)

