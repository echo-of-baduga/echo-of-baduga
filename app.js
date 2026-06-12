// ════════════════════════════════════════════════════════════════
// Echo of Baduga — Complete Application Engine
// ════════════════════════════════════════════════════════════════

// ── CONFIG ──
// ── CONFIG ──
const PRODUCTION_URL = 'https://echo-of-baduga.github.io/echo-of-baduga'; // Your live custom domain hosting
const API = (window.Capacitor || window.location.origin.startsWith('file://')) ? `${PRODUCTION_URL}/api/api.php` : 'api/api.php';

// ── SUPABASE CONFIG ──
const supabaseUrl = 'https://iwkyfdhmbkhlpfgybsry.supabase.co';
const supabaseKey = 'sb_publishable_UyIEXHFzRqrtXS5WDdPogw_xRhEzrs3';
let eo_supabase = null;
if (window.supabase) {
    try {
        eo_supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    } catch (err) {
        console.error("Supabase client initialization failed:", err);
    }
}

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

function supabaseTimeout(promise, timeoutMs = 6000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("Database request timed out"));
        }, timeoutMs);
        
        promise.then(
            (res) => {
                clearTimeout(timer);
                resolve(res);
            },
            (err) => {
                clearTimeout(timer);
                reject(err);
            }
        );
    });
}

// Safe eo_localStorage helper for restricted environments (Incognito, Safari private mode, restricted WebViews)
let myLocalStorage = window.localStorage;
try {
    const testKey = '__eo_storage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
} catch (e) {
    console.warn("localStorage is blocked or unavailable. Falling back to memory storage.");
    const memStore = {};
    myLocalStorage = {
        getItem: (key) => memStore[key] || null,
        setItem: (key, val) => { memStore[key] = String(val); },
        removeItem: (key) => { delete memStore[key]; },
        clear: () => { for (let key in memStore) delete memStore[key]; }
    };
}
const eo_localStorage = myLocalStorage;

let currentUser = null;
let localUsers = JSON.parse(eo_localStorage.getItem('eo_users') || '[]');
let likedIds = JSON.parse(eo_localStorage.getItem('eo_likes') || '[]');
let recentIds = JSON.parse(eo_localStorage.getItem('eo_recent') || '[]');

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
const SPINNER_ICON = `<svg viewBox="0 0 24 24" class="svg-spinner" style="width:24px; height:24px; color:var(--acc);"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="38 18"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></circle></svg>`;
let isBuffering = false;
let songs = [];
let queue = [];
let qIdx = 0;
let isPlaying = false;
let shuffleOn = true;
let repeatOn = false;

// ── WEB MEDIA SESSION HELPERS ──
let mediaSessionHandlersRegistered = false;

function updateMediaSession(song) {
    if (!song) return;
    if ('mediaSession' in navigator) {
        try {
            const basePath = window.location.origin + window.location.pathname.replace(/index\.html|player\.html/g, '');
            const logoUrl = basePath + 'assets/logo.png';
            
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.title,
                artist: song.artist_name || 'Baduga Artist',
                album: 'Echo of Baduga',
                artwork: [
                    { src: logoUrl, sizes: '96x96', type: 'image/png' },
                    { src: logoUrl, sizes: '128x128', type: 'image/png' },
                    { src: logoUrl, sizes: '192x192', type: 'image/png' },
                    { src: logoUrl, sizes: '256x256', type: 'image/png' },
                    { src: logoUrl, sizes: '384x384', type: 'image/png' },
                    { src: logoUrl, sizes: '512x512', type: 'image/png' }
                ]
            });
            
            navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
            
            setupMediaSessionHandlers();
            updatePositionState();
        } catch (e) {
            console.warn("Failed to update media session:", e);
        }
    }
}

function setupMediaSessionHandlers() {
    if (mediaSessionHandlersRegistered) return;
    if ('mediaSession' in navigator) {
        try {
            navigator.mediaSession.setActionHandler('play', () => {
                if (!isPlaying) {
                    togPlay();
                }
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                if (isPlaying) {
                    togPlay();
                }
            });
            navigator.mediaSession.setActionHandler('previoustrack', () => {
                prevT();
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                nextT();
            });
            navigator.mediaSession.setActionHandler('seekto', (details) => {
                if (details.seekTime !== undefined && audio.duration) {
                    audio.currentTime = details.seekTime;
                    updatePositionState();
                }
            });
            mediaSessionHandlersRegistered = true;
        } catch (e) {
            console.warn("Failed to register Media Session handlers:", e);
        }
    }
}

