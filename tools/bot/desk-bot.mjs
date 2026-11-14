// desk-bot.mjs (pre-run 26; retry 1's, unchanged but the label): the bot's waiter, free check and HOLD-4 sender, moved from the box to the desk (stp's
// standing rule 14 Nov 00:30: heavy work on the desk; the box stalled ~5 min in pre-run 24). Same rule as pre-run 24's bot:
// wait for the desk's HOLD-3 on origin, pin HOLD-4 (first whole UTC minute >= 3 min after HOLD-3's commit time), free check
// at pin-40 s (a synced public kaspad outside the desk's kept set, not the same kaspad as a kept node or our own), send only
// if free and before the pin: at most 60 payments, one at a time, 150 sompi/gram, own coins (desk key 4, 1-in sweeps to self).
// Else NO SEND. Publishes counts/bot/HOLD-4.md once (render.mjs). Counts only; no host, id or key printed. TESTNET-10 ONLY.
// Args: --repo <own clone> --git <git.exe> --cfg <private bot config> --dir <bot dir>
import fs from "node:fs"; import path from "node:path"; import crypto from "node:crypto"; import { spawnSync } from "node:child_process";
const { CFG, kaspa, to, connect } = await import("file:///" + String(process.env.STORM_KIT).replace(/\\/g, "/") + "/lib.mjs");
const { keyAddress } = await import("file:///" + String(process.env.STORM_KIT).replace(/\\/g, "/") + "/covenant.mjs");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > 0 ? process.argv[i + 1] : d; };
const REPO = arg("repo"), GIT = arg("git"), DIR = arg("dir"), BC = JSON.parse(fs.readFileSync(arg("cfg"), "utf8"));
const PAYKEY = Number(arg("key", "4")); if (PAYKEY === 1 || PAYKEY === 2) { console.log("REFUSED keys 1-2"); process.exit(2); }
const L = path.join(DIR, "waiter.log"); const FC = path.join(DIR, "freecheck.log");
const log = (s) => fs.appendFileSync(L, new Date().toISOString().replace(/\.\d+Z$/, "Z") + " " + s + "\n");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const git = (a, ms = 25000) => { const t0 = Date.now(); const r = spawnSync(GIT, ["-c", "http.lowSpeedLimit=1000", "-c", "http.lowSpeedTime=10", ...a], { cwd: REPO, encoding: "utf8", timeout: ms }); const dt = Date.now() - t0; if (a[0] === "fetch" && (r.status !== 0 || dt > 15000)) log(`FETCH rc=${r.status} ms=${dt}`); return r; };
const has = (f) => git(["cat-file", "-e", "origin/main:" + f]).status === 0;
const TEST = process.argv.includes("--test-free");   // read-only: one free check now, print it, exit (nothing sent, nothing pushed)
async function freeCheck(KEPT) {
const kept = KEPT.split(",").map(Number); const DROP = new Set(BC.dropped || []); const OWN = new Set(BC.own_idh || []); const idh = (x) => crypto.createHash("sha256").update(String(x)).digest("hex").slice(0, 16);
const all = BC.desk_list.map((u, i) => ({ lab: "desk-" + (i + 1), u, kept: kept.includes(i + 1) })).filter((n) => !DROP.has(Number(n.lab.slice(5)))).concat(BC.extra.map((u, i) => ({ lab: "extra-" + (i + 1), u, kept: false })));
const res = await Promise.all(all.map(async (n) => { try { const c = new kaspa.RpcClient({ url: n.u, encoding: kaspa.Encoding.Borsh, networkId: "testnet-10" }); await to(c.connect({ timeoutDuration: 8000, retryInterval: 0 }), 9000);
  const s = await to(c.getServerInfo(), 6000); const inf = await to(c.getInfo(), 6000); const d1 = BigInt((await to(c.getBlockDagInfo(), 6000)).virtualDaaScore); await sleep(2500); const d2 = BigInt((await to(c.getBlockDagInfo(), 6000)).virtualDaaScore);
  try { await c.disconnect(); } catch {} return { ...n, ok: true, synced: !!s.isSynced && s.networkId === "testnet-10", moving: d2 > d1, id: String(inf.p2pId) }; } catch { return { ...n, ok: false }; } }));
const keptIds = new Set(res.filter((r) => r.kept && r.ok).map((r) => r.id)); const keptUnread = res.filter((r) => r.kept && !r.ok).length;
const freeN = keptUnread ? [] : res.filter((r) => !r.kept && r.ok && r.synced && r.moving && r.id && !keptIds.has(r.id) && !OWN.has(idh(r.id)));
const fcj = { t: new Date().toISOString(), kept, kept_ids_seen: keptIds.size, kept_unread: keptUnread, dropped: { count: DROP.size, reason: BC.dropped_reason || "-" }, distinct_ids: new Set(res.filter((r) => r.ok).map((r) => r.id)).size,
  nodes: res.map((r) => ({ lab: r.lab, kept: r.kept, answer: r.ok, synced: !!r.synced, moving: !!r.moving, same_as_kept: r.ok && keptIds.has(r.id), same_as_own: r.ok && OWN.has(idh(r.id)) })), free: freeN.map((r) => r.lab) };
if (TEST) console.log(JSON.stringify({ free: fcj.free, kept_unread: fcj.kept_unread, answered: fcj.nodes.filter((n) => n.answer).length, of: fcj.nodes.length }));
else fs.appendFileSync(FC, JSON.stringify(fcj) + "\n");
return { fcj, freeN };
}
log(TEST ? "TEST free check (read-only)" : "START (desk)");
let PIN0 = null;
let hb = Date.now();
for (; !TEST;) {
  if (git(["fetch", "-q", "origin", "main"]).status !== 0) { await sleep(2000); continue; }
  for (const f of ["logs/BOT-HALT.md", "logs/FAILED.md"]) if (has(f)) { log("HALT " + f + " on origin"); process.exit(0); }
  if (has("counts/desk/HOLD-3.md")) break;
  if (Date.now() - hb > 300000) { log("HEARTBEAT waiting for HOLD-3"); hb = Date.now(); }
  await sleep(4000);
}
if (TEST) { await freeCheck("1,5"); process.exit(0); }
const SEEN = new Date().toISOString().replace(/\.\d+Z$/, "Z");
const C3 = git(["log", "-1", "--format=%cI", "origin/main", "--", "counts/desk/HOLD-3.md"]).stdout.trim(); const H3 = git(["log", "-1", "--format=%h", "origin/main", "--", "counts/desk/HOLD-3.md"]).stdout.trim();
const body3 = git(["show", "origin/main:counts/desk/HOLD-3.md"]).stdout; const KEPT = ((body3.match(/^Kept: ([0-9, ]+)/m) || [])[1] || "1,2,3,4,5").replace(/\s/g, "").replace(/,$/, "");
const MS = Math.floor(Date.parse(C3) / 1000); const PIN = Math.ceil((MS + 180) / 60) * 60;
log(`HOLD3 ${H3} ${C3} pin=${new Date(PIN * 1000).toISOString().slice(0, 16)}Z kept=${KEPT} seen=${SEEN} lag_s=${Math.floor(Date.now() / 1000) - MS}`);
if (Date.now() / 1000 > PIN - 40) log(`LATE free check starts ${Math.round(Date.now() / 1000 - (PIN - 40))} s after pin-40`);
while (Date.now() / 1000 < PIN - 40) await sleep(500);
const { fcj, freeN } = await freeCheck(KEPT);
if (Date.now() / 1000 >= PIN) log("LATE free check ended after the pinned minute started");
log(`FREECHECK free=[${fcj.free.join(",")}]`);
// ---- sender ----
let SENDF = "";
if (freeN.length && Date.now() / 1000 < PIN) {
  const node = freeN[0]; log(`free node ${node.lab}, sender starts for pin`);
  const hex = fs.readFileSync(CFG.keys_file, "utf8").trim().split(/\r?\n/)[PAYKEY].trim(); const pk = new kaspa.PrivateKey(hex); const ADDR = keyAddress(PAYKEY);
  const c = { attempts: 0, ok: 0, rate: 0, full: 0, other: 0, coins_ready: 0, built_fail: 0 }; const others = {};
  try {
    const rd = await connect(CFG.main_node_url, 3); const pool = ((await to(rd.getUtxosByAddresses({ addresses: [ADDR] }), 60000)).entries || []).filter((e) => !e.isCoinbase && BigInt(e.amount) >= 100_000_000n && BigInt(e.amount) < 100_000_000_000n); try { await rd.disconnect(); } catch {}
    c.coins_ready = pool.length;
    const rpc = new kaspa.RpcClient({ url: node.u, encoding: kaspa.Encoding.Borsh, networkId: "testnet-10" }); await to(rpc.connect({ timeoutDuration: 10000, retryInterval: 0 }), 12000);
    const si = await to(rpc.getServerInfo(), 6000); if (si.networkId !== "testnet-10" || !si.isSynced) throw new Error("node-unsynced");
    while (Date.now() < PIN * 1000) await sleep(20);
    let i = 0;
    while (Date.now() < (PIN + 60) * 1000 && c.attempts < 60 && i < pool.length) {
      const e = pool[i++]; let tx; try { const { transactions } = await kaspa.createTransactions({ entries: [e], outputs: [], changeAddress: ADDR, feeRate: 150, priorityFee: 0n, networkId: "testnet-10" }); tx = transactions[0]; tx.sign([pk]); } catch { c.built_fail++; continue; }
      c.attempts++; try { await to(tx.submit(rpc), 10000); c.ok++; } catch (err) { const m = String(err?.message || err).toLowerCase(); if (/full/.test(m)) c.full++; else if (/fee|rate|minimum|insufficient priority/.test(m)) c.rate++; else { c.other++; const k = m.replace(/[0-9a-f]{64}/g, "<h>").replace(/kaspatest:[a-z0-9]+/g, "<a>").slice(0, 60); others[k] = (others[k] || 0) + 1; } }
    }
    try { await rpc.disconnect(); } catch {}
  } catch (e) { log("sender error " + String(e?.message || e).replace(/wss?:\/\/\S+/g, "<url>").slice(0, 120)); }
  SENDF = path.join(DIR, "send.json"); fs.writeFileSync(SENDF, JSON.stringify({ t: new Date().toISOString(), ...c, others }) + "\n");
  log(`sender done ok=${c.ok} attempts=${c.attempts}`);
} else if (freeN.length) log("free node but the pinned minute had started; no send (late)");
else log("no free node; NO SEND no-free-node after the minute closes");
log("DONE");
while (Date.now() / 1000 < PIN + 62) await sleep(1000);
for (let t = 0; t < 3; t++) { if (git(["fetch", "-q", "origin", "main"]).status === 0) break; await sleep(2000); }
git(["checkout", "-q", "main"]); git(["reset", "-q", "--hard", "origin/main"]);
if (has("counts/bot/HOLD-4.md")) { log("bot file already on origin"); process.exit(0); }
const r = spawnSync(process.execPath, [path.join(DIR, "render.mjs"), H3, C3, String(PIN), FC, ...(SENDF ? [SENDF] : [])], { encoding: "utf8", env: { ...process.env, BOT_H3_SEEN: SEEN } });
if (r.status !== 0) { log("render failed"); process.exit(1); }
fs.mkdirSync(path.join(REPO, "counts", "bot"), { recursive: true }); fs.writeFileSync(path.join(REPO, "counts", "bot", "HOLD-4.md"), r.stdout);
const M = SENDF ? "Bot HOLD-4: sender log for the pinned minute." : /NO SEND suspend/.test(r.stdout) ? "Bot HOLD-4: NO SEND suspend (free node found late)." : /late check/.test(r.stdout) ? "Bot HOLD-4: NO SEND no-free-node (late check)." : "Bot HOLD-4: NO SEND no-free-node.";
git(["add", "counts/bot/HOLD-4.md"]); git(["commit", "-q", "-m", M]);
let ok = false; for (let t = 1; t <= 5; t++) { if (git(["push", "-q", "origin", "main"], 45000).status === 0) { log(`pushed try=${t} ${git(["log", "-1", "--format=%h %cI"]).stdout.trim()}`); ok = true; break; } await sleep(15000); git(["fetch", "-q", "origin", "main"]); if (git(["rebase", "-q", "origin/main"]).status !== 0) git(["rebase", "--abort"]); }
if (!ok) log("PUSH FAILED five times; the bot file is committed locally");
process.exit(0);
