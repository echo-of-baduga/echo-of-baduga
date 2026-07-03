const fs = require('fs');
const path = require('path');

// Configure source and destination directories
const sourceDir = 'E:\\movies\\music';
const workspaceDir = 'c:\\Users\\ELCOT\\Desktop\\echo of badaga';
const xampHtdocsDir = 'C:\\xampp\\htdocs\\echobaduga';
const xampSongsDir = 'C:\\xampp\\htdocs\\songs';

// Load existing songs from songs_array.js
const localJsPath = path.join(workspaceDir, 'songs_array.js');
let existingSongs = [];
if (fs.existsSync(localJsPath)) {
    try {
        const fileContent = fs.readFileSync(localJsPath, 'utf-8');
        const sandbox = {};
        const fn = new Function('sandbox', fileContent + '; sandbox.DEMO_SONGS = DEMO_SONGS;');
        fn(sandbox);
        existingSongs = sandbox.DEMO_SONGS || [];
        console.log(`Loaded ${existingSongs.length} existing songs from songs_array.js.`);
    } catch (e) {
        console.error('Error parsing songs_array.js:', e);
    }
}

// 1. Gather all existing file sizes on local disk to ensure strict deduplication
const existingSizes = new Set();
const scanLocalSizes = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanLocalSizes(fullPath);
        } else if (item.endsWith('.mp3') || item.endsWith('.m4a')) {
            existingSizes.add(stat.size);
        }
    }
};
scanLocalSizes(path.join(workspaceDir, 'songs'));
scanLocalSizes(xampSongsDir);
console.log(`Gathered ${existingSizes.size} unique existing song file sizes from local storage.`);

// 2. Load upload state cache (for resume capability)
const statePath = path.join(workspaceDir, 'scratch', 'upload_state.json');
if (!fs.existsSync(path.dirname(statePath))) {
    fs.mkdirSync(path.dirname(statePath), { recursive: true });
}
let uploadState = {};
if (fs.existsSync(statePath)) {
    try {
        uploadState = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
        console.log(`Loaded upload state cache with ${Object.keys(uploadState).length} entries.`);
    } catch (e) {
        console.error('Error reading upload_state.json:', e);
    }
}

const saveState = () => {
    fs.writeFileSync(statePath, JSON.stringify(uploadState, null, 2), 'utf-8');
};

// Title Case helper
function toTitleCase(str) {
    return str.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
}

