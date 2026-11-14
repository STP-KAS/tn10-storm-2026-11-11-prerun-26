> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.

# Chain timeline, pre-run 26

Every minute the desk counter read, from its start to the end of the 5-minute tail after RETURN. Read on the desk's private TN10 node, by accepting chain block header time. Submit-OK is the desk sender log for scored minutes (a dash where the runner did not score the minute). A minute marked LAGGING, partial, or not final is what the node had accepted at that point, not a network figure. Nothing is filled in.

| Minute (UTC) | Step (lane) | Scored | Pay submit-OK | Our payments included | Our heavy landed | Floor hops (100) | Kcc hops (100) | Other traffic | Included, all non-coinbase | Chain blocks | DAA gap max | Sink age max, ms | Counter |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 2026-11-14T02:27 | families (pre) |  | - | 0 | 0 | 16 | 0 | 1,088 | 1,104 | 144 | 0 | 586 | partial |
| 2026-11-14T02:28 | BASE (pre) |  | - | 0 | 0 | 620 | 4 | 3,165 | 3,764 | 408 | 0 | 378 | kept pace |
| 2026-11-14T02:29 | BASE (base-r100) | yes | 0 | 0 | 0 | 624 | 4 | 3,208 | 3,819 | 398 | 0 | 1109 | kept pace |
| 2026-11-14T02:30 | BASE (base-r100) | yes | 0 | 0 | 0 | 664 | 4 | 3,183 | 3,838 | 398 | 1 | 403 | kept pace |
| 2026-11-14T02:31 | BASE (base-r100) | yes | 0 | 0 | 0 | 658 | 3 | 3,186 | 3,826 | 398 | 1 | 351 | kept pace |
| 2026-11-14T02:32 | HOLD-1 (L8-R8-r460-mix100) | yes | 0 | 0 | 235 | 591 | 4 | 3,177 | 3,946 | 386 | 2 | 507 | kept pace |
| 2026-11-14T02:33 | HOLD-1 (L8-R8-r460-mix100) | yes | 0 | 0 | 233 | 621 | 4 | 3,143 | 3,928 | 341 | 1 | 508 | kept pace |
| 2026-11-14T02:34 | HOLD-1 (L8-R8-r460-mix100) | yes | 0 | 0 | 239 | 631 | 4 | 3,393 | 4,199 | 411 | 1 | 289 | kept pace |
| 2026-11-14T02:35 | HOLD-2 (L8-R8-r460-mix920) | yes | 0 | 0 | 231 | 617 | 4 | 3,257 | 4,037 | 390 | 2 | 999 | kept pace |
| 2026-11-14T02:36 | HOLD-2 (L8-R8-r460-mix920) | yes | 0 | 0 | 233 | 611 | 3 | 3,151 | 3,939 | 364 | 2 | 651 | kept pace |
| 2026-11-14T02:37 | HOLD-2 (L8-R8-r460-mix920) | yes | 0 | 0 | 242 | 634 | 4 | 3,193 | 4,007 | 374 | 0 | 385 | kept pace |
| 2026-11-14T02:38 | HOLD-3 (N0-zero-r100) | yes | 0 | 0 | 0 | 643 | 4 | 3,164 | 3,788 | 405 | 1 | 477 | kept pace |
| 2026-11-14T02:39 | HOLD-3 (N0-zero-r100) | yes | 0 | 0 | 0 | 630 | 4 | 3,182 | 3,797 | 356 | 1 | 393 | kept pace |
| 2026-11-14T02:40 | HOLD-3 (N0-zero-r100) | yes | 0 | 0 | 0 | 629 | 3 | 3,203 | 3,821 | 386 | 0 | 663 | kept pace |
| 2026-11-14T02:41 | HOLD-4 (N0-drain) |  | - | 0 | 0 | 633 | 4 | 3,172 | 3,781 | 359 | 0 | 429 | kept pace |
| 2026-11-14T02:42 | HOLD-4 (N0-drain) |  | - | 0 | 0 | 702 | 4 | 3,196 | 3,883 | 420 | 1 | 733 | kept pace |
| 2026-11-14T02:43 | HOLD-4 (N0-drain) |  | - | 0 | 0 | 673 | 3 | 3,139 | 3,783 | 381 | 2 | 334 | kept pace |
| 2026-11-14T02:44 | HOLD-4 (N0-drain) |  | - | 0 | 0 | 679 | 0 | 3,192 | 3,853 | 392 | 1 | 577 | kept pace |
| 2026-11-14T02:45 | HOLD-4 (N0-drain) | yes | 0 | 0 | 0 | 662 | 0 | 3,172 | 3,804 | 374 | 1 | 328 | kept pace |
| 2026-11-14T02:46 | RETURN (N0-drain) |  | - | 0 | 0 | 591 | 0 | 3,344 | 3,917 | 345 | 1 | 748 | kept pace |
| 2026-11-14T02:47 | RETURN (N0-drain) | yes | 0 | 0 | 0 | 619 | 0 | 3,230 | 3,823 | 353 | 0 | 402 | kept pace |
| 2026-11-14T02:48 | RETURN (N0-drain) | yes | 0 | 0 | 0 | 614 | 0 | 3,193 | 3,775 | 370 | 0 | 887 | kept pace |
| 2026-11-14T02:49 | RETURN (N0-drain) | yes | 0 | 0 | 0 | 642 | 0 | 3,179 | 3,797 | 368 | 1 | 406 | kept pace |
| 2026-11-14T02:50 | tail (N0-drain) |  | - | 0 | 0 | 268 | 0 | 3,157 | 3,417 | 376 | 2 | 765 | kept pace |
| 2026-11-14T02:51 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 3,163 | 3,163 | 385 | 0 | 540 | kept pace |
| 2026-11-14T02:52 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 3,189 | 3,189 | 363 | 1 | 761 | kept pace |
| 2026-11-14T02:53 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 3,212 | 3,212 | 371 | 0 | 530 | kept pace |
| 2026-11-14T02:54 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 3,126 | 3,126 | 392 | 1 | 688 | kept pace |
| 2026-11-14T02:55 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 2,852 | 2,852 | 353 | 0 | 592 | not final |

Whole run, as read: our payments submit-OK 0, of which included by the end of the tail 0 (- percent). Family hops included: floor 14,272, kcc 60. Our heavy-lane transactions included: 1,413.
