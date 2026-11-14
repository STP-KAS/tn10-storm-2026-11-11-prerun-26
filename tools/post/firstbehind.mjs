// firstbehind.mjs (pre-run 25, ops, after the tail): applies the first-behind rule fixed in locks/LOCKED.md (xxix) to the run's
// own logs and prints counts/chain/FIRST-BEHIND.md. Read-only. Prints counts only (no id, key, address, host or port).
// Usage: node firstbehind.mjs <run_dir> <repo_clone>
import fs from "node:fs"; import path from "node:path";
const [RUN, REPO, KITD] = process.argv.slice(2);
const rd = (...p) => { try { return fs.readFileSync(path.join(...p), "utf8"); } catch { return ""; } };
const jl = (...p) => rd(...p).split(/\r?\n/).filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
const mk = (ms) => new Date(ms).toISOString().slice(0, 16);
const fmt = (n) => Number(n).toLocaleString("en-US");
const ph = rd(RUN, "logs", "phase.log").split(/\r?\n/);
const steps = ph.map((l) => { const m = l.match(/^(\S+) STEP (\S+) offer=/); return m ? { ms: Date.parse(m[1]), step: m[2] } : null; }).filter(Boolean);
const stopL = ph.find((l) => /RUN_STOP reason=return-closed/.test(l)); const stopMs = stopL ? Date.parse(stopL.slice(0, 20)) : Date.now();
const base = steps.find((s) => s.step === "BASE"); if (!base) { console.error("no BASE"); process.exit(2); }
const first = Math.ceil(base.ms / 60000) * 60000, last = Math.floor(stopMs / 60000) * 60000;   // whole minutes BASE..RETURN
const stepOf = (ms) => { let s = "-"; for (const x of steps) if (ms >= x.ms - 59999) s = x.step; return s; };
const { SENDER_FAMILIES, FAMILY_COUNT } = await import("file:///" + path.join(KITD || path.join(RUN, "..", "kit26"), "family-fees.mjs").replace(/\\/g, "/"));
const sub = jl(RUN, "private", "submit-fam.jsonl"), hops = jl(RUN, "private", "hops.jsonl"), mint = jl(RUN, "private", "submit-mint.jsonl");
let GT = {}; try { GT = JSON.parse(rd(RUN, "private", "guest-total.json")); } catch {}
const M = new Map(); for (let t = first; t < last; t += 60000) M.set(mk(t), { ok: 0, landed: 0, stalls: 0, fams: new Set(), mintAcc: 0, mintMax: 0, mintBad: [] });
for (const r of sub) { if (r.result !== "ok" || !(r.family >= 1 && r.family <= SENDER_FAMILIES)) continue; const x = M.get(mk(Date.parse(r.ts))); if (x) { x.ok++; x.fams.add(r.family); } }
const seen = new Set(); for (const h of hops) { if (!(h.family >= 1 && h.family <= SENDER_FAMILIES) || seen.has(h.txid)) continue; seen.add(h.txid); const x = M.get(mk(Date.parse(h.accept_header_utc))); if (x) x.landed++; }
for (const l of ph) if (/STALL family/.test(l)) { const x = M.get(mk(Date.parse(l.slice(0, 20)))); if (x) x.stalls++; }
const behind = [];
for (const [k, x] of M) { const why = []; if (x.ok && x.landed < 0.9 * x.ok) why.push(`floor landed ${x.landed} of ${x.ok} submit-OK`); if (x.stalls) why.push(`${x.stalls} family stall marks`); if (x.fams.size && x.fams.size < SENDER_FAMILIES) why.push(`${SENDER_FAMILIES - x.fams.size} families not attempting`); if (why.length) behind.push({ comp: "families", minute: k, why: why.join("; ") }); }
for (const r of mint) { const ms = Date.parse(r.ts); const x = M.get(mk(ms));
  if (r.result === "accepted") { if (x) { x.mintAcc++; x.mintMax = Math.max(x.mintMax, r.accept_ms || 0); } if ((r.accept_ms || 0) > 10000) behind.push({ comp: "mint line", minute: mk(ms), why: `a mint took ${fmt(r.accept_ms)} ms to accept` }); }
  else if (r.result === "accept_timeout" || r.result === "rejected") behind.push({ comp: "mint line", minute: mk(ms), why: r.result === "rejected" ? "a mint was rejected (text kept privately: " + String(r.reason || "").slice(0, 120) + ")" : "a mint accept timed out (120 s)" }); }
