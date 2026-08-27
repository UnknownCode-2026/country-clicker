<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Country Clicker 🎮</title>
  <style>
    * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; }
    body { background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; min-height: 100vh; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; text-align: center; }
    h1 { font-size: 2.2rem; margin-bottom: 30px; }
    .screen { display: none; }
    .screen.active { display: block; }

    /* เลือกประเทศ */
    .country-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
    .country-btn { padding: 18px; font-size: 1.1rem; border-radius: 12px; border: none; background: #0f3460; color: white; cursor: pointer; transition: transform 0.2s; }
    .country-btn:hover { transform: scale(1.05); background: #1a5276; }
    .flag { font-size: 2rem; display: block; margin-bottom: 6px; }

    /* หน้าเล่นเกม */
    .game-container h2 { font-size: 1.8rem; margin-bottom: 10px; }
    .my-score { font-size: 1.4rem; margin: 15px 0; }
    .click-btn { width: 200px; height: 200px; border-radius: 50%; font-size: 2.5rem; border: none; background: linear-gradient(145deg, #e94560, #c73e54); color: white; cursor: pointer; box-shadow: 0 10px 30px rgba(233,69,96,0.4); transition: all 0.1s; margin: 20px 0; }
    .click-btn:active { transform: scale(0.95); }

    /* กระดานคะแนน */
    .leaderboard { background: rgba(255,255,255,0.05); border-radius: 16px; padding: 20px; margin-top: 30px; text-align: left; }
    .leaderboard h3 { text-align: center; margin-bottom: 15px; }
    .leader-item { display: flex; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .leader-item.me { background: rgba(233,69,96,0.2); border-radius: 8px; }
    .rank { width: 30px; font-weight: bold; color: #e94560; }
    .score { font-weight: bold; }
    .back-btn { margin-top: 20px; padding: 10px 20px; background: #555; color: white; border: none; border-radius: 8px; cursor: pointer; }
    .loading { opacity: 0.5; pointer-events: none; }
  </style>
</head>
<body>
  <div class="container">
    <!-- หน้าเลือกประเทศ -->
    <div id="select-screen" class="screen active">
      <h1>🌍 เลือกประเทศของคุณ</h1>
      <div id="country-grid" class="country-grid"></div>
    </div>

    <!-- หน้าเล่นเกม -->
    <div id="game-screen" class="screen">
      <h2 id="my-country">🇹🇭 ไทย</h2>
      <div class="my-score">คะแนนของฉัน: <strong id="my-score">0</strong></div>
      <button id="click-btn" class="click-btn">👆</button>
      
      <div class="leaderboard">
        <h3>🏆 กระดานคะแนน</h3>
        <div id="leaderboard-list"></div>
      </div>
      <button class="back-btn" onclick="goBack()">⬅️ เปลี่ยนประเทศ</button>
    </div>
  </div>

  <script type="module">
    // 📥 นำเข้าค่าการตั้งค่าจาก config.js
    import { JSONBIN, COUNTRIES, SETTINGS } from './config.js';

    let selectedCountry = localStorage.getItem('selectedCountry') || null;
    let countriesData = [];

    // เริ่มต้น
    window.onload = async () => {
      await loadScores();
      renderCountryList();
      if (selectedCountry) showGameScreen();
    };

    // โหลดคะแนนจาก JSONBin
    async function loadScores() {
      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN.BIN_ID}/latest`, {
          headers: { 'X-Access-Key': JSONBIN.API_KEY }
        });
        const data = await res.json();
        countriesData = data.record || COUNTRIES.map(c => ({ ...c, score: SETTINGS.STARTING_SCORE }));
        updateLeaderboardUI();
      } catch (e) {
        console.error('โหลดข้อมูลล้มเหลว:', e);
        countriesData = COUNTRIES.map(c => ({ ...c, score: SETTINGS.STARTING_SCORE }));
      }
    }

    // บันทึกคะแนนกลับไปยัง JSONBin
    async function saveScores() {
      document.body.classList.add('loading');
      await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN.BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': JSONBIN.API_KEY
        },
        body: JSON.stringify(countriesData)
      });
      document.body.classList.remove('loading');
    }

    // แสดงรายการประเทศ
    function renderCountryList() {
      const grid = document.getElementById('country-grid');
      grid.innerHTML = '';
      COUNTRIES.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'country-btn';
        btn.innerHTML = `<span class="flag">${c.flag}</span>${c.name}`;
        btn.onclick = () => selectCountry(c.name);
        grid.appendChild(btn);
      });
    }

    // เลือกประเทศ
    function selectCountry(name) {
      selectedCountry = name;
      localStorage.setItem('selectedCountry', name);
      showGameScreen();
    }

    // เปลี่ยนหน้าเล่นเกม
    function showGameScreen() {
      document.getElementById('select-screen').classList.remove('active');
      document.getElementById('game-screen').classList.add('active');
      
      const myData = countriesData.find(c => c.name === selectedCountry);
      document.getElementById('my-country').innerHTML = `${myData?.flag} ${selectedCountry}`;
      updateLeaderboardUI();
      
      // รีเฟรชคะแนนอัตโนมัติ
      setInterval(loadScores, SETTINGS.REFRESH_INTERVAL);
    }

    // กลับไปเลือกประเทศ
    window.goBack = function () {
      selectedCountry = null;
      localStorage.removeItem('selectedCountry');
      document.getElementById('game-screen').classList.remove('active');
      document.getElementById('select-screen').classList.add('active');
    };

    // อัปเดต UI กระดานคะแนน
    function updateLeaderboardUI() {
      const sorted = [...countriesData].sort((a, b) => b.score - a.score);
      const list = document.getElementById('leaderboard-list');
      list.innerHTML = sorted.map((c, i) => `
        <div class="leader-item ${c.name === selectedCountry ? 'me' : ''}">
          <span class="rank">${i + 1}.</span>
          <span class="flag">${c.flag}</span>
          <span>${c.name}</span>
          <span class="score">${c.score.toLocaleString()}</span>
        </div>
      `).join('');

      const myData = countriesData.find(c => c.name === selectedCountry);
      if (myData) {
        document.getElementById('my-score').textContent = myData.score.toLocaleString();
      }
    }

    // เมื่อกดปุ่มคลิก
    document.getElementById('click-btn').addEventListener('click', async () => {
      if (!selectedCountry) return;
      const country = countriesData.find(c => c.name === selectedCountry);
      if (country) {
        country.score += 1;
        updateLeaderboardUI();
        await saveScores();
      }
    });
  </script>
</body>
</html>
                
