# Bet Tracker

Static React application served by Vercel. `index.html` compiles `app.jsx` in the browser; no build step is needed. Bet storage remains in the existing Supabase-backed `window.storage` adapter.

## Faster entry

- Dedicated entry shortcuts for straight bets, player props, parlays, SGPs, teasers, round robins and futures.
- Player props omit game teams. NFL autocomplete includes a bundled roster, suggests an initial stat by position, and remembers custom names through the existing synced player settings. Selecting Anytime TD fills Over 0.5.
- Structured multi-leg tickets support individual team/prop markets, duplicate legs, and inherit the previous leg's sport, league, market and stat. Combined ticket odds are entered once; SGP prices are never inferred from independent leg odds.
- Teasers adjust spreads upward and totals in the favorable direction. The adjusted-line checkbox accepts a line already adjusted by the book. Original inputs survive editing without applying the adjustment twice. Legacy legs retain their original free-text format.
- New entries reuse the last book, account, sport, type and single-book stake. Dates default to today. Save & add another keeps entry open. Optional date controls, closing odds and notes are collapsible.

## NFL data

The bundled 2026-09-25 snapshot contains 865 active, team-assigned QB/RB/FB/WR/TE/K players from the [Sleeper players API](https://docs.sleeper.com/#players). The Refresh roster button downloads a newer list and caches it on this device. Custom names remain in the existing synced settings. This covers positions used for offensive player props, not offensive linemen. Refresh failures leave the bundled/cached roster usable. Sleeper documents non-commercial API use.

## Verification

`npm ci` then `npm test`. The test uses installed Microsoft Edge in headless mode and an isolated form harness. It never loads `config.js` or writes production data. Tests cover autocomplete, position-based defaults, player learning, mixed parlays, legacy tickets, edit round trips, teaser math, invalid input, decimal prices, futures, round robins, mobile overflow and existing position-analysis regressions. Screenshots are written to `tests/` and excluded from Git.

The npm dependencies are development-only; the deployed site still uses the existing static CDN runtime.
