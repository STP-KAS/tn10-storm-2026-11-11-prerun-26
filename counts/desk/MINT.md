> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only. No id, txid or address in this file.

# KCC-20 mint line, pre-run 26

One fresh KCC-20 public-mint launch (family 9 in the hash file; a launch name not used before). One mint at a time: the line builds one mint at the mix's live rate on the node's own mass (100, and 920 in HOLD-2's held 2x step), submits it to the desk's private node, and waits until the node shows the next minter (the mint accepted on the virtual chain) before the next one, then 15 s. Cap 60 accepted mints (pre-run 26: raised from 30 so the line spans every segment). A reject is kept with the node's text; the fee is not raised by the line itself.

- Mints submitted OK: 60; accepted (next minter seen on the desk node): 60; rejected: 0; accept timeouts (120 s): 0; build failures: 0.
- Accept time, submit to next minter seen: min 503 ms, median 1015 ms, max 2044 ms.
- Node rate (fee / node mass): 100–920.3; node mass 40963–41852; fees 6.2579 tKAS in all.
- Accepted mints by step: BASE 15, HOLD-1 12, HOLD-2 11, HOLD-3 11, HOLD-4 11.
- End state: cap.

No reject text.

