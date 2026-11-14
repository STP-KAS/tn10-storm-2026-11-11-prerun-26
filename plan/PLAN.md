> **Experimental. We are just trying this.** [Disclaimer](../DISCLAIMER.md) · This page does not start a machine. Pre-run 26. Not Wednesday. Not Tuesday. Not pre-run 1 to 25, and not pre-run 24 retry 1 (whose repos stay as they closed).

# Targets

The source is the pre-run 26 card in [tn10-target-plan plan/PLAN.md](https://github.com/STP-KAS/tn10-target-plan/blob/main/plan/PLAN.md) ("Fee step on the mix"), with section P (REVIEW-01) binding. Gate: pre-run 25 met ([pre-run 25](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-25): 14,339 hops on 8 families, 30 of 30 mints, 8 of 8 guest carriers on the desk node; no component fell behind). There is no T0 and no public clock. Every step is an observation of whole minutes.

**Question.** On the mix that pre-run 25 held, what does one bounded fee increase change for landings, stalls, the desk template and the fee estimate, when our own heavy lane competes for the same block space?

**Target (the card's).** Our lane runs and returns to zero, and a table shows landings for the covenant hop, the KCC-20 mint and the tic-tac-toe guest, the desk template mass and the desk fee estimate, at the no-lane baseline, with the lane on at the mix's normal rate (1×), with the lane on and the mix held at twice the lane's rate (2×), and with the lane at zero. Other users' traffic on our node is counted as pre-run 23 counted it. **Met means the table exists and the lane stopped, not that a particular theory won.** The table is `counts/chain/FEE-STEP.md`, written by ops after the tail from the run's own files. Retry count 0.

## The one change, written before the arm

**One held 2× fee step, with our own lane as the competitor.** The mix is pre-run 25's (8 floor families at 1.2 hops a second each, the KCC-20 mint line one at a time, the guest one carrier at a time). Added for the card:

- **Our heavy lane** (pre-run 23's `heavy-lane.mjs`, unchanged): N=8 chains, **ready cap 8**, a fixed **460** sompi/gram of node mass, about 266,700 storage mass a transaction, submitted **only to the desk's private node**. It runs in HOLD-1 and HOLD-2 only (6 whole minutes) and is at zero in BASE, HOLD-3, HOLD-4 and RETURN. Its fee cap is 10,000 tKAS (control/LANE-CAP-FEES), inside the card's 15,000 with the families. **While it runs it slows other users' low-fee transactions on our node. We say so here, in public.**
- **The held step:** in HOLD-2 the mix's live rate (families and mints, kit27: both tiers read control/ESC-RATE) is **920 = 2 × 460**, held for the whole step. No climb, no greedy rule, no rule that moves the rate; 1,405 and 2,000 are not used (those climbs are already logged).
- **Guest:** two matches, A at the start (baseline) and B at HOLD-2's start (the 2× step), at the kit's own fee (the step does not move it).
- **Mint cap 60** (was 30) so the mint line has rows in every segment; the spacing (accept, then 15 s) is unchanged.

| Order | File | Our lane | Mix rate (families and mints) | Length |
|---:|---|---|---:|---|
| 1 | BASE | off (the no-lane baseline) | 100 | 3 whole minutes |
| 2 | HOLD-1 | N=8, ready cap 8, 460 | 100 (1×) | 3 whole minutes |
| 3 | HOLD-2 | N=8, ready cap 8, 460 | **920 (2×), held**; guest match B | 3 whole minutes |
| 4 | HOLD-3 | **zero** | 100 | 3 whole minutes |
| 5 | HOLD-4 | zero; the bot sends only on a free public kaspad, or files `NO SEND` | 100 | the pinned minute |
| 6 | RETURN | zero | 100 | 3 whole minutes |
| 7 | tail | families stopped, the counter reads on | — | 5 minutes |

Abort (card and plan C): ready count above the cap; the lane still sending after its zero; any heavy-shape submit to a public node; the shared aborts (desk process gone, Mini data, disk, DAA stall, connectivity guard, key 0 under the abort line).

## Cohorts

| Cohort | Families | Rate, sompi/gram of node mass | What |
|---|---|---:|---|
| floor | 1–8 | 100; 920 in HOLD-2 | covenant families, one hop per transaction, the family sender |
| kcc | 9 | 100; 920 in HOLD-2 | the fresh KCC-20 launch; each hop is one public mint, the mint line, one at a time |
| our heavy lane | — | 460 in HOLD-1 and HOLD-2 | plain pay-to-key transactions from our payment pile to our own sink key, ready cap 8 |

kit27 is kit26 with both tiers marked live (`esc`): the table rate stays 100 (hash file, fee checks), and each hop and mint is priced at the run's control/ESC-RATE ([tools/kit27](../tools/kit27/README.md)).

## Prediction, written before the run

- **BASE:** as pre-run 25: about 600 floor hops a minute, mints about 0.5 s, guest A 8 of 8.
- **HOLD-1 (lane on, mix at 100):** the lane's 8 ready transactions are about 2.1 million mass, over four blocks, so v2.1.0 samples the template with weight (fee/mass)³: 100 against 460 is about 1 to 100 per unit of mass. We expect floor hops to fall to well under half of BASE, mint accept times to rise to many seconds (the first-behind mint line of 10 s may trip), and the fee estimate to rise.
- **HOLD-2 (mix at 920):** 920 against 460 is 8 to 1 for our mix, so we expect hops and mints back near BASE while the lane keeps landing; guest B, at its own low fee, may be slow or held until HOLD-3.
- **HOLD-3 (zero):** back to BASE within a minute or two; the fee estimate back to its floor.
- **Cost:** lane about 300 tKAS a minute for 6 minutes (about 1,800), the mix about 25 tKAS a minute at 100 and about 220 at 920 (about 1,300 in all): about 3,100 tKAS, inside the 15,000 cap.
