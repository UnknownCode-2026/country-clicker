<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="page-title">ศึกคลิกสนั่น! ไทย vs กัมพูชา</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-slate-900 text-white min-h-screen flex flex-col justify-between select-none">

    <!-- Header -->
    <header class="text-center py-6 bg-slate-800 shadow-lg">
        <h1 id="main-heading" class="text-3xl md:text-5xl font-extrabold tracking-wider text-yellow-400">🔥 ศึกคลิกสนั่น! ไทย vs กัมพูชา 🔥</h1>
        <p class="text-slate-400 text-sm md:text-base mt-2">เลือกฝั่งแล้วรัวนิ้วคลิกเพื่อพาชาติของคุณคว้าชัยชนะระดับโลก!</p>
    </header>

    <!-- Main Game Area -->
    <main class="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">

        <!-- เลือกฝั่ง -->
        <div id="select-team-screen" class="text-center">
            <h2 class="text-2xl font-bold mb-6">คุณอยู่ทีมไหน? เลือกเลย!</h2>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <button onclick="chooseTeam('thailand')" class="bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-8 py-6 rounded-2xl shadow-xl transition transform hover:-translate-y-1">
                    🇹🇭 ทีมชาติไทย
                </button>
                <button onclick="chooseTeam('cambodia')" class="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold px-8 py-6 rounded-2xl shadow-xl transition transform hover:-translate-y-1">
                    🇰🇭 ทีมกัมพูชา
                </button>
            </div>
        </div>

        <!-- หน้าต่างเล่นเกม -->
        <div id="game-screen" class="hidden w-full max-w-2xl text-center">
            <div class="mb-4 bg-slate-800 p-3 rounded-xl inline-block">
                <span>คุณเลือกอยู่ทีม: </span>
                <span id="my-team-name" class="font-bold text-yellow-400 text-lg"></span>
                <button onclick="changeTeam()" class="ml-4 text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-300">เปลี่ยนทีม</button>
            </div>

            <!-- แถบสัดส่วนคะแนน -->
            <div class="w-full bg-slate-700 h-8 rounded-full overflow-hidden flex shadow-inner mb-6 relative">
                <div id="bar-th" class="bg-red-500 h-full transition-all duration-300 flex items-center justify-start pl-4 font-bold text-sm" style="width: 50%;">🇹🇭 50%</div>
                <div id="bar-kh" class="bg-blue-500 h-full transition-all duration-300 flex items-center justify-end pr-4 font-bold text-sm" style="width: 50%;">50% 🇰🇭</div>
            </div>

            <!-- คะแนนรวม -->
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="bg-slate-800 p-4 rounded-xl border border-red-500/30">
                    <h3 class="text-red-400 font-semibold">คะแนนรวมไทย</h3>
                    <p id="score-th" class="text-3xl font-bold mt-2">0</p>
                </div>
                <div class="bg-slate-800 p-4 rounded-xl border border-blue-500/30">
                    <h3 class="text-blue-400 font-semibold">คะแนนรวมกัมพูชา</h3>
                    <p id="score-kh" class="text-3xl font-bold mt-2">0</p>
                </div>
            </div>

            <!-- ปุ่มคลิกยักษ์ -->
            <button id="click-btn" onclick="handleClick()" class="pulse-click relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-900 font-extrabold text-3xl md:text-4xl shadow-2xl flex items-center justify-center border-8 border-yellow-200 transition transform active:scale-95">
                CLICK! 🔥
            </button>
            <p id="status-text" class="text-slate-400 mt-4 text-sm">รัวนิ้วคลิกเพื่อเพิ่มคะแนน! (ซิงค์ข้อมูลกับเซิร์ฟเวอร์)</p>
        </div>

    </main>

    <!-- Footer -->
    <footer class="text-center py-4 bg-slate-800 text-slate-500 text-xs">
        Realtime Clicker Game • Powered by JSONBin.io & Vercel
    </footer>

    <!-- Config File -->
    <script src="config.js"></script>

    <!-- Game Logic -->
    <script>
        let myTeam = localStorage.getItem('selected_team') || null;
        let scores = { thailand: 0, cambodia: 0 };
        let pendingClicks = 0; 
        let syncTimeout = null;

        window.onload = function() {
            // โหลดชื่อเว็บจาก Config
            document.title = CONFIG.APP_TITLE;
            document.getElementById('main-heading').innerText = `🔥 ${CONFIG.APP_TITLE} 🔥`;

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
            
            scores[myTeam] += 1;
            pendingClicks += 1;
            updateUI();
            createFloatingText();
            syncToServer();
        }

        async function fetchScores() {
            try {
                let response = await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.BIN_ID}/latest`, {
                    headers: { 'X-Master-Key': CONFIG.API_KEY }
                });
                let data = await response.json();
                if (data && data.record) {
                    scores.thailand = data.record.thailand;
                    scores.cambodia = data.record.cambodia;
                    updateUI();
                }
            } catch (err) {
                console.error("Error fetching scores:", err);
            }
        }

        function syncToServer() {
            clearTimeout(syncTimeout);
            syncTimeout = setTimeout(async () => {
                if (pendingClicks === 0) return;
                
                let clicksToAdd = pendingClicks;
                pendingClicks = 0;

                try {
                    let res = await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.BIN_ID}/latest`, {
                        headers: { 'X-Master-Key': CONFIG.API_KEY }
                    });
                    let currentData = await res.json();
                    let latestScores = currentData.record;

                    latestScores[myTeam] += clicksToAdd;

                    await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.BIN_ID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Master-Key': CONFIG.API_KEY
                        },
                        body: JSON.stringify(latestScores)
                    });
                } catch (err) {
                    console.error("Error syncing scores:", err);
                }
            }, 800);
        }

        function updateUI() {
            document.getElementById('score-th').innerText = scores.thailand.toLocaleString();
            document.getElementById('score-kh').innerText = scores.cambodia.toLocaleString();

            let total = scores.thailand + scores.cambodia;
            let percentTh = total === 0 ? 50 : (scores.thailand / total) * 100;
            let percentKh = total === 0 ? 50 : (scores.cambodia / total) * 100;

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
    </script>
</body>
</html>
