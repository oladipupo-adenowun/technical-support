import { motion } from "framer-motion"; import { Card, CardContent } from "@/components/ui/card"; import { useState, useEffect } from "react"; import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const cases = [ { title: "Intermittent Connectivity", severity: "SEV-1", impact: "2,000+ users affected", time: "42 minutes", desc: "Diagnosed packet loss using traceroute and tcpdump.", logs: [ "ping example.com", "64 bytes from 1.1.1.1: icmp_seq=1 ttl=57 time=120ms", "Request timeout", "tcpdump: retransmission detected" ] }, { title: "API 500 Errors", severity: "SEV-2", impact: "Transaction failures", time: "30 minutes", desc: "Resolved malformed payload issues.", logs: [ "POST /orders 500", "Error: Missing field 'currency'", "Retrying request...", "200 OK" ] } ];

const data = [ { name: "Before", value: 12 }, { name: "After", value: 1.8 } ];

function Terminal({ logs }) { const [lines, setLines] = useState([]);

useEffect(() => { let i = 0; const interval = setInterval(() => { setLines((prev) => [...prev, logs[i]]); i++; if (i >= logs.length) clearInterval(interval); }, 800); return () => clearInterval(interval); }, [logs]);

return ( <div className="bg-black text-green-400 font-mono p-4 rounded-xl h-40 overflow-hidden"> {lines.map((line, i) => ( <div key={i}>$ {line}</div> ))} </div> ); }

function NetworkGraph() { return ( <div className="relative h-40"> {[...Array(6)].map((_, i) => ( <motion.div key={i} className="absolute w-3 h-3 bg-blue-500 rounded-full" animate={{ x: [Math.random() * 300, Math.random() * 300], y: [Math.random() * 150, Math.random() * 150] }} transition={{ repeat: Infinity, duration: 5 + i }} /> ))} </div> ); }

export default function Portfolio() { const [selected, setSelected] = useState(null);

return ( <div className="bg-black text-white min-h-screen p-6"> {/* Hero */} <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10" > <h1 className="text-5xl font-bold">🚀 Incident Response Lab</h1> <p className="text-gray-400 mt-3 max-w-xl mx-auto"> I specialize in diagnosing production issues under pressure — from network failures to backend outages — using deep system-level debugging. </p> </motion.div>

{/* Network Graph */}
  <NetworkGraph />

  {/* Cases */}
  <div className="grid md:grid-cols-2 gap-6 mt-10">
    {cases.map((c, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        onClick={() => setSelected(c)}
      >
        <Card className="bg-gray-900 rounded-2xl shadow-xl cursor-pointer">
          <CardContent className="p-5">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="text-gray-400">{c.desc}</p>
            <div className="mt-3 text-sm text-gray-500">
              {c.severity} • {c.impact}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>

  {/* Modal */}
  {selected && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setSelected(null)}
    >
      <motion.div
        className="bg-gray-900 p-6 rounded-2xl max-w-2xl w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>

        <div className="text-sm text-gray-400 mb-4">
          {selected.severity} | {selected.impact} | Resolved in {selected.time}
        </div>

        {/* Terminal Replay */}
        <Terminal logs={selected.logs} />

        {/* Metrics */}
        <div className="h-40 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  )}

  {/* Footer */}
  <footer className="text-center mt-12 text-gray-500">
    © {new Date().getFullYear()} Oladipupo Adenowun
  </footer>
</div>

); }
