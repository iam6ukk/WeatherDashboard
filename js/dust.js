// 서울특별시 대기환경정보
// https://cleanair.seoul.go.kr/statistics/seasonAverage

const dust = [
  {
    season: "spring",
    value: 56,
  },
  {
    season: "summer",
    value: 25,
  },
  {
    season: "autumn",
    value: 26,
  },
  {
    season: "winter",
    value: 48,
  },
];

var seasonData = [];
for (i = 0; i < dust.length; i++) {
  seasonData[i] = dust[i].season;
}
console.log(seasonData);

var valueData = [];
for (i = 0; i < dust.length; i++) {
  valueData[i] = dust[i].value;
}
console.log(valueData);

var options = {
  series: valueData,
  chart: {
    width: "100%",
    height: 300,
    type: "pie",
  },
  labels: seasonData,
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
