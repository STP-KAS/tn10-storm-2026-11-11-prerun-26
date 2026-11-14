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

Filled before `PRE-RUN-OPEN` (UTC):

- Open-checklist lines from pre-run 25, done up front: the desk's private candidate list copied into the pre-run 26 run directory; Mini's pre-run 26 clone has its git identity set (checked 02:26Z).
- Coin split on key 0 (logged, key 0's own big coins, no mining-wallet move), 2026-11-14T01:49:01Z: 29 transactions, 1,160 new coins from 28,789.99 tKAS, fees 0.513068 tKAS.
- Genesis coins, 2026-11-14T01:49:33Z: key 0 gave one coin of 25 tKAS each to keys 3, 4, 5, 6, 8, 9, 10 and 11 and 34 coins (849.92 tKAS) to the mint key (cap 60), fees 0.102312 tKAS.
- Guest issuer topped up from key 0, 2026-11-14T01:50:38Z: two coins of 100 tKAS (one bootstrap per match), fees 0.019524 tKAS.
- `BUDGET_CHECK` (read-only, 02:27Z): pass. Key 0 104,128 usable tKAS in 3,573 coins over 3 tKAS (line 2,500); projected end 49,408 tKAS against 18,000 + 8,000. Lane pile (key 16) 177 coins, 69,219 tKAS.
- Sync and peers: desk node testnet-10, synced, UTXO index, 2.1.0, DAA moved 88 in 10 s, 8 peers (01:57Z); Mini node testnet-10, synced, UTXO index, 2.1.0, DAA moved 192 in 20 s, 8 peers, tip age under 1 s (01:58Z).
- Disk: desk 368 GB free, Mini 297 GB free, box 102 GB free; all over the floor.
- Guest kit gate, `arm-guest.sh --dry` against the desk node, 2026-11-14T01:58:53Z: `GUEST gate ok mode=dry` (nothing submitted).
- Hash path: `sixteen.ps1 -Mode check` 01:59:01Z (nine rows, verified against the bundle, nothing pushed); `-Mode publish` 02:00:08Z on origin (`45bd8d9`, `1aa007a`).
- Bot free check from the desk (read-only, nothing sent), 02:01Z: 7 of 7 candidates answered, 1 free.

## Offline rehearsal before the open (fake node, fake sender and mint, our heavy lane against the fake payment-key node only, local bare origin; both guest matches in dry mode: the kit's read-only gate against the desk node, nothing sent)

- p26-a, 02:04–02:24 UTC, 2-minute segments: passed on the final runner, guest and kit files. Two earlier starts held before any step (02:01Z `no-public-node` and 02:03Z `genesis-held`) because the rehearsal folder had been given the real kit and the real genesis script instead of the rehearsal stand-ins; fixed in the rehearsal folder only, nothing in the run files changed. In the passing start: genesis of nine (fake), families 8 of 8, lane up at N=0, `LANE_SET` BASE esc 100 / HOLD-1 N 8 ready 8 at 460 esc 100 / HOLD-2 N 8 ready 8 at 460 esc 920 with guest B go / HOLD-3 N 0 esc 100, the lane's last submit in HOLD-2's last minute and none after its zero, guest match A gate and stop at the baseline, match B gate at HOLD-2 and its stop at RETURN, all step files, TIMELINE, MEMPOOL, MINT, TARGET and METHOD rendered; runner exit 0. The rehearsal's counts are fake and are not results.
