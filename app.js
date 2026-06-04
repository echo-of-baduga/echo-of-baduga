// ════════════════════════════════════════════════════════════════
// Echo of Baduga — Complete Application Engine
// ════════════════════════════════════════════════════════════════

// ── CONFIG ──
// ── CONFIG ──
const PRODUCTION_URL = 'https://navaneethm719-ux.github.io/echo-of-baduga'; // Your live custom domain hosting
const API = (window.Capacitor || window.location.origin.startsWith('file://')) ? `${PRODUCTION_URL}/api/api.php` : 'api/api.php';

function getAudioUrl(fileUrl) {
    if (!fileUrl) return '';
    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
        return fileUrl;
    }
    let path = fileUrl;
    if (path.startsWith('/')) {
        path = path.substring(1);
    }
    let encodedPath = path.split('/').map(p => encodeURIComponent(decodeURIComponent(p))).join('/');
    if (window.Capacitor || window.location.origin.startsWith('file://')) {
        return `${PRODUCTION_URL}/${encodedPath}`;
    }
    return encodedPath;
}

let currentUser = null;
let localUsers = JSON.parse(localStorage.getItem('eo_users') || '[]');
let likedIds = JSON.parse(localStorage.getItem('eo_likes') || '[]');
let recentIds = JSON.parse(localStorage.getItem('eo_recent') || '[]');

// ── WEB AUDIO API EQUALIZER GLOBALS ──
let audioCtx = null;
let audioSource = null;
let eqFilters = [];
const EQ_FREQS = [60, 230, 910, 3600, 14000, 16000];
let analyser = null;
let analyserData = null;
let isVisualizerRunning = false;

// ── AUDIO ENGINE ──
const audio = new Audio();
audio.crossOrigin = 'anonymous';
const PLAY_ICON = `<svg viewBox="0 0 24 24" class="svg-play"><path d="M8 5v14l11-7z"/></svg>`;
const PAUSE_ICON = `<svg viewBox="0 0 24 24" class="svg-pause"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
const HEART_SVG = `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
audio.preload = 'auto';
audio.volume = 0.7;
let songs = [];
let queue = [];
let qIdx = 0;
let isPlaying = false;
let shuffleOn = true;
let repeatOn = false;

// ── SLEEP TIMER ──
let sleepTimer = null;
let sleepEnd = 0;
let sleepTickId = null;

// ── GENRE IMAGES ──
const GENRE_COLORS = {
    'Devotional': 'url(assets/devotional.jpg) center 85% / cover no-repeat',
    'Evergreen': 'url(assets/evergreen.jpg) center 70% / cover no-repeat',
    'Love': 'url(assets/love.jpg) center 40% / cover no-repeat',
    'Melody': 'url(assets/melody.jpg) center center / cover no-repeat',
    'Sad': 'url(assets/sad.png) center 50% / cover no-repeat',
    'Happy': 'linear-gradient(135deg, #f97316, #ea580c)',
};

// ════════════════════════════════════
// SPLASH → AUTH FLOW
// ════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    const savedUser = localStorage.getItem('eo_currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch (e) { }
    }

    // Hide download app button/banner in native app mode
    if (window.Capacitor) {
        const btn = document.getElementById('webDownloadBtn');
        if (btn) btn.style.display = 'none';
        const banner = document.getElementById('authDownloadBanner');
        if (banner) banner.style.display = 'none';
    }

    // Parse URL query parameters to check if they came from a password reset link
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    const email = urlParams.get('email');
    const token = urlParams.get('token');

    setTimeout(() => {
        document.getElementById('splash').classList.remove('active');
        if (currentUser && action !== 'reset_password') {
            enterApp();
            showToast('Welcome back, ' + currentUser.name + '! ✦');
        } else {
            document.getElementById('auth').classList.add('active');
            
            // If action is reset_password, open the Forgot Password modal directly to Step 3
            if (action === 'reset_password' && email && token) {
                resetIdentity = email;
                verifiedResetOtp = token;
                
                openForgotModal();
                document.getElementById('forgotStep1').style.display = 'none';
                document.getElementById('forgotStep2').style.display = 'none';
                document.getElementById('forgotStep3').style.display = 'flex';
                document.getElementById('forgotStepSub').textContent = 'Create a secure new password for your account.';
            }
        }
    }, 2800);
});


// ════════════════════════════════════
// AUTH — Local-only (no PHP backend needed)
// ════════════════════════════════════
function swAuth(mode) {
    const tabL = document.getElementById('tabL');
    const tabR = document.getElementById('tabR');
    const loginF = document.getElementById('loginF');
    const signupF = document.getElementById('signupF');
    const authH = document.getElementById('authH');
    const authS = document.getElementById('authS');

    if (mode === 'login') {
        tabL.classList.add('on'); tabR.classList.remove('on');
        loginF.style.display = 'flex'; signupF.style.display = 'none';
        authH.textContent = 'Welcome back';
        authS.textContent = 'Sign in to continue your journey';
    } else {
        tabR.classList.add('on'); tabL.classList.remove('on');
        signupF.style.display = 'flex'; loginF.style.display = 'none';
        authH.textContent = 'Create Account';
        authS.textContent = 'Join the Baduga music community';
    }
}

function doLogin() {
    const em = document.getElementById('li-em').value.trim();
    const pw = document.getElementById('li-pw').value;
    const errEl = document.getElementById('loginErr');

    if (!em || !pw) {
        errEl.textContent = 'Please fill in all fields';
        errEl.style.display = 'block';
        return;
    }

    // Strict validation: Must be a valid email address or valid mobile number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    
    if (!emailRegex.test(em) && !phoneRegex.test(em)) {
        errEl.textContent = 'Please enter a valid Email address or Mobile number';
        errEl.style.display = 'block';
        return;
    }

    // Call real PHP Backend API for authentication
    setButtonLoading('btn-do-login', true, 'Sign In &#8594;');
    fetch(API + '?action=login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: em, password: pw })
    })
    .then(res => res.json())
    .then(data => {
        setButtonLoading('btn-do-login', false);
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('eo_currentUser', JSON.stringify(data.user));
            
            // Cache user locally for robust offline login fallback
            const users = JSON.parse(localStorage.getItem('eo_users') || '[]');
            const idx = users.findIndex(u => u.email.toLowerCase() === data.user.email.toLowerCase());
            const localUserData = {
                id: data.user.id || Date.now(),
                name: data.user.name,
                email: data.user.email,
                mobile: data.user.mobile || '',
                password: pw,
                initial: (data.user.name || 'U').charAt(0).toUpperCase()
            };
            if (idx >= 0) {
                users[idx] = localUserData;
            } else {
                users.push(localUserData);
            }
            localStorage.setItem('eo_users', JSON.stringify(users));
            localUsers = users;
            
            errEl.style.display = 'none';
            document.getElementById('auth').classList.remove('active');
            enterApp();
            showToast('Welcome back, ' + currentUser.name + '! ✦');
        } else {
            errEl.textContent = data.error || 'Invalid credentials';
            errEl.style.display = 'block';
        }
    })
    .catch(err => {
        setButtonLoading('btn-do-login', false);
        console.warn("Server offline, switching to offline login fallback:", err);
        // Fallback: Check local users in localStorage (case-insensitive email & mobile formats support)
        const normalizedEm = em.toLowerCase();
        const user = localUsers.find(u => 
            (u.email && u.email.toLowerCase() === normalizedEm) || 
            (u.mobile && (u.mobile === em || u.mobile === '+91' + em || u.mobile.replace('+91', '') === em.replace('+91', '')))
        );
        if (user && (user.password === pw)) {
            currentUser = user;
            localStorage.setItem('eo_currentUser', JSON.stringify(user));
            errEl.style.display = 'none';
            document.getElementById('auth').classList.remove('active');
            enterApp();
            showToast('Welcome back (Offline), ' + currentUser.name + '! ✦');
        } else {
            errEl.textContent = 'Account not found. Please Sign Up first.';
            errEl.style.display = 'block';
        }
    });
}

