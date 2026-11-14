> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.

# First behind, pre-run 26

Written by ops after the tail, from the desk run's own logs (family sender submit rows, the coordinator's accepting-header times, the mint line's rows, the guest kid's totals) and the desk's step files, with the rule fixed before the arm in [locks/LOCKED.md](../../locks/LOCKED.md) (xxix). One change: a held 2× fee step (the mix at 920 = 2 × our heavy lane's 460, HOLD-2 only) on pre-run 25's mix, with our own heavy lane on at ready cap 8 in HOLD-1 and HOLD-2.

**No component fell behind at this step.** Load: 8 families × 1.2 hops a second offered (576 a minute), the mint line one at a time, the guest one carrier at a time.

Guest: match A 8 of 8 logged carriers accepted on the desk node (confirmed 02:28:37Z, step BASE); match B 8 of 8 logged carriers accepted on the desk node (confirmed 02:35:31Z, step HOLD-2). Mints: 60 accepted, 0 rejected, 0 accept timeouts; accept time max 2,044 ms.

## Per minute, BASE to RETURN

| Minute (UTC) | Step | Floor submit-OK | Floor landed (accepting header in the minute) | Landed / OK | Families attempting | Stall marks | Mints accepted | Mint accept max, ms | Desk mempool | Ready | Fee estimate (priority) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 2026-11-14T02:29 | BASE | 626 | 624 | 99.7% | 8 of 8 | 0 | 4 | 1,025 | 8 | 8 | 100.0 |
| 2026-11-14T02:30 | BASE | 664 | 664 | 100.0% | 8 of 8 | 0 | 4 | 1,016 | 7 | 8 | 100.0 |
| 2026-11-14T02:31 | BASE | 650 | 658 | 101.2% | 8 of 8 | 0 | 3 | 1,019 | 6 | 7 | 100.0 |
| 2026-11-14T02:32 | HOLD-1 | 599 | 591 | 98.7% | 8 of 8 | 0 | 4 | 1,025 | 14 | 14 | 248.4 |
| 2026-11-14T02:33 | HOLD-1 | 613 | 621 | 101.3% | 8 of 8 | 0 | 4 | 1,025 | 12 | 12 | 210.3 |
| 2026-11-14T02:34 | HOLD-1 | 631 | 631 | 100.0% | 8 of 8 | 0 | 4 | 1,021 | 5 | 5 | 100.0 |
| 2026-11-14T02:35 | HOLD-2 | 622 | 617 | 99.2% | 8 of 8 | 0 | 4 | 1,023 | 7 | 8 | 222.8 |
| 2026-11-14T02:36 | HOLD-2 | 606 | 611 | 100.8% | 8 of 8 | 0 | 3 | 1,023 | 11 | 11 | 297.4 |
| 2026-11-14T02:37 | HOLD-2 | 642 | 634 | 98.8% | 8 of 8 | 0 | 4 | 1,024 | 10 | 12 | 326.1 |
| 2026-11-14T02:38 | HOLD-3 | 642 | 643 | 100.2% | 8 of 8 | 0 | 4 | 1,021 | 8 | 8 | 100.0 |
| 2026-11-14T02:39 | HOLD-3 | 630 | 630 | 100.0% | 8 of 8 | 0 | 4 | 1,527 | 0 | 7 | 100.0 |
| 2026-11-14T02:40 | HOLD-3 | 630 | 629 | 99.8% | 8 of 8 | 0 | 3 | 1,532 | 8 | 8 | 100.0 |
| 2026-11-14T02:41 | HOLD-4 | 633 | 633 | 100.0% | 8 of 8 | 0 | 4 | 1,026 | - | - | - |
| 2026-11-14T02:42 | HOLD-4 | 694 | 702 | 101.2% | 8 of 8 | 0 | 4 | 1,027 | - | - | - |
| 2026-11-14T02:43 | HOLD-4 | 681 | 673 | 98.8% | 8 of 8 | 0 | 3 | 1,024 | - | - | - |
| 2026-11-14T02:44 | HOLD-4 | 678 | 679 | 100.1% | 8 of 8 | 0 | 0 | - | - | - | - |
| 2026-11-14T02:45 | HOLD-4 | 663 | 662 | 99.8% | 8 of 8 | 0 | 0 | - | 8 | 8 | 100.0 |
| 2026-11-14T02:46 | RETURN | 591 | 591 | 100.0% | 8 of 8 | 0 | 0 | - | - | - | - |
| 2026-11-14T02:47 | RETURN | 618 | 619 | 100.2% | 8 of 8 | 0 | 0 | - | 8 | 8 | 100.0 |
| 2026-11-14T02:48 | RETURN | 614 | 614 | 100.0% | 8 of 8 | 0 | 0 | - | 6 | 6 | 100.0 |
| 2026-11-14T02:49 | RETURN | 643 | 642 | 99.8% | 8 of 8 | 0 | 0 | - | 8 | 8 | 100.0 |

Landed / OK compares hops whose accepting header falls in the minute with hops submitted OK in the minute; a hop submitted in a minute's last second may land in the next one, so a few percent either way is the boundary, not a fall-off. The 90 percent line and the 10 s mint line are the rule's, not tuned after the run.

