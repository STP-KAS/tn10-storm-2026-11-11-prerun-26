> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only. No id, key, address, host, or port in this folder.

# kit26, pre-run 25

kit25 with two changes, both for pre-run 25's one knob (the family count, 4 → 8):

- `family-fees.mjs`: tiers floor 1–8 at 100 and `kcc` 9 at 100, all on the desk; `FAMILY_COUNT = 9`, `SENDER_FAMILIES = 8`. The same file is in `tools/sixteen/` (the hash path and the runner read it there).
- `mint24.mjs`: the mint line mints family `FAMILY_COUNT` (9) instead of a fixed 5. Nothing else in it changed (one at a time, accept wait up to 120 s, then 15 s, cap 30, at most 90 tries, its own funding key).

Every other kit file is kit25's ([../kit25](../kit25/README.md)), unchanged.