function doSignup() {
    const nm = document.getElementById('su-nm').value.trim();
    const em = document.getElementById('su-em').value.trim();
    const mb = document.getElementById('su-mobile').value.trim();
    const pw = document.getElementById('su-pw').value;
    const errEl = document.getElementById('signupErr');

    if (!nm || !em || !pw) {
        errEl.textContent = 'All fields are required';
        errEl.style.display = 'block';
        return;
    }
    
    // Real email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(em)) {
        errEl.textContent = 'Please enter a valid email address';
        errEl.style.display = 'block';
        return;
    }

    // Valid mobile number check: exactly 10 digits
    if (mb !== '') {
        const numRegex = /^[0-9]{10}$/;
        if (!numRegex.test(mb)) {
            errEl.textContent = 'Please enter a valid 10-digit mobile number';
            errEl.style.display = 'block';
            return;
        }
    }
    const formattedMobile = mb ? '+91' + mb : '';

    if (pw.length < 6) {
        errEl.textContent = 'Password must be at least 6 characters';
        errEl.style.display = 'block';
        return;
    }

    // Call real PHP Backend API for registration
    setButtonLoading('btn-do-signup', true, 'Create Account &#8594;');
    fetch(API + '?action=register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nm, email: em, mobile: formattedMobile, password: pw })
    })
    .then(res => res.json())
    .then(data => {
        setButtonLoading('btn-do-signup', false);
        if (data.success) {
            // Sync with local fallback DB to allow offline logins
            const users = JSON.parse(localStorage.getItem('eo_users') || '[]');
            if (!users.some(u => u.email.toLowerCase() === em.toLowerCase())) {
                users.push({
                    id: Date.now(),
                    name: nm,
                    email: em,
                    mobile: formattedMobile,
                    password: pw,
                    initial: nm.charAt(0).toUpperCase()
                });
                localStorage.setItem('eo_users', JSON.stringify(users));
                localUsers = users;
            }
            
            errEl.style.display = 'none';
            // Switch to Login Tab
            swAuth('login');
            // Prefill Sign In email field
            document.getElementById('li-em').value = em;
            document.getElementById('li-pw').value = '';
            // Clear Sign Up fields
            document.getElementById('su-nm').value = '';
            document.getElementById('su-em').value = '';
            document.getElementById('su-mobile').value = '';
            document.getElementById('su-pw').value = '';
            showToast('Account registered successfully! Please sign in. ✦');
        } else {
            errEl.textContent = data.error || 'Registration failed';
            errEl.style.display = 'block';
        }
    })
    .catch(err => {
        setButtonLoading('btn-do-signup', false);
        console.warn("Server offline, switching to offline signup fallback:", err);
        // Fallback: Create account locally in localStorage (case-insensitive check)
        const emailExists = localUsers.some(u => u.email.toLowerCase() === em.toLowerCase());
        if (emailExists) {
            errEl.textContent = 'Email already registered locally';
            errEl.style.display = 'block';
            return;
        }
        const newUser = {
            id: Date.now(),
            name: nm,
            email: em,
            mobile: formattedMobile,
            password: pw,
            initial: nm.charAt(0).toUpperCase()
        };
        localUsers.push(newUser);
        localStorage.setItem('eo_users', JSON.stringify(localUsers));
        
        errEl.style.display = 'none';
        swAuth('login');
        document.getElementById('li-em').value = em;
        document.getElementById('li-pw').value = '';
        
        document.getElementById('su-nm').value = '';
        document.getElementById('su-em').value = '';
        document.getElementById('su-mobile').value = '';
        document.getElementById('su-pw').value = '';
        showToast('Account registered locally (Offline)! Please sign in. ✦');
    });
}

function logout() {
    currentUser = null;
    localStorage.removeItem('eo_currentUser');
    closeSettings();
    document.getElementById('appMain').classList.remove('active');
    document.getElementById('auth').classList.add('active');
    
    // Clear security watermark on sign out
    const watermark = document.getElementById('secWatermark');
    if (watermark) watermark.innerHTML = '';
    
    showToast('Signed out successfully');
}

function togPwd(id, el) {
    const inp = document.getElementById(id);
    if (inp.type === 'password') {
        inp.type = 'text';
        el.style.color = 'var(--acc)';
    } else {
        inp.type = 'password';
        el.style.color = 'var(--text3)';
    }
}

// Load songs dynamically from the server API, falling back to local bundle if offline
function loadSongs() {
    // 1. Initial local offline songs loading
    songs = [...DEMO_SONGS];
    songs.forEach(s => {
        if (s.file_url && s.file_url.startsWith('/')) {
            s.file_url = s.file_url.substring(1);
        }
    });

    // Build initial queue from local offline songs
    queue = [...songs];
    if (shuffleOn) shuffleArray(queue);
    qIdx = 0;
    renderQueue();
    showHome();

    // 2. Fetch live list of songs from the MySQL database API
    fetch(API + '?action=songs')
        .then(res => res.json())
        .then(data => {
            if (data.success && data.songs && data.songs.length > 0) {
                const serverSongs = data.songs.map(s => ({
                    id: parseInt(s.id),
                    title: s.title,
                    artist_name: s.artist_name || 'Baduga Artist',
                    cover_emoji: s.cover_emoji || '🎵',
                    duration: s.duration || '3:30',
                    like_count: parseInt(s.like_count || 0),
                    play_count: parseInt(s.play_count || 0),
                    genre: s.genre || 'Folk',
                    file_url: s.file_url
                }));
                
                // Fix server song relative URLs
                serverSongs.forEach(s => {
                    if (s.file_url && s.file_url.startsWith('/')) {
                        s.file_url = s.file_url.substring(1);
                    }
                });

                // Update global songs array
                songs = serverSongs;
                
                // Re-render home with live list
                showHome();
                
                // Update queue if not playing, or keep queue
                const currentPlaying = queue[qIdx];
                queue = [...songs];
                if (shuffleOn) {
                    shuffleArray(queue);
                }
                
                // Maintain current playing song index
                if (currentPlaying) {
                    const idx = queue.findIndex(s => s.id === currentPlaying.id);
                    if (idx >= 0) qIdx = idx;
                } else {
                    qIdx = 0;
                }
                
                renderQueue();
                
                // Update start song details in player if not playing
                if (!isPlaying) {
                    const startSong = queue[qIdx];
                    if (startSong) {
                        const pNm = document.getElementById('pNm');
                        const pAr = document.getElementById('pAr');
                        if (pNm) pNm.textContent = startSong.title;
                        if (pAr) pAr.textContent = startSong.artist_name;
                        if (startSong.file_url) {
                            audio.src = getAudioUrl(startSong.file_url);
                        }
                    }
                }
            }
        })
        .catch(err => {
            console.warn("Failed to fetch live database songs, using bundled offline fallback:", err);
        });
}

// ════════════════════════════════════
// ENTER APP
// ════════════════════════════════════
function enterApp() {
    document.getElementById('appMain').classList.add('active');

    // Set user info
    if (currentUser) {
        const initial = (currentUser.name || currentUser.email || 'U')[0].toUpperCase();
        const av = document.getElementById('userAv');
        if (av) av.textContent = initial;
        const setAv = document.getElementById('setAv');
        if (setAv) setAv.textContent = initial;
        const setName = document.getElementById('setName');
        if (setName) setName.textContent = currentUser.name || 'User';
        const setEmail = document.getElementById('setEmail');
        if (setEmail) setEmail.textContent = currentUser.email || '';
        const setNmInp = document.getElementById('setNmInp');
        if (setNmInp) setNmInp.value = currentUser.name || '';
        const setEmInp = document.getElementById('setEmInp');
        if (setEmInp) setEmInp.value = currentUser.email || '';
    }

    // Greeting
    setGreeting();

    // Load songs (Offline fallback then query server)
    loadSongs();

    // Initialize player UI with the first song (WeBaduga)
    const startSong = queue[qIdx];
    if (startSong) {
        const pArt = document.getElementById('pArt');
        const pNm = document.getElementById('pNm');
        const pAr = document.getElementById('pAr');
        const pLk = document.getElementById('pLk');

        if (pArt) { pArt.innerHTML = '<img src="assets/logo.png" alt="Cover" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">'; }
        if (pNm) pNm.textContent = startSong.title;
        if (pAr) pAr.textContent = startSong.artist_name;
        if (pLk) pLk.classList.toggle('on', likedIds.includes(startSong.id));
        
        if (startSong.file_url) {
            audio.src = getAudioUrl(startSong.file_url);
            audio.load();
        }
    }

    // Init EQ UI
    initEQ();

    // Restore queue toggle state for desktop
    const qCol = localStorage.getItem('eo_queue_collapsed');
    const shell = document.querySelector('.shell');
    if (qCol === 'yes' && shell && window.innerWidth > 1024) {
        shell.classList.add('queue-collapsed');
    }

    // Initialize settings from localStorage
    const alertsEnabled = localStorage.getItem('eo_alerts') !== 'off';
    const alertTog = document.getElementById('alertTog');
    if (alertTog) {
        alertTog.classList.toggle('on', alertsEnabled);
    }
    
    const historyEnabled = localStorage.getItem('eo_history_enabled') !== 'off';
    const historyTog = document.getElementById('historyTog');
    if (historyTog) {
        historyTog.classList.toggle('on', historyEnabled);
    }

    // Trigger full-screen mobile player on bottom bar click
    const playerPl = document.querySelector('.player .pl');
    if (playerPl) {
        playerPl.addEventListener('click', (e) => {
            // Avoid opening player if clicking on the like heart icon
            if (e.target.closest('#pLk') || e.target.closest('.plk')) return;
            if (window.innerWidth <= 768) {
                openMobilePlayer();
            }
        });
    }

    // Initialize swipe gestures on mobile disk
    initMobileGestures();
}

function setGreeting() {
    const h = new Date().getHours();
    let g = 'Good evening';
    if (h < 12) g = 'Good morning';
    else if (h < 17) g = 'Good afternoon';
    const el = document.getElementById('greetingMsg');
    if (el) el.textContent = g + (currentUser ? ', ' + (currentUser.name || '') : '') + ' 🎵';
}

// ════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════
function setNav(el, fn) {
    document.querySelectorAll('.ni').forEach(n => n.classList.remove('on'));
    if (el) el.classList.add('on');
    if (fn) fn();
    
    // Close sidebar on mobile
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.remove('open');
}

function focusSearch() {
    const inp = document.getElementById('searchInput');
    if (inp) {
        inp.focus();
        showDrop();
        renderSearchHistory();
    }
}

