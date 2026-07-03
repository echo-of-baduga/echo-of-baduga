const https = require('https');

const options = {
  hostname: 'iwkyfdhmbkhlpfgybsry.supabase.co',
  path: '/rest/v1/users?select=id,name,email,password',
  method: 'GET',
  headers: {
    'apikey': 'sb_publishable_UyIEXHFzRqrtXS5WDdPogw_xRhEzrs3',
    'Authorization': 'Bearer sb_publishable_UyIEXHFzRqrtXS5WDdPogw_xRhEzrs3'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response Headers:', JSON.stringify(res.headers, null, 2));
    try {
      const parsed = JSON.parse(data);
      console.log('Data (first 3 records):', parsed.slice(0, 3));
      console.log('Total Records:', parsed.length);
    } catch (e) {
      console.log('Raw Data:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
