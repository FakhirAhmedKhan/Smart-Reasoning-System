const https = require('https');
// require('dotenv').config();

const apiKey = process.env.Google_Key;
const model = "gemini-2.5-flash";

if (!apiKey) {
    console.error("Error: Google_Key not found in environment variables.");
    process.exit(1);
}

const postData = JSON.stringify({
    contents: [
        {
            role: "user",
            parts: [{ text: "Hello, are you working?" }]
        }
    ],
    generationConfig: {
        temperature: 0.2,
    },
});

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response Body:', data);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