// ════════════════════════════════════
// HOME RENDER
// ════════════════════════════════════
function showHome() {
    const feed = document.getElementById('mainFeed');
    if (!feed) return;

    // Get genres
    const genres = {};
    songs.forEach(s => {
        if (!genres[s.genre]) genres[s.genre] = [];
        genres[s.genre].push(s);
    });

    // Hero
    const heroSong = songs[Math.floor(Math.random() * songs.length)] || songs[0];
    let html = '';

    if (heroSong) {
        html += `
        <div class="hero" onclick="playSong(${heroSong.id})">
            <div class="hbg"></div>
            <div class="hgrid"></div>
            <div class="hglow"></div>
            <div class="hline"></div>
            <div class="h-art"><img src="assets/logo.png" alt="Cover" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;"></div>
            <div class="h-body">
                <div class="h-tag">✦ Featured Track</div>
                <div class="h-title">${heroSong.title}</div>
                <div class="h-sub">${heroSong.artist_name} · ${heroSong.genre}</div>
                <button class="h-cta" onclick="event.stopPropagation();playSong(${heroSong.id})"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="display:inline-block; vertical-align:middle; margin-right:6px;"><path d="M8 5v14l11-7z"/></svg>Play Now</button>
            </div>
        </div>`;
    }

    // Genre cards
    html += `<div class="sec"><div class="sh"><div class="st">Browse Genres</div></div><div class="gg">`;
    Object.keys(genres).forEach(g => {
        const bg = GENRE_COLORS[g] || 'linear-gradient(135deg, #374151, #4b5563)';
        const count = genres[g].length;
        html += `
        <div class="gc" onclick="showGenre('${g}')">
            <div class="gc-bg" style="background:${bg}"></div>
            <div class="gc-ov"></div>
            <div class="gc-body">
                <div class="gc-n">${g}</div>
                <div class="gc-c">${count} songs</div>
            </div>
        </div>`;
    });
    html += `</div></div>`;

    // Recently Played (listening history)
    const recent = recentIds.map(id => songs.find(s => s.id === id)).filter(Boolean);
    if (recent.length > 0) {
        html += renderSection('Recently Played', recent, 'recentHome');
    } else {
        html += `<div class="sec"><div class="sh"><div class="st">Recently Played</div></div>
        <div style="padding: 24px; text-align: center; color: var(--text3); background: var(--bg1); border-radius: 12px; border: 1px solid var(--bdr); font-size: 13.5px;">
            Your listening history will appear here once you play some songs! 🎵
        </div></div>`;
    }

    feed.innerHTML = html;
}

function renderSection(title, list, id) {
    let html = `<div class="sec" id="sec-${id}"><div class="sh"><div class="st">${title}</div>`;
    if (list.length > 8) {
        html += `<div class="sm" onclick="showAllSongs()">View All →</div>`;
    }
    html += `</div><div class="tl">`;
    list.forEach((s, i) => {
        const isNow = queue[qIdx] && queue[qIdx].id === s.id && isPlaying;
        html += trackItem(s, i + 1, isNow);
    });
    html += `</div></div>`;
    return html;
}

function trackItem(s, num, isNow) {
    const liked = likedIds.includes(s.id);
    return `
    <div class="ti${isNow ? ' now' : ''}" onclick="playSong(${s.id})" data-sid="${s.id}">
        <div class="tnum" data-num="${num}">${isNow ? waveHTML() : num}</div>
        <div class="tart"><img src="assets/logo.png" alt="Cover" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;"></div>
        <div class="tinfo">
            <div class="tname">${s.title}</div>
            <div class="tartname">${s.artist_name}</div>
        </div>
        <div class="tmeta">
            <span class="tlk${liked ? ' on' : ''}" onclick="event.stopPropagation();toggleLikeSong(${s.id},this)">${HEART_SVG}</span>
            <span class="tdur">${s.duration || '3:45'}</span>
        </div>
    </div>`;
}

function waveHTML() {
    return `<div class="wv"><div class="wvb"></div><div class="wvb"></div><div class="wvb"></div><div class="wvb"></div><div class="wvb"></div></div>`;
}

// ════════════════════════════════════
// GENRE VIEW
// ════════════════════════════════════
function showGenre(genre) {
    const feed = document.getElementById('mainFeed');
    const genreSongs = songs.filter(s => s.genre === genre);
    let html = `
    <div style="margin-bottom:16px">
        <span style="cursor:pointer;color:var(--acc4);font-size:13px;font-weight:700" onclick="showHome()">← Back to Home</span>
    </div>
    <div class="sec">
        <div class="sh">
            <div class="st">${genre}</div>
            <div class="sm">${genreSongs.length} songs</div>
        </div>
        <button class="h-cta" style="margin-bottom:16px" onclick="playAll(${JSON.stringify(genreSongs.map(s => s.id)).replace(/"/g, "'")})"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="display:inline-block; vertical-align:middle; margin-right:6px;"><path d="M8 5v14l11-7z"/></svg>Play All</button>
        <div class="tl">`;
    genreSongs.forEach((s, i) => {
        html += trackItem(s, i + 1, false);
    });
    html += `</div></div>`;
    feed.innerHTML = html;
    feed.scrollTop = 0;
}

// ════════════════════════════════════
// ARTISTS VIEW
// ════════════════════════════════════
function showArtists() {
    const feed = document.getElementById('mainFeed');
    const artists = {};
    songs.forEach(s => {
        if (!artists[s.artist_name]) artists[s.artist_name] = [];
        artists[s.artist_name].push(s);
    });

    let html = `<div class="sec"><div class="sh"><div class="st">Artists</div></div><div class="tl">`;
    Object.keys(artists).forEach(name => {
        const count = artists[name].length;
        html += `
        <div class="ti" onclick="showArtistSongs('${name.replace(/'/g, "\\'")}')">
            <div class="tart" style="border-radius:50%"><img src="assets/logo.png" alt="Artist" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;"></div>
            <div class="tinfo">
                <div class="tname">${name}</div>
                <div class="tartname">${count} song${count > 1 ? 's' : ''}</div>
            </div>
        </div>`;
    });
    html += `</div></div>`;
    feed.innerHTML = html;
    feed.scrollTop = 0;
}

function showArtistSongs(name) {
    const feed = document.getElementById('mainFeed');
    const artistSongs = songs.filter(s => s.artist_name === name);
    let html = `
    <div style="margin-bottom:16px">
        <span style="cursor:pointer;color:var(--acc4);font-size:13px;font-weight:700" onclick="showArtists()">← Back to Artists</span>
    </div>`;
    html += renderSection(name, artistSongs, 'artist');
    feed.innerHTML = html;
    feed.scrollTop = 0;
}

// ════════════════════════════════════
// LIKED SONGS
// ════════════════════════════════════
function loadLikedSongs() {
    const feed = document.getElementById('mainFeed');
    const liked = songs.filter(s => likedIds.includes(s.id));

    let html = `<div class="sec"><div class="sh"><div class="st">♥ Liked Songs</div><div class="sm">${liked.length} songs</div></div>`;
    if (liked.length === 0) {
        html += `<div style="text-align:center;padding:40px;color:var(--text4);font-size:14px">No liked songs yet. Tap ♥ on any song to add it here.</div>`;
    } else {
        html += `<div class="tl">`;
        liked.forEach((s, i) => html += trackItem(s, i + 1, false));
        html += `</div>`;
    }
    html += `</div>`;
    feed.innerHTML = html;
    feed.scrollTop = 0;
}

function loadRecent() {
    const feed = document.getElementById('mainFeed');
    const recent = recentIds.map(id => songs.find(s => s.id === id)).filter(Boolean);

    let html = `<div class="sec"><div class="sh"><div class="st">Recently Played</div><div class="sm">${recent.length} songs</div></div>`;
    if (recent.length === 0) {
        html += `<div style="text-align:center;padding:40px;color:var(--text4);font-size:14px">No recently played songs yet.</div>`;
    } else {
        html += `<div class="tl">`;
        recent.forEach((s, i) => html += trackItem(s, i + 1, false));
        html += `</div>`;
    }
    html += `</div>`;
    feed.innerHTML = html;
    feed.scrollTop = 0;
}

function showAllSongs() {
    const feed = document.getElementById('mainFeed');
    let html = renderSection('All Songs', songs, 'allFull');
    feed.innerHTML = html;
    feed.scrollTop = 0;
}

// ════════════════════════════════════
// PLAY ENGINE
// ════════════════════════════════════
function playSong(id) {
    const song = songs.find(s => s.id === id);
    if (!song) {
        showToast('Song not found');
        return;
    }

    // Find in queue or add
    const idx = queue.findIndex(s => s.id === id);
    if (idx >= 0) {
        qIdx = idx;
    } else {
        queue.splice(qIdx + 1, 0, song);
        qIdx = qIdx + 1;
    }

    loadAndPlay(song);
}

function playAll(ids) {
    if (!ids || ids.length === 0) return;
    const playSongs = ids.map(id => songs.find(s => s.id === id)).filter(Boolean);
    if (playSongs.length === 0) return;
    queue = [...playSongs];
    if (shuffleOn) shuffleArray(queue);
    qIdx = 0;
    loadAndPlay(queue[0]);
    renderQueue();
}

function loadAndPlay(song) {
    if (!song) return;

    if (!song.file_url) {
        showToast('⚠️ Song file not available locally');
        return;
    }

    // Update listening history (recent) if enabled
    const historyEnabled = localStorage.getItem('eo_history_enabled') !== 'off';
    if (historyEnabled) {
        recentIds = recentIds.filter(r => r !== song.id);
        recentIds.unshift(song.id);
        if (recentIds.length > 50) recentIds = recentIds.slice(0, 50);
        localStorage.setItem('eo_recent', JSON.stringify(recentIds));
    }

    // Update player UI
    const pArt = document.getElementById('pArt');
    const pNm = document.getElementById('pNm');
    const pAr = document.getElementById('pAr');
    const pLk = document.getElementById('pLk');

    if (pArt) { pArt.innerHTML = '<img src="assets/logo.png" alt="Cover" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">'; pArt.classList.add('spin'); }
    if (pNm) pNm.textContent = song.title;
    if (pAr) pAr.textContent = song.artist_name;
    if (pLk) pLk.classList.toggle('on', likedIds.includes(song.id));

    // Show song alert if enabled
    const songAlertsEnabled = localStorage.getItem('eo_alerts') !== 'off';
    if (songAlertsEnabled) {
        showSongAlert(song);
    }

    // Set audio source
    audio.src = getAudioUrl(song.file_url);
    audio.load();

    // Initialize Web Audio Context on user play action
    try {
        initAudioContext();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    } catch (e) {
        console.warn("Web Audio Context initialization failed:", e);
    }

    audio.play().then(() => {
        isPlaying = true;
        updatePlayBtn();
        if (pArt) pArt.classList.add('spin');
    }).catch(err => {
        console.warn('Playback failed:', err.message);
        isPlaying = false;
        updatePlayBtn();
        if (err.name === 'NotAllowedError') {
            showToast('Tap play to start audio ✦');
        } else {
            showToast('⚠️ Song file not available locally');
        }
    });

    // Update now-playing highlights
    updateNowPlaying();
    renderQueue();

    // Update document title
    document.title = `${song.title} — Echo of Baduga`;

    // Sync mobile player
    syncMobilePlayer();
}

