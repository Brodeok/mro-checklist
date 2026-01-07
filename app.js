{\rtf1\ansi\ansicpg949\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const STORAGE_KEY = "mro_demo_checked_v1";\
\
const items = [\
  \{ name: "Intake / ID \uc0\u54869 \u51064 ", desc: "Serial/Fleet ID, \u51217 \u49688  \u51221 \u48372 , \u45812 \u45817 \u51088  \u54869 \u51064 " \},\
  \{ name: "\uc0\u50868 \u50857  \u47196 \u44536  \u54869 \u51064 ", desc: "\u52572 \u44540  \u48708 \u54665  \u47196 \u44536 /\u44221 \u44256  \u53076 \u46300 /\u51060 \u49345  \u51060 \u48292 \u53944  \u54869 \u51064 " \},\
  \{ name: "\uc0\u44592 \u52404  \u50808 \u44288  \u51216 \u44160 ", desc: "Frame/Arm \u44512 \u50676 , \u48320 \u54805 , \u51060 \u47932  \u48512 \u52265  \u50668 \u48512 " \},\
  \{ name: "\uc0\u54532 \u47196 \u54176 \u47084  \u49345 \u53468 ", desc: "\u52841 /\u53356 \u47001 /\u48320 \u54805 , \u52404 \u44208  \u49345 \u53468  \u54869 \u51064 " \},\
  \{ name: "\uc0\u52964 \u45349 \u53552 /\u54252 \u53944 ", desc: "\u51216 \u44160  \u54252 \u53944 /\u51204 \u50896  \u52964 \u45349 \u53552  \u51217 \u52489  \u48143  \u49552 \u49345  \u54869 \u51064 " \},\
  \{ name: "\uc0\u48176 \u53552 \u47532  \u49345 \u53468 ", desc: "\u54077 \u52285 /\u50676 \u54868  \u51669 \u54980 , \u45800 \u51088 /\u46973 \u53433  \u49345 \u53468  \u54869 \u51064 " \},\
  \{ name: "\uc0\u49468 \u49436 /\u53685 \u49888 ", desc: "GPS/IMU/\u52852 \u47700 \u46972 , \u50504 \u53580 \u45208  \u52404 \u44208  \u48143  \u52888 \u47532 \u48652 \u47112 \u51060 \u49496 " \},\
  \{ name: "\uc0\u44592 \u45733  \u53580 \u49828 \u53944 ", desc: "\u47784 \u53552  \u44396 \u46041 /\u51652 \u46041 /\u49548 \u51020 , \u44036 \u45800  \u51216 \u44160  \u49884 \u45208 \u47532 \u50724  \u49892 \u54665 " \},\
];\
\
let checked = new Set(loadChecked());\
\
const listEl = document.getElementById("list");\
const doneEl = document.getElementById("doneCount");\
const totalEl = document.getElementById("totalCount");\
const fillEl = document.getElementById("progressFill");\
\
document.getElementById("resetBtn").addEventListener("click", () => \{\
  checked = new Set();\
  saveChecked();\
  render();\
\});\
\
document.getElementById("completeBtn").addEventListener("click", () => \{\
  // \uc0\u45936 \u47784 \u50857 : \u50756 \u47308  \u50672 \u52636 \u47564 \
  alert("Inspection Completed (Demo)");\
\});\
\
function loadChecked()\{\
  try\{\
    const raw = localStorage.getItem(STORAGE_KEY);\
    if(!raw) return [];\
    const arr = JSON.parse(raw);\
    if(Array.isArray(arr)) return arr;\
    return [];\
  \}catch(e)\{\
    return [];\
  \}\
\}\
\
function saveChecked()\{\
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)));\
\}\
\
function toggle(idx)\{\
  if(checked.has(idx)) checked.delete(idx);\
  else checked.add(idx);\
  saveChecked();\
  updateProgress();\
  // \uc0\u54644 \u45817  \u54637 \u47785 \u47564  \u53364 \u47000 \u49828  \u53664 \u44544 \
  const row = document.querySelector(`[data-idx="$\{idx\}"]`);\
  if(row) row.classList.toggle("checked", checked.has(idx));\
\}\
\
function render()\{\
  listEl.innerHTML = "";\
  items.forEach((it, idx) => \{\
    const li = document.createElement("li");\
    li.className = "item";\
    li.dataset.idx = String(idx);\
    li.classList.toggle("checked", checked.has(idx));\
\
    li.innerHTML = `\
      <div class="check" aria-hidden="true">$\{checked.has(idx) ? "\uc0\u10003 " : ""\}</div>\
      <div class="label">\
        <div class="name">$\{it.name\}</div>\
        <div class="desc">$\{it.desc\}</div>\
      </div>\
    `;\
\
    li.addEventListener("click", () => toggle(idx));\
    listEl.appendChild(li);\
  \});\
\
  totalEl.textContent = String(items.length);\
  updateProgress();\
\}\
\
function updateProgress()\{\
  const done = checked.size;\
  const total = items.length;\
  doneEl.textContent = String(done);\
  const pct = total === 0 ? 0 : Math.round((done/total)*100);\
  fillEl.style.width = `$\{pct\}%`;\
\}\
\
render();}