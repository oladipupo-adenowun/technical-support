"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const cases = [
  {
    title: "Intermittent Connectivity",
    severity: "SEV-1",
    impact: "2,000+ users affected",
    time: "42 minutes",
    desc: "Diagnosed packet loss using traceroute and tcpdump.",
    deepDive: true,
    video: "/media/Network-Connectivity-Issue.mp4",
    poster: "/media/Network-Connectivity-Issue.jpg",
    logs: [
      "ping example.com",
      "64 bytes from 1.1.1.1: icmp_seq=1 ttl=57 time=120ms",
      "Request timeout",
      "tcpdump: retransmission detected"
    ],
    timeline: [
      "00:00 Alert triggered (latency spike)",
      "00:05 Checked application logs (no errors)",
      "00:10 Ran traceroute → packet loss detected",
      "00:20 Confirmed via tcpdump retransmissions",
      "00:30 Implemented failover routing",
      "00:42 Incident resolved"
    ],
    businessImpact: [
      "Prevented revenue loss during peak hours",
      "Restored service for 2,000+ users",
      "Avoided SLA penalties"
    ]
  },
  {
    title: "API 500 Errors",
    severity: "SEV-2",
    impact: "Transaction failures",
    time: "30 minutes",
    desc: "Resolved malformed payload issues.",
    deepDive:true,
    video: "/media/API-500-Errors.mp4",
    poster: "/media/API-500-Errors.jpg",
    logs: [
      "POST /orders 500",
      "Error: Missing field 'currency'",
      "Retrying request...",
      "200 OK"
    ],
    timeline: [
      "00:00 Alert triggered",
      "00:05 Reproduced API call",
      "00:10 Found missing field in payload",
      "00:20 Implemented validation",
      "00:30 Resolved"
    ],
    businessImpact: [
      "Restored transaction flow",
      "Improved reliability to 99.9%"
    ]
  },
  {
    title: "Database Performance Issues",
    severity: "SEV-3",
    impact: "Slower response times",
    time: "15 minutes",
    desc: "Optimized slow query performance.",
    deepDive: true,
    video: "/media/Database-Performance-Issue.mp4",
    poster: "/media/Database-Performance-Issue.jpg",
    logs: [
      "SELECT * FROM orders WHERE status='pending'",
      "Execution time: 5s",
      "Added index on 'status' column",
      "Execution time: 50ms"
    ],
    timeline: [
      "00:00 Alert triggered (latency > 2s)",
      "00:05 Identified slow query",
      "00:10 Analyzed query plan",
      "00:15 Added index and resolved"
    ],
    businessImpact: [
      "Reduced average latency from 5s to 50ms",
      "Improved user experience"
    ]
  },
  //Email delivery failure
  {
    title: "Email Delivery Failure",
    severity: "SEV-2",
    impact: "Transactional emails undelivered",
    time: "25 minutes",
    desc: "Fixed SMTP authentication issues.",
    deepDive: true,
    video: "/media/Email-Delivery-Failure.mp4",
    poster: "/media/Email-Delivery-Failure.jpg",
    logs: [
      "SMTP connection failed: Authentication error",
      "Checked credentials → correct",
      "Checked SMTP server logs → blocked IP",
      "Whitelisted IP and tested → success"
    ],
    timeline: [
      "00:00 Alert triggered (email bounces)",
      "00:05 Checked email service status",
      "00:10 Analyzed SMTP logs",
      "00:20 Resolved IP block issue",
      "00:25 Incident resolved"
    ],
    businessImpact: [
      "Restored transactional email delivery",
      "Prevented customer confusion and support tickets"
    ]
  },
  //Authentication failure
  {
    title: "Authentication Failure",
    severity: "SEV-1",
    impact: "Users unable to log in",
    time: "20 minutes",
    desc: "Resolved OAuth token expiration issue.",
    deepDive: true,
    video: "/media/Authentication-Failure.mp4",
    poster: "/media/Authentication-Failure.jpg",
    logs: [
      "User login failed: Invalid token",
      "Checked token service → tokens expired",
      "Restarted token service → new tokens issued",
      "User login successful"
    ],
    timeline: [
      "00:00 Alert triggered (login failures)",
      "00:05 Checked authentication logs",
      "00:10 Identified expired tokens",
      "00:15 Restarted token service",
      "00:20 Incident resolved"
    ],
    businessImpact: [
      "Restored user access",
      "Prevented revenue loss from locked accounts"
    ]
  }
];

const severityColors = {
  "SEV-1": "bg-red-500",
  "SEV-2": "bg-yellow-500",
  "SEV-3": "bg-green-500"
};

const data = [
  { name: "Before", value: 12 },
  { name: "After", value: 1.8 }
];