function togPlay() {
    if (!audio.src || audio.src === window.location.href) {
        // No song loaded, play first in queue
        if (queue.length > 0) {
            loadAndPlay(queue[qIdx]);
        }
        return;
    }

    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        try {
            initAudioContext();
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
        } catch (e) {}
        audio.play().catch(() => showToast('Tap play to start'));
        isPlaying = true;
    }
    updatePlayBtn();
}

function updatePlayBtn() {
    const btn = document.getElementById('playBtn');
    if (btn) btn.innerHTML = isPlaying ? PAUSE_ICON : PLAY_ICON;
    const pArt = document.getElementById('pArt');
    if (pArt) {
        if (isPlaying) pArt.classList.add('spin');
        else pArt.classList.remove('spin');
    }
    renderQueue();

    // Sync mobile player
    syncMobilePlayer();
}

function nextT() {
    if (queue.length === 0) return;
    qIdx = (qIdx + 1) % queue.length;
    loadAndPlay(queue[qIdx]);
}

function prevT() {
    if (queue.length === 0) return;
    // If more than 3s in, restart. Otherwise go back.
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }
    qIdx = (qIdx - 1 + queue.length) % queue.length;
    loadAndPlay(queue[qIdx]);
}

// Audio events
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    const fill = document.getElementById('pFill');
    if (fill) fill.style.width = pct + '%';
    const cT = document.getElementById('cT');
    if (cT) cT.textContent = fmtTime(audio.currentTime);
    const totT = document.getElementById('totT');
    if (totT) totT.textContent = fmtTime(audio.duration);

    // Sync mobile player seeker and timers
    const mFill = document.getElementById('m-pFill');
    if (mFill) mFill.style.width = pct + '%';
    const mCT = document.getElementById('m-cT');
    if (mCT) mCT.textContent = fmtTime(audio.currentTime);
    const mTotT = document.getElementById('m-totT');
    if (mTotT) mTotT.textContent = fmtTime(audio.duration);
});

audio.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayBtn();

    if (repeatOn) {
        audio.currentTime = 0;
        audio.play();
        isPlaying = true;
        updatePlayBtn();
    } else {
        nextT();
    }
});

let errorStreak = 0;
audio.addEventListener('error', (e) => {
    console.warn('Audio error:', e);
    errorStreak++;
    if (errorStreak > 3) {
        showToast('Playback error. Please check your internet connection. ⚠️');
        errorStreak = 0;
        return;
    }
    showToast('Failed to play track. Trying next song... ⚠️');
    setTimeout(() => {
        nextT();
    }, 2000);
});

audio.addEventListener('play', () => {
    errorStreak = 0;
});

function getEventX(e) {
    if (e.touches && e.touches.length > 0) {
        return e.touches[0].clientX;
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
        return e.changedTouches[0].clientX;
    }
    return e.clientX;
}

// Resume AudioContext on first user interaction for mobile compatibility
function unlockAudioContext() {
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
            document.removeEventListener('click', unlockAudioContext);
            document.removeEventListener('touchstart', unlockAudioContext);
        });
    }
}
document.addEventListener('click', unlockAudioContext);
document.addEventListener('touchstart', unlockAudioContext);

function seek(event) {
    if (!audio.duration) return;
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clientX = getEventX(event);
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
}

function setVol(event) {
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clientX = getEventX(event);
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.volume = pct;
    const vfl = document.getElementById('vFl');
    if (vfl) vfl.style.width = (pct * 100) + '%';
}

function fmtTime(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
}

// ════════════════════════════════════
// QUEUE
// ════════════════════════════════════
function renderQueue() {
    const qList = document.getElementById('qList');
    if (!qList) return;

    if (queue.length === 0) {
        qList.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text4);font-size:13px">Queue is empty</div>';
        return;
    }

    let html = '';
    // Show upcoming songs (current + next 20)
    const start = qIdx;
    const show = Math.min(queue.length, 20);
    for (let i = 0; i < show; i++) {
        const idx = (start + i) % queue.length;
        const s = queue[idx];
        const isCurrent = (idx === qIdx);
        
        let content = '';
        if (isCurrent) {
            content = isPlaying ? waveHTML() : '<svg viewBox="0 0 24 24" width="12" height="12" fill="var(--acc3)" style="display:inline-block; vertical-align:middle;"><path d="M8 5v14l11-7z"/></svg>';
        } else {
            content = `<span style="color: var(--text3); font-weight: 600; font-size: 13.5px;">${i}</span>`;
        }

        html += `
        <div class="uq${isCurrent ? ' now' : ''}" onclick="playSong(${s.id})" style="${isCurrent ? 'background:var(--active);border-radius:9px;' : ''}">
            <div class="uqa">${content}</div>
            <div>
                <div class="uqn" style="${isCurrent ? 'color:var(--acc5)' : ''}">${isCurrent ? '<svg viewBox="0 0 24 24" width="11" height="11" fill="var(--acc5)" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M8 5v14l11-7z"/></svg>' : ''}${s.title}</div>
                <div class="uqar">${s.artist_name}</div>
            </div>
        </div>`;
    }
    qList.innerHTML = html;
}

function updateNowPlaying() {
    document.querySelectorAll('.ti').forEach(el => {
        const sid = parseInt(el.dataset.sid);
        const current = queue[qIdx];
        const tnum = el.querySelector('.tnum');
        if (current && sid === current.id) {
            el.classList.add('now');
            if (tnum) tnum.innerHTML = waveHTML();
        } else {
            el.classList.remove('now');
            if (tnum && tnum.dataset.num) {
                tnum.textContent = tnum.dataset.num;
            }
        }
    });
}

// ════════════════════════════════════
// LIKES
// ════════════════════════════════════
function togLike() {
    const current = queue[qIdx];
    if (!current) return;
    toggleLikeSong(current.id);
    const pLk = document.getElementById('pLk');
    if (pLk) pLk.classList.toggle('on', likedIds.includes(current.id));
}

function toggleLikeSong(id, el) {
    if (likedIds.includes(id)) {
        likedIds = likedIds.filter(l => l !== id);
        if (el) el.classList.remove('on');
        showToast('Removed from liked songs');
    } else {
        likedIds.push(id);
        if (el) el.classList.add('on');
        showToast('Added to liked songs ♥');
    }
    localStorage.setItem('eo_likes', JSON.stringify(likedIds));

    // Update player like btn
    const current = queue[qIdx];
    if (current && current.id === id) {
        const pLk = document.getElementById('pLk');
        if (pLk) pLk.classList.toggle('on', likedIds.includes(id));
    }

    // Sync mobile player
    syncMobilePlayer();
}

