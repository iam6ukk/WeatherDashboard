import data from "../json/month.json" assert { type: "json" };
console.log(data);

// 필요한 페이지 번호 수 구함
const COUNT_PER_PAGE = 5; // 한 페이지 당 최대 5개 요소
const getTotalPageCount = () => {
  return Math.ceil(data[0].weather_data.length / COUNT_PER_PAGE);
};

// 페이지네이션 버튼 동적 생성
const numberButtonWrapper = document.querySelector(".number-button-wrapper");
const setPageButtons = () => {
  numberButtonWrapper.innerHTML = ""; // 페이지 번호 wrapper 내부를 비워줌

  for (let i = 1; i <= getTotalPageCount(); i++) {
    numberButtonWrapper.innerHTML += `<span class="number-button"> ${i} </span`;
  }
};

setPageButtons();

// 페이지별 목록 랜더링
const tbody = document.querySelector("tbody");
let currentPage = 1;

const setPageOf = (pageNumber) => {
  tbody.innerHTML = "";

  for (
    let i = COUNT_PER_PAGE * (pageNumber - 1) + 1;
    i <= COUNT_PER_PAGE * (pageNumber - 1) + 5 &&
    i <= data[0].weather_data.length;
    i++
  ) {
    const postContainer = document.createElement("tr");
    postContainer.className = "post-container";

    const postDate = document.createElement("td");
    postDate.classList = "post-date";

    const postMin = document.createElement("td");
    postMin.className = "post-min";

    const postMax = document.createElement("td");
    postMax.className = "post-max";

    const postCondi = document.createElement("td");
    postCondi.className = "post-condi";

    const postHumi = document.createElement("td");
    postHumi.className = "post-humi";

    const postPrecip = document.createElement("td");
    postPrecip.className = "post-precip";

    const postWind = document.createElement("td");
    postWind.className = "post-wind";

    const postAir = document.createElement("td");
    postAir.className = "post-air";

    postDate.textContent = data[0].weather_data[i - 1].date;
    postMin.textContent = data[0].weather_data[i - 1].temperature.min + "°";
    postMax.textContent = data[0].weather_data[i - 1].temperature.max + "°";
    postCondi.textContent = data[0].weather_data[i - 1].conditions;
    postHumi.textContent = data[0].weather_data[i - 1].humidity;
    postPrecip.textContent = data[0].weather_data[i - 1].precipitation;
    postWind.textContent = data[0].weather_data[i - 1].wind_speed;
    postAir.textContent = data[0].weather_data[i - 1].air_quality.pm10;

    postContainer.append(
      postDate,
      postMin,
      postMax,
      postCondi,
      postHumi,
      postPrecip,
      postWind,
      postAir
    );
    tbody.append(postContainer);
  }
};
setPageOf(currentPage);

// 페이지네이션 클릭 이벤트
const pageNumberButtons = document.querySelectorAll(".number-button");

pageNumberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (e) => {
    currentPage = +e.target.innerHTML;
    console.log(currentPage);
    setPageOf(currentPage);
    moveSelectedPageHighlight();
  });
});

// 이전, 이후 클릭 이벤트
const preButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

preButton.addEventListener("click", () => {
  if (currentPage > 1) {
    // 현재 페이지가 1보다 크면
    currentPage -= 1; // 현재 페이지에서 -1
    setPageOf(currentPage);
    moveSelectedPageHighlight();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < getTotalPageCount()) {
    // 현재 페이지가 전체 페이지수 보다 작으면
    currentPage += 1; // 현재 페이지에서 +1
    setPageOf(currentPage);
    moveSelectedPageHighlight();
  }
});

const moveSelectedPageHighlight = () => {
  pageNumberButtons.forEach((numberButton) => {
    if (numberButton.classList.contains("selected")) {
      numberButton.classList.remove("selected");
    }
  });

  pageNumberButtons[currentPage - 1].classList.add("selected");
};
