OBSERVATION

Not scored. No payment of ours in pre-run 26: families only, on the desk's private node, plus our own heavy lane at the N shown per minute.

# HOLD-2, desk, pre-run 26

> Our own TN10 testing: what we observed in this run, on our own desk node. Counts only. Included is what the desk's private TN10 node accepted on chain, read by the desk counter, by accepting chain block time. Mini's files are a second read.

HOLD-2 in pre-run 26 is the held 2x fee step: the same lane (N=8, ready cap 8, 460), the mix (families and mints) at 920, twice the lane's rate; guest match B: L8-R8-r460-mix920 3 whole minutes. The mix of pre-run 26 is pre-run 25's: 8 covenant families (node mass) and the KCC-20 mint line (family 9, one mint at a time; MINT.md has its rows), at 100 except in HOLD-2, where both are held at 920 (twice our lane's 460). Our own heavy lane (N=8, ready cap 8, fixed 460, desk's private node only) runs in HOLD-1 and HOLD-2 and is at zero otherwise; while it runs it slows other users' low-fee transactions on our node. No payment of ours. The tic-tac-toe guest ran match A at the start and match B at HOLD-2's start, one carrier at a time, from a desk-local container (TARGET.md has its count). The HOLD file names are kept so the bot's and Mini's gates read as in earlier pre-runs. Not scored.

Families offer 1.2 hop/s, 9 families live, one family-sender process and one builder: floor (families 1–8) 100 sompi/gram on the desk's private node, kcc (families 9–9) 100 sompi/gram on the desk's private node. No payment sender was started.

## Tiers against the mempool, per minute

| Minute (UTC) | Lane 1 N / rate | Lane 2 N / rate | floor (100) | kcc (100) | Our heavy in mempool / ready | Our heavy landed, lane 1 / lane 2 | Lane submits OK, lane 1 / lane 2 | Outside heavy at 100 (>200k mass) / ready | Outside at 100, n | Ready mass, blocks | Mempool | Fee estimate priority |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 2026-11-14T02:35 | 8 R8 / 460 | 0 / 100 | 617 | 4 | 4 / 4 | 231 / 0 | 235 / 0 | - / - | - | 2.22 | 7 | 222.8 |
| 2026-11-14T02:36 | 8 R8 / 460 | 0 / 100 | 611 | 3 | 4 / 4 | 233 / 0 | 235 / 0 | 0 / 0 | 1 | 2.70 | 11 | 297.4 |
| 2026-11-14T02:37 | 8 R8 / 460 | 0 / 100 | 634 | 4 | 5 / 5 | 242 / 0 | 235 / 0 | 0 / 0 | 1 | 3.24 | 10 | 326.1 |

Lane 1 and lane 2 N / rate are the caps the runner set for that minute (N lane chains each, each chain with at most one ready transaction in the mempool) and each lane's fee rate (in the duel, the rate in effect at the start of the minute). Our heavy in mempool / ready is the probe's median count of our own lane entries; our heavy landed is what the desk counter read as accepted on chain from our lane in the minute; lane submits OK is the lane's own log. Hops are what the desk counter read as accepted on chain in that minute, per tier. Ready mass, blocks, is the median of the probe's samples in the minute (block limit 500,000). Outside at 100 is the median count of mempool entries not in our logs (our lane is in our logs) paying 100 sompi/gram, and heavy is how many of those had a mass over 200,000 (median of samples). The outside stream is not attributed to anyone.

## Chain, desk counter

| Minute (UTC) | Included, all non-coinbase | Our payments included | Floor hops (100) | Kcc hops (100) | Other traffic | Chain blocks | DAA gap max | Sink age max, ms | Final after, s | Counter |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 2026-11-14T02:35 | 4,037 | 0 | 617 | 4 | 3,257 | 390 | 2 | 999 | 20 | kept pace |
| 2026-11-14T02:36 | 3,939 | 0 | 611 | 3 | 3,151 | 364 | 2 | 651 | 20 | kept pace |
| 2026-11-14T02:37 | 4,007 | 0 | 634 | 4 | 3,193 | 374 | 0 | 385 | 20 | kept pace |

