# continualapp

Vercel-ready Next.js app that redirects based on an email embedded in the URL after `$`, `=`, or `#`.

## How it works
- **Middleware** performs server-side redirects for `$` and `=` (and `%23`, which is an encoded `#`).
- **`/app/redirect/page.tsx`** handles `#email@domain.com` on the client, since fragments never reach the server.
- Destination format: `https://$DOMAIN.finalurl.com/redirect|$EMAIL` where `$DOMAIN` is the uppercased first label of the email's domain.

## Quickstart
```bash
# install deps
pnpm i   # or: npm i / yarn

# dev
pnpm dev

# build & run
pnpm build && pnpm start
```

## Example URLs

- `https://your-deployment.vercel.app/redirect/$james@aol.com`
- `https://your-deployment.vercel.app/redirect=james@aol.com`
- `https://your-deployment.vercel.app/redirect/#james@aol.com` (client route)

## cURL test

```bash
curl -I "https://your-deployment.vercel.app/redirect=$james@aol.com"
# Expect: Location: https://AOL.finalurl.com/redirect|james%40aol.com
```

## Deploy to Vercel

1. Push this folder to a Git repo named **continualapp**.
2. Import the repo into Vercel (Dashboard → **New Project** → select **continualapp** → Deploy).

## Notes

- The middleware lets `/redirect` render when no marker is present, so `#...` can be processed client-side.