function Terminal({ logs }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev, logs[i]]);
      i++;
      if (i >= logs.length) clearInterval(interval);
    }, 700);
    return () => clearInterval(interval);
  }, [logs]);

  return (
    <div className="bg-black text-green-400 font-mono p-4 rounded-xl h-40 overflow-hidden">
      {lines.map((line, i) => (
        <div key={i}>$ {line}</div>
      ))}
    </div>
  );
}

function Timeline({ steps }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Thinking Timeline</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        {steps.map((step, i) => (
          <li key={i}>• {step}</li>
        ))}
      </ul>
    </div>
  );
}

function DeepDive({ incident }) {
  switch (incident.title) {
    case "Intermittent Connectivity":
      return (
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Deep Dive Analysis</h3>
          <p className="text-gray-400 text-sm mb-3">
            Root cause identified as network-level packet loss at ISP hop causing TCP retransmissions and latency spikes.
          </p>
          <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
    traceroute example.com
    8  isp-gateway 120ms
    9  * * *
          </pre>
          <p className="text-gray-400 text-sm mt-3">
            Decision: Implement failover routing instead of waiting on ISP resolution.
          </p>
        </div>
      );
    case "API 500 Errors":
      return (
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Deep Dive Analysis</h3>
          <p className="text-gray-400 text-sm mb-3">
            Root cause was a malformed API payload missing the 'currency' field, which caused server-side validation to fail and return 500 errors.
          </p>
          <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
            POST /orders HTTP/1.1
            Host: api.example.com
            Content-Type: application/json
              "amount": 100,
              "description": "Test order"
          </pre>
          <p className="text-gray-400 text-sm mt-3">
            Decision: Added client-side validation to prevent malformed requests from reaching the server.
          </p>
        </div>
      );
    case "Database Performance Issues":
      return (
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Deep Dive Analysis</h3>
          <p className="text-gray-400 text-sm mb-3">
            Root cause was a missing index on the 'status' column of the 'orders' table, causing full table scans and high latency for queries filtering by status.
          </p>
          <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
            EXPLAIN SELECT * FROM orders WHERE status='pending';
            id | select_type | table  | type  | possible_keys | key  | rows  | Extra
            1  | SIMPLE      | orders | ALL   | NULL          | NULL | 10000 | Using where
          </pre>
          <p className="text-gray-400 text-sm mt-3">
            Decision: Added an index on the 'status' column, which reduced query execution time from 5s to 50ms.
          </p>
        </div>
      );
    case "Email Delivery Failure":
      return (
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Deep Dive Analysis</h3>
          <p className="text-gray-400 text-sm mb-3">
            Root cause was an IP block on the SMTP server due to suspected abuse, which caused authentication failures for outgoing emails.
          </p>
          <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
            SMTP connection failed: Authentication error
            Checked SMTP server logs:
          </pre>
          <p className="text-gray-400 text-sm mt-3">
            Decision: Whitelisted our IP address on the SMTP server to restore email delivery.
          </p>
        </div>
      );
    case "Authentication Failure":
      return (
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Deep Dive Analysis</h3>
          <p className="text-gray-400 text-sm mb-3">
            Root cause was an expired OAuth token service that caused all authentication attempts to fail until the service was restarted and new tokens were issued.
          </p>
          <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
            User login failed: Invalid token
            Checked token service → tokens expired
            Restarted token service → new tokens issued
          </pre>
          <p className="text-gray-400 text-sm mt-3">
            Decision: Implemented monitoring for token expiration to proactively prevent future authentication failures.
          </p>
        </div>
      );
    default:
      return null;
  }
}

function VideoPlayer({ src, poster }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Explainer Video</h3>
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
      <video
        src={src}
        poster={poster}
        muted
        className="w-full rounded-xl"
        controls
      />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10">
        <h1 className="text-5xl font-bold">🚀 Incident Response Lab</h1>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Diagnosing production issues under pressure using deep system-level debugging.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {cases.map((c, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => setSelected(c)}>
            <Card className="bg-gray-900 rounded-2xl shadow-xl cursor-pointer">
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <p className="text-gray-400">{c.desc}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge className={severityColors[c.severity]}>{c.severity}</Badge>
                  <span className="text-xs text-gray-500">{c.impact}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelected(null)}>
          <motion.div className="bg-gray-900 p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mask-fade" initial={{ scale: 0.8 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gray-900 pb-2 z-10">
              <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
            </div>
            <div className="text-sm text-gray-400 mb-4">
            <Badge className={severityColors[selected.severity]}>{selected.severity}</Badge> | {selected.impact} | Resolved in {selected.time}
            </div>

            <Terminal logs={selected.logs} />

            <Timeline steps={selected.timeline} />

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Business Impact</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                {selected.businessImpact.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>

            {selected.video && <VideoPlayer src={selected.video} poster={selected.poster}/>}

            {selected.deepDive && <DeepDive incident={selected} />}

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

      <footer className="text-center mt-12 text-gray-500">
        © {new Date().getFullYear()} Oladipupo Adenowun
      </footer>
    </div>
  );
}