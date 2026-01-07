const items = [
  "Intake / ID 확인",
  "운용 로그 확인",
  "기체 외관 점검",
  "프로펠러 상태",
  "배터리 상태",
  "커넥터 / 포트",
  "센서 / 통신",
  "기능 테스트"
];

const list = document.getElementById("list");
const doneCount = document.getElementById("doneCount");
const totalCount = document.getElementById("totalCount");

totalCount.textContent = items.length;

let checked = 0;

items.forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", () => {
    if (!li.classList.contains("checked")) {
      li.classList.add("checked");
      checked++;
      doneCount.textContent = checked;
    }
  });
  list.appendChild(li);
});