// Filename cleaning logic
function cleanFilename(filename) {
    let base = filename.replace(/\.(mp3|m4a|mp4|wav|aac)$/i, '');

    // Strip common tags
    base = base.replace(/_compressed/gi, '');
    base = base.replace(/\(256k\)/gi, '');
    base = base.replace(/\(128k\)/gi, '');
    base = base.replace(/_160K/gi, '');
    base = base.replace(/\[High quality\]/gi, '');
    base = base.replace(/_dtqknv/gi, '');
    base = base.replace(/_zji8mf/gi, '');
    base = base.replace(/_hcbrir/gi, '');
    base = base.replace(/_fzggwj/gi, '');
    base = base.replace(/_brbszz/gi, '');
    base = base.replace(/_g5hzcg/gi, '');
    base = base.replace(/_ux9qlb/gi, '');
    base = base.replace(/_irmsub/gi, '');
    base = base.replace(/_a0viyi/gi, '');
    base = base.replace(/_aqbp5y/gi, '');
    base = base.replace(/_aqkvpd/gi, '');
    base = base.replace(/_icxwcd/gi, '');
    base = base.replace(/_zfpfxm/gi, '');
    base = base.replace(/_nrraxl/gi, '');
    base = base.replace(/_fueybm/gi, '');
    base = base.replace(/_wduoyl/gi, '');
    base = base.replace(/_xseavl/gi, '');
    base = base.replace(/_kyzir3/gi, '');
    base = base.replace(/_da2myi/gi, '');
    base = base.replace(/_fwg1yy/gi, '');
    base = base.replace(/_v0roco/gi, '');
    base = base.replace(/_g3zfny/gi, '');
    base = base.replace(/_lqlx7k/gi, '');
    base = base.replace(/_q2afab/gi, '');
    base = base.replace(/_ggbcwr/gi, '');
    base = base.replace(/_kdrts7/gi, '');
    base = base.replace(/_o2zh7c/gi, '');
    base = base.replace(/_icx18a/gi, '');
    base = base.replace(/_shkk7l/gi, '');
    base = base.replace(/_ewidzn/gi, '');

    // Extract the English name if Tamil is present in the beginning (e.g., சிங்கார_மல்லே___Singaara_Mallae)
    const englishMatch = base.match(/[a-zA-Z]{3,}[\s\w_'-]*/g);
    if (englishMatch && englishMatch.length > 0) {
        let longest = englishMatch.reduce((a, b) => a.length > b.length ? a : b, '');
        if (longest.trim().length > 3) {
            base = longest;
        }
    }

    // Replace underscores and extra spaces
    base = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();

    // Check if nameless
    const isNameless = /^(?:\d+|=|\s|track|videoplayback|jujujuju|Track\d+|video\d+)*$/i.test(base);
    if (isNameless || base.length < 2) {
        return { title: 'Song Play', artist: 'Baduga Artist', nameless: true };
    }

    let title = base;
    let artist = 'Baduga Artist';

    // Parse Artist from Dividers
    const parts = base.split(/\s+-\s+|\s+_\s+|\s{2,}/);
    if (parts.length > 1) {
        title = parts[0].trim();
        let possibleArtist = parts[1].trim();
        possibleArtist = possibleArtist.replace(/by\s+/gi, '').trim();
        if (possibleArtist.length > 2 && !/^(unknown|artist|baduga|badaga)$/i.test(possibleArtist)) {
            artist = possibleArtist;
        }
    }

    // Strip leading track numbers
    title = title.replace(/^\d+\s+/, '').trim();

    // Strip common endings
    title = title.replace(/(?:Baduga|Badaga)?\s*(?:New)?\s*(?:Love)?\s*(?:Video|Album|Devotional)?\s*(?:Song|Video|Lyrical|Full|Drama|Rare)*$/gi, '');
    title = title.replace(/[^\x00-\x7F]/g, ''); // strip emoji
    title = title.trim();

    if (title.length < 2) {
        title = 'Song Play';
    }

    title = toTitleCase(title);
    artist = toTitleCase(artist);

    return { title, artist, nameless: false };
}

// Genre classification logic
function getGenre(filename, title) {
    const combined = (filename + ' ' + title).toLowerCase();

    if (combined.includes('ayyappan') || combined.includes('hethai') || combined.includes('hethay') || combined.includes('hetheya') || combined.includes('hethega') || combined.includes('hethey') || combined.includes('amman') || combined.includes('bugiriya') || combined.includes('dhoopathata') || combined.includes('eragali') || combined.includes('devotional')) {
        return 'Devotional';
    }

    if (combined.includes('marriage') || combined.includes('madhuvae') || combined.includes('madhuvaendhu') || combined.includes('mathuveya') || combined.includes('college') || combined.includes('semmanuru') || combined.includes('hatty ya suthuva')) {
        return 'Marriage Hits';
    }

    if (combined.includes('sad') || combined.includes('kaneer') || combined.includes('kaneeru') || combined.includes('kanikai') || combined.includes('kanneruna') || combined.includes('kanneradu') || combined.includes('kanna neera')) {
        return 'Sad';
    }

    if (combined.includes('band') || combined.includes('bugiri')) {
        return 'Band';
    }

    if (combined.includes('evergreen')) {
        return 'Evergreen';
    }

    if (combined.includes('melody')) {
        return 'Melody';
    }

    if (combined.includes('love') || combined.includes('anna') || combined.includes('annatha') || combined.includes('kanasey') || combined.includes('radhe') || combined.includes('roja') || combined.includes('singaranae') || combined.includes('singaariyea') || combined.includes('muthuna') || combined.includes('sweet kaara') || combined.includes('nela baggi') || combined.includes('doiii') || combined.includes('gena') || combined.includes('chittuna') || combined.includes('hello')) {
        return 'Love';
    }

    return 'Melody';
}

const genreEmojiMap = {
    'Devotional': '\\u{1F64F}',
    'Evergreen': '\\u{1F332}',
    'Love': '\\u{1F496}',
    'Sad': '\\u{1F343}',
    'Melody': '\\u{1F3B5}',
    'Marriage Hits': '\\u{1F48D}',
    'Band': '\\u{1F3B6}'
};

// Catbox Upload Helper
async function uploadToCatbox(filePath) {
    const fileName = path.basename(filePath);
    const blob = new Blob([fs.readFileSync(filePath)], { type: 'audio/mpeg' });
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', blob, fileName);

    const response = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`Catbox upload failed: ${response.statusText}`);
    }

    const text = await response.text();
    return text.trim();
}

