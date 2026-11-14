// feestep.mjs (pre-run 26, ops, after the tail): the plan card 26 table from the desk run's own logs. Read-only.
// Segments are cut at the runner's LANE_SET times (the moment the lane and ESC-RATE files were written), not the step-file
// labels. Prints counts/chain/FEE-STEP.md. Counts only: no id, key, address, host or port.
// Usage: node feestep.mjs <run_dir>
import fs from "node:fs"; import path from "node:path";
const [RUN] = process.argv.slice(2);
const rd = (...p) => { try { return fs.readFileSync(path.join(...p), "utf8"); } catch { return ""; } };
const jl = (...p) => rd(...p).split(/\r?\n/).filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
const fmt = (n, d = 0) => (n == null || Number.isNaN(n) ? "-" : Number(n).toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d }));
const med = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);
const ph = rd(RUN, "logs", "phase.log").split(/\r?\n/);
const sets = ph.map((l) => { const m = l.match(/^(\S+) LANE_SET (.*)seg=(\S+)/); if (!m) return null; const kv = Object.fromEntries([...m[2].matchAll(/(\w+)=(\S+)/g)].map((x) => [x[1], x[2]])); return { ms: Date.parse(m[1]), seg: m[3], esc: Number(kv.esc), n: Number(kv.n), rate: Number(kv.rate), ready: Number(kv.ready) }; }).filter(Boolean);
const stopL = ph.find((l) => /RUN_STOP reason=/.test(l)); const stopMs = stopL ? Date.parse(stopL.slice(0, 20)) : Date.now();
const NAME = { "base-r100": "Baseline (no lane, mix at 100)", "L8-R8-r460-mix100": "Lane on 1× (lane 460, mix 100)", "L8-R8-r460-mix920": "Lane on, mix at 2× (lane 460, mix 920)", "N0-zero-r100": "Lane at zero (mix 100)", "N0-drain": "Drain, HOLD-4 and RETURN (lane 0, mix 100)" };
const segs = sets.map((s, i) => ({ ...s, end: i + 1 < sets.length ? sets[i + 1].ms : stopMs }));
const inS = (ms, s) => ms >= s.ms && ms < s.end;
const sub = jl(RUN, "private", "submit-fam.jsonl").filter((r) => r.result === "ok" && r.family >= 1 && r.family <= 8);
const seen = new Set(); const hops = jl(RUN, "private", "hops.jsonl").filter((h) => h.family >= 1 && h.family <= 8 && !seen.has(h.txid) && seen.add(h.txid));
const mint = jl(RUN, "private", "submit-mint.jsonl");
const tpl = jl(RUN, "logs", "template-3s.jsonl"); const mp = jl(RUN, "logs", "mempool.jsonl");
const cm = rd(RUN, "logs", "chain-minute.log").split(/\r?\n/).map((l) => { const m = l.match(/^(\S+Z) final=1 (.*)/); if (!m) return null; const kv = Object.fromEntries([...m[2].matchAll(/(\w+)=(\S+)/g)].map((x) => [x[1], x[2]])); return { ms: Date.parse(m[1].replace(/Z$/, ":00Z")), hv1: Number(kv.hv1 || 0), floor: Number(kv.h_floor || 0), kcc: Number(kv.h_kcc || 0), other: Number(kv.other || 0), acc: Number(kv.acc || 0) }; }).filter(Boolean);
const lm = rd(RUN, "logs", "lane-minute.log").split(/\r?\n/).map((l) => { const m = l.match(/^(\S+Z) (.*)/); if (!m) return null; const kv = Object.fromEntries([...m[2].matchAll(/(\w+)=(\S+)/g)].map((x) => [x[1], x[2]])); return { ms: Date.parse(m[1].replace(/Z$/, ":00Z")), ok: Number(kv.ok || 0), n: Number(kv.n || 0), fees: Number(kv.fees_tkas || 0), ready_cap: Number(kv.ready_cap || 0) }; }).filter(Boolean);
let GT = {}; try { GT = JSON.parse(rd(RUN, "private", "guest-total.json")); } catch {}
let HT = {}; try { HT = JSON.parse(rd(RUN, "private", "heavy-total.json")); } catch {}
const rows = segs.map((s) => {
  const mins = (s.end - s.ms) / 60000;
  const ok = sub.filter((r) => inS(Date.parse(r.ts), s)).length, landed = hops.filter((h) => inS(Date.parse(h.accept_header_utc), s)).length;
  const mAcc = mint.filter((r) => r.result === "accepted" && inS(Date.parse(r.ts), s)); const mBad = mint.filter((r) => r.result !== "accepted" && r.result !== "ok" && inS(Date.parse(r.ts), s)).length;
  const fullMin = cm.filter((c) => c.ms >= s.ms && c.ms + 60000 <= s.end);
  const t = tpl.filter((x) => inS(Date.parse(x.ts), s)); const m = mp.filter((x) => inS(Date.parse(x.ts), s) && x.fee);
  const rates = sub.filter((r) => inS(Date.parse(r.ts), s)).map((r) => r.rate);
  return { s, mins, ok, landed, mAcc: mAcc.length, mMed: med(mAcc.map((r) => r.accept_ms || 0)), mMax: mAcc.length ? Math.max(...mAcc.map((r) => r.accept_ms || 0)) : null, mBad,
    fullN: fullMin.length, hv1: fullMin.reduce((a, c) => a + c.hv1, 0), other: fullMin.reduce((a, c) => a + c.other, 0), floorCh: fullMin.reduce((a, c) => a + c.floor, 0),
    tplMass: avg(t.map((x) => x.mass)), tplHeavy: avg(t.map((x) => (x.mass || 0) - (x.rest_mass || 0))), tplHeavyN: avg(t.map((x) => x.heavy || 0)), tplRest: avg(t.map((x) => x.rest_mass)), readyMass: avg(t.map((x) => x.ready_mass)),
    feeP: med(m.map((x) => x.fee.priority)), feePmax: m.length ? Math.max(...m.map((x) => x.fee.priority)) : null, feeN: med(m.map((x) => x.fee.normal)), famRate: med(rates) };
});
const zero = sets.find((s) => s.seg === "N0-zero-r100");
const laneOkAfterZero = zero ? lm.filter((x) => x.ms >= Math.ceil(zero.ms / 60000) * 60000 + 60000 && x.ok > 0) : [];
const lastLaneMin = [...lm].reverse().find((x) => x.ok > 0);
const ret = ph.find((l) => /STEP RETURN/.test(l)); const retMs = ret ? Date.parse(ret.slice(0, 20)) : null;
const laneLastAtRet = lm.filter((x) => retMs && x.ms <= retMs).pop();
const gLine = (x, lab) => (x ? `${lab}: ${x.accepted_on_desk || 0} of ${x.ids_logged || 0} logged carriers accepted on the desk node (${x.submit_ok || 0} submit-OK per ttflow; gate ${x.gate || "-"}; DA read ${x.da_games || "-"})` : `${lab}: did not start`);
const L = ["> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.", "",
  "# Fee step, pre-run 26 (plan card 26's table)", "",
  "Written by ops after the tail from the desk run's own logs: the family sender's submit rows, the coordinator's accepting-header times, the mint line's rows, the guest kid's totals, the desk counter's chain minutes (lane `hv1`, the rest `other`), the template sampler (every 3 s) and the mempool probe's fee estimate. Segments are cut at the moment the runner wrote the lane and fee files (`LANE_SET`), so they start about 23 s before each step file's label. **Our heavy lane slows other users** while it runs (HOLD-1 and HOLD-2 here).", "",
  "## Landings and load per segment", "",
  "| Segment (UTC) | Lane | Mix rate (family rows, median) | Covenant hops submit-OK | Covenant hops landed | Per minute landed | Mints accepted | Mint accept median / max, ms | Guest | Our lane landed (whole minutes) | Other traffic landed (whole minutes) | Template mass, mean (lane / rest; lane txs per template) | Ready mass, mean | Fee estimate priority, median (max) / normal |",
  "|---|---|---:|---:|---:|---:|---:|---:|---|---:|---:|---:|---:|---:|",
  ...rows.map((r) => `| ${NAME[r.s.seg] || r.s.seg}, ${new Date(r.s.ms).toISOString().slice(11, 19)}–${new Date(r.s.end).toISOString().slice(11, 19)} | ${r.s.n ? `N ${r.s.n}, ready cap ${r.s.ready}, ${r.s.rate}` : "0"} | ${r.famRate ?? "-"} | ${fmt(r.ok)} | ${fmt(r.landed)} | ${fmt(r.landed / r.mins, 1)} | ${r.mAcc}${r.mBad ? ` (+${r.mBad} not accepted)` : ""} | ${r.mMed == null ? "-" : fmt(r.mMed) + " / " + fmt(r.mMax)} | ${r.s.seg === "base-r100" ? "match A" : r.s.seg === "L8-R8-r460-mix920" ? "match B" : "-"} | ${fmt(r.hv1)} in ${r.fullN} | ${fmt(r.other)} in ${r.fullN} | ${fmt(r.tplMass)} (${fmt(r.tplHeavy)} / ${fmt(r.tplRest)}; ${fmt(r.tplHeavyN, 2)}) | ${fmt(r.readyMass)} | ${r.feeP ?? "-"} (${r.feePmax ?? "-"}) / ${r.feeN ?? "-"} |`), "",
  "## Guest", "", "- " + gLine(GT.a, "Match A (baseline)"), "- " + gLine(GT.b, "Match B (2× step)"), "",
  "## Lane back to zero", "",
  `- Lane zero written ${zero ? new Date(zero.ms).toISOString().slice(0, 19) + "Z" : "-"}; last minute with a lane submit-OK: ${lastLaneMin ? new Date(lastLaneMin.ms).toISOString().slice(0, 16) + "Z" : "-"}; lane submit-OK in any whole minute after the zero minute: ${laneOkAfterZero.length ? laneOkAfterZero.map((x) => new Date(x.ms).toISOString().slice(11, 16)).join(", ") : "none"}.`,
  `- At RETURN (${retMs ? new Date(retMs).toISOString().slice(0, 19) + "Z" : "-"}) the lane's last minute line read N ${laneLastAtRet?.n ?? "-"}, ready cap ${laneLastAtRet?.ready_cap ?? "-"}. Lane totals: ${fmt(HT.ok || 0)} submit-OK, ${fmt(HT.fees_tkas || 0, 2)} tKAS fees, ${HT.pending ?? "-"} pending at its end.`,
  `- **Card 26 met:** ${rows.length >= 4 && zero && !laneOkAfterZero.length && (laneLastAtRet?.n ?? 1) === 0 ? "yes (the table exists and the lane stopped at its zero)" : "no (see above)"}.`, "",
  "Landed counts hops whose accepting header falls in the segment; a few at each edge belong to the neighbour. Our lane and other traffic are counted only over the whole chain minutes inside each segment. The fee estimate is the desk node's own.", ""];
console.log(L.join("\n"));
