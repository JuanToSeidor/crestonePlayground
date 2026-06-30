"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button, Chip, Tabs } from "caralstable";
import CrestoneNavbar from "@/app/components/CrestoneNavbar";
import { Brand, CaralIcon } from "iconcaral2";

const VALID_BRANDS = new Set([
  "AWS", "AzureSql", "GoogleStorage", "SAP", "Saleforce", "Snowflake", "Redshift", "Cloudera", "Teradata", "Google", "Databricks", "AmazonRedshift", "GoogleBigquery", "Teams", "Deepseek", "Gemini", "OpenAI", "SAPHanaC", "S3", "Harbinger", "Doxa", "Daiana", "Crestone", "CloudCosting", "Feelings", "IBMDb2", "MSSQL", "mySQL", "PostgreSQL", "OneDrive", "Sharepoint", "PDF", "DOC", "DOCX", "CSV", "XLSX", "Json", "HTML", "Fabric", "Sybase", "Ollama", "Windows", "DataEngineering", "OneLake", "DataActivator", "DataFactory", "Synapse", "PowerBI", "Database", "IQ", "Dynamics", "Oracle", "Azure", "CloudStorage"
]);

function SourceLogo({ brandName, size, muted }: { brandName: string; size: number; muted?: boolean }) {
  const isBrand = VALID_BRANDS.has(brandName);
  
  if (isBrand && !muted) {
    return <Brand name={brandName as any} size={size} />;
  }
  
  const validIcons = new Set([
    "AWS", "Azure", "AzureSql", "CloudStorage", "Cloudera", "Database", "Databricks", 
    "Deepseek", "Doxa", "Fabric", "Gemini", "Google", "GoogleBigquery", "GoogleStorage", 
    "IBMDb2", "IQ", "MSSQL", "OneDrive", "OpenAI", "Oracle", "PowerBI", "PostgreSQL", 
    "Redshift", "S3", "SAP", "SAPHanaC", "Saleforce", "SapOdata", "Sharepoint", "Snowflake", 
    "Sybase", "Teams", "Teradata", "Windows", "OData", "database"
  ]);
  
  const iconName = validIcons.has(brandName) ? brandName : "database";
  return <CaralIcon name={iconName as any} size={size} color={muted ? "#94A3B8" : undefined} />;
}

interface ConnectionItem {
  id: string;
  name: string;
  status: "Enabled" | "Disabled";
  locationType: "Source" | "Destination";
  type: string;
  brandName: string;
  createdDay: string;
  createdBy: string;
  avatarText: string;
}

