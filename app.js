const STORAGE_KEY = "mro_demo_checked_v1";

const items = [
  { name: "Intake / ID 확인", desc: "Serial/Fleet ID, 접수 정보, 담당자 확인" },
  { name: "운용 로그 확인", desc: "최근 비행 로그/경고 코드/이상 이벤트 확인" },
  { name: "기체 외관 점검", desc: "Frame/Arm 균열, 변형, 이물 부착 여부" },
  { name: "프로펠러 상태", desc: "칩/크랙/변형, 체결 상태 확인" },
  { name: "커넥터/포트", desc: "점검 포트/전원 커넥터 접촉 및 손상 확인" },
  { name: "배터리 상태", desc: "팽창/열화 징후, 단자/락킹 상태 확인" },
  { name: "센서/통신", desc: "GPS/IMU/카메라, 안테나 체결 및 캘리브레이션" },
  { name: "기능 테스트", desc: "모터 구동/진동/소음, 간단 점검 시나리오 실행" },
];

let checked = new Set(loadChecked());

const listEl = document.getElementById("list");
const doneEl = document.getElementById("doneCount");
const totalEl = document.getElementById("totalCount");
const fillEl = document.getElementById("progressFill");
const resetBtn = document.getElementById("resetBtn");

resetBtn?.addEventListener("click", () => {
  checked = new Set();
  saveChecked();
  render();
});

function loadChecked(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  }catch(e){
    return [];
  }
}

function saveChecked(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)));
}

function toggle(idx){
  if(checked.has(idx)) checked.delete(idx);
  else checked.add(idx);
  saveChecked();
  updateProgress();
  const row = document.querySelector(`[data-idx="${idx}"]`);
  if(row) row.classList.toggle("checked", checked.has(idx));
  const chk = row?.querySelector(".check");
  if(chk) chk.textContent = checked.has(idx) ? "✓" : "";
}

function render(){
  if(!listEl) return;

  listEl.innerHTML = "";
  items.forEach((it, idx) => {
    const li = document.createElement("li");
    li.className = "item";
    li.dataset.idx = String(idx);
    li.classList.toggle("checked", checked.has(idx));

    li.innerHTML = `
      <div class="check" aria-hidden="true">${checked.has(idx) ? "✓" : ""}</div>
      <div class="label">
        <div class="name">${it.name}</div>
        <div class="desc">${it.desc}</div>
      </div>
    `;

    li.addEventListener("click", () => toggle(idx));
    listEl.appendChild(li);
  });

  if(totalEl) totalEl.textContent = String(items.length);
  updateProgress();
}

function updateProgress(){
  const done = checked.size;
  const total = items.length;
  if(doneEl) doneEl.textContent = String(done);
  const pct = total === 0 ? 0 : Math.round((done/total)*100);
  if(fillEl) fillEl.style.width = `${pct}%`;
}

render();