// ════════════════════════════════════
// SHUFFLE & REPEAT
// ════════════════════════════════════
function toggleCb(el) {
    el.classList.toggle('on');

    if (el.id === 'cbShuffle') {
        shuffleOn = el.classList.contains('on');
        if (shuffleOn) {
            const current = queue[qIdx];
            shuffleArray(queue);
            // Put current song at front
            if (current) {
                queue = queue.filter(s => s.id !== current.id);
                queue.unshift(current);
                qIdx = 0;
            }
            showToast('Shuffle on');
        } else {
            const current = queue[qIdx];
            queue = [...songs];
            qIdx = current ? queue.findIndex(s => s.id === current.id) : 0;
            if (qIdx < 0) qIdx = 0;
            showToast('Shuffle off');
        }
        renderQueue();
    }

    if (el.id === 'cbRepeat') {
        repeatOn = el.classList.contains('on');
        showToast(repeatOn ? 'Repeat on' : 'Repeat off');
    }

    // Sync mobile player
    syncMobilePlayer();
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ════════════════════════════════════
// SEARCH
// ════════════════════════════════════
let searchTimeout = null;
function onSearch(val) {
    clearTimeout(searchTimeout);
    const drop = document.getElementById('searchDrop');
    const results = document.getElementById('sdResults');
    const empty = document.getElementById('sdEmpty');
    const spin = document.getElementById('sdSpin');

    if (!val.trim()) {
        renderSearchHistory();
        return;
    }

    if (empty) empty.style.display = 'none';
    if (spin) spin.style.display = 'flex';

    searchTimeout = setTimeout(() => {
        const q = val.toLowerCase();
        const matched = songs.filter(s =>
            s.title.toLowerCase().includes(q) ||
            s.artist_name.toLowerCase().includes(q) ||
            s.genre.toLowerCase().includes(q)
        ).slice(0, 10);

        if (spin) spin.style.display = 'none';

        if (matched.length === 0) {
            results.innerHTML = '<div class="sd-empty">No results found</div>';
            return;
        }

        let html = '<div class="sd-section"><div class="sd-label">Songs</div>';
        matched.forEach(s => {
            const escapedVal = val.replace(/'/g, "\\'");
            html += `
            <div class="sd-item" onclick="addSearchHistory('${escapedVal}');playSong(${s.id});closeDrop()">
                <div class="sd-art"><img src="assets/logo.png" alt="Cover" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;"></div>
                <div>
                    <div class="sd-name">${s.title}</div>
                    <div class="sd-sub">${s.artist_name} · ${s.genre}</div>
                </div>
            </div>`;
        });
        html += '</div>';
        results.innerHTML = html;
    }, 300);
}

function showDrop() {
    document.getElementById('searchDrop').classList.add('open');
}
function closeDrop() {
    document.getElementById('searchDrop').classList.remove('open');
}

// Search History Helper Functions
function renderSearchHistory() {
    const history = JSON.parse(localStorage.getItem('eo_search_history') || '[]');
    const results = document.getElementById('sdResults');
    const empty = document.getElementById('sdEmpty');
    const spin = document.getElementById('sdSpin');
    
    if (spin) spin.style.display = 'none';
    
    const val = document.getElementById('searchInput').value.trim();
    if (val) return; // Don't render history if there's active text
    
    if (history.length === 0) {
        if (empty) {
            empty.textContent = 'Type to search songs & artists';
            empty.style.display = 'block';
        }
        if (results) results.innerHTML = '';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    
    let html = `
    <div class="sd-section">
        <div class="sd-header-row" style="display:flex; justify-content:space-between; align-items:center; padding: 8px 12px 4px; border-bottom: 1px solid var(--bdr);">
            <span class="sd-label" style="font-size:12px; color:var(--text3); font-weight:700;">Recent Searches</span>
            <span onclick="clearSearchHistory(event)" style="font-size:11px; color:var(--acc4); cursor:pointer; font-weight:600;">Clear</span>
        </div>
        <div class="sd-history-list" style="padding: 4px 0;">`;
        
    history.forEach(item => {
        const escapedItem = item.replace(/'/g, "\\'");
        html += `
        <div class="sd-item" onclick="quickSearch('${escapedItem}')" style="display:flex; align-items:center; padding:8px 12px; cursor:pointer;">
            <span style="margin-right:8px; color:var(--text4)">🕒</span>
            <span style="color:var(--text2); font-size:13.5px;">${item}</span>
        </div>`;
    });
    
    html += `</div></div>`;
    if (results) results.innerHTML = html;
}

function addSearchHistory(query) {
    if (!query || !query.trim()) return;
    query = query.trim();
    let history = JSON.parse(localStorage.getItem('eo_search_history') || '[]');
    history = history.filter(h => h.toLowerCase() !== query.toLowerCase());
    history.unshift(query);
    if (history.length > 5) history = history.slice(0, 5);
    localStorage.setItem('eo_search_history', JSON.stringify(history));
}

function clearSearchHistory(event) {
    if (event) event.stopPropagation();
    localStorage.removeItem('eo_search_history');
    renderSearchHistory();
}

function quickSearch(query) {
    const inp = document.getElementById('searchInput');
    if (inp) {
        inp.value = query;
        onSearch(query);
    }
}

// Close search dropdown when clicking outside
document.addEventListener('click', (e) => {
    const bar = document.querySelector('.srch-bar');
    if (bar && !bar.contains(e.target)) {
        closeDrop();
    }
});

// ════════════════════════════════════
// THEME
// ════════════════════════════════════
function toggleTheme() {
    const body = document.body;
    const isDark = body.dataset.theme === 'dark';
    body.dataset.theme = isDark ? 'light' : 'dark';

    const thDk = document.getElementById('thDk');
    const thLt = document.getElementById('thLt');
    const mThDk = document.getElementById('m-thDk');
    const mThLt = document.getElementById('m-thLt');
    const thLbl = document.getElementById('thLbl');

    if (thDk) thDk.classList.toggle('on', !isDark);
    if (thLt) thLt.classList.toggle('on', isDark);
    if (mThDk) mThDk.classList.toggle('on', !isDark);
    if (mThLt) mThLt.classList.toggle('on', isDark);
    if (thLbl) thLbl.textContent = isDark ? 'Light Mode' : 'Dark Mode';

    localStorage.setItem('eo_theme', body.dataset.theme);
}

// Restore theme
(function () {
    const saved = localStorage.getItem('eo_theme') || 'dark';
    document.body.dataset.theme = saved;
    const thDk = document.getElementById('thDk');
    const thLt = document.getElementById('thLt');
    const mThDk = document.getElementById('m-thDk');
    const mThLt = document.getElementById('m-thLt');
    const thLbl = document.getElementById('thLbl');
    if (thDk) thDk.classList.toggle('on', saved === 'dark');
    if (thLt) thLt.classList.toggle('on', saved === 'light');
    if (mThDk) mThDk.classList.toggle('on', saved === 'dark');
    if (mThLt) mThLt.classList.toggle('on', saved === 'light');
    if (thLbl) thLbl.textContent = saved === 'dark' ? 'Dark Mode' : 'Light Mode';
})();

// ════════════════════════════════════
// SETTINGS
// ════════════════════════════════════
function openSettings() {
    document.getElementById('setOv').classList.add('open');
}
function closeSettings() {
    document.getElementById('setOv').classList.remove('open');
}
function closeSetBg(e) {
    if (e.target === document.getElementById('setOv')) closeSettings();
}

function syncProfile() {
    const nm = document.getElementById('setNmInp').value;
    const em = document.getElementById('setEmInp').value;
    if (currentUser) {
        currentUser.name = nm;
        currentUser.email = em;
        localStorage.setItem('eo_currentUser', JSON.stringify(currentUser));

        const initial = (nm || 'U')[0].toUpperCase();
        const av = document.getElementById('userAv');
        if (av) av.textContent = initial;
        const setAv = document.getElementById('setAv');
        if (setAv) setAv.textContent = initial;
        const setName = document.getElementById('setName');
        if (setName) setName.textContent = nm;
        const setEmail = document.getElementById('setEmail');
        if (setEmail) setEmail.textContent = em;

        setGreeting();
    }
}

// ════════════════════════════════════
// SLEEP TIMER
// ════════════════════════════════════
function openSleep() {
    document.getElementById('sleepOv').classList.add('open');
}
function closeSleepBg(e) {
    if (e.target === document.getElementById('sleepOv')) {
        document.getElementById('sleepOv').classList.remove('open');
    }
}

function setCustomTimer() {
    const inp = document.getElementById('customMinsInp');
    if (!inp) return;
    const val = parseInt(inp.value);
    if (isNaN(val) || val <= 0) {
        showToast('Please enter a valid number of minutes');
        return;
    }
    setTimer(val);
}

function setTimer(mins) {
    // Clear existing
    cancelTimer();

    document.querySelectorAll('.topt').forEach(t => t.classList.remove('sel'));

    if (mins === 0) {
        // End of current song
        document.getElementById('t0').classList.add('sel');
        audio.addEventListener('ended', sleepOnEnd, { once: true });
        showToast('Sleep: end of current song');
        document.getElementById('slpAB').style.display = 'flex';
        document.getElementById('slpCD').textContent = '∞';
        document.getElementById('sCnt').style.display = 'block';
        document.getElementById('sCnt').textContent = '∞';
        const mCD = document.getElementById('m-sCnt');
        if (mCD) {
            mCD.style.display = 'block';
            mCD.textContent = '∞';
        }
        document.getElementById('sleepOv').classList.remove('open');
        return;
    }

    const el = document.getElementById('t' + mins);
    if (el) el.classList.add('sel');

    sleepEnd = Date.now() + mins * 60 * 1000;
    sleepTimer = setTimeout(() => {
        audio.pause();
        isPlaying = false;
        updatePlayBtn();
        showToast('Sleep timer ended. Goodnight 🌙');
        cancelTimer();
    }, mins * 60 * 1000);

    sleepTickId = setInterval(updateSleepDisplay, 1000);
    updateSleepDisplay();

    document.getElementById('slpAB').style.display = 'flex';
    document.getElementById('sCnt').style.display = 'block';
    const mCD = document.getElementById('m-sCnt');
    if (mCD) mCD.style.display = 'block';
    document.getElementById('sleepOv').classList.remove('open');
    showToast(`Sleep timer: ${mins} minutes`);
}

function sleepOnEnd() {
    audio.pause();
    isPlaying = false;
    updatePlayBtn();
    showToast('Sleep timer ended. Goodnight 🌙');
    cancelTimer();
}

function updateSleepDisplay() {
    const remaining = Math.max(0, sleepEnd - Date.now());
    const m = Math.floor(remaining / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    const txt = m + ':' + (s < 10 ? '0' : '') + s;
    const cd = document.getElementById('slpCD');
    if (cd) cd.textContent = txt;
    const cnt = document.getElementById('sCnt');
    if (cnt) cnt.textContent = txt;
    const mCnt = document.getElementById('m-sCnt');
    if (mCnt) mCnt.textContent = txt;
}

function cancelTimer() {
    if (sleepTimer) clearTimeout(sleepTimer);
    if (sleepTickId) clearInterval(sleepTickId);
    sleepTimer = null;
    sleepTickId = null;
    document.querySelectorAll('.topt').forEach(t => t.classList.remove('sel'));
    const ab = document.getElementById('slpAB');
    if (ab) ab.style.display = 'none';
    const cnt = document.getElementById('sCnt');
    if (cnt) cnt.style.display = 'none';
    const mCnt = document.getElementById('m-sCnt');
    if (mCnt) mCnt.style.display = 'none';
    audio.removeEventListener('ended', sleepOnEnd);
}

// ════════════════════════════════════
// EQUALIZER (Visual only)
// ════════════════════════════════════
const EQ_PRESETS = {
    flat: [0, 0, 0, 0, 0, 0],
    bass: [6, 4, 1, 0, -1, -2],
    treble: [-2, -1, 0, 1, 4, 6],
    vocal: [-1, 0, 3, 4, 2, 0],
    rock: [4, 2, -1, 1, 3, 5],
    classical: [3, 1, 0, 0, 1, 3]
};
const EQ_LABELS = ['60Hz', '230Hz', '910Hz', '3.6kHz', '14kHz', '16kHz'];

// REAL WEB AUDIO EQUALIZER
function initAudioContext() {
    if (audioCtx) return;
    
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        
        // Create media element source
        audioSource = audioCtx.createMediaElementSource(audio);
        
        // Create peaking filters for each band
        eqFilters = [];
        let lastNode = audioSource;
        
        EQ_FREQS.forEach((freq, idx) => {
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'peaking';
            filter.frequency.value = freq;
            filter.Q.value = 1.0; // Quality factor
            // Get initial value from input slider
            const slider = document.getElementById('eqs' + idx);
            filter.gain.value = slider ? parseFloat(slider.value) : 0;
            
            lastNode.connect(filter);
            lastNode = filter;
            eqFilters.push(filter);
        });
        
        // Initialize Analyser Node
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        analyserData = new Uint8Array(bufferLength);
        
        // Connect final band to Analyser, and Analyser to output destination
        lastNode.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        // Start rendering the visualizer
        startVisualizer();
    } catch (e) {
        console.warn("Real Web Audio Equalizer initialization failed:", e);
    }
}

function initEQ() {
    const bands = document.getElementById('eqBands');
    if (!bands) return;
    let html = '';
    EQ_LABELS.forEach((lbl, i) => {
        html += `
        <div class="eq-band">
            <div class="eq-val" id="eqv${i}">0 dB</div>
            <div class="eq-swrap">
                <input type="range" class="eq-sl" id="eqs${i}" min="-12" max="12" value="0" oninput="eqChange(${i},this.value)">
            </div>
            <div class="eq-blbl">${lbl}</div>
        </div>`;
    });
    bands.innerHTML = html;
}

function eqChange(i, v) {
    const el = document.getElementById('eqv' + i);
    if (el) el.textContent = (v > 0 ? '+' : '') + v + ' dB';
    
    // Update real filter if initialized
    if (eqFilters && eqFilters[i]) {
        try {
            eqFilters[i].gain.setValueAtTime(parseFloat(v), audioCtx.currentTime);
        } catch (e) {
            eqFilters[i].gain.value = parseFloat(v);
        }
    }
}

function setPreset(el, name) {
    document.querySelectorAll('.eqp').forEach(p => p.classList.remove('on'));
    el.classList.add('on');
    const vals = EQ_PRESETS[name] || EQ_PRESETS.flat;
    vals.forEach((v, i) => {
        const sl = document.getElementById('eqs' + i);
        if (sl) sl.value = v;
        eqChange(i, v);
    });
}

function setQual(el, level) {
    document.querySelectorAll('.qo').forEach(q => q.classList.remove('on'));
    el.classList.add('on');
    showToast('Quality: ' + level);
}

// ── FLOATING NEW SONG ALERT ──
function showSongAlert(song) {
    let alertEl = document.getElementById('songAlertEl');
    if (!alertEl) {
        alertEl = document.createElement('div');
        alertEl.id = 'songAlertEl';
        alertEl.className = 'song-alert';
        document.body.appendChild(alertEl);
    }
    
    alertEl.innerHTML = `
        <div class="sa-art"><img src="assets/logo.png" alt="Cover" style="width:100%; height:100%; object-fit:cover;"></div>
        <div class="sa-body">
            <span class="sa-badge">Now Playing</span>
            <div class="sa-title">${song.title}</div>
            <div class="sa-artist">${song.artist_name}</div>
        </div>
    `;
    
    // Slide in
    setTimeout(() => {
        alertEl.classList.add('show');
    }, 100);
    
    // Slide out after 4 seconds
    clearTimeout(window.songAlertTimeout);
    window.songAlertTimeout = setTimeout(() => {
        alertEl.classList.remove('show');
    }, 4000);
}

// ── SETTINGS TOGGLES ──
function toggleAlertSetting(el) {
    el.classList.toggle('on');
    const enabled = el.classList.contains('on');
    localStorage.setItem('eo_alerts', enabled ? 'on' : 'off');
    showToast(enabled ? 'New song alerts enabled' : 'New song alerts disabled');
}

function toggleHistorySetting(el) {
    el.classList.toggle('on');
    const enabled = el.classList.contains('on');
    localStorage.setItem('eo_history_enabled', enabled ? 'on' : 'off');
    showToast(enabled ? 'Listening history enabled' : 'Listening history disabled');
    
    if (!enabled) {
        localStorage.removeItem('eo_recent');
        recentIds = [];
    }
}

// ── RESPONSIVE MOBILE SIDEBAR & QUEUE PANEL TOGGLES ──
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

function toggleQueue() {
    const shell = document.querySelector('.shell');
    const rpanel = document.querySelector('.rpanel');
    
    if (window.innerWidth <= 1024) {
        if (rpanel) {
            rpanel.classList.toggle('open');
        }
    } else {
        if (shell) {
            shell.classList.toggle('queue-collapsed');
            localStorage.setItem('eo_queue_collapsed', shell.classList.contains('queue-collapsed') ? 'yes' : 'no');
        }
    }
}

// ════════════════════════════════════
// UNIFIED FEEDBACK, SUPPORT & RATINGS SYSTEM
// ════════════════════════════════════
let currentFeedbackType = 'contact';
let currentFeedbackRating = 0;

function openFeedbackModal(defaultType = 'contact') {
    document.getElementById('feedbackOv').classList.add('open');
    
    // Reset steps visibility
    const fbFormFields = document.getElementById('fb-form-fields');
    const fbSuccessStep = document.getElementById('fb-success-step');
    if (fbFormFields) fbFormFields.style.display = 'flex';
    if (fbSuccessStep) fbSuccessStep.style.display = 'none';
    
    // Clear and reset form fields
    document.getElementById('fb-message').value = '';
    
    // Prefill name and email if logged in
    const nameInput = document.getElementById('fb-name');
    const emailInput = document.getElementById('fb-email');
    if (currentUser) {
        nameInput.value = currentUser.name || '';
        emailInput.value = currentUser.email || '';
        nameInput.disabled = true;
        emailInput.disabled = true;
        nameInput.style.opacity = '0.6';
        emailInput.style.opacity = '0.6';
    } else {
        nameInput.value = '';
        emailInput.value = '';
        nameInput.disabled = false;
        emailInput.disabled = false;
        nameInput.style.opacity = '1';
        emailInput.style.opacity = '1';
    }
    
    selectFeedbackTab(defaultType);
}

function closeFeedbackModal() {
    document.getElementById('feedbackOv').classList.remove('open');
}

function closeFeedbackBg(e) {
    if (e.target === document.getElementById('feedbackOv')) {
        closeFeedbackModal();
    }
}

function selectFeedbackTab(type) {
    currentFeedbackType = type;
    
    // Update tab button visual active state
    const tabs = ['contact', 'report', 'rating'];
    tabs.forEach(t => {
        const tabEl = document.getElementById(`tab-fb-${t}`);
        if (tabEl) {
            if (t === type) {
                tabEl.classList.add('active');
                tabEl.style.background = 'var(--bg2)';
                tabEl.style.border = '1px solid var(--bdr)';
                tabEl.style.color = 'var(--text2)';
            } else {
                tabEl.classList.remove('active');
                tabEl.style.background = 'transparent';
                tabEl.style.border = '1px solid transparent';
                tabEl.style.color = 'var(--text3)';
            }
        }
    });

    // Update modal labels and field visibilities
    const ratingWrapper = document.getElementById('fb-rating-wrapper');
    const messageLabel = document.getElementById('fb-message-label');
    const messageField = document.getElementById('fb-message');
    const submitIcon = document.getElementById('fb-submit-icon');
    const submitText = document.getElementById('fb-submit-text');

    if (type === 'rating') {
        ratingWrapper.style.display = 'flex';
        messageLabel.textContent = 'Write a Review';
        messageField.placeholder = 'Describe your experience with our app...';
        submitIcon.textContent = '⭐';
        submitText.textContent = 'Submit Rating & Review';
        setFeedbackRating(currentFeedbackRating || 5); // Default to 5 stars if not set
    } else if (type === 'report') {
        ratingWrapper.style.display = 'none';
        messageLabel.textContent = 'Issue Details';
        messageField.placeholder = 'Describe the problem you are facing...';
        submitIcon.textContent = '🚩';
        submitText.textContent = 'Submit Bug Report';
    } else {
        ratingWrapper.style.display = 'none';
        messageLabel.textContent = 'Your Message';
        messageField.placeholder = 'Write your message here...';
        submitIcon.textContent = '📬';
        submitText.textContent = 'Send Message';
    }
}

function setFeedbackRating(rating) {
    currentFeedbackRating = rating;
    const stars = document.querySelectorAll('.fb-star');
    const labels = {
        1: 'Hate it 😡',
        2: 'Dislike it 😕',
        3: 'It is okay 😐',
        4: 'Like it 🙂',
        5: 'Love it! 😍'
    };
    
    stars.forEach(star => {
        const val = parseInt(star.getAttribute('data-val'));
        if (val <= rating) {
            star.style.color = '#fbbf24'; // Active star color (gold)
            star.style.transform = 'scale(1.15)';
        } else {
            star.style.color = 'var(--text3)'; // Inactive star color
            star.style.transform = 'scale(1)';
        }
    });
    
    const labelEl = document.getElementById('fb-rating-label');
    if (labelEl) {
        labelEl.textContent = labels[rating] || 'Select a rating';
    }
}

function submitFeedback() {
    const name = document.getElementById('fb-name').value.trim();
    const email = document.getElementById('fb-email').value.trim();
    const message = document.getElementById('fb-message').value.trim();
    
    if (!name || !email) {
        showToast('Please fill in your Name and Email');
        return;
    }
    
    // Quick email format regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address');
        return;
    }

    if (!message) {
        showToast(currentFeedbackType === 'rating' ? 'Please write a review comment' : 'Please fill in details / message');
        return;
    }

    const payload = {
        type: currentFeedbackType,
        name: name,
        email: email,
        message: message,
        user_id: currentUser ? currentUser.id : 0
    };

    if (currentFeedbackType === 'rating') {
        payload.rating = currentFeedbackRating;
    }

    // Disable the submit button and show "Sending..."
    const submitTextEl = document.getElementById('fb-submit-text');
    const submitIconEl = document.getElementById('fb-submit-icon');
    const originalText = submitTextEl ? submitTextEl.textContent : 'Send Message';
    const originalIcon = submitIconEl ? submitIconEl.textContent : '📬';
    
    setButtonLoading('btn-fb-submit', true, `<span id="fb-submit-icon">${originalIcon}</span> <span id="fb-submit-text">${originalText}</span>`);

    fetch(API + '?action=feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        setButtonLoading('btn-fb-submit', false);
        if (data.success) {
            showToast('✓ Feedback received!');
            
            // Customize the success step details based on the feedback type
            const successIcon = document.getElementById('fb-success-icon');
            const successTitle = document.getElementById('fb-success-title');
            const successText = document.getElementById('fb-success-text');
            
            if (currentFeedbackType === 'rating') {
                if (successIcon) successIcon.textContent = '⭐';
                if (successTitle) successTitle.textContent = 'Review Submitted!';
                if (successText) successText.textContent = 'Thank you for rating our app! Your feedback helps us build a better experience for the community.';
            } else if (currentFeedbackType === 'report') {
                if (successIcon) successIcon.textContent = '🚩';
                if (successTitle) successTitle.textContent = 'Bug Report Submitted!';
                if (successText) successText.textContent = 'Thank you for reporting this issue. Our development team will review it shortly.';
            } else {
                if (successIcon) successIcon.textContent = '📬';
                if (successTitle) successTitle.textContent = 'Message Sent!';
                if (successText) successText.textContent = 'Your message has been sent to the Echo of Baduga support team. We will get back to you shortly.';
            }
            
            // Transition the steps
            document.getElementById('fb-form-fields').style.display = 'none';
            document.getElementById('fb-success-step').style.display = 'flex';
            
            // Clear message
            document.getElementById('fb-message').value = '';
            currentFeedbackRating = 0;
            
            if (data.email_sent === false) {
                console.warn("⚠️ SMTP Email delivery failed. Saved in database. Check api.php credentials.");
            }
        } else {
            showToast('⚠️ ' + data.error);
        }
    })
    .catch(err => {
        setButtonLoading('btn-fb-submit', false);
        console.error("Feedback submit error:", err);
        showToast('⚠️ Connection to server failed');
    });
}

// ════════════════════════════════════
// TOAST
// ════════════════════════════════════
let toastTimeout = null;
function showToast(msg) {
    const el = document.getElementById('toastEl');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => el.classList.remove('show'), 2500);
}

function setButtonLoading(btnElOrId, isLoading, originalHtml) {
    const btn = (typeof btnElOrId === 'string') ? document.getElementById(btnElOrId) : btnElOrId;
    if (!btn) return;
    if (isLoading) {
        btn.disabled = true;
        btn.style.opacity = '0.7';
        btn.style.cursor = 'not-allowed';
        btn.dataset.originalHtml = originalHtml || btn.innerHTML;
        btn.innerHTML = `<span class="mini-spin" style="display:inline-block; width:12px; height:12px; border:2px solid rgba(255,255,255,0.3); border-radius:50%; border-top-color:#fff; animation:spin 0.8s linear infinite; margin-right:6px; vertical-align:middle;"></span> Sending...`;
    } else {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
        if (btn.dataset.originalHtml) {
            btn.innerHTML = btn.dataset.originalHtml;
        }
    }
}

// ════════════════════════════════════
// FORGOT PASSWORD FLOW
// ════════════════════════════════════
let resetIdentity = '';
let verifiedResetOtp = '';

function openForgotModal() {
    document.getElementById('forgotOv').classList.add('open');
    document.getElementById('forgotStep1').style.display = 'flex';
    document.getElementById('forgotStep2').style.display = 'none';
    document.getElementById('forgotStep3').style.display = 'none';
    document.getElementById('forgotStepSub').textContent = 'Enter your registered email or mobile number.';
    document.getElementById('forgot-identity').value = '';
    document.getElementById('forgot-new-pwd').value = '';
    document.getElementById('forgot-confirm-pwd').value = '';
}

function closeForgotModal() {
    document.getElementById('forgotOv').classList.remove('open');
}

function closeForgotBg(e) {
    if (e.target === document.getElementById('forgotOv')) closeForgotModal();
}

function sendResetOtp() {
    const ident = document.getElementById('forgot-identity').value.trim();
    if (!ident) {
        showToast('Please enter your Email or Mobile');
        return;
    }

    setButtonLoading('btn-send-reset', true, 'Send Reset Link →');
    fetch(API + '?action=forgot_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_or_mobile: ident })
    })
    .then(res => res.json())
    .then(data => {
        setButtonLoading('btn-send-reset', false);
        if (data.success) {
            resetIdentity = ident;
            showToast(data.message);
            
            // Set subtitle and switch steps
            document.getElementById('forgotStepSub').textContent = 'Reset link has been generated.';
            document.getElementById('forgotStep1').style.display = 'none';
            document.getElementById('forgotStep2').style.display = 'flex';
            
            // Display target information dynamically (masked email or SMS)
            const successMsgEl = document.getElementById('forgotStep2Msg');
            if (successMsgEl) {
                if (data.delivery_method === 'sms') {
                    successMsgEl.innerHTML = `📲 <strong>Reset Link Sent!</strong><br><br>We have sent a secure password reset link to your mobile number via SMS message. Please check your message inbox shortly.`;
                } else {
                    successMsgEl.innerHTML = `📩 <strong>Reset Link Sent!</strong><br><br>We have sent a secure password reset link to your registered email address <strong>${data.masked_email}</strong>. Please check your inbox and spam folder shortly.`;
                }
            }
            
            if (data.email_sent === false) {
                console.warn("⚠️ SMTP Email delivery failed. Reset link written to otp_debug.txt. Link:", data.dev_link);
            }
        } else {
            showToast('⚠️ ' + data.error);
        }
    })
    .catch(() => {
        setButtonLoading('btn-send-reset', false);
        showToast('⚠️ Connection to server failed');
    });
}

