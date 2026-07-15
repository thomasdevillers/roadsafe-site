# Roadsafe Traffic

Production-ready Next.js redesign for Roadsafe Traffic, built for Vercel.

## Development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local`, verify the sender address in Brevo, and
configure the Brevo environment variables before testing real email delivery.
In local development, quote submissions are simulated when no Brevo API key is
present.

## Project References

- [Manual launch tasks](TODO.md)
- [Original live-site index](site-index/README.md)
- [Conversion and UX audit](site-index/AUDIT.md)
- [Current and proposed sitemap](site-index/SITEMAP.md)
