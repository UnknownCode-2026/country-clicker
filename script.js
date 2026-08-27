let myTeam = localStorage.getItem('selected_team') || null;
// เก็บคะแนนแยกส่วนระหว่าง "คะแนนที่เรากดเอง" กับ "คะแนนจากเซิร์ฟเวอร์"
let serverScores = { thailand: 0, cambodia: 0 };
let localBonus = { thailand: 0, cambodia: 0 };
let pendingClicks = 0; 
let syncTimeout = null;
let isSyncing = false;

window.onload = function() {
    // โหลดชื่อเว็บจาก Config
    document.title = CONFIG.APP_TITLE;
    const mainHeading = document.getElementById('main-heading');
    if(mainHeading) mainHeading.innerText = `🔥 ${CONFIG.APP_TITLE} 🔥`;

    if (myTeam) {
        document.getElementById('select-team-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        document.getElementById('my-team-name').innerText = myTeam === 'thailand' ? '🇹🇭 ทีมชาติไทย' : '🇰🇭 ทีมกัมพูชา';
    }
    
    fetchScores();
    setInterval(fetchScores, CONFIG.SYNC_INTERVAL);
}

function chooseTeam(team) {
    myTeam = team;
    localStorage.setItem('selected_team', team);
    document.getElementById('select-team-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('my-team-name').innerText = myTeam === 'thailand' ? '🇹🇭 ทีมชาติไทย' : '🇰🇭 ทีมกัมพูชา';
}

function changeTeam() {
    localStorage.removeItem('selected_team');
    myTeam = null;
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('select-team-screen').classList.remove('hidden');
}

function handleClick() {
    if (!myTeam) return;
    
    // บวกเข้าโบนัสฝั่งเราทันที เพื่อความลื่นไหลโดยไม่รอเซิร์ฟเวอร์
    localBonus[myTeam] += 1;
    pendingClicks += 1;
    
    updateUI();
    createFloatingText();
    syncToServer();
}

// ดึงคะแนนจาก JSONBin
async function fetchScores() {
    if (isSyncing) return; // ถ้าระหว่างส่งข้อมูล ห้ามดึงทับเดี๋ยวคะแนนดีดกลับ
    try {
        let response = await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.BIN_ID}/latest`, {
            headers: { 'X-Master-Key': CONFIG.API_KEY }
        });
        let data = await response.json();
        if (data && data.record) {
            serverScores.thailand = data.record.thailand || 0;
            serverScores.cambodia = data.record.cambodia || 0;
            
            // ถ้าเซิร์ฟเวอร์มีค่ามากกว่าหรือเท่ากับค่าที่เรากดค้างไว้ ให้เคลียร์โบนัสฝั่งเราออกได้
            if (serverScores.thailand >= (serverScores.thailand + localBonus.thailand)) {
                localBonus.thailand = 0;
            }
            if (serverScores.cambodia >= (serverScores.cambodia + localBonus.cambodia)) {
                localBonus.cambodia = 0;
            }
            
            updateUI();
        }
    } catch (err) {
        console.error("Error fetching scores:", err);
    }
}

// ส่งคะแนนขึ้น JSONBin แบบปลอดภัย
function syncToServer() {
    clearTimeout(syncTimeout);
    syncTimeout = setTimeout(async () => {
        if (pendingClicks === 0) return;
        
        isSyncing = true;
        let clicksToAdd = pendingClicks;
        let targetTeam = myTeam;
        pendingClicks = 0;

        try {
            // 1. ดึงค่าล่าสุดจากเซิร์ฟเวอร์มาก่อนกันชน
            let res = await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.BIN_ID}/latest`, {
                headers: { 'X-Master-Key': CONFIG.API_KEY }
            });
            let currentData = await res.json();
            let latestScores = currentData.record;

            // 2. บวกคะแนนเพิ่มเข้าไปจากยอดที่เรากดสะสมไว้
            latestScores[targetTeam] = (latestScores[targetTeam] || 0) + clicksToAdd;

            // 3. บันทึกกลับลง JSONBin
            await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': CONFIG.API_KEY
                },
                body: JSON.stringify(latestScores)
            });

            // อัปเดตค่าเซิร์ฟเวอร์ตามจริง แล้วล้างโบนัสส่วนที่ส่งสำเร็จแล้วออก
            serverScores.thailand = latestScores.thailand;
            serverScores.cambodia = latestScores.cambodia;
            localBonus[targetTeam] = Math.max(0, localBonus[targetTeam] - clicksToAdd);

            updateUI();
        } catch (err) {
            console.error("Error syncing scores:", err);
        } finally {
            isSyncing = false;
        }
    }, 600); // หน่วงเวลา 0.6 วินาที
}

function updateUI() {
    // คะแนนรวมจริง = คะแนนเซิร์ฟเวอร์ + คะแนนที่เรากำลังรัวกดค้างไว้รอส่ง
    let totalTh = serverScores.thailand + localBonus.thailand;
    let totalKh = serverScores.cambodia + localBonus.cambodia;

    document.getElementById('score-th').innerText = totalTh.toLocaleString();
    document.getElementById('score-kh').innerText = totalKh.toLocaleString();

    let total = totalTh + totalKh;
    let percentTh = total === 0 ? 50 : (totalTh / total) * 100;
    let percentKh = total === 0 ? 50 : (totalKh / total) * 100;

    document.getElementById('bar-th').style.width = percentTh + '%';
    document.getElementById('bar-th').innerText = `🇹🇭 ${percentTh.toFixed(1)}%`;
    document.getElementById('bar-kh').style.width = percentKh + '%';
    document.getElementById('bar-kh').innerText = `${percentKh.toFixed(1)}% 🇰🇭`;
}

function createFloatingText() {
    const btn = document.getElementById('click-btn');
    const flyer = document.createElement('div');
    flyer.innerText = "+1";
    flyer.className = "absolute text-yellow-300 font-bold text-2xl pointer-events-none animate-fade-up";
    
    const rect = btn.getBoundingClientRect();
    flyer.style.left = (rect.width / 2 + (Math.random() * 60 - 30)) + 'px';
    flyer.style.top = '50px';
    
    btn.appendChild(flyer);
    setTimeout(() => flyer.remove(), 500);
                                     }
                                         
