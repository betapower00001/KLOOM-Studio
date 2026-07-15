# CMS changelog

## Ready merged build

- Merged the latest login form and the previous full Neon CMS codebase.
- Neon PostgreSQL is the only CMS database.
- Public Vercel Blob is the only CMS image storage.
- Removed all Supabase runtime, SQL helper, and obsolete generator files.
- Added configured `.env.local` with one clean copy of each required variable.
- Added automatic initial-admin synchronization during `db:setup`.
- Added Neon/Auth/Blob diagnostics with a 10-second timeout.
- Added Windows setup, database setup, system check, development run, and build helpers.
- Fixed light form colors so entered text never blends into white inputs.
- Added understandable Blob Store error messages.
- Added local placeholder assets for every referenced image/video path.
- Verified npm install, TypeScript, ESLint, production build, page responses, and Admin API protection.