const mockConnections: ConnectionItem[] = [
  {
    id: "ezequielsap5",
    name: "EZequielSap5",
    status: "Enabled",
    locationType: "Destination",
    type: "IBM Cloud",
    brandName: "CloudStorage",
    createdDay: "January 12, 2026",
    createdBy: "Chris Lee",
    avatarText: "CL"
  },
  {
    id: "ezequielsap6",
    name: "EZequielSap6",
    status: "Enabled",
    locationType: "Destination",
    type: "Azure",
    brandName: "Azure",
    createdDay: "February 14, 2026",
    createdBy: "Anna Wu",
    avatarText: "AW"
  },
  {
    id: "ezequielsap7",
    name: "EZequielSap7",
    status: "Disabled",
    locationType: "Destination",
    type: "Google Cloud",
    brandName: "Google",
    createdDay: "March 12, 2026",
    createdBy: "Mark Taylor",
    avatarText: "MT"
  },
  {
    id: "ezequielsap8",
    name: "EZequielSap8",
    status: "Enabled",
    locationType: "Destination",
    type: "AWS",
    brandName: "AWS",
    createdDay: "April 1, 2026",
    createdBy: "Sarah Johnson",
    avatarText: "SJ"
  },
  {
    id: "ezequielsap9",
    name: "EZequielSap9",
    status: "Enabled",
    locationType: "Destination",
    type: "Oracle Cloud",
    brandName: "Oracle",
    createdDay: "May 15, 2026",
    createdBy: "David Brown",
    avatarText: "DB"
  },
  {
    id: "ezequielsap10",
    name: "EZequielSap10",
    status: "Disabled",
    locationType: "Destination",
    type: "DigitalOcean",
    brandName: "Database",
    createdDay: "June 22, 2026",
    createdBy: "Laura Smith",
    avatarText: "LS"
  },
  {
    id: "ezequielsap11",
    name: "EZequielSap11",
    status: "Enabled",
    locationType: "Destination",
    type: "Heroku",
    brandName: "Database",
    createdDay: "July 30, 2026",
    createdBy: "Kevin White",
    avatarText: "KW"
  },
  {
    id: "ezequielsap12",
    name: "EZequielSap12",
    status: "Enabled",
    locationType: "Destination",
    type: "Alibaba Cloud",
    brandName: "CloudStorage",
    createdDay: "August 18, 2026",
    createdBy: "Mia Chen",
    avatarText: "MC"
  },
  {
    id: "ezequielsap13",
    name: "EZequielSap13",
    status: "Disabled",
    locationType: "Destination",
    type: "Linode",
    brandName: "Database",
    createdDay: "September 25, 2026",
    createdBy: "Tom Harris",
    avatarText: "TH"
  },
  {
    id: "ezequielsap14",
    name: "EZequielSap14",
    status: "Enabled",
    locationType: "Destination",
    type: "Vultr",
    brandName: "AWS",
    createdDay: "October 30, 2026",
    createdBy: "Emma Wilson",
    avatarText: "EW"
  },
  {
    id: "ezequielsap2",
    name: "EZequielSAP2",
    status: "Enabled",
    locationType: "Source",
    type: "SAP",
    brandName: "SAP",
    createdDay: "2024-08-15 | 09:30",
    createdBy: "System Admin",
    avatarText: "SA"
  },
  {
    id: "conexionestrella",
    name: "ConexiónEstrella",
    status: "Enabled",
    locationType: "Destination",
    type: "AWS",
    brandName: "AWS",
    createdDay: "2024-09-01 | 14:00",
    createdBy: "System Admin",
    avatarText: "SA"
  },
  {
    id: "redrapida",
    name: "RedRápida",
    status: "Enabled",
    locationType: "Destination",
    type: "Snowflake",
    brandName: "Snowflake",
    createdDay: "2024-10-10 | 11:15",
    createdBy: "System Admin",
    avatarText: "SA"
  },
  {
    id: "alianzadigital",
    name: "AlianzaDigital",
    status: "Enabled",
    locationType: "Source",
    type: "SAP",
    brandName: "SAP",
    createdDay: "2024-11-22 | 16:45",
    createdBy: "System Admin",
    avatarText: "SA"
  },
  {
    id: "vinculoglobal",
    name: "VinculoGlobal",
    status: "Disabled",
    locationType: "Destination",
    type: "AWS",
    brandName: "AWS",
    createdDay: "2024-12-25 | 08:00",
    createdBy: "System Admin",
    avatarText: "SA"
  },
  {
    id: "puenteinnovador",
    name: "PuenteInnovador",
    status: "Enabled",
    locationType: "Source",
    type: "SAP",
    brandName: "SAP",
    createdDay: "2025-01-01 | 00:00",
    createdBy: "System Admin",
    avatarText: "SA"
  },
  {
    id: "nexoeficaz",
    name: "NexoEficaz",
    status: "Enabled",
    locationType: "Destination",
    type: "Fabric",
    brandName: "Fabric",
    createdDay: "2025-02-14 | 18:30",
    createdBy: "System Admin",
    avatarText: "SA"
  }
];

