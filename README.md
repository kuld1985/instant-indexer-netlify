# Blogger Instant Indexing Tool (Netlify)

## Deploy Instructions
1. Upload this folder as a new GitHub repo (name: `instant-indexer-netlify`).
2. Go to Netlify → New Site → Import from GitHub → select the repo.
3. In Netlify → Site Settings → Environment Variables:
   - Key: `SERVICE_ACCOUNT`
   - Value: Paste your full Google Service Account JSON content (raw).
4. Deploy site.
5. Open your site → Paste URLs → Click "Submit to Google".
6. You should see `SUCCESS` for each indexed URL or `ERROR` if permission/key issue.
