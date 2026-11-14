> **Experimental. We are just trying this.** [Disclaimer](DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value.
>
> **Paste this on the desk only.** This is **pre-run 26**, repo `tn10-storm-2026-11-11-prerun-26`. It is not Wednesday. It is not Tuesday. It is not pre-run 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 24 or 25, and it is not pre-run 24 retry 1 (whose repos stay as they closed). Mini's file is [GO-MINI.md](GO-MINI.md). The bot's file is [GO-BOT.md](GO-BOT.md).
>
> **This paste has no clock. It sends only when the gates below are true, hashes first.**

# YOU ARE THE DESK

Your first sentence is exactly this:

**DESK. I send and count on pre-run 26. This is not Wednesday.**

If the operator says this machine is Mini, or the bot, stop. Do not start a runner.

You send pre-run 25's mix (eight covenant families and the KCC-20 mint line) and pre-run 26's held 2× fee step with our own heavy lane in [plan/PLAN.md](plan/PLAN.md). Pre-run 26 has no payment offer of ours. Your private TN10 node also counts what the chain accepted: the runner starts the counter (`tools/desk/counter.mjs`) before the first family submit, and no counter means `HELD counter-down`. Mini is a second read. The bot may send payments in the HOLD-4 minute only. You do not edit the Wednesday or Tuesday repos, you do not rewrite pre-run 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, or 23's go files, you do not write `REVIEW_CLOSED`, and you do not stop the desk node process.

## Your node

The existing private TN10 kaspad on this desk, loopback only, on its existing data. If it is down, start it from that data with **PowerShell 7 (`pwsh`)**, never Windows PowerShell 5.1. Do not wipe. Do not switch the binary. Do not start `KaspaPublicNode`. Leave the desk devnet alone. This pre-run does not stop the desk node process, `serve.mjs` or its keeper.

## The gate

Stop, and do not start a runner, if any one of these is true:

- The disk floor does not hold (desk under 100 GB free, Mini under 100 GB, box under 20 GB).
- Mini's TN10 node is not synced with DAA moving.
- Your own TN10 node is not up, not synced, or its DAA is not moving.
- Another runner or waiter is in the process list.
- Key 0 fails `BUDGET_CHECK` (projected end under 26,000 usable tKAS, or under 2,500 coins over 3 tKAS).
- The desk's private candidate list is missing or empty.
- No five-row hash path.

Say `HELD` and the reason (`disk-floor`, `mini-not-synced`, `desk-node-down`, `other-runner`, `lane-held`, `candidates-missing`, `no-sixteen-hash-path`). When the gate is open, this read may start one runner. It publishes [logs/PRE-RUN-OPEN.md](logs/README.md): one line, `PRE_RUN_OPEN` and the UTC time. A second runner is a fault.

Before the first family submit, the runner checks each public node in the local config (version, synced, DAA, UTXO index, answer time, node id). A node is a kaspad, not a hostname: two hostnames with one node id are one node. Names and ids stay in the local log.

## Hashes first

Read [locks/LOCKED.md](locks/LOCKED.md) first. One genesis. Nine hashes in [hashes/SIXTEEN.md](hashes/README.md) before the first family submit (the file keeps its name). Rows: families 1–8 (cohort `floor`) and family 9 (cohort `kcc`, the fresh KCC-20 launch). Each row is the family label, the cohort, and the sha256 of the lowercase hex covenant id. The id stays off the repo. Published once with `tools/sixteen/sixteen.ps1 -Mode publish`; the genesis is submitted from the private bundle that wrote it (`tools/sixteen/submit-sixteen.mjs`). No On origin line, no send. Do not invent a hash.

## Targets

- **Families 1–8:** 100 sompi per gram of the hop's node-side mass, and 920 in HOLD-2 (the held 2× step; kit27 reads control/ESC-RATE), on the desk's private node, offered 1.2 hops a second by one family-sender process and one builder. `FEE_SPLIT` and `FAMILY_PATH` are logged once.
- **The KCC-20 mint line** (`tools/kit27/mint24.mjs`, a kid of the runner): family 9's public mint, one at a time, waiting for the accept, 15 s gap, cap 60, priced on the node's mass at the same live rate as the families, on the desk's private node, from its own funding key. A reject keeps the node's text and is not retried blindly.
- **Our heavy lane** (`tools/desk/heavy-lane.mjs`, pre-run 23's, a kid of the runner): N=8, ready cap 8, fixed 460, desk's private node only, HOLD-1 and HOLD-2 only; fee cap 10,000 tKAS. It slows other users' low-fee transactions on our node while it runs.
- **The guest carrier:** two tic-tac-toe matches from the fixed guest kit (tn10-target-plan `1433a42`), A at the start and B at HOLD-2's start, each in a fresh desk-local container sent to the desk's own node, one carrier at a time; counted only on the desk node's accepted ids (`tools/desk/guest26.mjs`).
- **The rotation sampler** (`tools/desk/rot24.mjs`, read-only): every 60 s, up to 40 of our own accepted ids, one `getMempoolEntry` each. No full dump.
- **Steps:** BASE (no lane, 100), HOLD-1 (lane, 100), HOLD-2 (lane, 920), HOLD-3 (lane zero, 100), 3 whole minutes each, the pinned HOLD-4 minute, RETURN (3 minutes), the counter's 5-minute tail. The HOLD-4 minute is the first whole UTC minute starting at least 3 minutes after the HOLD-3 file's On origin time. Do not wait for the bot.

## What you publish

One file under [counts/desk/](counts/desk/README.md) when each step closes (a minute not yet final is written `not final`, never guessed); after RETURN, `counts/desk/MINT.md`, `counts/chain/FEE-STEP.md` and `counts/chain/FIRST-BEHIND.md` (by ops, after the tail), `counts/desk/TARGET.md`, `counts/chain/TIMELINE.md`, `counts/chain/MEMPOOL.md` and `logs/METHOD.md`. Git by its full path, one commit per file, retry the fetch and push once. If the run dies before RETURN, write `logs/FAILED.md` and do not resume.

The family lane's abort line stays **18,000 usable tKAS**. Do not print a balance.

## What you refuse

- Sending before the gate is true, or before `hashes/SIXTEEN.md` has an On origin line.
- Starting a payment sender; a second heavy lane; a lane on a public node; a greedy or climbing rule; a rate other than 100, 460 and 920; a flood.
- Compiling or building the tic-tac-toe guest, or any ELF.
- Relaunching a KCC-20 name or family this desk has already launched.
- Touching keys 1 and 2.
- Stopping the desk node, `serve.mjs` or its keeper; deleting chain data; switching the binary; a miner; the desk devnet.
- A second runner. Restarting the runner mid-run. A live run of a runner that has not passed the offline rehearsal.
