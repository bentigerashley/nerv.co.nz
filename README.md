# nerv.co.nz

Source for [nerv.co.nz](https://nerv.co.nz), a signal-driven personal portfolio built with Next.js, React Three Fiber, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact email

The contact terminal delivers mail through Resend. Add these environment variables locally and in Vercel:

```text
RESEND_API_KEY=...
RESEND_FROM_EMAIL=nerv.co.nz <contact@nerv.co.nz>
CONTACT_TO_EMAIL=ben@nerv.co.nz
```

The domain used by `RESEND_FROM_EMAIL` must be verified in Resend. `CONTACT_TO_EMAIL` defaults to `ben@nerv.co.nz` when omitted.

## Verification

```bash
npm run lint
npm run build
```
