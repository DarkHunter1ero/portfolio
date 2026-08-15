import type { TechCategory } from "@/types";

export const techStack: TechCategory[] = [
  {
    name: "Hardware",
    icon: "Cpu",
    skills: [
      { name: "PC / Notebook Repair", level: 5 },
      { name: "Diagnostics", level: 5 },
      { name: "Component Replacement", level: 5 },
      { name: "Peripherals", level: 4 },
      { name: "Printers", level: 4 },
      { name: "Preventive Maintenance", level: 5 },
    ],
  },
  {
    name: "Operating Systems",
    icon: "Server",
    skills: [
      { name: "Windows 10/11", level: 5 },
      { name: "Windows Server", level: 4 },
      { name: "Linux (Debian/Ubuntu)", level: 4 },
      { name: "OS Installation", level: 5 },
      { name: "System Configuration", level: 5 },
    ],
  },
  {
    name: "Security",
    icon: "Shield",
    skills: [
      { name: "Malware Removal", level: 5 },
      { name: "Antivirus Setup", level: 4 },
      { name: "System Hardening", level: 4 },
      { name: "Vulnerability Assessment", level: 4 },
    ],
  },
  {
    name: "Networking",
    icon: "Server",
    skills: [
      { name: "LAN Setup", level: 4 },
      { name: "Router Configuration", level: 4 },
      { name: "Wi-Fi Troubleshooting", level: 4 },
      { name: "Network Diagnostics", level: 4 },
    ],
  },
  {
    name: "Backup & Recovery",
    icon: "Database",
    skills: [
      { name: "Backup Strategies", level: 4 },
      { name: "Data Recovery", level: 4 },
      { name: "Disaster Recovery", level: 3 },
      { name: "Cloud Backup", level: 4 },
    ],
  },
  {
    name: "Automation",
    icon: "Terminal",
    skills: [
      { name: "PowerShell", level: 4 },
      { name: "Bash Scripting", level: 4 },
      { name: "Task Automation", level: 4 },
      { name: "Python", level: 3 },
    ],
  },
  {
    name: "Support & Client Relations",
    icon: "Users",
    skills: [
      { name: "Remote Support", level: 5 },
      { name: "Helpdesk", level: 5 },
      { name: "Incident Response", level: 4 },
      { name: "Client Communication", level: 5 },
    ],
  },
];
