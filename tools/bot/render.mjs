// Render counts/bot/HOLD-4.md (pre-run 26). Args: <h3short> <h3iso> <pinSec> <freecheck.json line> [sender result json]
// Env BOT_H3_SEEN (ISO, when the waiter first read HOLD-3 on origin). Pre-run 14: a free check that ran after the pinned
// minute had started (pin - 0 s) is written as LATE, not as "before the minute".
import fs from "node:fs";
const [h3, h3iso, pinS, fcFile, sendFile] = process.argv.slice(2);
// Pre-run 15 fix: take the last line that parses as JSON; if none (check crashed), fail loudly with a clear message.
const fcLines = fs.readFileSync(fcFile, "utf8").trim().split("\n").reverse();
let fc = null; for (const l of fcLines) { try { const j = JSON.parse(l); if (j && j.t && j.nodes) { fc = j; break; } } catch {} }
if (!fc) { console.error("render: no free-check result in " + fcFile + " (the check crashed or wrote no JSON); write NO SEND check-failed by hand"); process.exit(2); }
const pin = new Date(Number(pinS) * 1000).toISOString().slice(0, 16);
const h3z = new Date(h3iso).toISOString().replace(/\.\d+Z$/, "Z");
const fcz = fc.t.replace(/\.\d+Z$/, "Z");
const s = sendFile ? JSON.parse(fs.readFileSync(sendFile, "utf8").trim().split("\n").pop()) : null;
const kept = fc.kept.join(", ");
const fcMs = Date.parse(fc.t), pinMs = Number(pinS) * 1000; const late = fcMs >= pinMs;
const seen = process.env.BOT_H3_SEEN ? new Date(process.env.BOT_H3_SEEN).toISOString().replace(/\.\d+Z$/, "Z") : null;
const L = [];
const freeLate = !s && late && Array.isArray(fc.free) && fc.free.length > 0;   // retry 1: pre-run 24 lesson, a free node found after the pin is a suspend, not no-free-node
if (!s) L.push(freeLate ? "NO SEND suspend (a free node answered, but only after the pinned minute had started)" : late ? "NO SEND no-free-node (late check)" : "NO SEND no-free-node", "");
L.push("# HOLD-4, bot sender log, pre-run 26", "", "> Counts only. The bot's sender log. It is not a chain count. The desk counter and Mini count the chain.", "");
L.push(`Pinned minute (UTC): ${pin}. It is the first whole UTC minute whose start is at least 3 minutes after the desk's HOLD-3 file's On origin time, ${h3z} (commit ${h3}). Fee 150 sompi/gram. Own coins only.`, "");
if (s) {
  L.push("## Minute", "", "| Minute (UTC) | Pay submit-OK | Attempts | Rejects, rate | Rejects, full | Other |", "|---|---:|---:|---:|---:|---:|", `| ${pin} | ${s.ok.toLocaleString("en-US")} | ${s.attempts.toLocaleString("en-US")} | ${s.rate} | ${s.full} | ${s.other} |`, "");
  L.push(`One process on one public node outside the desk's kept set (${kept}). The sender stopped at the minute's end. The bot does not send in RETURN.`, "");
} else {
  L.push("The bot sent nothing in this minute. Submit-OK 0, attempts 0, rejects rate 0, full 0.", "");
  L.push(freeLate ? "## Why nothing was sent (free node found late)" : "## Why there was no free node", "", `The desk kept public nodes ${kept} (local numbers) through HOLD-4. The bot's local config holds the desk's other candidates and three more public endpoints. They were read at ${fcz}, ${late ? `**LATE: ${Math.round((fcMs - pinMs) / 1000)} s after the pinned minute had started**` : `${Math.round((pinMs - fcMs) / 1000)} s before the minute`}:`, "");
  if (seen) L.push(`The bot first read HOLD-3 on origin at ${seen}${late ? "; its free check could not be made before the minute" : ""}.`, "");
  L.push("| Node (bot label) | In the desk's kept set | Answered | Synced, DAA moving | Same kaspad as a kept node |", "|---|---|---|---|---|");
  for (const n of fc.nodes) { const lab = n.lab.startsWith("desk-") ? "desk " + n.lab.slice(5) : "extra " + n.lab.slice(6);
    L.push(`| ${lab} | ${n.kept ? "yes" : "no"} | ${n.answer ? "yes" : "no"} | ${n.answer ? (n.synced && n.moving ? "yes" : "no") : "—"} | ${n.kept ? "—" : n.answer ? (n.same_as_kept ? "yes" : "no") : "—"} |`); }
  L.push("", "Same kaspad means the same node id, read in the same pass, as a node in the kept set. A send there is a send on a node the desk is still using, and a second process on that node. GO-BOT says to skip a node that does not answer synced and not to take a node the desk is still using. Nothing was left, so the line is `NO SEND` and `no-free-node`. The bot did not wait for a node to appear. Coins were not the reason.", "");
  if (fc.kept_unread) L.push(`${fc.kept_unread} kept node(s) did not answer in that pass, so no candidate could be shown to be a different kaspad.`, "");
  if (fc.kept_ids_seen < fc.nodes.filter((n) => n.kept && n.answer).length) L.push(`The kept nodes themselves answered as ${fc.kept_ids_seen} distinct kaspad processes, not ${fc.nodes.filter((n) => n.kept && n.answer).length}.`, "");
}
L.push("No txid, key, seed, address, host, port, or covenant id is in this file.", "");
process.stdout.write(L.join("\n"));
