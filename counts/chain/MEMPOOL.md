> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.

> **Our own testing.** What this page shows is what our probe read on our own desk node in this run; it is not a claim of how TN10 behaves in general.

# Mempool and template timeline, pre-run 26

Read by the probe on the desk's private TN10 node every 20 s, read-only; each cell is the median of that minute's samples. Pre-run 17: ready count and ready mass come from the full mempool read up to 10,000 entries and from the node's own figures (getFeeEstimateExperimental, verbose) above that, where the per-class columns stay blank (the node's wRPC replies are capped at 128 MiB, about 12,500 entries). Ready means no parent in the mempool: in rusty-kaspa v2.1.0 only those are in the selector's frontier. Ready mass is compared with one block's mass limit (500,000): at or under 1 the selector takes all ready transactions best-first; over 1 it samples at random weighted by (fee/mass)^3 (over 4, sample_inplace). Mass is the larger of compute and storage mass, as the v2.1.0 selector normalises it (transient mass is not in the RPC). Other traffic is every mempool entry not in our sender logs (our heavy lane is its own class, our heavy); its fee rate is the node's fee over that mass. Template transactions carry no id in the RPC, so each is matched to a mempool entry by its first input. The template is the desk node's own getBlockTemplate (never submitted): what this node would put in a block at that moment, not a miner's template. The fee estimate is the node's getFeeEstimate, read only; no sender reads it. Public mempool is getInfo's mempool size on each kept public kaspad.

## The run

Step is the runner's step at the minute's start (see TIMELINE.md).