if (GT.started && ((GT.not_accepted_steps || []).length || (GT.ttflow_exit ?? 0) !== 0)) behind.push({ comp: "guest", minute: mk(Date.parse(GT.confirmed_at || GT.started)), why: `${(GT.not_accepted_steps || []).length} logged carriers not among the desk node's accepted ids; ttflow exit ${GT.ttflow_exit}` });
behind.sort((a, b) => (a.minute < b.minute ? -1 : a.minute > b.minute ? 1 : 0));
// load per minute from the desk's step files (probe table)
const load = new Map();
for (const f of ["BASE", "HOLD-1", "HOLD-2", "HOLD-3", "HOLD-4", "RETURN"]) { const t = rd(REPO, "counts", "desk", f + ".md"); const i = t.indexOf("## Mempool and template"); if (i < 0) continue;
  const rows = t.slice(i).split(/\r?\n/).filter((l) => l.startsWith("|")); const hdr = rows[0].split("|").map((s) => s.trim());
  const ci = (re) => hdr.findIndex((h) => re.test(h)); const cM = ci(/^Mempool$/), cR = ci(/^Ready \(no parent/), cF = ci(/^Fee estimate priority/);
  for (const r of rows.slice(2)) { const c = r.split("|").map((s) => s.trim()); const k = (c[1] || "").slice(0, 16); if (/^\d{4}-/.test(k)) load.set(k, { mempool: c[cM], ready: c[cR], fee: (c[cF] || "").split("/")[0].trim() }); } }
const G = GT.started ? `${GT.accepted_on_desk || 0} of ${GT.ids_logged || 0} logged carriers accepted on the desk node (confirmed ${String(GT.confirmed_at || "-").slice(11, 19)}Z, step ${stepOf(Date.parse(GT.confirmed_at || GT.started))})` : "the guest kid did not start";
const fb = behind[0];
const offer = `${SENDER_FAMILIES} families × 1.2 hops a second offered (${fmt(SENDER_FAMILIES * 72)} a minute), the mint line one at a time, the guest one carrier at a time`;
const L = ["> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.", "",
  "# First behind, pre-run 25", "",
  "Written by ops after the tail, from the desk run's own logs (family sender submit rows, the coordinator's accepting-header times, the mint line's rows, the guest kid's totals) and the desk's step files, with the rule fixed before the arm in [locks/LOCKED.md](../../locks/LOCKED.md) (xxix). One knob was turned: the family count, 4 → 8.", "",
  fb ? `**First component behind: ${fb.comp}**, in the minute ${fb.minute}Z (${stepOf(Date.parse(fb.minute + ":00Z"))}): ${fb.why}. Load at that minute: ${offer}; desk mempool ${load.get(fb.minute)?.mempool ?? "-"}, ready ${load.get(fb.minute)?.ready ?? "-"}, fee estimate (priority) ${load.get(fb.minute)?.fee ?? "-"}.` : `**No component fell behind at this step.** Load: ${offer}.`, "",
  `Guest: ${G}. Mints: ${mint.filter((r) => r.result === "accepted").length} accepted, ${mint.filter((r) => r.result === "rejected").length} rejected, ${mint.filter((r) => r.result === "accept_timeout").length} accept timeouts; accept time max ${fmt(Math.max(0, ...mint.filter((r) => r.result === "accepted").map((r) => r.accept_ms || 0)))} ms.`, "",
  ...(behind.length ? ["Every mark under the rule, in time order:", "", "| Minute (UTC) | Component | Why |", "|---|---|---|", ...behind.slice(0, 40).map((b) => `| ${b.minute} | ${b.comp} | ${b.why} |`), behind.length > 40 ? `| … | | ${behind.length - 40} more |` : "", ""] : []),
  "## Per minute, BASE to RETURN", "",
  `| Minute (UTC) | Step | Floor submit-OK | Floor landed (accepting header in the minute) | Landed / OK | Families attempting | Stall marks | Mints accepted | Mint accept max, ms | Desk mempool | Ready | Fee estimate (priority) |`,
  "|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
  ...[...M].map(([k, x]) => `| ${k} | ${stepOf(Date.parse(k + ":00Z"))} | ${fmt(x.ok)} | ${fmt(x.landed)} | ${x.ok ? (100 * x.landed / x.ok).toFixed(1) + "%" : "-"} | ${x.fams.size} of ${SENDER_FAMILIES} | ${x.stalls} | ${x.mintAcc} | ${x.mintAcc ? fmt(x.mintMax) : "-"} | ${load.get(k)?.mempool ?? "-"} | ${load.get(k)?.ready ?? "-"} | ${load.get(k)?.fee ?? "-"} |`), "",
  "Landed / OK compares hops whose accepting header falls in the minute with hops submitted OK in the minute; a hop submitted in a minute's last second may land in the next one, so a few percent either way is the boundary, not a fall-off. The 90 percent line and the 10 s mint line are the rule's, not tuned after the run.", ""];
console.log(L.join("\n"));
