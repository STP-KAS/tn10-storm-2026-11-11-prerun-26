// guest26.mjs (pre-run 26; guest25.mjs with TWO matches). TESTNET-10 ONLY. No compile. Match A starts with the kid (the
// baseline); after its confirm the kid reads the DA once (stop-guest.sh) and removes container A. Match B waits for
// control/GUEST-GO-B (the runner writes it at HOLD-2's start, the held 2x step) and runs in a fresh run dir and container.
// The guest's own fee is the kit's (the step does not move it). Each match: arm-guest.sh --live in a desk-local Docker Desktop
// Linux container whose send node is the desk's own TN10 node (private run.env, never in git); carriers confirmed on the desk
// node's own accepted ids. At control/GUEST-STOP (RETURN) or PROBE-STOP, B is read and removed. private/guest-total.json holds
// a, b and the sums the runner's TARGET row reads; logs/guest.jsonl has counts and sanitized texts only.
import fs from "node:fs"; import { spawnSync } from "node:child_process";
const { CFG, P, sleep, to, connect } = await import("file:///" + String(process.env.STORM_KIT).replace(/\\/g, "/") + "/lib.mjs");
const G = CFG.guest_dir; const LIVE = CFG.guest_mode !== "dry"; /* the offline rehearsal sets guest_mode "dry": the kit's gate only, nothing sent */ const IMG = CFG.guest_image || "ttt-guest-kit:local"; 
const DOCKER = CFG.docker_exe || "C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe";
const OUT = P("logs", "guest.jsonl"); const TOT = P("private", "guest-total.json");
const clean = (s) => String(s).replace(/wss?:\/\/\S+/g, "<url>").replace(/https?:\/\/\S+/g, "<url>").replace(/\b\d{1,3}(\.\d{1,3}){3}(:\d+)?\b/g, "<ip>").replace(/[0-9a-f]{64}/gi, "<id>").replace(/kaspatest:[a-z0-9]+/g, "<addr>").replace(/\b(?:[a-z0-9-]+\.)+[a-z]{2,}(:\d+)?\b/gi, "<host>").replace(/:\d{4,5}\b/g, ":<port>").replace(/C:\\Users\\[^\\]+/gi, "C:\\Users\\Fermi").slice(0, 300);
const note = (o) => fs.appendFileSync(OUT, JSON.stringify({ ts: new Date().toISOString(), ...o }) + "\n");
const phase = (s) => fs.appendFileSync(P("logs", "phase.log"), new Date().toISOString().replace(/\.\d+Z$/, "Z") + " " + s + "\n");
const dk = (args, ms = 120000) => spawnSync(DOCKER, args, { encoding: "utf8", timeout: ms });
const rpc = await connect(CFG.main_node_url, 3);
const total = { started: new Date().toISOString(), mode: LIVE ? "live" : "dry", container: "desk-local", gate: null, submit_ok: 0, ids_logged: 0, accepted_on_desk: 0, accepted_steps: [], not_accepted_steps: [], first_error: null, reject_texts: [], da_games: null, stopped: null, a: null, b: null };
const save = () => fs.writeFileSync(TOT, JSON.stringify(total, null, 1));
const stopNow = () => fs.existsSync(P("control", "GUEST-STOP")) || fs.existsSync(P("control", "PROBE-STOP"));
function sum() {
  const ms = [total.a, total.b].filter(Boolean);
  total.submit_ok = ms.reduce((s, m) => s + (m.submit_ok || 0), 0); total.ids_logged = ms.reduce((s, m) => s + (m.ids_logged || 0), 0);
  total.accepted_on_desk = ms.reduce((s, m) => s + (m.accepted_on_desk || 0), 0);
  total.accepted_steps = ms.flatMap((m) => (m.accepted_steps || []).map((x) => m.label + ": " + x)); total.not_accepted_steps = ms.flatMap((m) => (m.not_accepted_steps || []).map((x) => m.label + ": " + x));
  total.gate = ms.map((m) => m.label + " " + (m.gate || "-")).join("; "); total.reject_texts = ms.flatMap((m) => (m.reject_texts || []).map((x) => m.label + ": " + x)).slice(0, 8);
  total.first_error = ms.map((m) => m.first_error).find(Boolean) || null; total.da_games = ms.map((m) => m.label + " " + (m.da_games || "-")).join("; ");
  const c = ms.map((m) => m.confirmed_at).filter(Boolean); total.confirmed_at = c.length ? c[c.length - 1] : null; save();
}
async function match(label, sub, name, waitStop) {
  const GR = G + "\\" + sub; const m = { label, sub, started: new Date().toISOString(), gate: null, ttflow_exit: null, submit_ok: 0, ids_logged: 0, accepted_on_desk: 0, accepted_steps: [], not_accepted_steps: [], first_error: null, reject_texts: [], da_games: null };
  total[label === "A" ? "a" : "b"] = m; sum();
  const gphase = () => { try { return fs.readFileSync(GR + "\\logs\\guest-phase.log", "utf8"); } catch { return ""; } };
  const startSink = (await to(rpc.getBlockDagInfo(), 10000)).sink;
  fs.mkdirSync(GR + "\\control", { recursive: true }); try { fs.unlinkSync(GR + "\\control\\STOP"); } catch {}
  fs.writeFileSync(GR + "\\control\\ARM-GUEST", "armed by the pre-run 26 desk runner after PRE-RUN-OPEN, match " + label + " " + m.started + "\n");
  dk(["rm", "-f", name], 60000);
  const r = dk(["run", "-d", "--name", name, "--memory", "2g", "-v", G + "\\secret:/home/box/secure:ro", "-v", GR + ":/rung", IMG, "bash", "-c", "bash /workspace/ttt-runner/arm-guest.sh --run /rung " + (LIVE ? "--live" : "--dry") + "; echo ARM_EXIT=$? >> /rung/logs/guest-phase.log; sleep infinity"]);
  if (r.status !== 0) { m.first_error = "container start failed: " + clean(r.stderr || r.stdout); note({ ev: "start_fail", match: label, why: m.first_error }); phase("GUEST " + label + " start-fail"); sum(); return; }
  phase(`GUEST ${label} container-started (arm-guest.sh --live, desk-local send path)`); note({ ev: "started", match: label });
  const end = Date.now() + 20 * 60000;
  while (Date.now() < end) { const t = gphase(); if (/ARM_EXIT=|GUEST end|GUEST abort/.test(t)) break; if (fs.existsSync(P("control", "PROBE-STOP"))) break; await sleep(3000); }
  await sleep(4000);
  const ph = gphase(); for (const l of ph.split("\n").filter((x) => /GUEST/.test(x))) note({ ev: "kit", match: label, line: clean(l) });
  const gm = ph.match(/GUEST (gate ok|abort reason=[^\n]+)/); m.gate = gm ? clean(gm[1]) : "not read";
  const fl = (() => { try { return fs.readFileSync(GR + "\\private\\guest\\ttflow.log", "utf8"); } catch { return ""; } })();
  const em = ph.match(/ttflow exit=(\d+) carriers_submit_ok=(\d+)/); if (em) { m.ttflow_exit = Number(em[1]); m.submit_ok = Number(em[2]); }
  const steps = []; for (const x of fl.matchAll(/(Step [0-9.]+ \([^)]*\)) accepted:\s*([0-9a-f]{64})/g)) steps.push({ step: x[1], id: x[2] });
  m.ids_logged = steps.length;
  m.reject_texts = [...new Set([...fl.split("\n").filter((l) => /rejected|not submitted|Rejected|panic|error/i.test(l)).map((l) => clean(l.replace(/\x1b\[[0-9;]*m/g, "")))])].slice(0, 6);
  m.first_error = m.reject_texts[0] || m.first_error;
  fs.writeFileSync(P("private", `guest-ids-${label}.json`), JSON.stringify(steps));   // private: ids stay on the desk
  const want = new Map(steps.map((s) => [s.id, s.step])); const got = new Set();
  const cEnd = Date.now() + 4 * 60000; let cursor = startSink;
  while (want.size && Date.now() < cEnd) {
    try { for (let k = 0; k < 50; k++) { const vc = await to(rpc.getVirtualChainFromBlock({ startHash: cursor, includeAcceptedTransactionIds: true }), 60000);
        for (const a of vc.acceptedTransactionIds || []) for (const id of a.acceptedTransactionIds || []) if (want.has(id)) got.add(id);
        const add = vc.addedChainBlockHashes || []; if ((vc.removedChainBlockHashes || []).length) cursor = startSink; if (!add.length) break; cursor = add[add.length - 1]; if (add.length < 1000) break; } }
    catch (e) { note({ ev: "vc_read_error", match: label, why: clean(e?.message || e) }); cursor = startSink; }
    if (got.size === want.size) break; await sleep(15000);
  }
  m.accepted_on_desk = got.size; m.accepted_steps = steps.filter((s) => got.has(s.id)).map((s) => s.step); m.not_accepted_steps = steps.filter((s) => !got.has(s.id)).map((s) => s.step);
  m.confirmed_at = new Date().toISOString();
  note({ ev: "confirm", match: label, submit_ok: m.submit_ok, ids_logged: m.ids_logged, accepted_on_desk: m.accepted_on_desk });
  phase(`GUEST ${label} confirm submit_ok=${m.submit_ok} ids_logged=${m.ids_logged} accepted_on_desk=${m.accepted_on_desk}`);
  sum();
  if (waitStop) while (!stopNow()) await sleep(3000);
  const s = dk(["exec", name, "bash", "/workspace/ttt-runner/stop-guest.sh", "/rung"], 60000);
  m.da_games = clean((s.stdout || "").trim().replace(/\n/g, "; ")); dk(["rm", "-f", name], 60000);
  m.stopped = new Date().toISOString(); note({ ev: "stopped", match: label, da_games: m.da_games }); phase(`GUEST ${label} stopped (DA read, container removed)`); sum();
}
await match("A", CFG.guest_run_sub || "run26a", CFG.guest_container || "ttt-guest-p26a", false);
while (!fs.existsSync(P("control", "GUEST-GO-B")) && !stopNow()) await sleep(1000);
if (!stopNow()) await match("B", CFG.guest_run_sub_b || "run26b", CFG.guest_container_b || "ttt-guest-p26b", true);
else { note({ ev: "b_not_started", why: "stop before GUEST-GO-B" }); phase("GUEST B not started (stop before GUEST-GO-B)"); }
total.stopped = new Date().toISOString(); sum();
phase("GUEST stopped (both matches read, containers removed)");
try { await rpc.disconnect(); } catch {}
process.exit(0);
