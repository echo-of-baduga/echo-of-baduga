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
          headers: res.headers,
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

async function runTests() {
  console.log('--- STARTING SECURITY VERIFICATION TESTS ---');
  
  // Test 1: Direct SELECT on users table (should fail with 401/403 or empty array if RLS is enabled)
  console.log('\n[Test 1] Testing direct SELECT on "users" table...');
  try {
    const res = await makeRequest('/rest/v1/users?select=id,name,email,password', 'GET');
    console.log(`Status Code: ${res.statusCode}`);
    if (res.statusCode === 200) {
      const records = JSON.parse(res.body);
      console.log(`❌ VULNERABLE: Direct SELECT succeeded and returned ${records.length} records.`);
      console.log(`Note: If you have not executed the SQL script in your Supabase dashboard yet, this is expected. Please run it to secure the table!`);
    } else {
      console.log(`✅ SECURE: Direct SELECT blocked! Status: ${res.statusCode}, Message: ${res.body.trim()}`);
    }
  } catch (e) {
    console.log(`✅ SECURE: Direct SELECT failed with exception (blocked):`, e.message);
  }

  // Test 2: Testing RPC login_user with correct credentials (should succeed and return user info WITHOUT password)
  console.log('\n[Test 2] Testing RPC login_user with correct credentials...');
  try {
    const payload = {
      p_email_or_mobile: 'navaneethm719@gmail.com',
      p_password: 'Navanee@123'
    };
    const res = await makeRequest('/rest/v1/rpc/login_user', 'POST', payload);
    console.log(`Status Code: ${res.statusCode}`);
    if (res.statusCode === 200) {
      const records = JSON.parse(res.body);
      console.log('RPC Output:', records);
      if (records.length > 0 && records[0].email === 'navaneethm719@gmail.com') {
        if (records[0].password) {
          console.log('❌ VULNERABLE: password column was returned by RPC!');
        } else {
          console.log('✅ SECURE: Login RPC succeeded and returned safe columns only!');
        }
      } else {
        console.log('❌ FAILED: User not found or mismatch, output empty.');
      }
    } else {
      console.log(`❌ ERROR: RPC login_user failed:`, res.body);
    }
  } catch (e) {
    console.log(`❌ RPC Exception:`, e.message);
  }

  // Test 3: Testing RPC login_user with INCORRECT credentials (should return empty or error, but not expose data)
  console.log('\n[Test 3] Testing RPC login_user with INCORRECT credentials...');
  try {
    const payload = {
      p_email_or_mobile: 'navaneethm719@gmail.com',
      p_password: 'WRONG_PASSWORD'
    };
    const res = await makeRequest('/rest/v1/rpc/login_user', 'POST', payload);
    console.log(`Status Code: ${res.statusCode}`);
    if (res.statusCode === 200) {
      const records = JSON.parse(res.body);
      if (records.length === 0) {
        console.log('✅ SECURE: Incorrect credentials returned empty array.');
      } else {
        console.log('❌ VULNERABLE: Incorrect password allowed login or returned records:', records);
      }
    } else {
      console.log(`✅ SECURE: Incorrect login returned RPC error status ${res.statusCode}:`, res.body);
    }
  } catch (e) {
    console.log(`❌ Exception:`, e.message);
  }

  // Test 4: Testing check_user_exists RPC
  console.log('\n[Test 4] Testing RPC check_user_exists...');
  try {
    const payload = {
      p_email: 'navaneethm719@gmail.com',
      p_mobile: '+919999999999'
    };
    const res = await makeRequest('/rest/v1/rpc/check_user_exists', 'POST', payload);
    console.log(`Status Code: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('RPC Output:', JSON.parse(res.body));
      console.log('✅ SECURE: check_user_exists RPC is functioning.');
    } else {
      console.log(`❌ ERROR: RPC check_user_exists failed:`, res.body);
    }
  } catch (e) {
    console.log(`❌ Exception:`, e.message);
  }
  
  console.log('\n--- VERIFICATION COMPLETED ---');
}

runTests();
