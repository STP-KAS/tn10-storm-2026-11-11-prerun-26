> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only.

# Guest line, pre-run 26

- The kit is [tools/ttt-guest-runner in STP-KAS/tn10-target-plan](https://github.com/STP-KAS/tn10-target-plan/tree/1433a42/tools/ttt-guest-runner) at `1433a42` (the lane-id fix after retry 1: the lane id from `ttd`'s own start line, fallback the DA state's `lane_subnet`), used unchanged. Its binaries (`ttd`, `ttflow`, the guest ELF) were built earlier; nothing is compiled for this run.
- The desk runner starts [../desk/guest26.mjs](../desk/guest26.mjs) as a kid after the families are attempting. It writes the kit's `ARM-GUEST`, starts the kit (`arm-guest.sh --live`) in a local Linux container on the desk, waits for its end, then looks up every carrier id `ttflow` logged among the desk node's accepted transaction ids since the guest started. At RETURN the runner writes `control/GUEST-STOP`; the kid runs the kit's `stop-guest.sh` (one read of the lane's games) and removes the container.
- The send node is the desk's own TN10 node. The setting lives in the kit's private `run.env` on the desk; it is not in this repo. Keys stay in a private file on the desk; ids stay in a private file on the desk.
- Published: counts and texts only, in `counts/desk/TARGET.md` (no id, key, address, host or port).
