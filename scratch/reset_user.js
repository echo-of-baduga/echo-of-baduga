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

async function runReset() {
  console.log('Resetting password for subramanijayathri@gmail.com...');
  const res = await makeRequest('/rest/v1/rpc/reset_user_password', 'POST', {
    p_email: 'subramanijayathri@gmail.com',
    p_new_password: 'Kirthish@123'
  });
  console.log('Status:', res.statusCode);
  console.log('Response:', res.body);
}

runReset();
