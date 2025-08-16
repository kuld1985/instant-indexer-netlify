const { google } = require('googleapis');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const urls = body.urls;

    if (!urls || !urls.length) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No URLs provided' }) };
    }

    const key = JSON.parse(process.env.SERVICE_ACCOUNT);
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/indexing'],
      null
    );

    const indexer = google.indexing({ version: 'v3', auth: jwtClient });

    let results = [];
    for (let url of urls) {
      try {
        await indexer.urlNotifications.publish({
          requestBody: { url: url, type: 'URL_UPDATED' }
        });
        results.push({ url, status: 'SUCCESS' });
      } catch (err) {
        results.push({ url, status: 'ERROR', message: err.message });
      }
    }

    return { statusCode: 200, body: JSON.stringify(results) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};