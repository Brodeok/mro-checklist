const items = [
  "Intake / ID 확인",
  "운용 로그 확인",
  "기체 외관 점검",
  "프로펠러 상태",
  "커넥터/포트",
  "배터리 상태",
  "센서/통신",
  "기능 테스트"
];

const listEl = document.getElementById("list");
const doneEl = document.getElementById("doneCount");
const totalEl = document.getElementById("totalCount");
const resetBtn = document.getElementById("resetBtn");

let done = 0;

// 총 항목 수 표시
totalEl.textContent = items.length;

// 체크리스트 렌더
items.forEach((text) => {
  const li = document.createElement("li");
  li.className = "item";
  li.textContent = text;

  li.addEventListener("click", () => {
    if (li.classList.contains("checked")) {
      li.classList.remove("checked");
      done -= 1;
    } else {
      li.classList.add("checked");
      done += 1;
    }
    doneEl.textContent = done;
  });

  listEl.appendChild(li);
});

// Reset 버튼
resetBtn.addEventListener("click", () => {
  const items = document.querySelectorAll(".item");
  items.forEach((el) => el.classList.remove("checked"));
  done = 0;
  doneEl.textContent = done;
});