| Minute (UTC) | Step | Samples | Mempool | Ready (no parent in mempool) | Ready mass, blocks of 500k | Other traffic in mempool | Other ready | Other at 100, n | Other at 100, mean mass | Our payments in mempool | Our heavy in mempool / ready | Floor in mempool / ready | Kcc in mempool / ready | Template txs | Template storage mass | Template txs over 100k storage mass | Template: payments | Template: our heavy | Template: floor | Template: kcc | Template: other | Fee estimate priority / normal / low | Public 1 mempool | Public 5 mempool |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|---:|
| 2026-11-14T02:27 | families | 1 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T02:28 | BASE | 3 | 7 | 15 | 0.68 | 7 | 7 | 1 | 10,000 | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 16 | 387,042 | 0 | 0 | 0 | 8 | 0 | 7 | 100.0 / 100.0 / 100.0 | 10 | 10 |
| 2026-11-14T02:29 | BASE | 3 | 8 | 8 | 0.66 | 0 | 0 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 330,172 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 8 | 50 |
| 2026-11-14T02:30 | BASE | 3 | 7 | 8 | 0.66 | 0 | 0 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 331,298 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T02:31 | BASE | 3 | 6 | 7 | 0.58 | 0 | 0 | - | - | 0 | 0 / 0 | 7 / 7 | 0 / 0 | 7 | 289,232 | 0 | 0 | 0 | 7 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T02:32 | HOLD-1 | 3 | 14 | 14 | 4.21 | 0 | 0 | - | - | 0 | 7 / 7 | 7 / 7 | 0 / 0 | 6 | 470,960 | 1 | 0 | 1 | 5 | 0 | 0 | 248.4 / 163.1 / 112.5 | 0 | 0 |
| 2026-11-14T02:33 | HOLD-1 | 3 | 12 | 12 | 2.80 | 0 | 0 | - | - | 0 | 4 / 4 | 8 / 8 | 0 / 0 | 6 | 472,862 | 1 | 0 | 1 | 5 | 0 | 0 | 210.3 / 153.7 / 111.3 | 0 | 1 |
| 2026-11-14T02:34 | HOLD-1 | 3 | 5 | 5 | 0.86 | 0 | 0 | - | - | 0 | 1 / 1 | 3 / 3 | 0 / 0 | 5 | 431,674 | 1 | 0 | 1 | 3 | 0 | 0 | 100.0 / 100.0 / 100.0 | 5 | 2 |
| 2026-11-14T02:35 | HOLD-2 | 3 | 7 | 8 | 2.22 | 0 | 0 | - | - | 0 | 4 / 4 | 5 / 5 | 0 / 0 | 6 | 331,644 | 1 | 0 | 1 | 5 | 0 | 0 | 222.8 / 157.1 / 111.8 | 4 | 4 |
| 2026-11-14T02:36 | HOLD-2 | 3 | 11 | 11 | 2.70 | 0 | 0 | 1 | 2,237 | 0 | 4 / 4 | 7 / 7 | 0 / 0 | 6 | 470,577 | 1 | 0 | 1 | 5 | 0 | 0 | 297.4 / 171.7 / 113.3 | 7 | 0 |
| 2026-11-14T02:37 | HOLD-2 | 3 | 10 | 12 | 3.24 | 1 | 1 | 1 | 3,363 | 0 | 5 / 5 | 8 / 8 | 0 / 0 | 8 | 331,276 | 0 | 0 | 0 | 8 | 0 | 0 | 326.1 / 175.4 / 113.7 | 11 | 0 |
| 2026-11-14T02:38 | HOLD-3 | 3 | 8 | 8 | 0.66 | 0 | 0 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 327,999 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 9 | 1 |
| 2026-11-14T02:39 | HOLD-3 | 3 | 0 | 7 | 0.58 | 0 | 0 | - | - | 0 | 0 / 0 | 7 / 7 | 0 / 0 | 7 | 288,021 | 0 | 0 | 0 | 7 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T02:40 | HOLD-3 | 3 | 8 | 8 | 0.65 | 0 | 0 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 327,343 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T02:41 | HOLD-4 | 3 | 8 | 9 | 1.09 | 1 | 1 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 333,174 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-14T02:42 | HOLD-4 | 3 | 8 | 8 | 0.65 | 0 | 0 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 326,252 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 0 |
| 2026-11-14T02:43 | HOLD-4 | 3 | 9 | 9 | 0.66 | 1 | 1 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 9 | 329,374 | 0 | 0 | 0 | 8 | 0 | 1 | 100.0 / 100.0 / 100.0 | 9 | 1 |
| 2026-11-14T02:44 | HOLD-4 | 3 | 1 | 1 | 0.08 | 0 | 0 | - | - | 0 | 0 / 0 | 1 / 1 | 0 / 0 | 1 | 41,701 | 0 | 0 | 0 | 1 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T02:45 | HOLD-4 | 3 | 8 | 8 | 0.66 | 0 | 0 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 330,597 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 7 | 0 |
| 2026-11-14T02:46 | RETURN | 3 | 8 | 8 | 0.65 | 0 | 0 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 327,436 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-14T02:47 | RETURN | 3 | 8 | 8 | 0.66 | 0 | 0 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 327,673 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T02:48 | RETURN | 3 | 6 | 6 | 0.49 | 1 | 1 | - | - | 0 | 0 / 0 | 6 / 6 | 0 / 0 | 6 | 247,139 | 0 | 0 | 0 | 6 | 0 | 1 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-14T02:49 | RETURN | 3 | 8 | 8 | 0.66 | 0 | 0 | - | - | 0 | 0 / 0 | 8 / 8 | 0 / 0 | 8 | 329,033 | 0 | 0 | 0 | 8 | 0 | 0 | 100.0 / 100.0 / 100.0 | 3 | 1 |
| 2026-11-14T02:50 | tail | 3 | 1 | 1 | 0.24 | 1 | 1 | 1 | 3,350 | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 1 | 119,910 | 0 | 0 | 0 | 0 | 0 | 1 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-14T02:51 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T02:52 | tail | 3 | 2 | 2 | 0.03 | 2 | 2 | 1 | 3,350 | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 100.0 / 100.0 / 100.0 | 7 | 0 |
| 2026-11-14T02:53 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-14T02:54 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 1 |
| 2026-11-14T02:55 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
