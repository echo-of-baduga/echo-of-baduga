const DEMO_SONGS = [
    {
        id: 100,
        title: "Eera Maasi Hethey",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F64F}",
        duration: "3:45",
        like_count: 302,
        genre: "Devotional",
        file_url: "/songs/devotional/Eera%20Maasi%20Hethey.mp3"
    },
    {
        id: 101,
        title: "Haalakeru Hallamadu New",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F64F}",
        duration: "3:45",
        like_count: 3577,
        genre: "Devotional",
        file_url: "/songs/devotional/Haalakeru%20Hallamadu%20New.mp3"
    },
    {
        id: 102,
        title: "Habba",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F64F}",
        duration: "3:45",
        like_count: 2316,
        genre: "Devotional",
        file_url: "/songs/devotional/Habba.mp3"
    },
    {
        id: 103,
        title: "Hetheya Gava",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F64F}",
        duration: "3:45",
        like_count: 1223,
        genre: "Devotional",
        file_url: "/songs/devotional/Hetheya%20Gava.mp3"
    },
    {
        id: 104,
        title: "Hetheya Morana Naalu",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F64F}",
        duration: "3:45",
        like_count: 2365,
        genre: "Devotional",
        file_url: "/songs/devotional/Hetheya%20Morana%20Naalu.mp3"
    },
    {
        id: 105,
        title: "Kanneeruna Kanikai New",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F64F}",
        duration: "3:45",
        like_count: 4735,
        genre: "Devotional",
        file_url: "/songs/devotional/Kanneeruna%20Kanikai%20New.mp3"
    },
    {
        id: 106,
        title: "Keruna Gamalu",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F64F}",
        duration: "3:45",
        like_count: 4547,
        genre: "Devotional",
        file_url: "/songs/devotional/Keruna%20Gamalu.mp3"
    },
    {
        id: 107,
        title: "Singara Maadu Hethe New",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F64F}",
        duration: "3:45",
        like_count: 125,
        genre: "Devotional",
        file_url: "/songs/devotional/Singara%20Maadu%20Hethe%20New.mp3"
    },
    {
        id: 108,
        title: "Uttuga Radhi",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F332}",
        duration: "3:45",
        like_count: 3924,
        genre: "Evergreen",
        file_url: "/songs/evergreen/Uttuga%20Radhi.mp3"
    },
    {
        id: 109,
        title: "Aaluna Manasu Hethaega",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 2876,
        genre: "Love",
        file_url: "/songs/love/Aaluna%20Manasu%20Hethaega.mp3"
    },
    {
        id: 110,
        title: "Aaluna Thattae",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 3461,
        genre: "Love",
        file_url: "/songs/love/Aaluna%20Thattae.mp3"
    },
    {
        id: 111,
        title: "Annatha Anna",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 3814,
        genre: "Love",
        file_url: "/songs/love/Annatha%20Anna.mp3"
    },
    {
        id: 112,
        title: "Baanuna Hunnavae",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 1299,
        genre: "Love",
        file_url: "/songs/love/Baanuna%20Hunnavae.mp3"
    },
    {
        id: 113,
        title: "Billi Hoo",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4819,
        genre: "Love",
        file_url: "/songs/love/Billi%20Hoo.mp3"
    },
    {
        id: 114,
        title: "Dhoorono Thooralu",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 3153,
        genre: "Love",
        file_url: "/songs/love/Dhoorono%20Thooralu.mp3"
    },
    {
        id: 115,
        title: "Doiii",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 1265,
        genre: "Love",
        file_url: "/songs/love/Doiii.mp3"
    },
    {
        id: 116,
        title: "Enna Easare Yeagi Koruchuvane New Song",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 1422,
        genre: "Love",
        file_url: "/songs/love/Enna%20Easare%20Yeagi%20Koruchuvane%20New%20Song.mp3"
    },
    {
        id: 117,
        title: "Enna Nenapu Ella..New Song...2025",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4407,
        genre: "Love",
        file_url: "/songs/love/Enna%20Nenapu%20Ella..New%20Song...2025.mp3"
    },
    {
        id: 118,
        title: "Eraduna Manasu",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4996,
        genre: "Love",
        file_url: "/songs/love/Eraduna%20Manasu.mp3"
    },
    {
        id: 119,
        title: "Ganduna Gava 2",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 1803,
        genre: "Love",
        file_url: "/songs/love/Ganduna%20Gava%202.mp3"
    },
    {
        id: 120,
        title: "Gavadha Kaneeru",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 2712,
        genre: "Love",
        file_url: "/songs/love/Gavadha%20Kaneeru.mp3"
    },
    {
        id: 121,
        title: "Gavailayo",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 1920,
        genre: "Love",
        file_url: "/songs/love/Gavailayo.mp3"
    },
    {
        id: 122,
        title: "Gille Gille",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 2633,
        genre: "Love",
        file_url: "/songs/love/Gille%20Gille.mp3"
    },
    {
        id: 123,
        title: "Hathe Noda Beda Nae",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 718,
        genre: "Love",
        file_url: "/songs/love/Hathe%20Noda%20Beda%20Nae.mp3"
    },
    {
        id: 124,
        title: "Ill Thaka Saiyya",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4950,
        genre: "Love",
        file_url: "/songs/love/Ill%20Thaka%20Saiyya.mp3"
    },
    {
        id: 125,
        title: "Jakkathooru Echira Heathe",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 2623,
        genre: "Love",
        file_url: "/songs/love/Jakkathooru%20Echira%20Heathe.mp3"
    },
    {
        id: 126,
        title: "Jil Jung Juk",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 216,
        genre: "Love",
        file_url: "/songs/love/Jil%20Jung%20Juk.mp3"
    },
    {
        id: 127,
        title: "Kivi Oranaa",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 164,
        genre: "Love",
        file_url: "/songs/love/Kivi%20Oranaa.mp3"
    },
    {
        id: 128,
        title: "Maathaadu Malligea",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4215,
        genre: "Love",
        file_url: "/songs/love/Maathaadu%20Malligea.mp3"
    },
    {
        id: 129,
        title: "Manja Neeru",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4177,
        genre: "Love",
        file_url: "/songs/love/Manja%20Neeru.mp3"
    },
    {
        id: 130,
        title: "Marava Manasille",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 626,
        genre: "Love",
        file_url: "/songs/love/Marava%20Manasille.mp3"
    },
    {
        id: 131,
        title: "Mollakodiya Gava Dhoovegatta-",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 2919,
        genre: "Love",
        file_url: "/songs/love/Mollakodiya%20Gava%20Dhoovegatta-.mp3"
    },
    {
        id: 132,
        title: "Muthu Maniyae",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4245,
        genre: "Love",
        file_url: "/songs/love/Muthu%20Maniyae.mp3"
    },
    {
        id: 133,
        title: "Neeragi Uttithalayoo",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4604,
        genre: "Love",
        file_url: "/songs/love/Neeragi%20Uttithalayoo.mp3"
    },
    {
        id: 134,
        title: "Nela Baggi Song By Kallakorai Gowtham",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 589,
        genre: "Love",
        file_url: "/songs/love/Nela%20Baggi%20Song%20By%20Kallakorai%20Gowtham.mp3"
    },
    {
        id: 135,
        title: "Nenapu Ondhu Nenjunogae",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 3489,
        genre: "Love",
        file_url: "/songs/love/Nenapu%20Ondhu%20Nenjunogae.mp3"
    },
    {
        id: 136,
        title: "Nethi Keppuna",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4016,
        genre: "Love",
        file_url: "/songs/love/Nethi%20Keppuna.mp3"
    },
    {
        id: 137,
        title: "Nethi Neruna",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 324,
        genre: "Love",
        file_url: "/songs/love/Nethi%20Neruna.mp3"
    },
    {
        id: 138,
        title: "Ninna Gaena",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 1173,
        genre: "Love",
        file_url: "/songs/love/Ninna%20Gaena.mp3"
    },
    {
        id: 139,
        title: "Ninna Noduvanangey Haraney",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 3205,
        genre: "Love",
        file_url: "/songs/love/Ninna%20Noduvanangey%20Haraney.mp3"
    },
    {
        id: 140,
        title: "Oh Kanmaniyea",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 3989,
        genre: "Love",
        file_url: "/songs/love/Oh%20Kanmaniyea.mp3"
    },
    {
        id: 141,
        title: "Radhe",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 1906,
        genre: "Love",
        file_url: "/songs/love/Radhe.mp3"
    },
    {
        id: 142,
        title: "Sathiya Kaathi",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 1706,
        genre: "Love",
        file_url: "/songs/love/Sathiya%20Kaathi.mp3"
    },
    {
        id: 143,
        title: "Singaranae -",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 3994,
        genre: "Love",
        file_url: "/songs/love/Singaranae%20-.mp3"
    },
    {
        id: 144,
        title: "Singaranae 2",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 804,
        genre: "Love",
        file_url: "/songs/love/Singaranae%202.mp3"
    },
    {
        id: 145,
        title: "Song 147",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 2404,
        genre: "Love",
        file_url: "/songs/love/Song%20147.mp3"
    },
    {
        id: 146,
        title: "Song 148",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 3139,
        genre: "Love",
        file_url: "/songs/love/Song%20148.mp3"
    },
    {
        id: 147,
        title: "Song 149",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4782,
        genre: "Love",
        file_url: "/songs/love/Song%20149.mp3"
    },
    {
        id: 148,
        title: "Sweet Kaara 4K",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 3080,
        genre: "Love",
        file_url: "/songs/love/Sweet%20Kaara%204K.mp3"
    },
    {
        id: 149,
        title: "Thirigi Nodu",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 2750,
        genre: "Love",
        file_url: "/songs/love/Thirigi%20Nodu.mp3"
    },
    {
        id: 150,
        title: "Ullathi Bussuthogae",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F496}",
        duration: "3:45",
        like_count: 4248,
        genre: "Love",
        file_url: "/songs/love/Ullathi%20Bussuthogae.mp3"
    },
    {
        id: 151,
        title: "We",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F3B5}",
        duration: "3:45",
        like_count: 658,
        genre: "Melody",
        file_url: "/songs/melody/We.mp3"
    },
    {
        id: 152,
        title: "Kanneruna Kadhaeya",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F343}",
        duration: "3:45",
        like_count: 1911,
        genre: "Sad",
        file_url: "/songs/sad/Kanneruna%20Kadhaeya.mp3"
    },
    {
        id: 153,
        title: "Olluna Uruchu",
        artist_name: "Baduga Artist",
        cover_emoji: "\u{1F343}",
        duration: "3:45",
        like_count: 2756,
        genre: "Sad",
        file_url: "/songs/sad/Olluna%20Uruchu.mp3"
    }
];