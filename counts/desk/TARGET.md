> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only. Counts only.

# Target, pre-run 26 (desk's own read)

Open window: from logs/PRE-RUN-OPEN.md on origin (2026-11-14T02:25:46Z) to this file (2026-11-14T02:56:05Z). Accepted = the desk node's own read (coordinator accepting-header time for the family hops; next minter seen for the mints).

| Line | Accepted on the desk node in the window | Met |
|---|---:|---|
| Covenant hop (families 1–8, floor) | 14,264 | met |
| KCC-20 mint (family 9, one at a time, cap 60) | 60 | met |
| Tic-tac-toe guest carrier (two matches: A at the baseline, B at the 2x step; one carrier at a time) | 16 of 16 logged (16 submit-OK per ttflow) | met |

The combined three-part target is **met** in this run (plan card 26 keeps the three lines; its own target, the table of landings, template and fee estimate at baseline / lane 1x / 2x / zero with the lane back to zero, is counts/chain/FEE-STEP.md, written by ops after the tail).

Guest carriers counted only when the id ttflow logged is among the desk node's own accepted transaction ids (its virtual chain since the guest started); ttflow's "accepted" alone means the node took the submit. Steps accepted: A: Step 1 (Init), A: Step 2 (Deposit Player A), A: Step 3 (Deposit Player B), A: Step 4 (CreateGame), A: Step 5 (JoinGame), A: Step 6 (Turn Player A), A: Step 7 (Turn Player B), A: Step 8 (Withdraw), B: Step 1 (Init), B: Step 2 (Deposit Player A), B: Step 3 (Deposit Player B), B: Step 4 (CreateGame), B: Step 5 (JoinGame), B: Step 6 (Turn Player A), B: Step 7 (Turn Player B), B: Step 8 (Withdraw). Steps logged but not seen accepted: -. Gate: A gate ok; B gate ok. DA read at RETURN: A open 0; playing 0; finished 1; B open 0; playing 0; finished 1.

Issue #1146 rotation sample (rot24.mjs, our own accepted ids, 60 s or more after acceptance, asked one at a time on the same node): 23 samples, 880 ids checked, 0 still listed in the mempool.
