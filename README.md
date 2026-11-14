> **Experimental. We are just trying this.** [Disclaimer](DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value.
>
> **This is a pre-run. Pre-run 26.** It is not the Wednesday run. It is not the Tuesday run. It is not pre-run 1 to 25 or pre-run 24 retry 1, and it does not edit their repos. A read does not start a runner.

# tn10-storm-2026-11-11-prerun-26

**Pre-run 26 of the Wednesday neuron: one held 2× fee step on pre-run 25's mix, against our own heavy lane.** The neuron stays [tn10-storm-2026-11-11](https://github.com/STP-KAS/tn10-storm-2026-11-11). This repo does not edit that repo, does not write `REVIEW_CLOSED`, and does not set or move a clock for it. [tn10-storm-2026-11-10](https://github.com/STP-KAS/tn10-storm-2026-11-10) (Tuesday) is not edited from here either.

> **Our own testing.** This is our own Kaspa Testnet-10 testing, run on our own machines and nodes. What these pages report is what we observed in this run; it is not a claim of how TN10 or Kaspa behave in general.

> **Our heavy lane slows other users.** In HOLD-1 and HOLD-2 (6 whole minutes) our own heavy lane (8 chains, ready cap 8, 460 sompi/gram, desk's private node only) competes for block space on our node. While it runs, other users' low-fee transactions on our node are slowed. It is at zero in every other step.

| Field | Value |
|---|---|
| Target | a table of landings for the covenant hop, the KCC-20 mint and the tic-tac-toe guest, with the desk template mass and fee estimate, at the no-lane baseline, lane-on at 1×, lane-on with the mix held at 2×, and lane at zero; and our lane back to zero ([target plan](https://github.com/STP-KAS/tn10-target-plan/blob/main/plan/PLAN.md), pre-run 26 card). Met means the table exists and the lane stopped |
| The change | one held 2× fee step: the mix (families and mints) at 920 = 2 × our lane's 460 in HOLD-2 only (written before the arm; [plan/PLAN.md](plan/PLAN.md)) |
| Met or not met | **met**: the table is [counts/chain/FEE-STEP.md](counts/chain/FEE-STEP.md) and our lane stopped at its zero (last submit-OK minute 02:37 UTC, zero 02:37:59 UTC). Three-part line also held: 14,264 hops, 60 of 60 mints, 16 of 16 guest carriers; no component fell behind ([LESSONS](logs/LESSONS.md)) |
| Retry count | 0 (gate: [pre-run 25](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-25) met) |
| Core tags | 1 (mempool rotation, issue #1146: a light 60-second id sample, not a full dump) |
| Status | done (2026-11-14, open 02:25:46Z, RETURN closed 02:50:24Z, runner end 02:56:14Z) |

**Where this starts.** From [pre-run 25's locks/LOCKED.md](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-25/blob/main/locks/LOCKED.md), copied here as [locks/LOCKED.md](locks/LOCKED.md), with a pre-run 26 section added at the end. Pre-runs 1 to 23 are in [tn-master](https://github.com/STP-KAS/tn-master).

## The change

Pre-run 25 landed all three components at eight families with no fall-off. Pre-run 26 keeps that mix and adds the card's fee step: our own heavy lane (pre-run 23's lane process, unchanged) in HOLD-1 and HOLD-2, and in HOLD-2 the mix held at twice the lane's rate. No climb, no greedy rule. Guest match A at the baseline, match B at the 2× step. Mint cap 60 (was 30) so the mint line spans every segment.

- **The two open-checklist lines from pre-run 25 are done up front:** the desk's private candidate list is copied into the new run directory, and Mini's clone has its git identity set before the arm.
- **Funding.** Key 0 had 2,492 coins over 3 tKAS after pre-run 25, under REVIEW-01's 2,500 line; a logged split from key 0's own big coins made 3,623 (no mining-wallet move needed: key 0 holds over 3× the 15,000 tKAS cap). The guest issuer got two 100 tKAS coins from key 0 (two matches, one bootstrap each). `BUDGET_CHECK` is run again by the desk runner before genesis.
- **Disk floor, written before the open:** desk and Mini 100 GB free, box 20 GB. Below that, nothing starts. **No compile.**

## Machines

| Machine | Go file | First sentence |
|---|---|---|
| Desk | [GO-DESK.md](GO-DESK.md) | DESK. I send and count on pre-run 26. This is not Wednesday. |
| Mini | [GO-MINI.md](GO-MINI.md) | MINI. I count pre-run 26 as the second read. I do not send. This is not Wednesday. |
| Bot | [GO-BOT.md](GO-BOT.md) | GROKBOT. I send payments on the pre-run 26 HOLD-4 only. I do not count. This is not Wednesday. |

**Heavy work on the desk.** The runner, the heavy lane, the guest containers and the bot's waiter, free check and sender all run on the desk ([tools/bot](tools/bot/README.md)); the box only coordinates.

The arm is in [RULES.md](RULES.md). [PLAYBOOK.md](PLAYBOOK.md) has the gates and the status when this repo was opened.

## Gates, in order

1. Disk floor held.
2. Mini's and the desk's TN10 nodes up from their own data, synced, DAA moving, peers present.
3. No other runner or waiter up. Key 0 passes `BUDGET_CHECK` (≥ 2,500 coins over 3 tKAS).
4. The guest kit's gate (`arm-guest.sh --dry`) passes against the desk node.
5. `hashes/SIXTEEN.md` on origin (nine rows, fresh launch names) with an On origin line.
6. The offline rehearsal passed on the changed files.
7. The desk pushes `logs/PRE-RUN-OPEN.md`; Mini pushes `logs/MINI-ARMED.md`.
8. Probe and counter up; genesis; families; heavy lane at N=0; mint line; rotation sampler; guest kid; the steps.

A miss stays in this repo. A next attempt is a new repo and starts from this repo's lock file.

**Part of [tn-master](https://github.com/STP-KAS/tn-master).** This pre-run is its own row.