// Keep verifyResetOtp to check link tokens when page loads with link params
function verifyResetLinkToken(email, token, successCallback) {
    fetch(API + '?action=verify_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_or_mobile: email, otp: token })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            successCallback();
        } else {
            showToast('⚠️ ' + data.error);
        }
    })
    .catch(() => showToast('⚠️ Verification request failed'));
}

function submitNewPassword() {
    const pwd1 = document.getElementById('forgot-new-pwd').value;
    const pwd2 = document.getElementById('forgot-confirm-pwd').value;

    if (!pwd1 || !pwd2) {
        showToast('Please fill in all password fields');
        return;
    }

    if (pwd1.length < 6) {
        showToast('Password must be at least 6 characters');
        return;
    }

    if (pwd1 !== pwd2) {
        showToast('Passwords do not match');
        return;
    }

    setButtonLoading('btn-pwd-update', true, 'Update Password & Sign In ✓');
    fetch(API + '?action=reset_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_or_mobile: resetIdentity, otp: verifiedResetOtp, new_password: pwd1 })
    })
    .then(res => res.json())
    .then(data => {
        setButtonLoading('btn-pwd-update', false);
        if (data.success) {
            showToast('✓ Password updated successfully!');
            closeForgotModal();
            
            // Clean URL query parameters
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Auto log in with the new password
            document.getElementById('li-em').value = resetIdentity;
            document.getElementById('li-pw').value = pwd1;
            doLogin();
        } else {
            showToast('⚠️ ' + data.error);
        }
    })
    .catch(() => {
        setButtonLoading('btn-pwd-update', false);
        showToast('⚠️ Connection to server failed');
    });
}

