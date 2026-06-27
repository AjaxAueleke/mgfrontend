# SkinCure — Customer Storefront

> Book dermatology appointments online: find nearby doctors, read reviews, pick a time slot, and pay — all in one flow.

SkinCure is a dermatology / skincare appointment-booking platform. This repository is the
**customer-facing storefront** (the patient web app). It is a [Next.js](https://nextjs.org/)
+ TypeScript single-page-style application that lets patients sign up, search for doctors,
view doctor profiles and patient reviews, book an appointment slot, and pay for it with Stripe.

> **Note:** This frontend is a client only. It does not contain a database or business logic of
> its own — it talks to a separate SkinCure backend API (configured via `NEXT_PUBLIC_SERVER_URL`)
> for all authentication, doctor, appointment, and booking data. To run it end-to-end you need
> that backend running as well. This repo is a work-in-progress portfolio project; some flows are
> complete and others are partially wired (see **Project status** below).

## Features

- **Authentication** — sign up, log in, forgot/reset password (via emailed reset code), and
  change password. JWTs from the backend are stored in `localStorage` and sent as
  `Authorization: Bearer` headers.
- **Doctor discovery** — search doctors by name, or use the browser's geolocation to find the
  nearest doctors (`findnearestdoc?lat=&lon=&distance=`).
- **Doctor profiles** — view a doctor's details, aggregate star rating, individual patient
  reviews, and their available schedule slots.
- **Appointment booking** — pick an available schedule slot and confirm a booking.
- **Stripe payment** — the booking confirmation page collects card details with Stripe Elements
  (`CardElement`), creates a Stripe token client-side, and posts it to the backend booking
  endpoint. (Requires a Stripe publishable key.)
- **Patient dashboard** — view and filter your appointments, and manage your profile (name,
  contact info, password).
- **Reviews** — patients can rate and review doctors.

## Tech stack

- **Framework:** Next.js 12 (Pages Router), React 18, TypeScript
- **State:** Redux Toolkit + `next-redux-wrapper` (SSR-hydrated store for `auth` and `doctors`)
- **UI:** Chakra UI (primary), Tailwind CSS (configured), Emotion, Framer Motion, React Icons
- **Payments:** Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- **HTTP:** `fetch` and `axios`
- **Tooling:** ESLint (`eslint-config-next`), Cypress + Jest (configured; see status note)

## Architecture

```
Browser (this app)  ──HTTPS──►  SkinCure backend API  (NEXT_PUBLIC_SERVER_URL, /api/v1/*)
        │                                  ▲
        └──► Stripe.js (tokenize card) ────┘  (token id posted to backend booking endpoint)
```

- All domain data is fetched at runtime from `${NEXT_PUBLIC_SERVER_URL}/api/v1/...`
  (`/users`, `/doctors`, `/appointments`, `/bookings`).
- The local Next.js `src/pages/api/*` routes are minimal scaffolding/stubs, not the real API.
- Redux holds auth state and the doctor list; the JWT lives in `localStorage`.

## Project structure

```
src/
  components/    # Reusable UI: NavBar, Footer, Card, Modal, SearchBox, PatientNav, PatientMain
  features/      # Redux slices: auth.ts (user/session), doctors.ts (doctor list)
  modules/       # store.ts — Redux Toolkit store + next-redux-wrapper setup
  pages/
    index.tsx                          # Landing page
    login.tsx / signup.tsx / forgot.tsx
    patient/                           # Patient dashboard, profile, doctor search
      appointment/                     # Appointment list + booking confirmation/payment
    doctor/[id].tsx                    # Doctor profile, reviews, slot selection
    api/                               # Minimal local API stubs
  util/          # Helpers (email validation, text formatting)
  styles/        # Global + module CSS
public/          # Static assets
```

## Getting started

### Prerequisites
- Node.js 18+
- A running instance of the SkinCure backend API (separate repository)
- A Stripe account / publishable key (for the payment step)

### Install

```bash
npm install
# or
yarn install
```

### Configure environment

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SERVER_URL` | Yes | Base URL of the SkinCure backend API (e.g. `http://localhost:5000`). All `/api/v1/*` calls are made against it. |
| `NEXT_PUBLIC_STRIPE_PK` | For payments | Stripe **publishable** key (`pk_test_...` / `pk_live_...`). |
| `RAPIDAPI_KEY` | No | Server-side RapidAPI key for the optional `/api/disease` medication-lookup route. Not exposed to the browser. |

### Run the dev server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint
npm run test    # jest (no test files yet — see status note)
```

## Project status

This is a portfolio / in-progress project. Be aware of the following:

- **Requires the backend.** Without `NEXT_PUBLIC_SERVER_URL` pointing at a live SkinCure API,
  auth, doctor, and appointment flows will not return data.
- **Google Maps is not embedded.** The app only uses the browser geolocation API plus a
  "view on Google Maps" deep link — no interactive map is rendered.
- **No automated tests yet.** Cypress and Jest are configured as dependencies, but the repo
  does not currently contain test specs.

## Screenshots

> _TODO: add screenshots / GIFs of the landing page, doctor search, doctor profile, and the
> appointment booking + payment flow._

| Landing | Doctor search | Booking & payment |
|---|---|---|
| _(placeholder)_ | _(placeholder)_ | _(placeholder)_ |

## License

[MIT](./LICENSE)
