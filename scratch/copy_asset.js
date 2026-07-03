const fs = require('fs');
try {
  fs.copyFileSync(
    'C:\\Users\\ELCOT\\.gemini\\antigravity\\brain\\7d545696-0a13-402e-a64f-f971c87c6e50\\band_baduga_1781268397455.png',
    'c:\\Users\\ELCOT\\Desktop\\echo of badaga\\assets\\band_baduga.png'
  );
  console.log('Copied successfully!');
} catch (e) {
  console.error('Error copying file:', e.message);
}