function triggerPasswordResetFromSettings() {
    if (!currentUser || !currentUser.email) {
        showToast('⚠️ No email address found for this account.');
        return;
    }
    
    // Find the "Reset →" span in the settings row to show progress
    const resetSpan = document.querySelector('.srow[onclick="triggerPasswordResetFromSettings()"] .srow-r span');
    const originalText = resetSpan ? resetSpan.textContent : 'Reset →';
    
    if (resetSpan) {
        resetSpan.style.pointerEvents = 'none';
        resetSpan.style.opacity = '0.7';
        resetSpan.textContent = 'Sending...';
    }
    
    showToast('Sending password reset link...');
    fetch(API + '?action=forgot_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_or_mobile: currentUser.email })
    })
    .then(res => res.json())
    .then(data => {
        if (resetSpan) {
            resetSpan.style.pointerEvents = 'auto';
            resetSpan.style.opacity = '1';
            resetSpan.textContent = originalText;
        }
        if (data.success) {
            showToast('📧 Reset link sent to ' + data.masked_email);
        } else {
            showToast('⚠️ ' + data.error);
        }
    })
    .catch(() => {
        if (resetSpan) {
            resetSpan.style.pointerEvents = 'auto';
            resetSpan.style.opacity = '1';
            resetSpan.textContent = originalText;
        }
        showToast('⚠️ Connection to server failed');
    });
}

