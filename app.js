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

totalEl.textContent = items.length;
let done = 0;

items.forEach((t) => {
  const li = document.createElement("li");
  li.className = "item";
  li.textContent = t;

  li.addEventListener("click", () => {
    if (li.classList.contains("checked")) return;
    li.classList.add("checked");
    done += 1;
    doneEl.textContent = done;
  });

  listEl.appendChild(li);
});
