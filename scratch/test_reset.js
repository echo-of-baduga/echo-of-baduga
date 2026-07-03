const https = require('https');

const API_KEY = 'sb_publishable_UyIEXHFzRqrtXS5WDdPogw_xRhEzrs3';
const HOST = 'iwkyfdhmbkhlpfgybsry.supabase.co';

function makeRequest(path, method, body = null) {
  return new Promise((resolve, reject) => {
    const dataStr = body ? JSON.stringify(body) : '';
    const options = {
      hostname: HOST,
      path: path,
      method: method,
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    };
    
    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(dataStr);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(dataStr);
    }
    req.end();
  });
}

async function testReset() {
  console.log('Testing request_password_reset RPC...');
  const res = await makeRequest('/rest/v1/rpc/request_password_reset', 'POST', {
    p_identity: 'subramanijayathri@gmail.com'
  });
  console.log('Status:', res.statusCode);
  console.log('Body:', res.body);
}

testReset();
