// 오늘의 날씨
const getTodayJSON = function (url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    const status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

const nanmeSection = document.querySelector(".name");
const tempSection = document.querySelector(".temp");
const feelsTempSection = document.querySelector(".feelsTemp");
const humiSection = document.querySelector(".humi");
const windSpeedSection = document.querySelector(".windSpeed");
const iconSection = document.querySelector(".icon");
const descSection = document.querySelector(".desc");
const sunriseSection = document.querySelector(".sunrise");
const sunsetSection = document.querySelector(".sunset");

// openAPI https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=67a556deabde3f54d4c0f99b8e6a1625&units=metric&lang=kr
getTodayJSON(
  "https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=67a556deabde3f54d4c0f99b8e6a1625&units=metric&lang=kr",
  function (err, data) {
    if (err !== null) {
      alert("오류 발생", +err);
    } else {
      console.log(data);

      function calculateUtcOffset() {
        const now = new Date();
        return now.getTimezoneOffset() * 60;
      }

      nanmeSection.innerText = data.name;
      tempSection.innerText = data.main.temp.toFixed(1) + "°";
      feelsTempSection.innerText =
        "체감  " + data.main.feels_like.toFixed(1) + "°";
      descSection.innerText = data.weather[0].description;
      humiSection.innerText = data.main.humidity + "%";
      windSpeedSection.innerText = data.wind.speed + "m/s";
      const icon = data.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      iconSection.setAttribute("src", iconURL);

      // 일출, 일몰 시간
      const utcOffset = calculateUtcOffset();
      const sunriseTimestamp = data.sys.sunrise + utcOffset;
      const sunsetTimestamp = data.sys.sunset + utcOffset;

      const sunriseTime = new Date(sunriseTimestamp * 1000);
      const sunsetTime = new Date(sunsetTimestamp * 1000);
      console.log(sunriseTime.toLocaleTimeString());
      console.log(sunsetTime.toLocaleTimeString());

      sunriseSection.innerText = sunriseTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      sunsetSection.innerText = sunsetTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
    }
  }
);

// 일주일 날씨 데이터
// Service Key: 06f16CCTyk2CHkAfF%2BNJuX%2FYMOXYjCsvWPbqxX%2BD%2FF%2FDrORRpsPth2lG9VwTaf6DzsLZOCTn2uabQC8goBebLg%3D%3D

// 현재 날자 구하기
var today = new Date();
var year = today.getFullYear();
var month = ("0" + (today.getMonth() + 1)).slice(-2);
var day = ("0" + today.getDate()).slice(-2);
var todayString = year + month + day;

// 현재일 기준 3일 후부터 일주일간의 날짜 구하기
var date = new Date().toLocaleDateString();
var today2 = Date.parse(date);
var weekArr = []; // 일주일간의 날짜
// weekArr.push(date);
for (var i = 0; i < 9; i++) {
  today2 += 86400000;
  if (i > 1) {
    weekArr.push(new Date(today2).toLocaleDateString());
  }
}
console.log(weekArr);

const getWeekJSON = function (url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    const status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

getWeekJSON(
  "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=06f16CCTyk2CHkAfF%2BNJuX%2FYMOXYjCsvWPbqxX%2BD%2FF%2FDrORRpsPth2lG9VwTaf6DzsLZOCTn2uabQC8goBebLg%3D%3D&numOfRows=10&pageNo=1&dataType=JSON&regId=11D20501&tmFc=" +
    todayString +
    "0600",
  function (err, weekData) {
    if (err !== null) {
      alert("오류 발생", +err);
    } else {
      console.log(weekData);
      // console.log(weekData.response.body.items.item[0].taMax3);
      const res = weekData.response.body.items.item[0];
      console.log(res);

      var options = {
        series: [
          {
            name: "최고온도",
            data: [
              res.taMax3,
              res.taMax4,
              res.taMax5,
              res.taMax6,
              res.taMax7,
              res.taMax8,
              res.taMax9,
            ],
          },
          {
            name: "최저온도",
            data: [
              res.taMin3,
              res.taMin4,
              res.taMin5,
              res.taMin6,
              res.taMin7,
              res.taMin8,
              res.taMin9,
            ],
          },
        ],
        chart: {
          height: 330,
          width: "96%",
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          offsetX: 20,
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: weekArr,
          title: {
            text: "주간",
            style: {
              fontSize: "14px",
            },
          },
        },
        yaxis: {
          title: {
            text: "기온",
            rotate: 0,
            offsetX: -10,
            style: {
              fontSize: "14px",
            },
          },
          min: -10,
          max: 20,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -3,
        },
      };

      var chart = new ApexCharts(
        document.querySelector(".boardContent2"),
        options
      );
      chart.render();
    }
  }
);

// 월별 날씨 정보
// precipitation : 강수량
// humidity : 습도
// wind_speed : 풍속
// air_quality : 대기질 pm25/pm10
