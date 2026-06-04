const DEMO_SONGS = [
    {
        "id": 100,
        "title": "Eera Maasi Hethey",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 302,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/q2yqbs.mp3"
    },
    {
        "id": 101,
        "title": "Haalakeru Hallamadu New",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 3577,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/5mk0j5.mp3"
    },
    {
        "id": 102,
        "title": "Habba",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2316,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/2324xg.mp3"
    },
    {
        "id": 103,
        "title": "Hetheya Gava",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 1223,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/fbgsb2.mp3"
    },
    {
        "id": 104,
        "title": "Hetheya Morana Naalu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 2365,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/g60t5g.mp3"
    },
    {
        "id": 105,
        "title": "Kanneeruna Kanikai New",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4735,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/b9zqi5.mp3"
    },
    {
        "id": 106,
        "title": "Keruna Gamalu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 4547,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/hcqyjk.mp3"
    },
    {
        "id": 107,
        "title": "Singara Maadu Hethe New",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🙏",
        "duration": "3:45",
        "like_count": 125,
        "genre": "Devotional",
        "file_url": "https://files.catbox.moe/gkkvu9.mp3"
    },
    {
        "id": 108,
        "title": "Uttuga Radhi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🌲",
        "duration": "3:45",
        "like_count": 3924,
        "genre": "Evergreen",
        "file_url": "https://files.catbox.moe/b98041.mp3"
    },
    {
        "id": 109,
        "title": "Aaluna Manasu Hethaega",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2876,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/284tsp.mp3"
    },
    {
        "id": 110,
        "title": "Aaluna Thattae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3461,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/dop4df.mp3"
    },
    {
        "id": 111,
        "title": "Annatha Anna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3814,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/yxqh6o.mp3"
    },
    {
        "id": 112,
        "title": "Baanuna Hunnavae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1299,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/jvav6o.mp3"
    },
    {
        "id": 113,
        "title": "Billi Hoo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4819,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/e87jey.mp3"
    },
    {
        "id": 114,
        "title": "Dhoorono Thooralu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3153,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/qs03de.mp3"
    },
    {
        "id": 115,
        "title": "Doiii",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1265,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/pkdphv.mp3"
    },
    {
        "id": 116,
        "title": "Enna Easare Yeagi Koruchuvane New Song",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1422,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/zdi26u.mp3"
    },
    {
        "id": 117,
        "title": "Enna Nenapu Ella..New Song...2025",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4407,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/gkiv53.mp3"
    },
    {
        "id": 118,
        "title": "Eraduna Manasu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4996,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/0et85j.mp3"
    },
    {
        "id": 119,
        "title": "Ganduna Gava 2",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1803,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/gcjmwe.mp3"
    },
    {
        "id": 120,
        "title": "Gavadha Kaneeru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2712,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/d46ecp.mp3"
    },
    {
        "id": 121,
        "title": "Gavailayo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1920,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/tifr3v.mp3"
    },
    {
        "id": 122,
        "title": "Gille Gille",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2633,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/rtamkt.mp3"
    },
    {
        "id": 123,
        "title": "Hathe Noda Beda Nae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 718,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/deuq1g.mp3"
    },
    {
        "id": 124,
        "title": "Ill Thaka Saiyya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4950,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/iqx049.mp3"
    },
    {
        "id": 125,
        "title": "Jakkathooru Echira Heathe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2623,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/rdhf0a.mp3"
    },
    {
        "id": 126,
        "title": "Jil Jung Juk",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 216,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/uy8h8t.mp3"
    },
    {
        "id": 127,
        "title": "Kivi Oranaa",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 164,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/wilcfi.mp3"
    },
    {
        "id": 128,
        "title": "Maathaadu Malligea",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4215,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/a7nu8b.mp3"
    },
    {
        "id": 129,
        "title": "Manja Neeru",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4177,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/q2yqbs.mp3"
    },
    {
        "id": 130,
        "title": "Marava Manasille",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 626,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/1jfw6i.mp3"
    },
    {
        "id": 131,
        "title": "Mollakodiya Gava Dhoovegatta-",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2919,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/p4ka8t.mp3"
    },
    {
        "id": 132,
        "title": "Muthu Maniyae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4245,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/cez8tm.mp3"
    },
    {
        "id": 133,
        "title": "Neeragi Uttithalayoo",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4604,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/zz9wqw.mp3"
    },
    {
        "id": 134,
        "title": "Nela Baggi Song By Kallakorai Gowtham",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 589,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/vy4bsc.mp3"
    },
    {
        "id": 135,
        "title": "Nenapu Ondhu Nenjunogae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3489,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/89pu3z.mp3"
    },
    {
        "id": 136,
        "title": "Nethi Keppuna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4016,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/dpl3xb.mp3"
    },
    {
        "id": 137,
        "title": "Nethi Neruna",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 324,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/utbqnk.mp3"
    },
    {
        "id": 138,
        "title": "Ninna Gaena",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1173,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/cmlnwo.mp3"
    },
    {
        "id": 139,
        "title": "Ninna Noduvanangey Haraney",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3205,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/r0nuud.mp3"
    },
    {
        "id": 140,
        "title": "Oh Kanmaniyea",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3989,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/azq4b7.mp3"
    },
    {
        "id": 141,
        "title": "Radhe",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1906,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/6xdajd.mp3"
    },
    {
        "id": 142,
        "title": "Sathiya Kaathi",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 1706,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/w180in.mp3"
    },
    {
        "id": 143,
        "title": "Singaranae -",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3994,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/ehlk7r.mp3"
    },
    {
        "id": 144,
        "title": "Singaranae 2",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 804,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/awydkv.mp3"
    },
    {
        "id": 145,
        "title": "Song 147",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2404,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/zmjb6d.mp3"
    },
    {
        "id": 146,
        "title": "Song 148",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3139,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/bdqngk.mp3"
    },
    {
        "id": 147,
        "title": "Song 149",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4782,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/stia3p.mp3"
    },
    {
        "id": 148,
        "title": "Sweet Kaara 4K",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 3080,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/8kxe0c.mp3"
    },
    {
        "id": 149,
        "title": "Thirigi Nodu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 2750,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/npzz1t.mp3"
    },
    {
        "id": 150,
        "title": "Ullathi Bussuthogae",
        "artist_name": "Baduga Artist",
        "cover_emoji": "💖",
        "duration": "3:45",
        "like_count": 4248,
        "genre": "Love",
        "file_url": "https://files.catbox.moe/h71yhd.mp3"
    },
    {
        "id": 151,
        "title": "We",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🎵",
        "duration": "3:45",
        "like_count": 658,
        "genre": "Melody",
        "file_url": "https://files.catbox.moe/418mfj.mp3"
    },
    {
        "id": 152,
        "title": "Kanneruna Kadhaeya",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🍃",
        "duration": "3:45",
        "like_count": 1911,
        "genre": "Sad",
        "file_url": "https://files.catbox.moe/fxlwf8.mp3"
    },
    {
        "id": 153,
        "title": "Olluna Uruchu",
        "artist_name": "Baduga Artist",
        "cover_emoji": "🍃",
        "duration": "3:45",
        "like_count": 2756,
        "genre": "Sad",
        "file_url": "https://files.catbox.moe/4ofl6a.mp3"
    }
];