async function uploadWithRetry(filePath, retries = 3, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`  Uploading ${path.basename(filePath)} (Attempt ${i + 1}/${retries})...`);
            const url = await uploadToCatbox(filePath);
            if (url.startsWith('https://files.catbox.moe/')) {
                return url;
            }
            throw new Error(`Invalid response from Catbox: ${url}`);
        } catch (err) {
            console.error(`  Error uploading: ${err.message}`);
            if (i === retries - 1) throw err;
            console.log(`  Waiting ${delay / 1000}s before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// 3. Scan the source directory recursively
const scanSourceFiles = (dir, filesList = []) => {
    if (!fs.existsSync(dir)) return filesList;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanSourceFiles(fullPath, filesList);
        } else if (item.endsWith('.mp3') || item.endsWith('.m4a')) {
            filesList.push({
                filePath: fullPath,
                fileName: item,
                size: stat.size
            });
        }
    }
    return filesList;
};

async function main() {
    console.log(`Scanning source folder: ${sourceDir}`);
    const sourceFiles = scanSourceFiles(sourceDir);
    console.log(`Found ${sourceFiles.length} audio files in source.`);

    const newSongs = [];
    const processedSizesInBatch = new Set();
    let idCounter = Math.max(...existingSongs.map(s => s.id), 99) + 1;

    let skippedDuplicateCount = 0;

    for (let i = 0; i < sourceFiles.length; i++) {
        const file = sourceFiles[i];
        console.log(`\n[${i + 1}/${sourceFiles.length}] Checking: ${file.fileName} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);

        // Check if size exists on local disk already or processed in this batch
        if (existingSizes.has(file.size) || processedSizesInBatch.has(file.size)) {
            console.log(`  > Skipping duplicate file. Size ${file.size} already exists in app database/files.`);
            skippedDuplicateCount++;
            continue;
        }

        // Parse title and artist
        const clean = cleanFilename(file.fileName);
        const genre = getGenre(file.fileName, clean.title);

        console.log(`  Cleaned: "${clean.title}" by "${clean.artist}" [Genre: ${genre}]`);

        // Safe URL filename for local copy
        const safeTitle = clean.title.replace(/[^a-zA-Z0-9\s\-\.]/g, '').replace(/\s+/g, ' ').trim();
        const ext = path.extname(file.filePath);
        let safeName = `${safeTitle}${ext}`;

        // Local paths inside workspace songs folder
        const localGenreDir = path.join(workspaceDir, 'songs', genre.toLowerCase().replace(/\s+/g, ''));
        if (!fs.existsSync(localGenreDir)) {
            fs.mkdirSync(localGenreDir, { recursive: true });
        }
        let localDestPath = path.join(localGenreDir, safeName);
        let copyCounter = 1;
        while (fs.existsSync(localDestPath)) {
            safeName = `${safeTitle} (${copyCounter})${ext}`;
            localDestPath = path.join(localGenreDir, safeName);
            copyCounter++;
        }

        // Copy locally to workspace songs folder
        fs.copyFileSync(file.filePath, localDestPath);
        console.log(`  Copied locally to workspace: ${path.relative(workspaceDir, localDestPath)}`);

        // Copy to XAMPP songs directory if available
        const xampGenreDir = path.join(xampSongsDir, genre.toLowerCase().replace(/\s+/g, ''));
        if (fs.existsSync(xampSongsDir)) {
            if (!fs.existsSync(xampGenreDir)) {
                fs.mkdirSync(xampGenreDir, { recursive: true });
            }
            const xampDestPath = path.join(xampGenreDir, safeName);
            fs.copyFileSync(file.filePath, xampDestPath);
            console.log(`  Copied locally to XAMPP: ${xampDestPath}`);
        }

        // 4. Catbox Upload (using/updating cache)
        const cacheKey = `${file.filePath}_${file.size}`;
        let catboxUrl = '';
        if (uploadState[cacheKey]) {
            console.log(`  [CACHE HIT] Catbox URL: ${uploadState[cacheKey]}`);
            catboxUrl = uploadState[cacheKey];
        } else {
            catboxUrl = await uploadWithRetry(file.filePath);
            uploadState[cacheKey] = catboxUrl;
            saveState();
            console.log(`  [UPLOADED] Catbox URL: ${catboxUrl}`);
        }

        // Register in metadata array
        newSongs.push({
            id: idCounter,
            title: clean.title,
            artist_name: clean.artist,
            cover_emoji: genreEmojiMap[genre] || '\\u{1F3B5}',
            duration: '3:45',
            like_count: Math.floor(Math.random() * 4900) + 100,
            genre: genre,
            file_url: catboxUrl
        });

        idCounter++;
        processedSizesInBatch.add(file.size);
    }

    console.log(`\nImport complete. Skipped ${skippedDuplicateCount} duplicates. Added ${newSongs.length} new songs.`);

    if (newSongs.length > 0) {
        // Merge lists
        const mergedSongs = [...existingSongs, ...newSongs];
        
        // Write the songs_array.js content format
        const jsLines = mergedSongs.map(s => {
            return `    {\n` +
                   `        id: ${s.id},\n` +
                   `        title: "${s.title}",\n` +
                   `        artist_name: "${s.artist_name}",\n` +
                   `        cover_emoji: "${s.cover_emoji}",\n` +
                   `        duration: "${s.duration}",\n` +
                   `        like_count: ${s.like_count},\n` +
                   `        genre: "${s.genre}",\n` +
                   `        file_url: "${s.file_url}"\n` +
                   `    }`;
        }).join(',\n');
        
        const finalContent = `const DEMO_SONGS = [\n${jsLines}\n];\n`;

        // Save to workspace
        fs.writeFileSync(localJsPath, finalContent, 'utf-8');
        console.log(`Successfully updated ${localJsPath}`);

        // Save to XAMPP echobaduga
        const xampJsPath = path.join(xampHtdocsDir, 'songs_array.js');
        if (fs.existsSync(xampHtdocsDir)) {
            fs.writeFileSync(xampJsPath, finalContent, 'utf-8');
            console.log(`Successfully updated ${xampJsPath}`);
        }

        // 5. Trigger database sync endpoint on XAMPP (if running)
        console.log('\nTriggering MySQL Database sync...');
        try {
            const syncResponse = await fetch('http://localhost/echobaduga/api/api.php?action=import_from_js');
            if (syncResponse.ok) {
                const result = await syncResponse.json();
                console.log('Database Sync Result:', result);
            } else {
                console.log(`Could not connect to local MySQL (status: ${syncResponse.status}). That is fine since we support 100% online fallback.`);
            }
        } catch (e) {
            console.log('Local MySQL server is offline/not running. That is perfectly fine; the app will stream online directly using songs_array.js!');
        }
    } else {
        console.log('No new songs to append to songs_array.js.');
    }
}

main().catch(console.error);