Coinbase is taken out as one per merged blue block (on this node a chain block's accepted list carries the coinbase of each blue block it merges). Other traffic is the rest: other users' load, the genesis, and anything not in our logs.

## Hop rate per cohort, as built

Floor (families 1–8, desk private node): 920 sompi/gram per hop. Kcc (families 9–9, desk private node): no rows sompi/gram per hop. In pre-run 26 that rate is on the hop's node-side mass (kit21): the builder is asked for a bill rate on its own mass so that fee / node mass is the tier's rate.

| Tier | Node rate as built, median (min–max) | Bill rate, median | Node mass, median (min–max) | Node rate in the desk mempool, lowest–highest (probe) |
|---|---|---:|---|---|
| floor (100) | 920.18 (920–920.32) | 2898 | 41,083 (40,482–43,920) | 920–920.31 |
| kcc (100) | - | - | - | - |

Node rate as built is kit21's fee / node mass (rusty-kaspa v2.1.0 storage mass with UTXO plurality, or compute or transient/2 if larger). In the desk mempool the probe divides the node's fee by the larger of the storage and compute mass the node reports.

## Funding coins, as read from the desk node

The funding coins were not one size. Sizes seen, whole tKAS (coins): 23 (319), 24 (308), 5 (263), 6 (245), 4 (240), 7 (217), 8 (182), 22 (171), 9 (168), 3 (149), 10 (116), 25 (114), and 32 more sizes. The fee is not called the whole cause.

## Minutes

| Minute (UTC) | Pay submit-OK | Attempts | Rejects, rate | Rejects, full | Other | Floor OK / att / rate rej / full rej / waiting | Kcc OK / att / rate rej / full rej / waiting | Family stalls logged | Family node mempool-high marks | Clean |
|---|---:|---:|---:|---:|---:|---|---|---:|---:|---|
| 2026-11-14T02:35 | 0 | 0 | 0 | 0 | 0 | 622 / 748 / 0 / 0 / 5 | 0 / 0 / 0 / 0 / 0 | 0 | 0 | yes |
| 2026-11-14T02:36 | 0 | 0 | 0 | 0 | 0 | 606 / 739 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 | 0 | 0 | yes |
| 2026-11-14T02:37 | 0 | 0 | 0 | 0 | 0 | 642 / 773 / 0 / 0 / 8 | 0 / 0 / 0 / 0 / 0 | 0 | 0 | yes |

A family stall is a coordinator mark: no hop of that family landed for a while. The family was still attempting. It is logged, and it does not make the minute dirty.

A mempool-high mark means the family node read a mempool at or over 90,000. In pre-run 26 that does not stop the families: the skip does not apply to them. A skip, if one were set, is dirt with its reason (node-skip-fam) for every minute it covers, and it clears when the mempool falls back under the line.

Within 10 percent means 0 to 0 submit-OK in the minute.

## Public nodes (local numbers)

Kept: 1, 5. The family sender reads and submits every tier on the desk's private node, which the desk counter reads. The kept public kaspads are read for sync and DAA only; no payment of ours went to them.

Kept nodes are unique kaspads: each answered with its own node id at the preflight. 3 candidate endpoints passed the check and were 2 kaspads (node 4 is node 1; the second hostname was not used). 3 payment senders per kaspad.

| Node | Synced every sample | Last DAA | Pay submit-OK | Pay rejects | Dropped sockets | Answer ms, median |
|---:|---|---:|---:|---:|---:|---:|
| 1 | yes | 622876805 | 0 | 0 | 0 | 36 |
| 5 | yes | 622876805 | 0 | 0 | 0 | 32 |

## Hop submit to landing, per cohort

| Cohort | Landed of OK | Median ms | Slow tail (p95) ms |
|---|---:|---:|---:|
| floor | 1870 of 1870 | 599 | 1041 |
| kcc | 0 of 0 | - | - |

Landing is the accepting block header time the desk's coordinator read. Waiting is submitted-OK not yet landed at the minute's end. Every tier has the same hop shape and the same node; only the rate differs.

## Mempool and template, desk node (probe)

| Minute (UTC) | Samples | Mempool | Ready (no parent in mempool) | Ready mass, blocks of 500k | Other traffic in mempool | Other ready | Other at 100, n | Other at 100, mean mass | Our payments in mempool | Our heavy in mempool / ready | Floor in mempool / ready | Kcc in mempool / ready | Template txs | Template storage mass | Template txs over 100k storage mass | Template: payments | Template: our heavy | Template: floor | Template: kcc | Template: other | Fee estimate priority / normal / low | Public 1 mempool | Public 5 mempool |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|---:|
| 2026-11-14T02:35 | 3 | 7 | 8 | 2.22 | 0 | 0 | - | - | 0 | 4 / 4 | 5 / 5 | 0 / 0 | 6 | 331,644 | 1 | 0 | 1 | 5 | 0 | 0 | 222.8 / 157.1 / 111.8 | 4 | 4 |
| 2026-11-14T02:36 | 3 | 11 | 11 | 2.70 | 0 | 0 | 1 | 2,237 | 0 | 4 / 4 | 7 / 7 | 0 / 0 | 6 | 470,577 | 1 | 0 | 1 | 5 | 0 | 0 | 297.4 / 171.7 / 113.3 | 7 | 0 |
| 2026-11-14T02:37 | 3 | 10 | 12 | 3.24 | 1 | 1 | 1 | 3,363 | 0 | 5 / 5 | 8 / 8 | 0 / 0 | 8 | 331,276 | 0 | 0 | 0 | 8 | 0 | 0 | 326.1 / 175.4 / 113.7 | 11 | 0 |

Read by the probe on the desk's private TN10 node every 20 s, read-only; each cell is the median of that minute's samples. Pre-run 17: ready count and ready mass come from the full mempool read up to 10,000 entries and from the node's own figures (getFeeEstimateExperimental, verbose) above that, where the per-class columns stay blank (the node's wRPC replies are capped at 128 MiB, about 12,500 entries). Ready means no parent in the mempool: in rusty-kaspa v2.1.0 only those are in the selector's frontier. Ready mass is compared with one block's mass limit (500,000): at or under 1 the selector takes all ready transactions best-first; over 1 it samples at random weighted by (fee/mass)^3 (over 4, sample_inplace). Mass is the larger of compute and storage mass, as the v2.1.0 selector normalises it (transient mass is not in the RPC). Other traffic is every mempool entry not in our sender logs (our heavy lane is its own class, our heavy); its fee rate is the node's fee over that mass. Template transactions carry no id in the RPC, so each is matched to a mempool entry by its first input. The template is the desk node's own getBlockTemplate (never submitted): what this node would put in a block at that moment, not a miner's template. The fee estimate is the node's getFeeEstimate, read only; no sender reads it. Public mempool is getInfo's mempool size on each kept public kaspad.
