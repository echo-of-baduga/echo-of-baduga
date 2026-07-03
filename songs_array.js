const DEMO_SONGS = [
    {
        "id": 100,
        "title": "Amma Hethey",
        "artist_name": "Amma",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1021,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/cez8tm.mp3"
    },
    {
        "id": 101,
        "title": "Hethey Karune",
        "artist_name": "Amma",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2721,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/yughnm.mp3"
    },
    {
        "id": 103,
        "title": "Anna",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4737,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/snxjw6.mp3"
    },
    {
        "id": 104,
        "title": "Kanasey Mitchaluna Gava Lyrical Video",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1341,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/qc7140.mp3"
    },
    {
        "id": 105,
        "title": "Aanandha Ayyappa",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2348,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/b9wr8i.mp3"
    },
    {
        "id": 106,
        "title": "Aaseya Aruve",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3520,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/2g5cna.mp3"
    },
    {
        "id": 107,
        "title": "Bere Yena",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1924,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/2gvul4.mp3"
    },
    {
        "id": 108,
        "title": "Dhara Ava Dhara",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 180,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ykwd54.mp3"
    },
    {
        "id": 109,
        "title": "Dhoorono Thooralu",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1461,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/qs03de.mp3"
    },
    {
        "id": 110,
        "title": "Enna Male Ena",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3480,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/gn38r9.mp3"
    },
    {
        "id": 111,
        "title": "Eraduna Manasu",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3100,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/wwjy8h.mp3"
    },
    {
        "id": 113,
        "title": "Hathe Noda Beda Nae",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2293,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/deuq1g.mp3"
    },
    {
        "id": 114,
        "title": "Kannumani",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 202,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/9ub9c4.mp3"
    },
    {
        "id": 115,
        "title": "Karisi Emmayu",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4715,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ed86lm.mp3"
    },
    {
        "id": 116,
        "title": "Kichuna Beesalu",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 842,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/2ov8dg.mp3"
    },
    {
        "id": 117,
        "title": "Kivi Orana",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 368,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/tgar7b.mp3"
    },
    {
        "id": 118,
        "title": "Mai Akki",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 923,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/i2wkhv.mp3"
    },
    {
        "id": 119,
        "title": "Malligoona Gamalu",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1282,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/howwpw.mp3"
    },
    {
        "id": 120,
        "title": "Maneyoge Jannalu",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4773,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/k6eh5w.mp3"
    },
    {
        "id": 121,
        "title": "Maradhoraiyo",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3163,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/86qb5y.mp3"
    },
    {
        "id": 122,
        "title": "Nattamaneya",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4322,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/p32nm1.mp3"
    },
    {
        "id": 123,
        "title": "Nethi Neruna",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4213,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/2mlk3t.mp3"
    },
    {
        "id": 124,
        "title": "Radhe",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 136,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/6xdajd.mp3"
    },
    {
        "id": 125,
        "title": "Radhiyae",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1951,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/p68k3s.mp3"
    },
    {
        "id": 126,
        "title": "Urigithaney",
        "artist_name": "Gowtham",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 655,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/eicsv9.mp3"
    },
    {
        "id": 127,
        "title": "Belliya Meenu",
        "artist_name": "Udhaya Devan",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4595,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/jhxsek.mp3"
    },
    {
        "id": 128,
        "title": "Kanneeruna Katheya",
        "artist_name": "Udhaya Devan",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 363,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ebkdxn.mp3"
    },
    {
        "id": 129,
        "title": "Nenapu Ondhu Nenjunogae",
        "artist_name": "Udhaya Devan",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3581,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/sjx1n9.mp3"
    },
    {
        "id": 130,
        "title": "Nenjuna Nenappu",
        "artist_name": "Udhaya Devan",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2264,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/3rujb3.mp3"
    },
    {
        "id": 131,
        "title": "Ninna Nenasu",
        "artist_name": "Udhaya Devan",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4481,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/p1d0lm.mp3"
    },
    {
        "id": 132,
        "title": "Uttuga Radhi",
        "artist_name": "Udhaya Devan",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2237,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/b98041.mp3"
    },
    {
        "id": 133,
        "title": "Yethakaru",
        "artist_name": "Udhaya Devan",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2921,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/u0r98h.mp3"
    },
    {
        "id": 134,
        "title": "Kanna Muchi Oraguley Ne",
        "artist_name": "Vishak",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4712,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/2ascqp.mp3"
    },
    {
        "id": 135,
        "title": "Keppu Chudi",
        "artist_name": "Vishak",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 154,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/472fs3.mp3"
    },
    {
        "id": 136,
        "title": "Negae Moga Rani",
        "artist_name": "Vishak",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1264,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/8mqtf7.mp3"
    },
    {
        "id": 137,
        "title": "Ora Kannuna",
        "artist_name": "Vishak",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1639,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/eq6pbs.mp3"
    },
    {
        "id": 138,
        "title": "Thirigi Thirigi Nodi",
        "artist_name": "Vishak",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2510,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/dqha39.mp3"
    },
    {
        "id": 139,
        "title": "Band 1",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎺",
        "duration": "3:45",
        "like_count": 4371,
        "genre": "Beatzz",
        "file_url": "https://files.catbox.moe/qvjnxh.mp3"
    },
    {
        "id": 140,
        "title": "Band 2",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎺",
        "duration": "3:45",
        "like_count": 3727,
        "genre": "Beatzz",
        "file_url": "https://files.catbox.moe/49jz4j.mp3"
    },
    {
        "id": 141,
        "title": "Band 3",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎺",
        "duration": "3:45",
        "like_count": 2340,
        "genre": "Beatzz",
        "file_url": "https://files.catbox.moe/usgf51.mp3"
    },
    {
        "id": 142,
        "title": "Band 4",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎺",
        "duration": "3:45",
        "like_count": 888,
        "genre": "Beatzz",
        "file_url": "https://files.catbox.moe/29wnyl.mp3"
    },
    {
        "id": 143,
        "title": "Band 5",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎺",
        "duration": "3:45",
        "like_count": 2845,
        "genre": "Beatzz",
        "file_url": "https://files.catbox.moe/6cxym5.mp3"
    },
    {
        "id": 144,
        "title": "Aaralutti Areyaa Jaama",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3003,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/1zvaos.mp3"
    },
    {
        "id": 145,
        "title": "Aaralutti",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 485,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/keukr5.mp3"
    },
    {
        "id": 146,
        "title": "Aariraroo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 239,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/9atrox.mp3"
    },
    {
        "id": 147,
        "title": "Aeleya Bole Oodhu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 473,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/nbu7c1.mp3"
    },
    {
        "id": 148,
        "title": "Aenena Endhaleyu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 644,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/2tvz0q.mp3"
    },
    {
        "id": 149,
        "title": "Alli Maadhi Elli Kaambe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1572,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/c7yv9g.mp3"
    },
    {
        "id": 150,
        "title": "Anaena",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3527,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/uf49oe.mp3"
    },
    {
        "id": 151,
        "title": "Anneyakaarana Mane Aalaagali",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3284,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/dmyhdg.mp3"
    },
    {
        "id": 152,
        "title": "Anneyakara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3877,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/lvignc.mp3"
    },
    {
        "id": 153,
        "title": "Anniyakaarana Annaa Thammaru (2)",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 530,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/jm9nde.mp3"
    },
    {
        "id": 154,
        "title": "Attamane Haalendhega",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3620,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/uca1k7.mp3"
    },
    {
        "id": 155,
        "title": "Attiya Ibba Iyyanellave",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4063,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/qqiu0m.mp3"
    },
    {
        "id": 156,
        "title": "Avve Neenu Avva Beda",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4372,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/mru0tm.mp3"
    },
    {
        "id": 157,
        "title": "Badhikkinendhu Badabandi Eththi Hullada Raman",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 944,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/yt95k9.mp3"
    },
    {
        "id": 158,
        "title": "Bal9 Avveya Gava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1260,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/i5f7me.mp3"
    },
    {
        "id": 159,
        "title": "Bannadha Baane L. Krishnan",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4072,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/wolkva.mp3"
    },
    {
        "id": 160,
        "title": "Banuna Manjadadhe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2629,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/60r39b.mp3"
    },
    {
        "id": 161,
        "title": "Banunaunnave",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2095,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/raipzt.mp3"
    },
    {
        "id": 162,
        "title": "Beesuvagaye",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3064,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/9v6rph.mp3"
    },
    {
        "id": 163,
        "title": "Bellingiriya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2799,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/s1l9e2.mp3"
    },
    {
        "id": 164,
        "title": "Belliyathomeenu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3116,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/a610zy.mp3"
    },
    {
        "id": 165,
        "title": "Bettu Maakke Nee Idhdheththavaa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1718,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/bbieid.mp3"
    },
    {
        "id": 166,
        "title": "Bhaavadha Bhaava Baralatty",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4942,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/846ec0.mp3"
    },
    {
        "id": 167,
        "title": "Ellidhdhe Jogi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 302,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/t73zyy.mp3"
    },
    {
        "id": 168,
        "title": "Enna Pattadha Raajaga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2861,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/xgp6lg.mp3"
    },
    {
        "id": 169,
        "title": "Enna Ranu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3429,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/5t2vvq.mp3"
    },
    {
        "id": 170,
        "title": "Enna Ayya Pandu Ranga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4246,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/s6l48l.mp3"
    },
    {
        "id": 171,
        "title": "Enna Muththuna Maaththi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1457,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/bzgwwe.mp3"
    },
    {
        "id": 172,
        "title": "Enna Muththuna Raani",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1836,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/3yxpsn.mp3"
    },
    {
        "id": 173,
        "title": "Ennu Makkuve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1793,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/0qvykp.mp3"
    },
    {
        "id": 174,
        "title": "Ennu Mathi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 619,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/skwfjz.mp3"
    },
    {
        "id": 175,
        "title": "Ettundhokattitha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 359,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/8agv8n.mp3"
    },
    {
        "id": 176,
        "title": "Ganda Koodi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2389,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/fkt47y.mp3"
    },
    {
        "id": 177,
        "title": "Ganjikke Kukkeya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3575,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/o7hua3.mp3"
    },
    {
        "id": 178,
        "title": "Ganjikke Kukkeyaa L. Krishnan",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2297,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/8yszfh.mp3"
    },
    {
        "id": 179,
        "title": "Gasattalae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 480,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/4zca9g.mp3"
    },
    {
        "id": 180,
        "title": "Gili Gili",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4273,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/ew99qi.mp3"
    },
    {
        "id": 181,
        "title": "Gille Gille",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1086,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/49snel.mp3"
    },
    {
        "id": 182,
        "title": "Guvedha Kakke",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 584,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/rkus83.mp3"
    },
    {
        "id": 183,
        "title": "Halaya Mane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3668,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/t6be0h.mp3"
    },
    {
        "id": 184,
        "title": "Indhu Anja Beda",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1282,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/1dshpe.mp3"
    },
    {
        "id": 185,
        "title": "Indhu Dhodda",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1975,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/k4mdwm.mp3"
    },
    {
        "id": 186,
        "title": "Indhu Kettana Appa Maaththi More Jogi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 459,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/5d1qii.mp3"
    },
    {
        "id": 187,
        "title": "Iridhundoppa Thari Manega",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2510,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/rqmd9y.mp3"
    },
    {
        "id": 188,
        "title": "Iridhundoppa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3473,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/c6txlb.mp3"
    },
    {
        "id": 189,
        "title": "Jena Ondhu Adadhe Hullada Raman",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 386,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/6rexag.mp3"
    },
    {
        "id": 190,
        "title": "Kaaduga Kanniyae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1521,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/j90hfr.mp3"
    },
    {
        "id": 191,
        "title": "Kaaduna Ibba Kiliye",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4913,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/tubam9.mp3"
    },
    {
        "id": 192,
        "title": "Kaala Olladha Kaaladhoge Baralatty",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3840,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/tarcqz.mp3"
    },
    {
        "id": 193,
        "title": "Kaala Thandha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2118,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/bwrd13.mp3"
    },
    {
        "id": 194,
        "title": "Kabbuna Kaththiya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1674,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/eum34w.mp3"
    },
    {
        "id": 195,
        "title": "Kademaneya Kaththudhoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4260,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/mfucem.mp3"
    },
    {
        "id": 196,
        "title": "Kakkamalli Aneya Mannuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 261,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/fra3wn.mp3"
    },
    {
        "id": 197,
        "title": "Kalladipaduva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4671,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/pevjit.mp3"
    },
    {
        "id": 198,
        "title": "Kandha Savadheya Eththi Bannane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4599,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/4z7cxe.mp3"
    },
    {
        "id": 199,
        "title": "Kanna Neera",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3009,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/d5apn6.mp3"
    },
    {
        "id": 200,
        "title": "Kannamuchi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2507,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/fw70dz.mp3"
    },
    {
        "id": 201,
        "title": "Kanneera",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3526,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/rbw9r2.mp3"
    },
    {
        "id": 202,
        "title": "Kanneeruna Nera",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 473,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/xcy02x.mp3"
    },
    {
        "id": 203,
        "title": "Karuma Kaala",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2102,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/nqsvl1.mp3"
    },
    {
        "id": 204,
        "title": "Kaththuva Dheevige",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3085,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/7vasa3.mp3"
    },
    {
        "id": 205,
        "title": "Kattidha Kalluna Kotte",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2956,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/a6mwu6.mp3"
    },
    {
        "id": 206,
        "title": "Kattidha Kotte",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4702,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/sldw0v.mp3"
    },
    {
        "id": 207,
        "title": "Kattidha Maneyu Kaali Edhaga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 880,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/y0ssnz.mp3"
    },
    {
        "id": 208,
        "title": "Kettana Appa Bala Sevana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3921,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/rqcq6n.mp3"
    },
    {
        "id": 209,
        "title": "Kettana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4761,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/0nmzk3.mp3"
    },
    {
        "id": 210,
        "title": "Kettodhane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1203,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/7k3an8.mp3"
    },
    {
        "id": 211,
        "title": "Koda Bedane",
        "artist_name": "Oyilatti Chandra",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 681,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/3bff1s.mp3"
    },
    {
        "id": 212,
        "title": "Koppa Mada Beda",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 506,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/rmsv06.mp3"
    },
    {
        "id": 213,
        "title": "Madhuve Oppa Mange Nee",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2411,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/0vtg9e.mp3"
    },
    {
        "id": 214,
        "title": "Majjige Thatteyaa Hullada Raman",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2408,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/ij3nyp.mp3"
    },
    {
        "id": 215,
        "title": "Majjige",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3753,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/m87esm.mp3"
    },
    {
        "id": 216,
        "title": "Mallu Manderaya2",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4795,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/qan2b6.mp3"
    },
    {
        "id": 217,
        "title": "Mamma",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4301,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/vkxbto.mp3"
    },
    {
        "id": 218,
        "title": "Manasunillaadha Osane Ella",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4811,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/u0puch.mp3"
    },
    {
        "id": 219,
        "title": "Mandey Meley Ibba",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 946,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/njd832.mp3"
    },
    {
        "id": 220,
        "title": "Manju Mora Baekkilenavve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3955,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/tw9v66.mp3"
    },
    {
        "id": 221,
        "title": "Mannuna Mane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4681,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/rqal7v.mp3"
    },
    {
        "id": 222,
        "title": "Mundhana Mundhana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 900,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/5nasch.mp3"
    },
    {
        "id": 223,
        "title": "Muththuna Malle",
        "artist_name": "Pasupathi",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3115,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/kii76r.mp3"
    },
    {
        "id": 224,
        "title": "Muthuna Mallae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1831,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/frg5ts.mp3"
    },
    {
        "id": 225,
        "title": "Mutthu Makkae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 309,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/at10mj.mp3"
    },
    {
        "id": 226,
        "title": "Na Ena Maduvae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3713,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/9a0p44.mp3"
    },
    {
        "id": 227,
        "title": "Na Madidha Pappa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2627,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/imrmys.mp3"
    },
    {
        "id": 228,
        "title": "Na Madidha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1716,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/cuy8pw.mp3"
    },
    {
        "id": 229,
        "title": "Naa Maadidha Paapa Aenane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1969,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/c9mg8n.mp3"
    },
    {
        "id": 230,
        "title": "Naa Madhuve Bandh Hullada",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3402,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/7tnd67.mp3"
    },
    {
        "id": 231,
        "title": "Naa Madhuve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1546,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/qxpr43.mp3"
    },
    {
        "id": 232,
        "title": "Naa Odiyae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4387,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/fjinzc.mp3"
    },
    {
        "id": 233,
        "title": "Naanu Hone",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3912,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/zwmc2z.mp3"
    },
    {
        "id": 234,
        "title": "Nadukkattuna Saakka Uttu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3061,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/4qhchp.mp3"
    },
    {
        "id": 235,
        "title": "Ninna Manasu Nondhava Hullada",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1663,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/5zw48e.mp3"
    },
    {
        "id": 236,
        "title": "Ninna Mammanella2",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1453,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/et4fk0.mp3"
    },
    {
        "id": 237,
        "title": "O Ennu Bhava Jogi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1082,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/e707f1.mp3"
    },
    {
        "id": 238,
        "title": "O Somee",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 598,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/d1ppst.mp3"
    },
    {
        "id": 239,
        "title": "O Somiye",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2463,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/xkav1v.mp3"
    },
    {
        "id": 240,
        "title": "Oh Enna Bava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 1503,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/1uzpju.mp3"
    },
    {
        "id": 241,
        "title": "Oh Somiyae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4718,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/3wisgi.mp3"
    },
    {
        "id": 242,
        "title": "Ole Kattine Mamma",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 622,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/itiw86.mp3"
    },
    {
        "id": 243,
        "title": "Ondhu Gudi Kattidhe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4518,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/tvjb31.mp3"
    },
    {
        "id": 244,
        "title": "Oraginidhane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3654,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/2ysuqu.mp3"
    },
    {
        "id": 245,
        "title": "Oththuga Manjuththa Muchchira",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3546,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/xr3gdo.mp3"
    },
    {
        "id": 246,
        "title": "Panguni Sokpiv",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4194,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/vipxzq.mp3"
    },
    {
        "id": 247,
        "title": "Pattanaga Hogi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4784,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/nr5ww8.mp3"
    },
    {
        "id": 248,
        "title": "Sandhena Jaamadhoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2353,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/2vldc9.mp3"
    },
    {
        "id": 249,
        "title": "Sathiya Sodhanai",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 3084,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/j4q33t.mp3"
    },
    {
        "id": 250,
        "title": "Sathoppane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2742,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/c7iadn.mp3"
    },
    {
        "id": 251,
        "title": "Saththu Kirichdhi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 953,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/fypddq.mp3"
    },
    {
        "id": 252,
        "title": "Siribikkeya Seemeyoge Baralatty",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4973,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/frh7hg.mp3"
    },
    {
        "id": 253,
        "title": "Siviluththu Kadadhu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 357,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/gelds7.mp3"
    },
    {
        "id": 254,
        "title": "Thanneerun Thamare Oove",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 2864,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/p92brg.mp3"
    },
    {
        "id": 255,
        "title": "Udugu Jogi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 4792,
        "genre": "Bhajan",
        "file_url": "https://files.catbox.moe/r55ht0.mp3"
    },
    {
        "id": 256,
        "title": "Aalakeru Hada",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2865,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/k33m3x.mp3"
    },
    {
        "id": 257,
        "title": "Aanandha Ayyappa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2916,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/78ofvm.mp3"
    },
    {
        "id": 258,
        "title": "Ana Gava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1348,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/0f2is3.mp3"
    },
    {
        "id": 259,
        "title": "Aragara Enthu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4429,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/gg9k5i.mp3"
    },
    {
        "id": 260,
        "title": "Baa Enna Iyya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4308,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/gx7zpu.mp3"
    },
    {
        "id": 261,
        "title": "Om Shiva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 646,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/23s1k6.mp3"
    },
    {
        "id": 262,
        "title": "Bannadha Beesalu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4432,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/z71ta5.mp3"
    },
    {
        "id": 263,
        "title": "Bebbaenu Hethey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4567,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/3dap1z.mp3"
    },
    {
        "id": 264,
        "title": "Belle Ennegerae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2983,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/f1r7ko.mp3"
    },
    {
        "id": 265,
        "title": "Dhukka Bappa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4215,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/g05b9c.mp3"
    },
    {
        "id": 266,
        "title": "Edhu Bandhiya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4910,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/n2tsx4.mp3"
    },
    {
        "id": 267,
        "title": "Ellidhae Hethey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3280,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/twf1s6.mp3"
    },
    {
        "id": 268,
        "title": "Ellidhae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 791,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/p3tgoc.mp3"
    },
    {
        "id": 269,
        "title": "Ellithey Rama",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1666,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/kozv51.mp3"
    },
    {
        "id": 270,
        "title": "Enna Kena Kavalai Iumxut",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1857,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/1ij6ba.mp3"
    },
    {
        "id": 271,
        "title": "Eragali",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4848,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/o7w9hu.mp3"
    },
    {
        "id": 272,
        "title": "Ethe Atha Banthiya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 285,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/6xg8ww.mp3"
    },
    {
        "id": 273,
        "title": "Etthae Etthae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2187,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/dfjt1o.mp3"
    },
    {
        "id": 274,
        "title": "Guruvae Saranam",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2742,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/xydhx1.mp3"
    },
    {
        "id": 275,
        "title": "Haalu Keru Alla Ella Isjubb",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4287,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/e73me9.mp3"
    },
    {
        "id": 277,
        "title": "Halla Bikkey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4228,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/cpwgc1.mp3"
    },
    {
        "id": 278,
        "title": "Haraharanae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3962,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/bupo8v.mp3"
    },
    {
        "id": 279,
        "title": "Hethaya Nama",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4410,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/xi4ei5.mp3"
    },
    {
        "id": 280,
        "title": "Hethaya Padha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3970,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/79dbri.mp3"
    },
    {
        "id": 281,
        "title": "Hethe Amma Ninna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4362,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/hbmuki.mp3"
    },
    {
        "id": 282,
        "title": "Hethe Hethe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2218,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/t4b66u.mp3"
    },
    {
        "id": 283,
        "title": "Hethey Hethey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2760,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/m3ob3j.mp3"
    },
    {
        "id": 284,
        "title": "Hethey Ninna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 960,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/rcv1cv.mp3"
    },
    {
        "id": 285,
        "title": "Kai Yethi Muguthey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4507,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/f28l18.mp3"
    },
    {
        "id": 286,
        "title": "Kaiyethi Mugatheyo Ganapathiye",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1827,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/qrsggb.mp3"
    },
    {
        "id": 287,
        "title": "Karisi Emmayu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2635,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/ed86lm.mp3"
    },
    {
        "id": 288,
        "title": "Kode Malae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 769,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/8w1mr9.mp3"
    },
    {
        "id": 289,
        "title": "Maalinga Iyyana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4043,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/pbrte4.mp3"
    },
    {
        "id": 290,
        "title": "Madheswaraaa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2027,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/fq016j.mp3"
    },
    {
        "id": 291,
        "title": "Malligae Maalae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 844,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/h5wxv3.mp3"
    },
    {
        "id": 292,
        "title": "Manasaara Yeguvo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2322,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/xlwken.mp3"
    },
    {
        "id": 293,
        "title": "Manayae Marathothu Muruga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2713,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/qt8067.mp3"
    },
    {
        "id": 294,
        "title": "Marajalliya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1115,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/kgdwue.mp3"
    },
    {
        "id": 295,
        "title": "Maravathiley",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1308,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/p4aup2.mp3"
    },
    {
        "id": 296,
        "title": "Mayadhakanne Baa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3960,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/qqcsrt.mp3"
    },
    {
        "id": 297,
        "title": "Mooru Loga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1595,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/65xfl8.MP3"
    },
    {
        "id": 298,
        "title": "Nanga Hathay Eramasi S.L.Ravi Nanjanad",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4120,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/yl0w6k.mp3"
    },
    {
        "id": 299,
        "title": "Niruguva Ooru Thogae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2344,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/0vb9no.mp3"
    },
    {
        "id": 300,
        "title": "Onthu Sinnatha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3307,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/w1ot8i.mp3"
    },
    {
        "id": 301,
        "title": "Ooru Olaga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4327,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/1mifrn.mp3"
    },
    {
        "id": 302,
        "title": "Oo Hatti Mannuga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1760,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/0l3i7u.mp3"
    },
    {
        "id": 303,
        "title": "Puniya Boomi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 106,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/7lxi92.mp3"
    },
    {
        "id": 304,
        "title": "Punniyakathi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3304,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/d20tj3.mp3"
    },
    {
        "id": 305,
        "title": "Sarana Eagivo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1718,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/8d87bz.mp3"
    },
    {
        "id": 306,
        "title": "Saranam Saranam Guruve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3925,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/73b6p3.mp3"
    },
    {
        "id": 307,
        "title": "Sariyadha Kootatha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1023,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/tqb90a.mp3"
    },
    {
        "id": 308,
        "title": "Sathiyavadha Hethe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2759,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/16l2az.mp3"
    },
    {
        "id": 309,
        "title": "Seemae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1376,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/wixclu.mp3"
    },
    {
        "id": 310,
        "title": "Selayagi Thoruva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1871,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/zhaiqg.mp3"
    },
    {
        "id": 311,
        "title": "Shivalingayya Logesh Koderi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3063,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/7e8lr9.mp3"
    },
    {
        "id": 312,
        "title": "Sikkidatha Mandekaara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 103,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/do8q1t.mp3"
    },
    {
        "id": 313,
        "title": "Sinnadha Kode",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3759,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/h3b3bj.mp3"
    },
    {
        "id": 314,
        "title": "Sinnatha Kodaiya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1568,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/vec321.mp3"
    },
    {
        "id": 315,
        "title": "Thatti Betha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2283,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/xeigkd.mp3"
    },
    {
        "id": 316,
        "title": "Thondhi Ganapathy",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3317,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/hvsaw0.mp3"
    },
    {
        "id": 317,
        "title": "Uthamadevi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3284,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/0rakip.mp3"
    },
    {
        "id": 318,
        "title": "Aalamora",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 4071,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/ogi9m5.mp3"
    },
    {
        "id": 319,
        "title": "Aalodappu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 4286,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/e62c6p.mp3"
    },
    {
        "id": 320,
        "title": "Aandama Kaiyu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 2629,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/o4e3qg.mp3"
    },
    {
        "id": 321,
        "title": "Aladha Moravae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 1910,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/s7rka7.mp3"
    },
    {
        "id": 322,
        "title": "Alli Thoovaya Chinnatha Koda",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 1174,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/gb2i9p.mp3"
    },
    {
        "id": 323,
        "title": "Annaippane Udhayadevan",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 792,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/udixo5.mp3"
    },
    {
        "id": 324,
        "title": "Anthu Baratha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 328,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/2esq5j.mp3"
    },
    {
        "id": 325,
        "title": "Arathoppa Neere",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 2833,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/i7873z.mp3"
    },
    {
        "id": 326,
        "title": "Baanuna Manjae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 3632,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/ht9219.mp3"
    },
    {
        "id": 327,
        "title": "Dhevarellidho",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 1958,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/4gpof8.mp3"
    },
    {
        "id": 328,
        "title": "Enna Muthuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 4563,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/1gipu6.mp3"
    },
    {
        "id": 329,
        "title": "Gamaluna Hoo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 798,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/allf9h.mp3"
    },
    {
        "id": 330,
        "title": "Hattale Bappane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 811,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/269s2p.mp3"
    },
    {
        "id": 331,
        "title": "Idhu Kathalae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 1485,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/c0h0fv.mp3"
    },
    {
        "id": 332,
        "title": "Jaama Jaama",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 446,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/0zvx1s.mp3"
    },
    {
        "id": 333,
        "title": "Kanna Thandha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 3472,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/t0a9ov.mp3"
    },
    {
        "id": 334,
        "title": "Kannerembathu Nera Illatha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 2730,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/x2v33d.mp3"
    },
    {
        "id": 335,
        "title": "Kattila Suthi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 801,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/jkmqns.mp3"
    },
    {
        "id": 336,
        "title": "Makka Mogaga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 1681,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/qre0r3.mp3"
    },
    {
        "id": 337,
        "title": "Manju Baanuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 1783,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/z8d687.mp3"
    },
    {
        "id": 338,
        "title": "Moga Muchi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 665,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/3yeg0v.mp3"
    },
    {
        "id": 339,
        "title": "Nellu Bathava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 4666,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/09d8qo.mp3"
    },
    {
        "id": 340,
        "title": "Ninna Gaenanae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 517,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/4m89ty.mp3"
    },
    {
        "id": 341,
        "title": "Ohh Endru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 1024,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/irlt3l.mp3"
    },
    {
        "id": 342,
        "title": "Ohh Ennu Mummy",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 4251,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/q5bmzc.mp3"
    },
    {
        "id": 343,
        "title": "Ohh Ennuu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎤",
        "duration": "3:45",
        "like_count": 2755,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/6u666m.mp3"
    },
    {
        "id": 344,
        "title": "Anna Manasu Beetha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1569,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/rglc86.mp3"
    },
    {
        "id": 345,
        "title": "Annaippane Udhayadevan",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 482,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/udixo5.mp3"
    },
    {
        "id": 346,
        "title": "Annatha Anna",
        "artist_name": "Ctn Chandran",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1521,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/yxqh6o.mp3"
    },
    {
        "id": 347,
        "title": "Baanuna Hunnave",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1575,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/jvav6o.mp3"
    },
    {
        "id": 348,
        "title": "Manja Thinguva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 990,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/ymz2sp.mp3"
    },
    {
        "id": 349,
        "title": "Ninna Unipillatha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1827,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/l2o0hw.mp3"
    },
    {
        "id": 350,
        "title": "Kanneruna Kadhaeya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 502,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/yqi8jl.mp3"
    },
    {
        "id": 351,
        "title": "Paarijadha Hoove Nee",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 924,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/haipao.mp3"
    },
    {
        "id": 352,
        "title": "Bappa Bodhavara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 3306,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/ba7mlv.mp3"
    },
    {
        "id": 353,
        "title": "Battuga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1526,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/hyuzh8.mp3"
    },
    {
        "id": 354,
        "title": "Cinnaanogey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 811,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/csu13k.mp3"
    },
    {
        "id": 355,
        "title": "Enna Usarae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 4192,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/ovgnyc.mp3"
    },
    {
        "id": 356,
        "title": "Ennu Nodi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 4687,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/555t9t.mp3"
    },
    {
        "id": 357,
        "title": "Hulikkal Roja",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2604,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/g43h6b.mp3"
    },
    {
        "id": 358,
        "title": "Jena Jenagu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2770,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/ycixya.mp3"
    },
    {
        "id": 359,
        "title": "Kaala Jena (1) (1)",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1634,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/io2ncs.mp3"
    },
    {
        "id": 360,
        "title": "Kallimora",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 4195,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/u20h4w.mp3"
    },
    {
        "id": 361,
        "title": "Kannaneeruna Kaiya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 323,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/wtyrvl.mp3"
    },
    {
        "id": 362,
        "title": "Kanneeruna Katheya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 4124,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/ebkdxn.mp3"
    },
    {
        "id": 363,
        "title": "Kanni Yennu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2579,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/2qn1ep.mp3"
    },
    {
        "id": 364,
        "title": "Kemmanju Baanu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 954,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/xey4cd.mp3"
    },
    {
        "id": 365,
        "title": "Kemmanjuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2941,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/nv7d3m.mp3"
    },
    {
        "id": 366,
        "title": "Kettana Ovve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 3437,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/5chc0v.mp3"
    },
    {
        "id": 367,
        "title": "Kuyelu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 580,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/ff4xp2.mp3"
    },
    {
        "id": 368,
        "title": "Maggilluna Jaama New",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 851,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/lktibl.mp3"
    },
    {
        "id": 369,
        "title": "Malae Kaeriyoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 225,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/lhq4x1.mp3"
    },
    {
        "id": 370,
        "title": "Malae Keri",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2470,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/4a3rfd.mp3"
    },
    {
        "id": 371,
        "title": "Malligae Hoovaa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2364,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/j61f4k.mp3"
    },
    {
        "id": 372,
        "title": "Malligae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1596,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/2825i8.mp3"
    },
    {
        "id": 373,
        "title": "Mangalavatha Mathuve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 177,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/6759ut.mp3"
    },
    {
        "id": 374,
        "title": "Mundhi Mundhi Oppa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1281,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/f0rtf7.mp3"
    },
    {
        "id": 375,
        "title": "Na Maditha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 159,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/t9lgqm.mp3"
    },
    {
        "id": 376,
        "title": "Nadukattuna Sele (2)",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1271,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/1l7gzu.mp3"
    },
    {
        "id": 378,
        "title": "Nee Manjajareegae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1996,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/oju36w.mp3"
    },
    {
        "id": 379,
        "title": "Nee Nachathira",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 4110,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/or4j5n.mp3"
    },
    {
        "id": 380,
        "title": "Neela Banu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 3803,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/vw4ipw.mp3"
    },
    {
        "id": 381,
        "title": "Nenappondhu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 804,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/837c2z.mp3"
    },
    {
        "id": 382,
        "title": "Nenjuno Nitha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1558,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/xmj0ss.MP3"
    },
    {
        "id": 383,
        "title": "Noduvanange",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 3805,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/as0jtf.mp3"
    },
    {
        "id": 384,
        "title": "Ohh Alli Rani",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 349,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/l5n7pn.mp3"
    },
    {
        "id": 385,
        "title": "Ondu Desa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2199,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/2oirzm.mp3"
    },
    {
        "id": 386,
        "title": "Oorella",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 3497,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/qfq8tt.mp3"
    },
    {
        "id": 387,
        "title": "Oosanae Anaga Aaradho Oh Enna Baava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 3114,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/obr6di.mp3"
    },
    {
        "id": 388,
        "title": "Rathish 28",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1386,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/4l7zkb.mp3"
    },
    {
        "id": 389,
        "title": "Saamandhi Hoovae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2570,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/20hwq2.mp3"
    },
    {
        "id": 390,
        "title": "Selae Morana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 4976,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/kodxyf.mp3"
    },
    {
        "id": 391,
        "title": "Sembethi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1154,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/4h699i.mp3"
    },
    {
        "id": 392,
        "title": "Sendu Malli Hoogogae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 3420,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/mr40f4.mp3"
    },
    {
        "id": 393,
        "title": "Sinna Noge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2610,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/wc82ki.mp3"
    },
    {
        "id": 394,
        "title": "Sole Gaayi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 2871,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/bzp812.mp3"
    },
    {
        "id": 395,
        "title": "Sridevi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 3657,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/l4jkwr.MP3"
    },
    {
        "id": 396,
        "title": "Yedajovvoni Tsaliv (2)",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🏆",
        "duration": "3:45",
        "like_count": 1754,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/a25ab2.mp3"
    },
    {
        "id": 397,
        "title": "Acheya Pailu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1875,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/tkya6c.mp3"
    },
    {
        "id": 398,
        "title": "Alli Mangalavadha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4697,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/wllddt.mp3"
    },
    {
        "id": 399,
        "title": "Aneya Bala",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4030,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/oe1q1h.mp3"
    },
    {
        "id": 400,
        "title": "Anjikke Bandhara Mamma",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 478,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/5pnfoj.mp3"
    },
    {
        "id": 401,
        "title": "Baana Naanu Wubivu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1450,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/nigx0s.mp3"
    },
    {
        "id": 402,
        "title": "Baana Noodi Baagi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 130,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/j35j5o.mp3"
    },
    {
        "id": 403,
        "title": "Baanu Enna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4656,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/yxfme1.mp3"
    },
    {
        "id": 404,
        "title": "Baanuna Baayaluna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 3720,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/vlkzum.mp3"
    },
    {
        "id": 405,
        "title": "Kanneruna Kadhaeya",
        "artist_name": "SathiyaKathi Hethae",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 3810,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/fxlwf8.mp3"
    },
    {
        "id": 406,
        "title": "Bana Nambi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 575,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/8e3f03.mp3"
    },
    {
        "id": 407,
        "title": "Banna Hakkilu Aagi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1993,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/ge8z5j.mp3"
    },
    {
        "id": 408,
        "title": "Battumadi Sakki",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1164,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/ewnhh6.mp3"
    },
    {
        "id": 409,
        "title": "Biruma Deva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 934,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/iv8t4l.mp3"
    },
    {
        "id": 410,
        "title": "Ekka Uttidhae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4953,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/2cm0nb.mp3"
    },
    {
        "id": 411,
        "title": "Elli Hothe Patsur",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 3943,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/puz64y.mp3"
    },
    {
        "id": 412,
        "title": "Enna Manasu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 238,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/nbatpz.mp3"
    },
    {
        "id": 413,
        "title": "Ennuna Sathiya Lpelur",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 3705,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/pb8h2o.mp3"
    },
    {
        "id": 414,
        "title": "Indhuna Baagu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1185,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/pi39yk.mp3"
    },
    {
        "id": 415,
        "title": "Kaala Olla",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1641,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/uc2qls.mp3"
    },
    {
        "id": 416,
        "title": "Kabbuna Kathiyaa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 957,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/iaz3df.mp3"
    },
    {
        "id": 417,
        "title": "Kadhe Aginae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1853,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/6aoed4.mp3"
    },
    {
        "id": 418,
        "title": "Kannugogae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 2479,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/36z741.mp3"
    },
    {
        "id": 419,
        "title": "Kettana Ovve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 3938,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/5chc0v.mp3"
    },
    {
        "id": 420,
        "title": "Mae Bappane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 697,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/nduc16.mp3"
    },
    {
        "id": 421,
        "title": "Malligoona",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1977,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/rm2vw9.mp3"
    },
    {
        "id": 422,
        "title": "Manasuno",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4894,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/d0dd0m.mp3"
    },
    {
        "id": 423,
        "title": "Manasu Thumbitha (1)",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4076,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/rgquw1.mp3"
    },
    {
        "id": 424,
        "title": "Mayya Neeru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 968,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/qaureg.mp3"
    },
    {
        "id": 425,
        "title": "Moganodi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 3421,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/6aev75.mp3"
    },
    {
        "id": 426,
        "title": "Naa Ninna Manasu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 3828,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/56zlkc.mp3"
    },
    {
        "id": 427,
        "title": "Neela Baanu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 171,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/mert74.mp3"
    },
    {
        "id": 428,
        "title": "Neela Baanuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 308,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/adzeqy.mp3"
    },
    {
        "id": 429,
        "title": "Nee Andu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 2049,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/sbrikb.mp3"
    },
    {
        "id": 430,
        "title": "Nelayilladha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4564,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/hgmjmc.mp3"
    },
    {
        "id": 431,
        "title": "Nellu Bathava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 3020,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/09d8qo.mp3"
    },
    {
        "id": 432,
        "title": "Nenasi Manasu .. Gava Dhuraney",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4840,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/7e1gri.mp3"
    },
    {
        "id": 433,
        "title": "Nenasi Manasu .. Gava Dhuraney",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4549,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/7e1gri.mp3"
    },
    {
        "id": 434,
        "title": "Ninna Malae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 842,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/moa0di.mp3"
    },
    {
        "id": 435,
        "title": "Ninna Pinjuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4556,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/q8ne6b.mp3"
    },
    {
        "id": 436,
        "title": "Ninna Unippillatha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 724,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/4uaa5g.mp3"
    },
    {
        "id": 437,
        "title": "Ondhu Hoo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 2765,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/unza64.mp3"
    },
    {
        "id": 438,
        "title": "Onthu Pakkanu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4657,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/1y23xj.mp3"
    },
    {
        "id": 439,
        "title": "Oreya Ennavve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 2433,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/rj658b.mp3"
    },
    {
        "id": 440,
        "title": "Osane Aarathava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4467,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/lbvlhf.mp3"
    },
    {
        "id": 441,
        "title": "Penney Coodippa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4242,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/wt611i.mp3"
    },
    {
        "id": 442,
        "title": "Sathagi Hutti",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4608,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/6bv0y9.mp3"
    },
    {
        "id": 443,
        "title": "Sendu Malligaiye",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1549,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/1k00b2.mp3"
    },
    {
        "id": 444,
        "title": "Sithirey Thiguva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 4287,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/po2s2g.mp3"
    },
    {
        "id": 445,
        "title": "Thaali Hakkidha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💔",
        "duration": "3:45",
        "like_count": 1049,
        "genre": "Funeral Songs",
        "file_url": "https://files.catbox.moe/z1kjy8.mp3"
    },
    {
        "id": 446,
        "title": "Aadineyo Padineyo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 152,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/9bb8ql.mp3"
    },
    {
        "id": 447,
        "title": "Aalakeru Aada",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2317,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/k7pvyj.mp3"
    },
    {
        "id": 448,
        "title": "Aaluna Manasu Hethega",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2373,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/284tsp.mp3"
    },
    {
        "id": 449,
        "title": "Aaluna Thatte",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2677,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/5uy5my.mp3"
    },
    {
        "id": 450,
        "title": "Aaluna Gamalu Hbbgoa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 3046,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/y97tyj.mp3"
    },
    {
        "id": 451,
        "title": "Balli Balliya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1073,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/8ljsoe.mp3"
    },
    {
        "id": 452,
        "title": "Bamba Nadhi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1370,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/ws9hf8.mp3"
    },
    {
        "id": 453,
        "title": "Beabaranda",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 3045,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/nf57tj.mp3"
    },
    {
        "id": 454,
        "title": "Bearaganiya Bevara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 3277,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/eolosz.mp3"
    },
    {
        "id": 455,
        "title": "Belleya Batteya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2432,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/4ml01w.mp3"
    },
    {
        "id": 456,
        "title": "Belle Belle",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2183,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/2hjv84.mp3"
    },
    {
        "id": 457,
        "title": "Bembatti",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 3719,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/5nddin.mp3"
    },
    {
        "id": 458,
        "title": "Beraganiya Bevaradha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 4202,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/fa4mda.mp3"
    },
    {
        "id": 459,
        "title": "Beragani Hetha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 4983,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/aqdxb0.mp3"
    },
    {
        "id": 460,
        "title": "Besageya Bisalune",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 3035,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/vea8ml.mp3"
    },
    {
        "id": 461,
        "title": "Bethethi Aadireya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1526,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/4xfu0a.mp3"
    },
    {
        "id": 462,
        "title": "Bethethi Aadireya 2",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 3318,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/b4xyxj.mp3"
    },
    {
        "id": 463,
        "title": "Billi Hoo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 498,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/e87jey.mp3"
    },
    {
        "id": 464,
        "title": "Bodhavara Jena",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1817,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/nilmo4.mp3"
    },
    {
        "id": 465,
        "title": "Eera Maasi Hethey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1451,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/q2yqbs.mp3"
    },
    {
        "id": 466,
        "title": "Ellidhae Hethey Enna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2971,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/vzrzng.mp3"
    },
    {
        "id": 467,
        "title": "Ellidhe Hethay",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 371,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/ggvnoh.mp3"
    },
    {
        "id": 468,
        "title": "Ellidhe Hethe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2506,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/zvo04q.mp3"
    },
    {
        "id": 469,
        "title": "Ellithe Hethe Nee Ellithe Hethe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 4304,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/i6njaj.mp3"
    },
    {
        "id": 470,
        "title": "Emme Kaappa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1468,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/uhsq4r.mp3"
    },
    {
        "id": 471,
        "title": "Enga Madiya Buttu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 4179,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/1dquen.mp3"
    },
    {
        "id": 472,
        "title": "Haalu Kerona",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 451,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/05ldvh.mp3"
    },
    {
        "id": 473,
        "title": "Haalu Keruna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 946,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/du1ayf.mp3"
    },
    {
        "id": 474,
        "title": "Haasi Mitti",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2543,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/m4v4e7.mp3"
    },
    {
        "id": 475,
        "title": "Hathamana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 115,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/9p2vbh.mp3"
    },
    {
        "id": 476,
        "title": "Hethaya Kannuna Nodila",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 4227,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/oz3xwe.mp3"
    },
    {
        "id": 477,
        "title": "Hoennahowav",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 567,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/rx3gao.mp3"
    },
    {
        "id": 478,
        "title": "Inthu Aalarakke",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2787,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/b6962n.mp3"
    },
    {
        "id": 479,
        "title": "Inthu Aalarakke",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2443,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/mkdfs1.mp3"
    },
    {
        "id": 480,
        "title": "Kannaneera Kanikke",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 4568,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/yhsx7c.mp3"
    },
    {
        "id": 481,
        "title": "Kannattu Kurudaathea",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 4405,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/l3atto.mp3"
    },
    {
        "id": 482,
        "title": "Kethara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1330,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/e917sa.mp3"
    },
    {
        "id": 483,
        "title": "Kethara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1503,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/e917sa.mp3"
    },
    {
        "id": 484,
        "title": "Mallugaatha Malligoo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 3352,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/wp1g31.mp3"
    },
    {
        "id": 485,
        "title": "Manasurugi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 4349,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/au8nt0.mp3"
    },
    {
        "id": 486,
        "title": "Masi Hethay",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 907,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/4nax62.mp3"
    },
    {
        "id": 487,
        "title": "Mayadha Kanne",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 907,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/c3dxh9.mp3"
    },
    {
        "id": 488,
        "title": "Muthuna Muruga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 4754,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/dahd3v.mp3"
    },
    {
        "id": 489,
        "title": "Neeraagi Uttithaleyu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2719,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/21rcto.mp3"
    },
    {
        "id": 490,
        "title": "Neeragi Huttidhaleyo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1278,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/qc1vkb.mp3"
    },
    {
        "id": 491,
        "title": "Oh Enna Hethey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1663,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/y7r5qo.mp3"
    },
    {
        "id": 492,
        "title": "Oh Hethey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 3343,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/igqqku.mp3"
    },
    {
        "id": 493,
        "title": "Om Guruve Hulikkal Ayya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2539,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/pqcygv.mp3"
    },
    {
        "id": 494,
        "title": "Othagi Kathuva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2683,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/dahd3v.mp3"
    },
    {
        "id": 495,
        "title": "Sathiya Kaathi",
        "artist_name": "Murugesh Porthy",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 1399,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/w180in.mp3"
    },
    {
        "id": 496,
        "title": "Singara Maadu Hethe New",
        "artist_name": "Hethey",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 534,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/gkkvu9.mp3"
    },
    {
        "id": 497,
        "title": "Yeagune Hethea",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🗾",
        "duration": "3:45",
        "like_count": 2678,
        "genre": "Hethaee",
        "file_url": "https://files.catbox.moe/3tuk2e.mp3"
    },
    {
        "id": 498,
        "title": "Aaseya Aruve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2695,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/2g5cna.mp3"
    },
    {
        "id": 499,
        "title": "Achaya Pathira",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1656,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/1jwp8z.mp3"
    },
    {
        "id": 500,
        "title": "Agalu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 110,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/s37uz3.mp3"
    },
    {
        "id": 501,
        "title": "Andhuna Gena...",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1584,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/n3hf2c.mp3"
    },
    {
        "id": 502,
        "title": "Anjana Anjana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3315,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/tmcwtp.mp3"
    },
    {
        "id": 503,
        "title": "Anna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2812,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/02jupx.mp3"
    },
    {
        "id": 504,
        "title": "Appana Gava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1234,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/ix3gwa.mp3"
    },
    {
        "id": 505,
        "title": "Banuna Thinguva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1104,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/5uaro8.mp3"
    },
    {
        "id": 506,
        "title": "Baraee Yaenna Baekku",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2443,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/doj9a6.mp3"
    },
    {
        "id": 507,
        "title": "Baseya Male Base",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1757,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/pzdq3z.mp3"
    },
    {
        "id": 508,
        "title": "Bere Yena",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1394,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/2gvul4.mp3"
    },
    {
        "id": 509,
        "title": "Dhara Ava Dhara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4536,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/ykwd54.mp3"
    },
    {
        "id": 510,
        "title": "Dhevadhayo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1290,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/hoxko5.mp3"
    },
    {
        "id": 511,
        "title": "Dhoora Nillune",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1471,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/37p62x.mp3"
    },
    {
        "id": 512,
        "title": "Doiii",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2023,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/5q3n9k.mp3"
    },
    {
        "id": 513,
        "title": "Ekkanae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3160,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/3aj0j6.mp3"
    },
    {
        "id": 514,
        "title": "Enagagi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1877,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/19157s.mp3"
    },
    {
        "id": 515,
        "title": "Enna Easare Yeagi Koruchuvane New Song",
        "artist_name": "Ctn Chandran",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2813,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/zdi26u.mp3"
    },
    {
        "id": 516,
        "title": "Enna Nenapu Ella.. New Song...2025",
        "artist_name": "Ctn Chandran",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4582,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/gkiv53.mp3"
    },
    {
        "id": 517,
        "title": "Enna Otti",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1977,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/sgy3iv.mp3"
    },
    {
        "id": 518,
        "title": "Enna Kannu Emayogea Nera Theadi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2998,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/sls57b.mp3"
    },
    {
        "id": 519,
        "title": "Eradu Kannu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2526,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/9d2at9.mp3"
    },
    {
        "id": 520,
        "title": "Eraduna Manasu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3470,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/0et85j.mp3"
    },
    {
        "id": 521,
        "title": "Ganduna Gava 2",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 378,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/gcjmwe.mp3"
    },
    {
        "id": 522,
        "title": "Gavailayo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 204,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/tifr3v.mp3"
    },
    {
        "id": 523,
        "title": "Gille Gille",
        "artist_name": "Habba Musicals",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1812,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/rtamkt.mp3"
    },
    {
        "id": 524,
        "title": "Habba Jena",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1043,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/hpc3g8.mp3"
    },
    {
        "id": 525,
        "title": "Jil Jung Juck",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1457,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/5y2xas.mp3"
    },
    {
        "id": 526,
        "title": "Kanase",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1440,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/4oj2bg.mp3"
    },
    {
        "id": 527,
        "title": "Kanna Muchi Oraguley Ne",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4443,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/2ascqp.mp3"
    },
    {
        "id": 528,
        "title": "Kannora Notta",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4012,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/4h0zx6.mp3"
    },
    {
        "id": 529,
        "title": "Kannumani",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3598,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/9ub9c4.mp3"
    },
    {
        "id": 530,
        "title": "Kannunekannune",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4873,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/mgj26c.mp3"
    },
    {
        "id": 531,
        "title": "Kivi Orana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1316,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/tgar7b.mp3"
    },
    {
        "id": 532,
        "title": "Maduve Jena",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3845,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/0rzyko.mp3"
    },
    {
        "id": 533,
        "title": "Manasa Mayakkidha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2765,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/z34m3j.mp3"
    },
    {
        "id": 534,
        "title": "Manasa Thegathareyo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2639,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/1sy5lj.mp3"
    },
    {
        "id": 535,
        "title": "Manasuno",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3382,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/5vn31f.mp3"
    },
    {
        "id": 536,
        "title": "Manasu Ninna Nenasi Padira",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3584,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/c4v7qu.mp3"
    },
    {
        "id": 537,
        "title": "Maneyoge Jannalu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3142,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/k6eh5w.mp3"
    },
    {
        "id": 538,
        "title": "Manjakambe Rani",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4536,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/7s5wsg.mp3"
    },
    {
        "id": 539,
        "title": "Marugudiya Na",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 113,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/2cnukn.mp3"
    },
    {
        "id": 540,
        "title": "Mayyakkidha Kannu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3437,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/oyrtbc.mp3"
    },
    {
        "id": 541,
        "title": "Mungaru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4454,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/ot9u6u.mp3"
    },
    {
        "id": 542,
        "title": "Negae Moga Rani",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4851,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/8mqtf7.mp3"
    },
    {
        "id": 543,
        "title": "Nethi Neruna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 338,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/2mlk3t.mp3"
    },
    {
        "id": 544,
        "title": "Ninna Dhaari",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 977,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/qqhv3x.mp3"
    },
    {
        "id": 545,
        "title": "Ninna Kaiya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 529,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/wzcjyt.mp3"
    },
    {
        "id": 546,
        "title": "Ninna Kannu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1005,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/0ww669.mp3"
    },
    {
        "id": 547,
        "title": "Ninna Male Gava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 330,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/moa0di.mp3"
    },
    {
        "id": 548,
        "title": "Ninna Gaena",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2977,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/b8xx31.mp3"
    },
    {
        "id": 549,
        "title": "Oh Enna Priya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2424,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/h8rlvr.mp3"
    },
    {
        "id": 550,
        "title": "Olluna Uruchu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1508,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/2enpcs.mp3"
    },
    {
        "id": 551,
        "title": "Radhiyae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3023,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/p68k3s.mp3"
    },
    {
        "id": 552,
        "title": "Sona Ninna Gena New",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4947,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/bniqmu.mp3"
    },
    {
        "id": 553,
        "title": "Sweet Kaara (4K)",
        "artist_name": "New",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3406,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/8kxe0c.mp3"
    },
    {
        "id": 554,
        "title": "Thirigi Nodu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1308,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/npzz1t.mp3"
    },
    {
        "id": 555,
        "title": "Ullathi Bussuthogae",
        "artist_name": "Lyric Video",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4693,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/h71yhd.mp3"
    },
    {
        "id": 556,
        "title": "Usaradhey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2397,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/sepd3d.mp3"
    },
    {
        "id": 557,
        "title": "Yesaga Yegileyu Enna Manasu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4323,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/semoi4.mp3"
    },
    {
        "id": 558,
        "title": "Gavadha Kaneeru Juvenile Kunnavey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1906,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/u19bf0.mp3"
    },
    {
        "id": 559,
        "title": "Aada Olana",
        "artist_name": "Kovai Sathish & Punitha Ramakrishnan",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4006,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/zmjb6d.mp3"
    },
    {
        "id": 560,
        "title": "Kichu Gayi",
        "artist_name": "Murugesh Porthy",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4569,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/bdqngk.mp3"
    },
    {
        "id": 561,
        "title": "Meedhenu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2591,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/20bens.mp3"
    },
    {
        "id": 562,
        "title": "Carratuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4293,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/o4svme.mp3"
    },
    {
        "id": 563,
        "title": "Radhe Ninna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1439,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/71jthx.mp3"
    },
    {
        "id": 564,
        "title": "Aadatha Aatathava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4157,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/a4o7s1.mp3"
    },
    {
        "id": 565,
        "title": "Aaditheeri",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4507,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/dwo0nf.mp3"
    },
    {
        "id": 566,
        "title": "Acheya Pailu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3657,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/tkya6c.mp3"
    },
    {
        "id": 567,
        "title": "Adhanodu Aamorana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2633,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/v86p84.mp3"
    },
    {
        "id": 568,
        "title": "Alangaara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4560,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/s7k083.mp3"
    },
    {
        "id": 569,
        "title": "Allaga Oppa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1395,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/dusybh.mp3"
    },
    {
        "id": 570,
        "title": "Anandhu Kethu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1723,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/cmjyx5.mp3"
    },
    {
        "id": 571,
        "title": "Belliya Hoovae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4715,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/3q0x7a.mp3"
    },
    {
        "id": 572,
        "title": "Eda Javvoni",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3723,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/8w4e87.mp3"
    },
    {
        "id": 573,
        "title": "Edha Nodunae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4473,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/gvyuw4.mp3"
    },
    {
        "id": 574,
        "title": "Enna Male Gava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2143,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/umd8ge.mp3"
    },
    {
        "id": 575,
        "title": "Enna Mundhadu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1567,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/9qcifk.mp3"
    },
    {
        "id": 576,
        "title": "Ennu Nodi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4725,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/555t9t.mp3"
    },
    {
        "id": 577,
        "title": "Gava Onthu Aarane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3080,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/dvdhg2.mp3"
    },
    {
        "id": 578,
        "title": "Gena Banthara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3386,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ya83vo.mp3"
    },
    {
        "id": 579,
        "title": "Guru Mammanennae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 403,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/1foo8l.mp3"
    },
    {
        "id": 580,
        "title": "Habba Jena",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2512,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/pw05h6.mp3"
    },
    {
        "id": 581,
        "title": "Hatty Ya Suthuva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2822,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/iwx46h.mp3"
    },
    {
        "id": 582,
        "title": "Hello",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 148,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/i353z0.mp3"
    },
    {
        "id": 583,
        "title": "Henney Ne Hodi Bali",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3747,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ttejf2.mp3"
    },
    {
        "id": 584,
        "title": "Henne Naa Elline",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4990,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/vzc730.mp3"
    },
    {
        "id": 585,
        "title": "Hogare Mamma",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4938,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/264g8m.mp3"
    },
    {
        "id": 586,
        "title": "Hoo Makke",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2990,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/izb06c.mp3"
    },
    {
        "id": 587,
        "title": "Hoovae Ninna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 476,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/1fmsqh.mp3"
    },
    {
        "id": 588,
        "title": "Kaagidhanoo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4065,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ql8czw.mp3"
    },
    {
        "id": 589,
        "title": "Kaaluna Kattidha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4096,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/nkppxb.mp3"
    },
    {
        "id": 590,
        "title": "Kaeri Kadavane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4283,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/htm4ej.mp3"
    },
    {
        "id": 591,
        "title": "Kalakiraene Wduoyl",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 762,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/siqogd.mp3"
    },
    {
        "id": 592,
        "title": "Kannarudu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1382,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ac5rnn.mp3"
    },
    {
        "id": 593,
        "title": "Kanneradu Yeangiranea",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2575,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/0cwccw.mp3"
    },
    {
        "id": 594,
        "title": "Kannu Orana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4257,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/aemkhz.mp3"
    },
    {
        "id": 595,
        "title": "Kannuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2444,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ujhgu6.mp3"
    },
    {
        "id": 596,
        "title": "Keari Kadavane Xseavl",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2235,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/to9dr5.mp3"
    },
    {
        "id": 597,
        "title": "Keriya Muchu Muchu Mey Hoovaney",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4646,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ee3p4g.mp3"
    },
    {
        "id": 598,
        "title": "Kiradha Hoovae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4661,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/6lb695.mp3"
    },
    {
        "id": 599,
        "title": "Kodayu Naa Bannane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 587,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/t4k5qs.mp3"
    },
    {
        "id": 600,
        "title": "Kode Gaayu Saare Bandhu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4523,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/6q66ht.mp3"
    },
    {
        "id": 601,
        "title": "Kottu Beeppadhu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2137,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/7s0y1d.mp3"
    },
    {
        "id": 602,
        "title": "Madhuvaendhu Bandhu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1110,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/tc12j0.mp3"
    },
    {
        "id": 603,
        "title": "Malae Kaeriyoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2334,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/lhq4x1.mp3"
    },
    {
        "id": 604,
        "title": "Malae Keri",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 499,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/4a3rfd.mp3"
    },
    {
        "id": 605,
        "title": "Mamma Mamma",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1323,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/fjdali.mp3"
    },
    {
        "id": 606,
        "title": "Mammana Henne",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1249,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/5q35yn.mp3"
    },
    {
        "id": 607,
        "title": "Mammanennu Raanu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1546,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/yk7248.mp3"
    },
    {
        "id": 608,
        "title": "Mammneney",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4787,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ilnvot.mp3"
    },
    {
        "id": 609,
        "title": "Mande Thumba",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4990,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/t46j9f.mp3"
    },
    {
        "id": 610,
        "title": "Mandethogi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2093,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/s977ur.mp3"
    },
    {
        "id": 611,
        "title": "Manjaaneeru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4631,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/9rxxj3.mp3"
    },
    {
        "id": 612,
        "title": "Mathuveya Jenavaa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1203,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/sma7tw.mp3"
    },
    {
        "id": 613,
        "title": "Mogava Thirikki",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 417,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/id9ly0.mp3"
    },
    {
        "id": 614,
        "title": "Muthuna Rani",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3851,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/a2p7os.mp3"
    },
    {
        "id": 615,
        "title": "Muthuna Ranine",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 861,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/7ietpz.mp3"
    },
    {
        "id": 616,
        "title": "Naa Maadidha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3441,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/3cwb5w.mp3"
    },
    {
        "id": 617,
        "title": "Naa Uttidhadhu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3807,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/oqig6e.mp3"
    },
    {
        "id": 618,
        "title": "Nadukkattuna Saele",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4644,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/gpieih.mp3"
    },
    {
        "id": 619,
        "title": "Nalavaatta",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1384,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/sivpob.mp3"
    },
    {
        "id": 620,
        "title": "Nee Collejuga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3402,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ppn1y6.mp3"
    },
    {
        "id": 621,
        "title": "Nee Manjajareegae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2312,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/oju36w.mp3"
    },
    {
        "id": 622,
        "title": "Nenjuno Neetha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 526,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/df2gr9.mp3"
    },
    {
        "id": 623,
        "title": "Ninna Kannondhu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3406,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/5ymwtd.mp3"
    },
    {
        "id": 624,
        "title": "Ninna Noduvanangey Haraney",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1426,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/jy4ifo.mp3"
    },
    {
        "id": 625,
        "title": "Noduvanange",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2353,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/as0jtf.mp3"
    },
    {
        "id": 626,
        "title": "Ondu Desa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1029,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/2oirzm.mp3"
    },
    {
        "id": 627,
        "title": "Onthu Mallige Thotta",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 621,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/sfky6w.mp3"
    },
    {
        "id": 628,
        "title": "Parijadha Voo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4106,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/4bk9gq.mp3"
    },
    {
        "id": 629,
        "title": "Radhe Ninna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4567,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/lxe4oz.mp3"
    },
    {
        "id": 630,
        "title": "Roja Hoove",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1722,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/oiezdp.mp3"
    },
    {
        "id": 631,
        "title": "Saavira Koodi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1363,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/nfy9uu.mp3"
    },
    {
        "id": 632,
        "title": "Selakore Hattiyoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4718,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/tcdxow.mp3"
    },
    {
        "id": 633,
        "title": "Sellakatta",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3414,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/r1a8zk.mp3"
    },
    {
        "id": 634,
        "title": "Sembethi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3030,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/4h699i.mp3"
    },
    {
        "id": 635,
        "title": "Senduna Mlligae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 971,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/6rqqwk.mp3"
    },
    {
        "id": 636,
        "title": "Serudhoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4524,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ngq848.mp3"
    },
    {
        "id": 637,
        "title": "Sinna Noge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1010,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/wc82ki.mp3"
    },
    {
        "id": 638,
        "title": "Sinnatha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 569,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/1w3xc4.mp3"
    },
    {
        "id": 639,
        "title": "Sokku Sokku Sokku Jujujuju",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 4297,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/hjrn1z.mp3"
    },
    {
        "id": 640,
        "title": "Sole Gaayi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1232,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/bzp812.mp3"
    },
    {
        "id": 641,
        "title": "Sole Kuyilae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1204,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/eqjlrb.mp3"
    },
    {
        "id": 642,
        "title": "Sole Neera",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1557,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/yppj5h.mp3"
    },
    {
        "id": 643,
        "title": "Therunogey Therey Seelaiyogey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 133,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/keou8w.mp3"
    },
    {
        "id": 644,
        "title": "Thothanaado",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2465,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/smhfji.mp3"
    },
    {
        "id": 645,
        "title": "Ulluna Gava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 732,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/ek4vh7.mp3"
    },
    {
        "id": 646,
        "title": "Usarae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3457,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/sc572f.mp3"
    },
    {
        "id": 647,
        "title": "Usare Ninaga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 3787,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/6sqoub.mp3"
    },
    {
        "id": 648,
        "title": "Yeaneanavo Aarane Ok",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 1840,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/vjb0c7.mp3"
    },
    {
        "id": 649,
        "title": "Yena Enthalayu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💞",
        "duration": "3:45",
        "like_count": 2519,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/11rcvk.mp3"
    },
    {
        "id": 650,
        "title": "Dhiyaneradu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 3451,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/mwogw3.mp3"
    },
    {
        "id": 651,
        "title": "Kanni Yannu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 3342,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/bui76q.mp3"
    },
    {
        "id": 652,
        "title": "Madhiyu Sathu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 3742,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/omvqsn.mp3"
    },
    {
        "id": 653,
        "title": "Navve",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 4906,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/cvpgzw.mp3"
    },
    {
        "id": 654,
        "title": "Nee Mundhi Mundhi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 3616,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/qeecuj.mp3"
    },
    {
        "id": 655,
        "title": "Ninna Appa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 2227,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/3ulhc8.mp3"
    },
    {
        "id": 656,
        "title": "Oora Buttu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 2650,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/ja8iwe.mp3"
    },
    {
        "id": 657,
        "title": "Soloor Hatti",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 884,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/3w8mwk.mp3"
    },
    {
        "id": 658,
        "title": "Soome Annodega",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 3666,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/0dveq9.mp3"
    },
    {
        "id": 659,
        "title": "Soradhamoleya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎧",
        "duration": "3:45",
        "like_count": 4756,
        "genre": "Golden Hits",
        "file_url": "https://files.catbox.moe/bajwnn.mp3"
    },
    {
        "id": 660,
        "title": "Singaariyea",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3613,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/71o5ti.mp3"
    },
    {
        "id": 661,
        "title": "Gundadana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1313,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/dv3apv.mp3"
    },
    {
        "id": 662,
        "title": "Suthi Eana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2039,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/shat6e.mp3"
    },
    {
        "id": 663,
        "title": "Naa Kode Meya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 4108,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/tffj6b.mp3"
    },
    {
        "id": 664,
        "title": "Nelaga Bantha Thinguva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 583,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/tqv2tt.mp3"
    },
    {
        "id": 665,
        "title": "Beysagaya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2968,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/3x4mry.mp3"
    },
    {
        "id": 666,
        "title": "Aadaatha Attathavane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2159,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/a5gxb3.mp3"
    },
    {
        "id": 667,
        "title": "Aadi Aligi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 4390,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/kcrf5j.mp3"
    },
    {
        "id": 668,
        "title": "Aadi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3450,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/mn9qsv.mp3"
    },
    {
        "id": 669,
        "title": "Aakkivida",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1484,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/y0repx.mp3"
    },
    {
        "id": 670,
        "title": "Aaralutti",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3040,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/keukr5.mp3"
    },
    {
        "id": 671,
        "title": "Ache Avare",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2429,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/hkyof1.mp3"
    },
    {
        "id": 672,
        "title": "Adhikkaratty Mamma",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3674,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/pjz3zu.mp3"
    },
    {
        "id": 673,
        "title": "Alli Nattu Bandhiba",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2849,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/1ph8s3.mp3"
    },
    {
        "id": 674,
        "title": "Annikorai Hatty",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3564,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/g1bqk9.mp3"
    },
    {
        "id": 675,
        "title": "Baale Thanduna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2838,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/bwpcpk.mp3"
    },
    {
        "id": 676,
        "title": "Baanu Gudugeera",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1505,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/v9m9cu.mp3"
    },
    {
        "id": 677,
        "title": "Bellingadha Makke Banu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 4730,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/yyynlz.mp3"
    },
    {
        "id": 678,
        "title": "Betiya Kunavea Fueybm",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1151,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/kmm2zx.mp3"
    },
    {
        "id": 679,
        "title": "Boolokkanaa Rathi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 838,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/7r0q3u.mp3"
    },
    {
        "id": 680,
        "title": "Chittuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1318,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/3n510a.mp3"
    },
    {
        "id": 681,
        "title": "Coloru Coloru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1194,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/qg5bvx.mp3"
    },
    {
        "id": 682,
        "title": "Dhoddame Kunname",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2603,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/pxf114.mp3"
    },
    {
        "id": 683,
        "title": "Enga Athaetha Enga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3776,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/ybln80.mp3"
    },
    {
        "id": 684,
        "title": "Enna Maathuga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 491,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/xudvcq.mp3"
    },
    {
        "id": 685,
        "title": "Enna Sinna Sinna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 696,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/7av53g.mp3"
    },
    {
        "id": 686,
        "title": "Gudiyoge Ninna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1508,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/nkx8qg.mp3"
    },
    {
        "id": 687,
        "title": "Gudu Gudu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 4291,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/213jyp.mp3"
    },
    {
        "id": 688,
        "title": "Gummana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3924,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/8lg91f.mp3"
    },
    {
        "id": 689,
        "title": "Gundada Na Hatty",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2974,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/fl03kp.mp3"
    },
    {
        "id": 690,
        "title": "Habba Jena",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1607,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/yaxblr.mp3"
    },
    {
        "id": 691,
        "title": "Habba Jene Inthu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 4121,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/m76l5u.mp3"
    },
    {
        "id": 692,
        "title": "Haliyuru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2814,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/0gx94d.mp3"
    },
    {
        "id": 693,
        "title": "Hennu Idhalae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2628,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/xljhkn.mp3"
    },
    {
        "id": 694,
        "title": "Hulikkalu Henney",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3812,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/2h0xzt.mp3"
    },
    {
        "id": 695,
        "title": "Icesuna Kalare",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1097,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/8f9i6q.mp3"
    },
    {
        "id": 696,
        "title": "Iyya Betta",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3568,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/43iuob.mp3"
    },
    {
        "id": 697,
        "title": "Jal Jal",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 570,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/y3sdlb.mp3"
    },
    {
        "id": 698,
        "title": "Javvony",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3557,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/xyj71f.mp3"
    },
    {
        "id": 699,
        "title": "Kadhe Kadhe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 601,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/2vokso.mp3"
    },
    {
        "id": 700,
        "title": "Kappachiga Naa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3076,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/80ma51.mp3"
    },
    {
        "id": 701,
        "title": "Kearattuna Kalarune",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 606,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/pf1fpq.mp3"
    },
    {
        "id": 702,
        "title": "Kethi Ullada",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3958,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/eoiqmb.mp3"
    },
    {
        "id": 703,
        "title": "Kichuva Kannu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3587,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/oe0epk.mp3"
    },
    {
        "id": 704,
        "title": "Kode Sere",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 4199,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/8c7t15.mp3"
    },
    {
        "id": 705,
        "title": "Kottu Beepathu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2040,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/hs7e77.mp3"
    },
    {
        "id": 706,
        "title": "Laalaa Kade",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1284,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/fbsybx.mp3"
    },
    {
        "id": 707,
        "title": "Loosadhey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1665,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/al3qfl.mp3"
    },
    {
        "id": 708,
        "title": "Maadha Mamma",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1427,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/tdsa6b.mp3"
    },
    {
        "id": 709,
        "title": "Maaniyaada Kendano",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 4826,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/dxx5ny.mp3"
    },
    {
        "id": 710,
        "title": "Mallumandereya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 602,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/w2c2wp.mp3"
    },
    {
        "id": 711,
        "title": "Mammanennu Bandhiya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3960,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/k54m5s.mp3"
    },
    {
        "id": 712,
        "title": "Manjakambae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 395,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/pinnqc.mp3"
    },
    {
        "id": 713,
        "title": "Mindhi Mundhi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 4918,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/g373qr.mp3"
    },
    {
        "id": 714,
        "title": "Mogarasi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3384,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/vyui0y.mp3"
    },
    {
        "id": 715,
        "title": "Mogavu Kummey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 455,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/dk9ap9.mp3"
    },
    {
        "id": 716,
        "title": "More Hadadhe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 336,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/6f9rdw.mp3"
    },
    {
        "id": 717,
        "title": "Musku Aaaki",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2631,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/piynkl.mp3"
    },
    {
        "id": 718,
        "title": "Muththu Muththu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3266,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/8npfg4.mp3"
    },
    {
        "id": 719,
        "title": "Nanju Illatha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3965,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/ag9218.mp3"
    },
    {
        "id": 720,
        "title": "Nee Kaalejuga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3547,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/295ydv.mp3"
    },
    {
        "id": 721,
        "title": "Nee Usuru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 4788,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/gk3ud4.mp3"
    },
    {
        "id": 722,
        "title": "Neelabaanuthoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3451,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/94a7tg.mp3"
    },
    {
        "id": 723,
        "title": "Negathalae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2082,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/fqrd7d.mp3"
    },
    {
        "id": 724,
        "title": "Ninna Mogava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 931,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/dmujb2.mp3"
    },
    {
        "id": 725,
        "title": "Oh Ennu Anna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3673,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/z6ciwi.mp3"
    },
    {
        "id": 726,
        "title": "Oh Raanu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2230,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/n9lnhh.mp3"
    },
    {
        "id": 727,
        "title": "Osane Aara",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2617,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/b0h3ka.mp3"
    },
    {
        "id": 728,
        "title": "Saele Mora",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1525,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/56kjhh.mp3"
    },
    {
        "id": 729,
        "title": "Santhe Jaamathoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2773,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/1m7g89.mp3"
    },
    {
        "id": 730,
        "title": "Seale Mora",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3983,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/ornqqs.mp3"
    },
    {
        "id": 731,
        "title": "Selakore Hattiyoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 3881,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/6b9k0x.mp3"
    },
    {
        "id": 732,
        "title": "Semmanuru Sinna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1128,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/jr8jge.mp3"
    },
    {
        "id": 733,
        "title": "Singaranae",
        "artist_name": "Bmw Production",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2518,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/ehlk7r.mp3"
    },
    {
        "id": 734,
        "title": "Singaranae 2",
        "artist_name": "Laddu Full Video",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 746,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/awydkv.mp3"
    },
    {
        "id": 735,
        "title": "Singaranae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 426,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/3g8mn9.mp3"
    },
    {
        "id": 736,
        "title": "Sittumari Sittakkile",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2307,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/e0vk71.mp3"
    },
    {
        "id": 737,
        "title": "Sole Neera",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1659,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/6xnal1.mp3"
    },
    {
        "id": 738,
        "title": "Solur Hattiga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1132,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/tb9fp0.mp3"
    },
    {
        "id": 739,
        "title": "Soorea Gaayea",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1236,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/mb8f4l.mp3"
    },
    {
        "id": 740,
        "title": "Thatu Thaala",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1401,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/3f0q1r.mp3"
    },
    {
        "id": 741,
        "title": "Thodamae Kunnamae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2302,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/gjlusd.mp3"
    },
    {
        "id": 742,
        "title": "Yeaneanavo Aarane Ok",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 608,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/vjb0c7.mp3"
    },
    {
        "id": 743,
        "title": "Yena Enthalayu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 2846,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/11rcvk.mp3"
    },
    {
        "id": 744,
        "title": "Singaara Mallae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🔥",
        "duration": "3:45",
        "like_count": 1308,
        "genre": "Up Beat",
        "file_url": "https://files.catbox.moe/dao8lp.mp3"
    },
    {
        "id": 745,
        "title": "Cnelaga Bantha",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 2487,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/gctnbo.mp3"
    },
    {
        "id": 746,
        "title": "Csanthe Jaamathoge",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 4787,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/keeuql.mp3"
    },
    {
        "id": 747,
        "title": "Aadaatha Attathavane",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 534,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/xo3wyx.mp3"
    },
    {
        "id": 748,
        "title": "Aliyuru Hanne",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 598,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/4kh2we.mp3"
    },
    {
        "id": 749,
        "title": "Baanu Ninna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 2117,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/msrvn4.mp3"
    },
    {
        "id": 750,
        "title": "Battimondheyae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 1092,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/ghxk8b.mp3"
    },
    {
        "id": 751,
        "title": "Bembattiyaa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3804,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/vhjpp3.mp3"
    },
    {
        "id": 752,
        "title": "Bembatty Ahh",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 4210,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/iqo98y.mp3"
    },
    {
        "id": 753,
        "title": "Beragallu Bettu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 4949,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/29nm60.mp3"
    },
    {
        "id": 754,
        "title": "Brindhavana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 2422,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/63nx41.mp3"
    },
    {
        "id": 755,
        "title": "Chuva Chuva",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 4519,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/7xby8g.mp3"
    },
    {
        "id": 756,
        "title": "Coloru Coloru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 1904,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/vub93c.mp3"
    },
    {
        "id": 757,
        "title": "Gudu Gudu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 1230,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/iyl8o4.mp3"
    },
    {
        "id": 758,
        "title": "Gummana Idhu Nee",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 2963,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/wtcyb2.mp3"
    },
    {
        "id": 759,
        "title": "Gummana",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 969,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/it5qeb.mp3"
    },
    {
        "id": 760,
        "title": "Hadhinaru Vayasu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 161,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/rucj0x.mp3"
    },
    {
        "id": 761,
        "title": "Icesuna Kalare",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 4659,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/n7m8xb.mp3"
    },
    {
        "id": 762,
        "title": "Jal Jal Jal",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 4680,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/ke7fqv.mp3"
    },
    {
        "id": 763,
        "title": "Javvoni Hoove",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3093,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/8lne3q.mp3"
    },
    {
        "id": 764,
        "title": "Kadanaduna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 766,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/0ntgj1.mp3"
    },
    {
        "id": 765,
        "title": "Kadhe Yegine",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 1538,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/5pwqyk.mp3"
    },
    {
        "id": 766,
        "title": "Kannae Henney Nee Saarae Baaney",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 2648,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/69bnoi.mp3"
    },
    {
        "id": 767,
        "title": "Kappachi Ga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 2023,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/uijgos.mp3"
    },
    {
        "id": 768,
        "title": "Kasakka Nenje",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3078,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/4l56cf.mp3"
    },
    {
        "id": 769,
        "title": "Kode Maeyu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3013,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/lpzpji.mp3"
    },
    {
        "id": 770,
        "title": "Madhamammanenne",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3047,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/cxkoa8.mp3"
    },
    {
        "id": 771,
        "title": "Malligoona",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 2064,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/ycsvz1.mp3"
    },
    {
        "id": 772,
        "title": "Mammana Hennu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 1349,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/rqvmla.mp3"
    },
    {
        "id": 773,
        "title": "Manjakambe Habba",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 1607,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/osae8z.mp3"
    },
    {
        "id": 774,
        "title": "Manjuna Manasu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 1416,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/xkpu4k.mp3"
    },
    {
        "id": 775,
        "title": "Modhuve Opa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 2279,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/ezeopm.mp3"
    },
    {
        "id": 776,
        "title": "Muththu Muththu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 1206,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/8ow9or.mp3"
    },
    {
        "id": 777,
        "title": "Neela Baanu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3291,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/4otbu5.mp3"
    },
    {
        "id": 778,
        "title": "Negadhale Negadhale",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3660,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/yavdf1.mp3"
    },
    {
        "id": 779,
        "title": "Ninna Hadhinaru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3823,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/5jn2df.mp3"
    },
    {
        "id": 780,
        "title": "Oh Rani",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 305,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/gbjvh2.mp3"
    },
    {
        "id": 781,
        "title": "Sala Sala",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3024,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/wecbj3.mp3"
    },
    {
        "id": 782,
        "title": "Sandhey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 4126,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/m1kf71.mp3"
    },
    {
        "id": 783,
        "title": "Siggu Aagi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 4479,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/qcctv1.mp3"
    },
    {
        "id": 784,
        "title": "Singariyae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 3020,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/rnczr5.mp3"
    },
    {
        "id": 785,
        "title": "Sokku Sokku Ne",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 1193,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/pe0je4.mp3"
    },
    {
        "id": 786,
        "title": "Soloor Hattyga",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 350,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/v347oo.mp3"
    },
    {
        "id": 787,
        "title": "Varayo Thozhi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💏",
        "duration": "3:45",
        "like_count": 4193,
        "genre": "Wedding Hits",
        "file_url": "https://files.catbox.moe/c9wxxa.mp3"
    }
];