export default function ManageConnectionsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListView, setIsListView] = useState(true);

  const tabs = ["All", "Source", "Destination"];

  const filteredConnections = useMemo(() => {
    return mockConnections.filter((conn) => {
      const matchesSearch = conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conn.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab = activeTab === "All" || conn.locationType === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [activeTab, searchQuery]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-stretch font-poppins select-none transition-colors duration-300 bg-full text-foreground">
      <CrestoneNavbar />

      {/* Main Content Container */}
      <div className="flex-1 p-[18px] flex flex-col justify-start gap-6">
        {/* Top Header Card */}
        <div className="border border-neutral-500 dark:border-neutral-300 rounded-[20px] p-5 shadow-sm space-y-6 bg-container transition-colors duration-300">
          <div className="flex items-end justify-between pb-6 border-b border-neutral-500 dark:border-neutral-300 transition-colors duration-300">
            <div className="space-y-1 text-left">
              <h2 className="text-[30px] font-semibold tracking-tight leading-[35px] text-foreground transition-colors duration-300 font-poppins">
                Manage Connections
              </h2>
              <p className="text-[16px] leading-6 text-neutral-900 transition-colors duration-300">
                View and manage your sources and destinations
              </p>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex justify-between items-center p-4 bg-container rounded-xl border border-neutral-500/20 dark:border-neutral-300/10">
            {/* Horizontal Filter Tabs */}
            <Tabs
              activeIndex={tabs.indexOf(activeTab)}
              onChange={(index) => setActiveTab(tabs[index])}
              tabs={tabs.map((tab) => ({ label: tab }))}
            />

            {/* Right Side actions */}
            <div className="flex items-center gap-3 justify-end shrink-0">
              {/* Search Bar */}
              <div className="border border-neutral-500 dark:border-neutral-300 rounded-[12px] min-h-[40px] flex items-center gap-3 px-4 py-2 w-64 shadow-[0_2px_5px_rgba(0,0,0,0.04)] bg-white dark:bg-neutral-100 transition-colors duration-300">
                <CaralIcon name="search" size={16} />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full text-xs font-normal bg-transparent outline-none text-neutral-900 placeholder-neutral-800 transition-colors duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* View Switcher Button */}
              <Button
                iconName={isListView ? "grid" : "list"}
                isIconButton
                variant="info"
                hasBorder
                onClick={() => setIsListView((prev) => !prev)}
                title={isListView ? "Grid View" : "List View"}
                className="cursor-pointer"
              />

              {/* Add Connection "+" Button */}
              <Link href="/demo/crestone-connection">
                <Button
                  iconName="plus"
                  isIconButton
                  variant="success"
                  title="Add Connection"
                  className="cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* List/Cards view split rendering */}
        {isListView ? (
          /* LIST VIEW TABLE */
          <div className="w-full overflow-x-auto bg-container border border-neutral-500 dark:border-neutral-300 rounded-[20px] shadow-sm transition-all duration-300">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-500 dark:border-neutral-300 text-xs font-semibold text-neutral-800 bg-neutral-500/10 dark:bg-neutral-300/5 transition-colors">
                  <th className="p-4 pl-6">Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Location Type</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Created day</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-500/50 dark:divide-neutral-300/20 text-xs">
                {filteredConnections.map((conn) => (
                  <tr key={conn.id} className="hover:bg-neutral-500/5 dark:hover:bg-neutral-300/5 transition-colors">
                    <td className="p-4 pl-6 font-semibold flex items-center gap-3">
                      <div className="bg-neutral-100 border border-neutral-800 p-1.5 rounded-[6px] flex items-center justify-center size-8">
                        <SourceLogo brandName={conn.brandName} size={16} />
                      </div>
                      <span className="text-neutral-900 dark:text-white font-semibold text-sm">{conn.name}</span>
                    </td>
                    <td className="p-4">
                      <Chip
                        label={conn.status}
                        variant={conn.status === "Enabled" ? "success" : "danger"}
                        hasBorder
                      />
                    </td>
                    <td className="p-4 text-neutral-800 dark:text-neutral-200">{conn.locationType}</td>
                    <td className="p-4 flex items-center gap-2">
                      <SourceLogo brandName={conn.brandName} size={14} />
                      <span className="text-neutral-800 dark:text-neutral-200">{conn.type}</span>
                    </td>
                    <td className="p-4 text-neutral-850 dark:text-neutral-300">{conn.createdDay}</td>
                    <td className="p-4 pr-6 text-right">
                      <Link href={`/demo/crestone-connection?edit=${conn.id}`}>
                        <Button variant="info" className="text-xs px-3.5 py-1.5 h-auto cursor-pointer">
                          Edit
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredConnections.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-neutral-800 text-xs">
                      No connections found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* CARDS / GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map((conn) => (
              <div
                key={conn.id}
                className="border border-neutral-500 dark:border-neutral-300 rounded-[20px] p-5 shadow-sm space-y-4 bg-container transition-colors duration-300 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top: logo, name and status */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-neutral-100 border border-neutral-800 p-2 rounded-[6px] flex items-center justify-center size-10 shrink-0">
                        <SourceLogo brandName={conn.brandName} size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white leading-tight">
                          {conn.name}
                        </h4>
                        <p className="text-[10px] text-neutral-800">
                          {conn.locationType} | {conn.type}
                        </p>
                      </div>
                    </div>
                    <Chip
                      label={conn.status}
                      variant={conn.status === "Enabled" ? "success" : "danger"}
                      hasBorder
                    />
                  </div>

                  {/* Middle: author and avatar */}
                  <div className="flex items-center gap-3 pt-3.5 border-t border-neutral-500/20 dark:border-neutral-300/10">
                    <div className="bg-warning-main w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
                      {conn.avatarText}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white">
                        Create by {conn.createdBy}
                      </p>
                      <p className="text-[10px] text-neutral-800">
                        On {conn.createdDay.split(" | ")[0]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom: Edit connection button */}
                <div className="flex justify-end pt-4">
                  <Link href={`/demo/crestone-connection?edit=${conn.id}`}>
                    <Button
                      variant="info"
                      className="text-xs font-semibold px-4 py-2 bg-[#00263E] hover:bg-neutral-800 text-white rounded-md h-auto cursor-pointer"
                    >
                      Edit connection
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            {filteredConnections.length === 0 && (
              <div className="col-span-full text-center py-16 border border-dashed border-zinc-350 rounded-[20px] text-zinc-500 text-xs">
                No connections found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
