> **Experimental. We are just trying this.** [Disclaimer](DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value.

# Playbook, pre-run 26

Roles are pre-run 24's ([its playbook](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-24/blob/main/PLAYBOOK.md)), with two additions: the desk runner also starts the guest kid (two matches) and our heavy lane (HOLD-1 and HOLD-2 only).

| Who | Does | Does not |
|---|---|---|
| Desk runner | preflight, `BUDGET_CHECK`, `PRE-RUN-OPEN`, probe, counter, genesis, families 1–8, mint line, heavy lane (N=8, ready cap 8, 460; HOLD-1 and HOLD-2), the held 2× step (ESC-RATE 920 in HOLD-2), rotation sampler, guest kid, step files, TARGET, METHOD | payments, a climbing rule, a lane on a public node, compile |
| Guest kid | two tic-tac-toe matches from the kit (A at the start, B at HOLD-2), one carrier at a time, sent to the desk's own node; confirms on the desk node's accepted ids; stops each `ttd` | a third match, a retry of a rejected carrier tonight |
| Mini | the second read, `MINI-ARMED`, its step files | send |
| Bot | free check before the pinned minute; sends there only on a free distinct public kaspad, at normal rate; else `NO SEND` | count |

## Disk floor (written before the open)

Desk and Mini at least 100 GB free, box at least 20 GB. Below that nothing starts. The run writes a few hundred MB on the desk; the floors keep the node's data safe first.

## Status when this repo was opened

Filled before `PRE-RUN-OPEN` (UTC): see below.
