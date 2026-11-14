> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only.

# kit27 (pre-run 26)

kit26 with two changes, copied over the private kit on the desk:

- `family-fees.mjs`: both tiers (floor 1–8, kcc 9) are marked `esc`, so `buildHop` prices every hop and every mint at `liveRate()`, which reads the run's `control/ESC-RATE` once a second (clamped 100–2,000). The table rate stays 100, so the hash file and the fee checks are unchanged. The runner writes 100, then 920 for HOLD-2 (the held 2× step), then 100 again.
- `mint24.mjs`: the cap comes from the run config (`mint_cap`, 60 in pre-run 26; was a fixed 30), and the start line says the rate is live.
