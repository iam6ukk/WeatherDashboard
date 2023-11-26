function toggleDropdown() {
  var dropdown = document.getElementById("container");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// 클릭 이외의 영역을 클릭하면 드롭다운이 닫히도록 설정
window.onclick = function (event) {
  if (!event.target.matches(".listBtn")) {
    var dropdowns = document.getElementsByClassName("navList");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
};
