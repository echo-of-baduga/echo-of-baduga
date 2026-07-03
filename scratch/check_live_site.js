const https = require('https');

https.get('https://echo-of-baduga.github.io/echo-of-baduga/app.js', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    const hasRpc = data.includes('login_user');
    const hasFrom = data.includes("from('users')");
    console.log('Has RPC login_user:', hasRpc);
    console.log('Has direct users table queries:', hasFrom);
    if (data.length > 500) {
      console.log('Snippet from doLogin section:');
      const idx = data.indexOf('login_user');
      if (idx !== -1) {
        console.log(data.substring(idx - 100, idx + 200));
      } else {
        console.log('login_user not found in file contents.');
        const idxFrom = data.indexOf("from('users')");
        if (idxFrom !== -1) {
          console.log(data.substring(idxFrom - 100, idxFrom + 200));
        }
      }
    }
  });
}).on('error', (e) => {
  console.error(e);
});