function updatePositionState() {
    if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
        try {
            if (audio.duration && !isNaN(audio.duration) && audio.currentTime !== undefined && !isNaN(audio.currentTime)) {
                navigator.mediaSession.setPositionState({
                    duration: audio.duration,
                    playbackRate: audio.playbackRate || 1.0,
                    position: audio.currentTime
                });
            }
        } catch (e) {
            console.warn("Failed to set position state:", e);
        }
    }
}

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
    'Marriage Hits': 'linear-gradient(135deg, #ec4899, #be185d)',
    'Band': 'linear-gradient(135deg, #7c3aed, #a855f7)',
};

// ════════════════════════════════════
// SPLASH → AUTH FLOW
// ════════════════════════════════════
function initApp() {
    // Check if already logged in
    const savedUser = eo_localStorage.getItem('eo_currentUser');
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
        const splashEl = document.getElementById('splash');
        if (splashEl) splashEl.classList.remove('active');
        
        if (currentUser && action !== 'reset_password') {
            enterApp();
            showToast('Welcome back, ' + currentUser.name + '! ✦');
        } else {
            const authEl = document.getElementById('auth');
            if (authEl) authEl.classList.add('active');
            
            // If action is reset_password, open the Forgot Password modal directly to Step 3
            if (action === 'reset_password' && email && token) {
                resetIdentity = email;
                verifiedResetOtp = token;
                
                openForgotModal();
                const step1 = document.getElementById('forgotStep1');
                const step2 = document.getElementById('forgotStep2');
                const step3 = document.getElementById('forgotStep3');
                const stepSub = document.getElementById('forgotStepSub');
                if (step1) step1.style.display = 'none';
                if (step2) step2.style.display = 'none';
                if (step3) step3.style.display = 'flex';
                if (stepSub) stepSub.textContent = 'Create a secure new password for your account.';
            }
        }
    }, 2800);

    // Password strength & suggestion setup
    const suPwInput = document.getElementById('su-pw');
    if (suPwInput) {
        suPwInput.addEventListener('focus', () => {
            generateAndShowSuggestedPwd();
        });
        suPwInput.addEventListener('input', () => {
            updatePwdStrength(suPwInput.value);
        });
        suPwInput.addEventListener('blur', () => {
            setTimeout(() => {
                const boxEl = document.getElementById('pwd-suggestion-box');
                if (boxEl && document.activeElement !== suPwInput) {
                    boxEl.style.display = 'none';
                }
            }, 200);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}


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

async function doLogin() {
    const em = document.getElementById('li-em').value.trim();
    const pw = document.getElementById('li-pw').value;
    const errEl = document.getElementById('loginErr');

    if (!em || !pw) {
        errEl.textContent = 'Please fill in all fields';
        errEl.style.display = 'block';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    
    if (!emailRegex.test(em) && !phoneRegex.test(em)) {
        errEl.textContent = 'Please enter a valid Email address or Mobile number';
        errEl.style.display = 'block';
        return;
    }

    if (eo_supabase) {
        setButtonLoading('btn-do-login', true, 'Sign In &#8594;', 'Signing In...');
        try {
            let mobileWithPrefix = em;
            if (/^[0-9]{10}$/.test(em)) {
                mobileWithPrefix = '+91' + em;
            }
            const { data: users, error } = await supabaseTimeout(
                eo_supabase.rpc('login_user', {
                    p_email_or_mobile: em,
                    p_password: pw
                })
            );
            setButtonLoading('btn-do-login', false);
            if (error) throw error;

            if (users && users.length > 0) {
                const u = users[0];
                currentUser = {
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    mobile: u.mobile || '',
                    initial: u.name.charAt(0).toUpperCase()
                };
                eo_localStorage.setItem('eo_currentUser', JSON.stringify(currentUser));
                
                // Sync locally
                const localUsersList = JSON.parse(eo_localStorage.getItem('eo_users') || '[]');
                const idx = localUsersList.findIndex(x => x.email.toLowerCase() === u.email.toLowerCase());
                const uWithPass = { ...u, password: pw };
                if (idx >= 0) localUsersList[idx] = uWithPass;
                else localUsersList.push(uWithPass);
                eo_localStorage.setItem('eo_users', JSON.stringify(localUsersList));
                localUsers = localUsersList;

                errEl.style.display = 'none';
                document.getElementById('auth').classList.remove('active');
                enterApp();
                showToast('Welcome back, ' + currentUser.name + '! ✦');
            } else {
                errEl.textContent = 'Account not found. Please Sign Up first.';
                errEl.style.display = 'block';
            }
        } catch (err) {
            setButtonLoading('btn-do-login', false);
            console.warn("Supabase query failed, falling back to local:", err);
            fallbackLocalLogin(em, pw, errEl);
        }
    } else {
        fallbackLocalLogin(em, pw, errEl);
    }
}

function fallbackLocalLogin(em, pw, errEl) {
    const normalizedEm = em.toLowerCase();
    const user = localUsers.find(u => 
        (u.email && u.email.toLowerCase() === normalizedEm) || 
        (u.mobile && (u.mobile === em || u.mobile === '+91' + em || u.mobile.replace('+91', '') === em.replace('+91', '')))
    );
    if (user && (user.password === pw)) {
        currentUser = user;
        eo_localStorage.setItem('eo_currentUser', JSON.stringify(user));
        errEl.style.display = 'none';
        document.getElementById('auth').classList.remove('active');
        enterApp();
        showToast('Welcome back (Offline), ' + currentUser.name + '! ✦');
    } else {
        errEl.textContent = 'Account not found. Please Sign Up first.';
        errEl.style.display = 'block';
    }
}

async function doSignup() {
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
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(em)) {
        errEl.textContent = 'Please enter a valid email address';
        errEl.style.display = 'block';
        return;
    }

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

    if (eo_supabase) {
        setButtonLoading('btn-do-signup', true, 'Create Account &#8594;', 'Signing Up...');
        try {
            const { data: existCheck, error: checkErr } = await supabaseTimeout(
                eo_supabase.rpc('check_user_exists', {
                    p_email: em,
                    p_mobile: formattedMobile
                })
            );
            if (checkErr) throw checkErr;
            if (existCheck && existCheck.length > 0) {
                const check = existCheck[0];
                if (check.email_exists) {
                    setButtonLoading('btn-do-signup', false);
                    errEl.textContent = 'Email already exists';
                    errEl.style.display = 'block';
                    return;
                }
                if (check.mobile_exists) {
                    setButtonLoading('btn-do-signup', false);
                    errEl.textContent = 'Mobile number already registered';
                    errEl.style.display = 'block';
                    return;
                }
            }
            
            const { data: newUser, error: err3 } = await supabaseTimeout(
                eo_supabase.rpc('register_user', {
                    p_name: nm,
                    p_email: em,
                    p_mobile: formattedMobile,
                    p_password: pw
                })
            );
            setButtonLoading('btn-do-signup', false);
            if (err3) throw err3;
            
            // Cache locally
            const localUsersList = JSON.parse(eo_localStorage.getItem('eo_users') || '[]');
            localUsersList.push({ name: nm, email: em, mobile: formattedMobile, password: pw });
            eo_localStorage.setItem('eo_users', JSON.stringify(localUsersList));
            localUsers = localUsersList;

            errEl.style.display = 'none';
            swAuth('login');
            document.getElementById('li-em').value = em;
            document.getElementById('li-pw').value = '';
            
            // Clear signup fields
            document.getElementById('su-nm').value = '';
            document.getElementById('su-em').value = '';
            document.getElementById('su-mobile').value = '';
            document.getElementById('su-pw').value = '';
            
            showToast('Account registered successfully! Please sign in. ✦');
        } catch (err) {
            setButtonLoading('btn-do-signup', false);
            console.warn("Supabase signup failed, falling back to local:", err);
            fallbackLocalSignup(nm, em, formattedMobile, pw, errEl);
        }
    } else {
        fallbackLocalSignup(nm, em, formattedMobile, pw, errEl);
    }
}

function fallbackLocalSignup(nm, em, formattedMobile, pw, errEl) {
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
    eo_localStorage.setItem('eo_users', JSON.stringify(localUsers));
        
        errEl.style.display = 'none';
        swAuth('login');
        document.getElementById('li-em').value = em;
        document.getElementById('li-pw').value = '';
        
        document.getElementById('su-nm').value = '';
        document.getElementById('su-em').value = '';
        document.getElementById('su-mobile').value = '';
        document.getElementById('su-pw').value = '';
        showToast('Account registered locally (Offline)! Please sign in. ✦');
}

function logout() {
    // Stop audio immediately upon logging out
    try {
        audio.pause();
        audio.src = '';
        isPlaying = false;
        updatePlayBtn();
    } catch (e) {}

    currentUser = null;
    eo_localStorage.removeItem('eo_currentUser');
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
    const qCol = eo_localStorage.getItem('eo_queue_collapsed');
    const shell = document.querySelector('.shell');
    if (qCol === 'yes' && shell && window.innerWidth > 1024) {
        shell.classList.add('queue-collapsed');
    }

    // Initialize settings from eo_localStorage
    const alertsEnabled = eo_localStorage.getItem('eo_alerts') !== 'off';
    const alertTog = document.getElementById('alertTog');
    if (alertTog) {
        alertTog.classList.toggle('on', alertsEnabled);
    }
    
    const historyEnabled = eo_localStorage.getItem('eo_history_enabled') !== 'off';
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
    const historyEnabled = eo_localStorage.getItem('eo_history_enabled') !== 'off';
    if (historyEnabled) {
        recentIds = recentIds.filter(r => r !== song.id);
        recentIds.unshift(song.id);
        if (recentIds.length > 50) recentIds = recentIds.slice(0, 50);
        eo_localStorage.setItem('eo_recent', JSON.stringify(recentIds));
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
    const songAlertsEnabled = eo_localStorage.getItem('eo_alerts') !== 'off';
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

    // Update Media Session for lock screen & notifications
    updateMediaSession(song);
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
    if (btn) {
        if (isBuffering && isPlaying) {
            btn.innerHTML = SPINNER_ICON;
        } else {
            btn.innerHTML = isPlaying ? PAUSE_ICON : PLAY_ICON;
        }
    }
    const pArt = document.getElementById('pArt');
    if (pArt) {
        if (isPlaying && !isBuffering) pArt.classList.add('spin');
        else pArt.classList.remove('spin');
    }
    renderQueue();

    // Sync mobile player
    syncMobilePlayer();

    // Sync Media Session playback state
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
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

    // Update Media Session progress position
    updatePositionState();
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

audio.addEventListener('waiting', () => {
    isBuffering = true;
    updatePlayBtn();
});

audio.addEventListener('playing', () => {
    isBuffering = false;
    updatePlayBtn();
});

audio.addEventListener('canplay', () => {
    isBuffering = false;
    updatePlayBtn();
});

audio.addEventListener('loadstart', () => {
    isBuffering = true;
    updatePlayBtn();
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
    eo_localStorage.setItem('eo_likes', JSON.stringify(likedIds));

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
    const history = JSON.parse(eo_localStorage.getItem('eo_search_history') || '[]');
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
    let history = JSON.parse(eo_localStorage.getItem('eo_search_history') || '[]');
    history = history.filter(h => h.toLowerCase() !== query.toLowerCase());
    history.unshift(query);
    if (history.length > 5) history = history.slice(0, 5);
    eo_localStorage.setItem('eo_search_history', JSON.stringify(history));
}

function clearSearchHistory(event) {
    if (event) event.stopPropagation();
    eo_localStorage.removeItem('eo_search_history');
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

    eo_localStorage.setItem('eo_theme', body.dataset.theme);
}

// Restore theme
(function () {
    const saved = eo_localStorage.getItem('eo_theme') || 'dark';
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
        eo_localStorage.setItem('eo_currentUser', JSON.stringify(currentUser));

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
    eo_localStorage.setItem('eo_alerts', enabled ? 'on' : 'off');
    showToast(enabled ? 'New song alerts enabled' : 'New song alerts disabled');
}

function toggleHistorySetting(el) {
    el.classList.toggle('on');
    const enabled = el.classList.contains('on');
    eo_localStorage.setItem('eo_history_enabled', enabled ? 'on' : 'off');
    showToast(enabled ? 'Listening history enabled' : 'Listening history disabled');
    
    if (!enabled) {
        eo_localStorage.removeItem('eo_recent');
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
            eo_localStorage.setItem('eo_queue_collapsed', shell.classList.contains('queue-collapsed') ? 'yes' : 'no');
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
    
    // Prefill name and email if logged in, but keep them editable in case of typos
    const nameInput = document.getElementById('fb-name');
    const emailInput = document.getElementById('fb-email');
    if (currentUser) {
        nameInput.value = currentUser.name || '';
        emailInput.value = currentUser.email || '';
    } else {
        nameInput.value = '';
        emailInput.value = '';
    }
    nameInput.disabled = false;
    emailInput.disabled = false;
    nameInput.style.opacity = '1';
    emailInput.style.opacity = '1';
    
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

async function submitFeedback() {
    const name = document.getElementById('fb-name').value.trim() || 'Guest';
    const email = document.getElementById('fb-email').value.trim();
    const message = document.getElementById('fb-message').value.trim();

    if (!email) {
        showToast('Please enter your email address');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address');
        return;
    }

    if (!message && currentFeedbackType !== 'rating') {
        showToast('Please fill in details / message');
        return;
    }

    const payload = {
        type: currentFeedbackType,
        name: name,
        email: email,
        message: message || '',
        user_id: currentUser ? currentUser.id : 0
    };

    if (currentFeedbackType === 'rating') {
        payload.rating = currentFeedbackRating;
    }

    const submitTextEl = document.getElementById('fb-submit-text');
    const submitIconEl = document.getElementById('fb-submit-icon');
    const originalText = submitTextEl ? submitTextEl.textContent : 'Send Message';
    const originalIcon = submitIconEl ? submitIconEl.textContent : '📬';
    
    setButtonLoading('btn-fb-submit', true, `<span id="fb-submit-icon">${originalIcon}</span> <span id="fb-submit-text">${originalText}</span>`, 'Submitting...');

    // Post feedback to PHP API backend to send emails
    try {
        const response = await fetch(API + '?action=feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        
        if (data.success) {
            // Background sync to Supabase if defined
            if (eo_supabase) {
                eo_supabase.from('feedback').insert([payload]).catch(e => console.warn("Background Supabase feedback fail:", e));
            }
            setButtonLoading('btn-fb-submit', false);
            showToast('✓ Submitted successfully!');
            renderFeedbackSuccessStep();
        } else {
            throw new Error(data.error || 'Server error');
        }
    } catch (err) {
        console.warn("Feedback API failed, trying Supabase:", err);
        if (eo_supabase) {
            try {
                const { error } = await supabaseTimeout(
                    eo_supabase.from('feedback').insert([payload])
                );
                setButtonLoading('btn-fb-submit', false);
                if (error) throw error;
                showToast('✓ Feedback submitted online (Supabase)!');
                renderFeedbackSuccessStep();
            } catch (supErr) {
                fallbackLocalFeedback(payload);
            }
        } else {
            fallbackLocalFeedback(payload);
        }
    }
}

function fallbackLocalFeedback(payload) {
    setButtonLoading('btn-fb-submit', false);
    const feedbackList = JSON.parse(eo_localStorage.getItem('eo_feedback') || '[]');
    feedbackList.push({
        id: Date.now(),
        payload: payload
    });
    eo_localStorage.setItem('eo_feedback', JSON.stringify(feedbackList));
    showToast('✓ Saved locally (Offline)!');
    renderFeedbackSuccessStep();
}

function renderFeedbackSuccessStep() {
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
    
    document.getElementById('fb-form-fields').style.display = 'none';
    document.getElementById('fb-success-step').style.display = 'flex';
    document.getElementById('fb-message').value = '';
    currentFeedbackRating = 0;
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

function setButtonLoading(btnElOrId, isLoading, originalHtml, loadingText = 'Sending...') {
    const btn = (typeof btnElOrId === 'string') ? document.getElementById(btnElOrId) : btnElOrId;
    if (!btn) return;
    if (isLoading) {
        btn.disabled = true;
        btn.style.opacity = '0.7';
        btn.style.cursor = 'not-allowed';
        btn.dataset.originalHtml = originalHtml || btn.innerHTML;
        btn.innerHTML = `<span class="mini-spin" style="display:inline-block; width:12px; height:12px; border:2px solid rgba(255,255,255,0.3); border-radius:50%; border-top-color:#fff; animation:spin 0.8s linear infinite; margin-right:6px; vertical-align:middle;"></span> ${loadingText}`;
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

async function sendResetOtp() {
    const ident = document.getElementById('forgot-identity').value.trim();
    if (!ident) {
        showToast('Please enter your Email or Mobile');
        return;
    }

    setButtonLoading('btn-send-reset', true, 'Send Reset Link →', 'Sending...');
    try {
        const response = await fetch(API + '?action=forgot_password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_or_mobile: ident })
        });
        const data = await response.json();
        setButtonLoading('btn-send-reset', false);

        if (data.success) {
            resetIdentity = data.delivery_target || ident;
            // The token is sent in the link. When page loads with that token, it is used
            showToast('✓ Reset email sent successfully!');

            document.getElementById('forgotStepSub').textContent = 'Check your email inbox or spam folder.';
            document.getElementById('forgotStep1').style.display = 'none';
            document.getElementById('forgotStep2').style.display = 'flex';

            const successMsgEl = document.getElementById('forgotStep2Msg');
            if (successMsgEl) {
                successMsgEl.innerHTML = `📩 <strong>Reset Email Sent!</strong><br><br>
                We have sent a secure password reset link to your registered email:<br>
                <strong style="color: var(--acc);">${data.masked_email || ident}</strong><br><br>
                Please check your Inbox and Spam/Junk folder. Click the link in that email to reset your password.<br><br>
                <span style="font-size: 11px; opacity: 0.7;">Note: The link is valid for 1 hour.</span>`;
            }
        } else {
            showToast('⚠️ ' + (data.error || 'Failed to send reset link'));
        }
    } catch (err) {
        console.warn("Forgot password API failed, trying Supabase fallback:", err);
        if (eo_supabase) {
            try {
                let mobileWithPrefix = ident;
                if (/^[0-9]{10}$/.test(ident)) {
                    mobileWithPrefix = '+91' + ident;
                }
                const { data: users, error } = await supabaseTimeout(
                    eo_supabase.rpc('request_password_reset', {
                        p_identity: ident
                    })
                );
                setButtonLoading('btn-send-reset', false);
                if (error) throw error;

                if (users && users.length > 0) {
                    const u = users[0];
                    resetIdentity = u.email;
                    verifiedResetOtp = 'supabase_reset_token';
                    showToast('✓ Reset link generated! (Supabase)');
                    
                    document.getElementById('forgotStepSub').textContent = 'Reset link has been generated.';
                    document.getElementById('forgotStep1').style.display = 'none';
                    document.getElementById('forgotStep2').style.display = 'flex';
                    
                    const successMsgEl = document.getElementById('forgotStep2Msg');
                    const localResetLink = window.location.origin + window.location.pathname + `?action=reset_password&email=${encodeURIComponent(u.email)}&token=supabase_reset_token`;
                    if (successMsgEl) {
                        successMsgEl.innerHTML = `📩 <strong>Reset Link Generated!</strong><br><br>
                        Since the mail server is bypassed, please click the secure link below to reset your password:<br><br>
                        <a href="${localResetLink}" style="color:var(--acc); font-size:12px; word-break:break-all; font-weight:bold; text-decoration:underline;">${localResetLink}</a>`;
                    }
                } else {
                    showToast('⚠️ Account not found. Please Sign Up first.');
                }
            } catch (supErr) {
                fallbackLocalSendResetOtp(ident);
            }
        } else {
            fallbackLocalSendResetOtp(ident);
        }
    }
}

function fallbackLocalSendResetOtp(ident) {
    setButtonLoading('btn-send-reset', false);
    const normalizedEm = ident.toLowerCase();
    const user = localUsers.find(u => 
        (u.email && u.email.toLowerCase() === normalizedEm) || 
        (u.mobile && (u.mobile === ident || u.mobile === '+91' + ident || u.mobile.replace('+91', '') === ident.replace('+91', '')))
    );
    if (user) {
        resetIdentity = ident;
        verifiedResetOtp = 'local_reset_token';
        showToast('✓ Reset link generated locally! (Offline)');
        
        document.getElementById('forgotStepSub').textContent = 'Reset link has been generated locally.';
        document.getElementById('forgotStep1').style.display = 'none';
        document.getElementById('forgotStep2').style.display = 'flex';
        
        const successMsgEl = document.getElementById('forgotStep2Msg');
        const localResetLink = window.location.origin + window.location.pathname + `?action=reset_password&email=${encodeURIComponent(ident)}&token=local_reset_token`;
        if (successMsgEl) {
            successMsgEl.innerHTML = `📲 <strong>Offline Reset Mode!</strong><br><br>Since the online database is unreachable, we have generated your password reset link locally:<br><br>
            <a href="${localResetLink}" style="color:var(--acc); font-size:12px; word-break:break-all; font-weight:bold; text-decoration:underline;">${localResetLink}</a><br><br>
            Click the link above to proceed with resetting your password!`;
        }
    } else {
        showToast('⚠️ Local account not found. Please Sign Up first.');
    }
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

async function submitNewPassword() {
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

    setButtonLoading('btn-pwd-update', true, 'Update Password & Sign In ✓', 'Updating...');

    // If it's a supabase bypass token
    if (verifiedResetOtp === 'supabase_reset_token') {
        if (eo_supabase) {
            try {
                const { error } = await supabaseTimeout(
                    eo_supabase.rpc('reset_user_password', {
                        p_email: resetIdentity,
                        p_new_password: pwd1
                    })
                );
                setButtonLoading('btn-pwd-update', false);
                if (error) throw error;
                syncLocalPassword(pwd1);
                showToast('✓ Password updated successfully!');
                closeForgotModal();
                window.history.replaceState({}, document.title, window.location.pathname);
                document.getElementById('li-em').value = resetIdentity;
                document.getElementById('li-pw').value = pwd1;
                doLogin();
            } catch (err) {
                fallbackLocalSubmitNewPassword(pwd1);
            }
        } else {
            fallbackLocalSubmitNewPassword(pwd1);
        }
    } else if (verifiedResetOtp === 'local_reset_token') {
        fallbackLocalSubmitNewPassword(pwd1);
    } else {
        // Real PHP API token update!
        try {
            const response = await fetch(API + '?action=reset_password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email_or_mobile: resetIdentity,
                    otp: verifiedResetOtp,
                    new_password: pwd1
                })
            });
            const data = await response.json();
            setButtonLoading('btn-pwd-update', false);

            if (data.success) {
                // Background sync to Supabase if available
                if (eo_supabase) {
                    eo_supabase.rpc('reset_user_password', {
                        p_email: resetIdentity,
                        p_new_password: pwd1
                    }).catch(() => {});
                }
                syncLocalPassword(pwd1);
                showToast('✓ Password updated successfully!');
                closeForgotModal();
                window.history.replaceState({}, document.title, window.location.pathname);
                document.getElementById('li-em').value = resetIdentity;
                document.getElementById('li-pw').value = pwd1;
                doLogin();
            } else {
                showToast('⚠️ ' + (data.error || 'Password update failed'));
            }
        } catch (err) {
            console.error("Forgot password reset API failed:", err);
            setButtonLoading('btn-pwd-update', false);
            showToast('⚠️ Connection to password reset server failed');
        }
    }
}

function syncLocalPassword(pwd1) {
    const localUsersList = JSON.parse(eo_localStorage.getItem('eo_users') || '[]');
    const idx = localUsersList.findIndex(x => x.email.toLowerCase() === resetIdentity.toLowerCase());
    if (idx >= 0) {
        localUsersList[idx].password = pwd1;
        eo_localStorage.setItem('eo_users', JSON.stringify(localUsersList));
        localUsers = localUsersList;
    }
}

function fallbackLocalSubmitNewPassword(pwd1) {
    setButtonLoading('btn-pwd-update', false);
    const normalizedEm = resetIdentity.toLowerCase();
    const users = JSON.parse(eo_localStorage.getItem('eo_users') || '[]');
    const idx = users.findIndex(u => 
        (u.email && u.email.toLowerCase() === normalizedEm) || 
        (u.mobile && (u.mobile === resetIdentity || u.mobile === '+91' + resetIdentity || u.mobile.replace('+91', '') === resetIdentity.replace('+91', '')))
    );
    if (idx >= 0) {
        users[idx].password = pwd1;
        eo_localStorage.setItem('eo_users', JSON.stringify(users));
        localUsers = users;
        
        showToast('✓ Password updated locally! (Offline)');
        closeForgotModal();
        window.history.replaceState({}, document.title, window.location.pathname);
        
        document.getElementById('li-em').value = resetIdentity;
        document.getElementById('li-pw').value = pwd1;
        doLogin();
    } else {
        showToast('⚠️ Local account not found. Please Sign Up first.');
    }
}


function triggerPasswordResetFromSettings() {
    if (!currentUser || !currentUser.email) {
        showToast('⚠️ No email address found for this account.');
        return;
    }
    
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
            showToast('✓ Reset email sent to ' + currentUser.email);
        } else {
            showToast('⚠️ ' + (data.error || 'Failed to send reset email'));
        }
    })
    .catch(() => {
        if (resetSpan) {
            resetSpan.style.pointerEvents = 'auto';
            resetSpan.style.opacity = '1';
            resetSpan.textContent = originalText;
        }
        showToast('⚠️ Server connection failed. Trying local reset...');
        setTimeout(() => {
            fallbackLocalTriggerPasswordReset();
        }, 1500);
    });
}

function fallbackLocalTriggerPasswordReset() {
    const user = localUsers.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (user) {
        const localResetLink = window.location.origin + window.location.pathname + `?action=reset_password&email=${encodeURIComponent(currentUser.email)}&token=local_reset_token`;
        showToast('✓ Local reset link generated! Redirecting...');
        setTimeout(() => {
            window.location.href = localResetLink;
        }, 1500);
    } else {
        showToast('⚠️ Local account not found. Please Sign Up first.');
    }
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
        if (isBuffering && isPlaying) {
            mPlay.innerHTML = SPINNER_ICON;
        } else {
            mPlay.innerHTML = isPlaying ? PAUSE_ICON : PLAY_ICON;
        }
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

// ── PASSWORD SUGGESTION & STRENGTH GENERATOR ──
function generateAndShowSuggestedPwd() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let pwd = "";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    const spec = "!@#$%^&*()_+~|}{[]:;?><,./-=";
    
    pwd += upper[Math.floor(Math.random() * upper.length)];
    pwd += lower[Math.floor(Math.random() * lower.length)];
    pwd += num[Math.floor(Math.random() * num.length)];
    pwd += spec[Math.floor(Math.random() * spec.length)];
    
    for (let i = 4; i < 12; i++) {
        pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Shuffle
    pwd = pwd.split('').sort(() => 0.5 - Math.random()).join('');
    
    const textEl = document.getElementById('suggested-pwd-text');
    const boxEl = document.getElementById('pwd-suggestion-box');
    if (textEl && boxEl) {
        textEl.textContent = pwd;
        boxEl.style.display = 'block';
    }
}

function applySuggestedPwd() {
    const suPwInput = document.getElementById('su-pw');
    const textEl = document.getElementById('suggested-pwd-text');
    const boxEl = document.getElementById('pwd-suggestion-box');
    if (suPwInput && textEl) {
        suPwInput.value = textEl.textContent;
        suPwInput.dispatchEvent(new Event('input'));
        showToast('Suggested password applied! ✦');
        if (boxEl) boxEl.style.display = 'none';
    }
}

function updatePwdStrength(val) {
    const bar = document.getElementById('pw-strength-bar');
    const label = document.getElementById('pw-strength-label');
    const container = document.getElementById('pw-strength-container');
    
    if (!container) return;
    
    if (!val) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    
    let color = '#ff4466';
    let text = 'Weak 🔴';
    let width = '20%';
    
    if (score >= 4) {
        color = '#10b981';
        text = 'Strong 💪';
        width = '100%';
    } else if (score >= 2) {
        color = '#f59e0b';
        text = 'Medium 🟡';
        width = '60%';
    }
    
    if (bar && label) {
        bar.style.backgroundColor = color;
        bar.style.width = width;
        label.textContent = text;
        label.style.color = color;
    }
}