// ════════════════════════════════════
// MOBILE PLAYER STATE SYSTEM
// ════════════════════════════════════
function openMobilePlayer() {
    const mp = document.getElementById('mobilePlayer');
    if (mp) {
        mp.classList.add('open');
        syncMobilePlayer();
    }
}

function closeMobilePlayer() {
    const mp = document.getElementById('mobilePlayer');
    if (mp) {
        mp.classList.remove('open');
    }
}

function syncMobilePlayer() {
    const current = queue[qIdx];
    if (!current) return;

    const mNm = document.getElementById('m-pNm');
    const mAr = document.getElementById('m-pAr');
    const mGenre = document.getElementById('m-pGenre');
    const mLk = document.getElementById('m-pLk');
    const mDisk = document.getElementById('m-pDisk');
    const mShuffle = document.getElementById('m-cbShuffle');
    const mRepeat = document.getElementById('m-cbRepeat');

    if (mNm) mNm.textContent = current.title;
    if (mAr) mAr.textContent = current.artist_name;
    if (mGenre) mGenre.textContent = current.genre || 'Baduga Song';
    if (mLk) {
        const isLiked = likedIds.includes(current.id);
        mLk.classList.toggle('on', isLiked);
    }
    const mPlay = document.getElementById('m-playBtn');
    if (mPlay) {
        mPlay.innerHTML = isPlaying ? PAUSE_ICON : PLAY_ICON;
    }
    if (mDisk) {
        mDisk.classList.toggle('playing', isPlaying);
    }
    if (mShuffle) {
        mShuffle.classList.toggle('on', shuffleOn);
    }
    if (mRepeat) {
        mRepeat.classList.toggle('on', repeatOn);
    }
}

// Legacy contact functions removed - replaced by unified feedback system

// ════════════════════════════════════
// SECURITY HARDENING SYSTEM
// ════════════════════════════════════

// Helper to mask user email or mobile in security watermark
function maskSecurityDetail(str) {
    if (!str) return 'PROTECTED';
    if (str.includes('@')) {
        const [left, right] = str.split('@');
        if (left.length <= 2) return left[0] + '***@' + right;
        return left[0] + '***' + left[left.length - 1] + '@' + right;
    }
    if (/^\d+$/.test(str) && str.length >= 6) {
        return str.slice(0, 2) + '******' + str.slice(-2);
    }
    return str;
}

// 1. Dynamic Watermark Update on Login/Auth Enter
function updateSecurityWatermark() {
    const watermark = document.getElementById('secWatermark');
    if (!watermark) return;
    if (!currentUser) {
        watermark.innerHTML = '';
        return;
    }
    
    // Create gorgeous dynamic watermark pattern utilizing user information
    const rawDetail = currentUser.email || currentUser.mobile || 'Protected';
    const userDetail = maskSecurityDetail(rawDetail).toUpperCase();
    const watermarkText = `${currentUser.name.toUpperCase()} | ${userDetail} | ECHO OF BADUGA SECURE`;
    
    let html = '';
    for (let i = 0; i < 40; i++) {
        html += `<div class="watermark-item">${watermarkText}</div>`;
    }
    watermark.innerHTML = html;
}

// Hook watermark trigger into Enter App
const originalEnterApp = enterApp;
enterApp = function() {
    originalEnterApp();
    updateSecurityWatermark();
};

// 2. Disable Right Click Context Menu
document.addEventListener('contextmenu', e => {
    // Enable right click context menu inside inputs for ease of use
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') {
        return;
    }
    e.preventDefault();
    showToast('⚠️ Security Shield: Actions Restricted');
});

// 3. Block Critical Keyboard Shortcuts & Developer Tools
document.addEventListener('keydown', e => {
    // Block F12 Developer Tools
    if (e.keyCode === 123) {
        e.preventDefault();
        showToast('⚠️ Developer mode is restricted for security');
        return false;
    }
    
    // Block Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Inspect Elements)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        showToast('⚠️ Developer tools are restricted for security');
        return false;
    }
    
    // Block Ctrl+U (View Source Code)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        showToast('⚠️ Source viewing is disabled');
        return false;
    }

    // Block Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        showToast('⚠️ Saving app content offline is blocked');
        return false;
    }

    // Block Ctrl+P (Print Page / Print-to-PDF screenshots)
    if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        showToast('⚠️ Screen printing is restricted');
        return false;
    }

    // Block Ctrl+C (Copy Actions outside forms)
    if (e.ctrlKey && e.keyCode === 67) {
        const tag = e.target.tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
            e.preventDefault();
            showToast('⚠️ Content Copying is Protected');
            return false;
        }
    }

    // Capture PrintScreen Keydown
    if (e.keyCode === 44) {
        e.preventDefault();
        showToast('⚠️ Screenshots are strictly disabled');
        navigator.clipboard.writeText('Protected Content - Echo of Baduga');
        return false;
    }
});

// 4. Clipboard Protection & Anti-Copying Listeners
document.addEventListener('copy', e => {
    const tag = e.target.tagName.toLowerCase();
    if (tag !== 'input' && tag !== 'textarea') {
        e.clipboardData.setData('text/plain', 'Unauthorized copy attempt. Content is fully secured by Echo of Baduga.');
        e.preventDefault();
        showToast('⚠️ Content Copying is Protected');
    }
});

// Disable drag start to prevent dragging audio tiles or images
document.addEventListener('dragstart', e => {
    e.preventDefault();
});

// 5. Window Blur Focus Protection Overlay (Prevents screenshots via app switcher/blur)
window.addEventListener('blur', () => {
    const shield = document.getElementById('blurShield');
    if (shield) shield.classList.add('active');
});

window.addEventListener('focus', () => {
    const shield = document.getElementById('blurShield');
    if (shield) shield.classList.remove('active');
});

// ════════════════════════════════════
// NEON AUDIO VISUALIZER & DYNAMIC BASS PULSE
// ════════════════════════════════════
function startVisualizer() {
    if (isVisualizerRunning) return;
    isVisualizerRunning = true;
    
    const canvas = document.getElementById('mpVisualizer');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const diskGlow = document.getElementById('m-pDiskGlow');
    
    function draw() {
        if (!isVisualizerRunning) return;
        requestAnimationFrame(draw);
        
        if (!analyser || !analyserData) return;
        
        analyser.getByteFrequencyData(analyserData);
        
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = 125; // slightly larger than the 250px disk radius (125px)
        
        ctx.clearRect(0, 0, width, height);
        
        // Compute average/max values for dynamic scaling & neon colors
        let total = 0;
        let bassTotal = 0;
        const length = analyserData.length;
        
        for (let i = 0; i < length; i++) {
            total += analyserData[i];
            if (i < 8) { // first 8 bins represent the deep bass frequencies
                bassTotal += analyserData[i];
            }
        }
        
        const avg = total / length;
        const avgBass = bassTotal / 8;
        
        // ── DYNAMIC BASS PULSE FOR THE DISK GLOW ──
        if (diskGlow) {
            if (isPlaying) {
                // Pulse scale between 1.0 and 1.25 depending on bass level
                const pulseScale = 1 + (avgBass / 255) * 0.25;
                // Pulse opacity between 0.6 and 1.0 depending on overall volume average
                const pulseOpacity = 0.6 + (avg / 255) * 0.4;
                diskGlow.style.transform = `scale(${pulseScale})`;
                diskGlow.style.opacity = pulseOpacity;
            } else {
                diskGlow.style.transform = 'scale(1)';
                diskGlow.style.opacity = '0.8';
            }
        }
        
        // ── DRAW CIRCULAR GLOWING FREQUENCY WAVES ──
        if (isPlaying) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(16, 185, 129, 0.8)'; // emerald visualizer glow
            ctx.lineWidth = 3;
            
            // Neon Emerald Gradient for visualizer lines
            const grad = ctx.createRadialGradient(centerX, centerY, baseRadius, centerX, centerY, baseRadius + 40);
            grad.addColorStop(0, '#34d399'); // light emerald
            grad.addColorStop(1, '#047857'); // deep emerald
            ctx.strokeStyle = grad;
            
            ctx.beginPath();
            const numPoints = 60; // 60 lines radiating outward
            for (let i = 0; i < numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                
                // Map the frequency bin data to the visualizer height
                const dataIndex = Math.floor((i / numPoints) * (length * 0.6)); // focus on lower/mid frequencies
                const val = analyserData[dataIndex] || 0;
                const waveHeight = (val / 255) * 35; // max wave projection of 35px
                
                const startX = centerX + Math.cos(angle) * baseRadius;
                const startY = centerY + Math.sin(angle) * baseRadius;
                const endX = centerX + Math.cos(angle) * (baseRadius + waveHeight);
                const endY = centerY + Math.sin(angle) * (baseRadius + waveHeight);
                
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
            }
            ctx.stroke();
            
            // Draw a secondary inner pulsing ring outline
            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius + (avg / 255) * 10, 0, Math.PI * 2);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
            ctx.stroke();
        }
    }
    
    draw();
}

// ── SWIPE GESTURES FOR MOBILE ALBUM DISK ──
function initMobileGestures() {
    const diskContainer = document.querySelector('.mp-disk-container');
    if (!diskContainer) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    diskContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    diskContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // Ensure horizontal swipe is dominant and exceeds minimum threshold (e.g. 50px)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe Right -> Previous Song
                prevT();
                showToast('✦ Previous Track');
            } else {
                // Swipe Left -> Next Song
                nextT();
                showToast('✦ Next Track');
            }
        }
    }
}

