# nerv.co.nz

Source for [nerv.co.nz](https://nerv.co.nz), a signal-driven personal portfolio built with Next.js, React Three Fiber, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact email

The contact terminal delivers mail through SendGrid. Add these environment variables locally and in Vercel:

```text
SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=verified-sender@example.com
CONTACT_TO_EMAIL=ben@nerv.co.nz
```

`SENDGRID_FROM_EMAIL` must be a verified SendGrid sender. `CONTACT_TO_EMAIL` defaults to `ben@nerv.co.nz` when omitted.

## Verification

```bash
npm run lint
npm run build
```
