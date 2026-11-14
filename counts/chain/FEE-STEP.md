> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.

# Fee step, pre-run 26 (plan card 26's table)

Written by ops after the tail from the desk run's own logs: the family sender's submit rows, the coordinator's accepting-header times, the mint line's rows, the guest kid's totals, the desk counter's chain minutes (lane `hv1`, the rest `other`), the template sampler (every 3 s) and the mempool probe's fee estimate. Segments are cut at the moment the runner wrote the lane and fee files (`LANE_SET`), so they start about 23 s before each step file's label. **Our heavy lane slows other users** while it runs (HOLD-1 and HOLD-2 here).

## Landings and load per segment

| Segment (UTC) | Lane | Mix rate (family rows, median) | Covenant hops submit-OK | Covenant hops landed | Per minute landed | Mints accepted | Mint accept median / max, ms | Guest | Our lane landed (whole minutes) | Other traffic landed (whole minutes) | Template mass, mean (lane / rest; lane txs per template) | Ready mass, mean | Fee estimate priority, median (max) / normal |
|---|---|---:|---:|---:|---:|---:|---:|---|---:|---:|---:|---:|---:|
| Baseline (no lane, mix at 100), 02:28:59–02:31:59 | 0 | 100 | 1,951 | 1,949 | 649.7 | 11 | 513 / 1,025 | match A | 0 in 2 | 6,391 in 2 | 261,209 (5,806 / 255,403; 0.02) | 267,695 | 100 (100) / 100 |
| Lane on 1× (lane 460, mix 100), 02:31:59–02:34:59 | N 8, ready cap 8, 460 | 100 | 1,835 | 1,835 | 611.7 | 12 | 1,015 / 1,025 | - | 468 in 2 | 6,320 in 2 | 423,187 (235,555 / 187,632; 0.88) | 1,315,459 | 210.33 (256.14) / 153.68 |
| Lane on, mix at 2× (lane 460, mix 920), 02:34:59–02:37:59 | N 8, ready cap 8, 460 | 920 | 1,870 | 1,870 | 623.3 | 11 | 1,016 / 1,024 | match B | 464 in 2 | 6,408 in 2 | 366,352 (124,444 / 241,907; 0.47) | 1,218,826 | 297.38 (357.25) / 171.69 |
| Lane at zero (mix 100), 02:37:59–02:40:59 | 0 | 100 | 1,894 | 1,894 | 631.3 | 11 | 1,015 / 1,532 | - | 0 in 2 | 6,346 in 2 | 225,880 (3,336 / 222,544; 0.02) | 244,326 | 100 (100) / 100 |
| Drain, HOLD-4 and RETURN (lane 0, mix 100), 02:40:59–02:50:24 | 0 | 100 | 6,083 | 6,083 | 646.0 | 11 | 1,022 / 1,027 | - | 0 in 9 | 28,817 in 9 | 274,422 (3,010 / 271,412; 0.01) | 292,058 | 100 (100) / 100 |

## Guest

- Match A (baseline): 8 of 8 logged carriers accepted on the desk node (8 submit-OK per ttflow; gate gate ok; DA read open 0; playing 0; finished 1)
- Match B (2× step): 8 of 8 logged carriers accepted on the desk node (8 submit-OK per ttflow; gate gate ok; DA read open 0; playing 0; finished 1)

## Lane back to zero

- Lane zero written 2026-11-14T02:37:59Z; last minute with a lane submit-OK: 2026-11-14T02:37Z; lane submit-OK in any whole minute after the zero minute: none.
- At RETURN (2026-11-14T02:46:12Z) the lane's last minute line read N 0, ready cap 0. Lane totals: 1,413 submit-OK, 1,733.28 tKAS fees, 0 pending at its end.
- **Card 26 met:** yes (the table exists and the lane stopped at its zero).

Landed counts hops whose accepting header falls in the segment; a few at each edge belong to the neighbour. Our lane and other traffic are counted only over the whole chain minutes inside each segment. The fee estimate is the desk node's own.

