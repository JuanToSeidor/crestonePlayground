"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useMemo, useEffect } from "react";
import { Button, Chip, Drawer, Toggle, Alert, Table } from "caralstable";
import CrestoneNavbar from "@/app/components/CrestoneNavbar";
import { Brand, CaralIcon, CaralBrandName, Icons } from "iconcaral2";
import TextInput from "@/app/components/TextInput";

const VALID_BRANDS = new Set([
  "AWS", "AzureSql", "GoogleStorage", "SAP", "Saleforce", "Snowflake", "Redshift", "Cloudera", "Teradata", "Google", "Databricks", "AmazonRedshift", "GoogleBigquery", "Teams", "Deepseek", "Gemini", "OpenAI", "SAPHanaC", "S3", "Harbinger", "Doxa", "Daiana", "Crestone", "CloudCosting", "Feelings", "IBMDb2", "MSSQL", "mySQL", "PostgreSQL", "OneDrive", "Sharepoint", "PDF", "DOC", "DOCX", "CSV", "XLSX", "Json", "HTML", "Fabric", "Sybase", "Ollama", "Windows", "DataEngineering", "OneLake", "DataActivator", "DataFactory", "Synapse", "PowerBI", "Database", "IQ", "Dynamics", "Oracle", "Azure", "CloudStorage"
]);

function SourceLogo({ brandName, size, muted }: { brandName: string; size: number; muted?: boolean }) {
  const isBrand = VALID_BRANDS.has(brandName);

  if (isBrand && !muted) {
    return <Brand name={brandName as CaralBrandName} size={size} />;
  }

  const validIcons = new Set([
    "AWS", "Azure", "AzureSql", "CloudStorage", "Cloudera", "Database", "Databricks",
    "Deepseek", "Doxa", "Fabric", "Gemini", "Google", "GoogleBigquery", "GoogleStorage",
    "IBMDb2", "IQ", "MSSQL", "OneDrive", "OpenAI", "Oracle", "PowerBI", "PostgreSQL",
    "Redshift", "S3", "SAP", "SAPHanaC", "Saleforce", "SapOdata", "Sharepoint", "Snowflake",
    "Sybase", "Teams", "Teradata", "Windows", "OData", "database"
  ]);

  const iconName = validIcons.has(brandName) ? brandName : "database";
  return <CaralIcon name={iconName as Icons} size={size} color={muted ? "#94A3B8" : undefined} />;
}

interface NodeItem {
  id: string;
  name: string;
  sourceName: string;
  sourceType: string;
  sourceBrandName: string;
  destinationName: string;
  destinationType: string;
  destinationBrandName: string;
  createdBy: string;
  createdDay: string;
  avatarText: string;
  status: "Running" | "Stop job";
  isProduction: boolean;
}

const initialNodes: NodeItem[] = [
  {
    id: "taskmate",
    name: "TaskMate",
    sourceName: "Jobify",
    sourceType: "SAP OData Connection",
    sourceBrandName: "SAP",
    destinationName: "WorkNest",
    destinationType: "Amazon S3 Storage",
    destinationBrandName: "AWS",
    createdBy: "HireHub",
    createdDay: "July 20, 2026",
    avatarText: "HH",
    status: "Running",
    isProduction: true
  },
  {
    id: "talentsync",
    name: "TalentSync",
    sourceName: "CareerConnect",
    sourceType: "SAP SuccessFactors",
    sourceBrandName: "SAP",
    destinationName: "PositionPro",
    destinationType: "Azure SQL Database",
    destinationBrandName: "Azure",
    createdBy: "WorkSphere",
    createdDay: "July 21, 2026",
    avatarText: "WS",
    status: "Running",
    isProduction: false
  },
  {
    id: "employease",
    name: "EmployEase",
    sourceName: "SkillBridge",
    sourceType: "SAP API Service",
    sourceBrandName: "SAP",
    destinationName: "HireWise",
    destinationType: "AWS Redshift",
    destinationBrandName: "AWS",
    createdBy: "Juan Torres",
    createdDay: "July 22, 2026",
    avatarText: "JT",
    status: "Running",
    isProduction: false
  },
  {
    id: "jobstream",
    name: "JobStream",
    sourceName: "TalentTrack",
    sourceType: "Snowflake Database",
    sourceBrandName: "Snowflake",
    destinationName: "WorkMatch",
    destinationType: "Azure Data Lake",
    destinationBrandName: "Azure",
    createdBy: "Juan Torres",
    createdDay: "July 23, 2026",
    avatarText: "JT",
    status: "Running",
    isProduction: false
  },
  {
    id: "jobfusion",
    name: "JobFusion",
    sourceName: "TalentQuest",
    sourceType: "SAP SuccessFactors",
    sourceBrandName: "SAP",
    destinationName: "WorkWave",
    destinationType: "AWS RDS",
    destinationBrandName: "AWS",
    createdBy: "Juan Torres",
    createdDay: "July 24, 2026",
    avatarText: "JT",
    status: "Running",
    isProduction: false
  },
  {
    id: "hirecloud",
    name: "HireCloud",
    sourceName: "Jobify",
    sourceType: "SAP OData Connection",
    sourceBrandName: "SAP",
    destinationName: "JobNavigator",
    destinationType: "Azure Synapse Analytics",
    destinationBrandName: "Azure",
    createdBy: "SkillSetGo",
    createdDay: "July 25, 2026",
    avatarText: "SG",
    status: "Running",
    isProduction: true
  },
  {
    id: "workvista",
    name: "WorkVista",
    sourceName: "JobPath",
    sourceType: "Azure SQL Server",
    sourceBrandName: "AzureSql",
    destinationName: "TalentSphere",
    destinationType: "AWS S3 Bucket",
    destinationBrandName: "AWS",
    createdBy: "Juan Torres",
    createdDay: "July 26, 2026",
    avatarText: "JT",
    status: "Stop job",
    isProduction: false
  },
  {
    id: "hiresphere",
    name: "HireSphere",
    sourceName: "PositionNavigator",
    sourceType: "SAP ERP Connector",
    sourceBrandName: "SAP",
    destinationName: "JobNavigator",
    destinationType: "Azure SQL DB",
    destinationBrandName: "Azure",
    createdBy: "SkillSync",
    createdDay: "July 27, 2026",
    avatarText: "SS",
    status: "Stop job",
    isProduction: false
  }
];

export default function NodosPage() {
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState<NodeItem[]>(initialNodes);
  const [isListView, setIsListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  // Dropdown States
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isRowsPerPageOpen, setIsRowsPerPageOpen] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);

  // Drawer Form States
  const [formName, setFormName] = useState("");
  const [formSourceName, setFormSourceName] = useState("");
  const [formSourceBrand, setFormSourceBrand] = useState("SAP");
  const [formSourceType, setFormSourceType] = useState("");
  const [formDestName, setFormDestName] = useState("");
  const [formDestBrand, setFormDestBrand] = useState("AWS");
  const [formDestType, setFormDestType] = useState("");
  const [formStatus, setFormStatus] = useState<"Running" | "Stop job">("Running");
  const [formIsProduction, setFormIsProduction] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ show: boolean; variant: "success" | "danger" | "info"; title: string; description: string } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter sources and destinations ONLY based on created nodes
  const uniqueSources = useMemo(() => {
    return Array.from(new Set(nodes.map((n) => n.sourceName))).filter(Boolean).sort();
  }, [nodes]);

  const uniqueDestinations = useMemo(() => {
    return Array.from(new Set(nodes.map((n) => n.destinationName))).filter(Boolean).sort();
  }, [nodes]);

  // Handle outside dropdown close
  useEffect(() => {
    const handleGlobalClick = () => {
      setIsSourceOpen(false);
      setIsDestOpen(false);
    };
    if (isSourceOpen || isDestOpen) {
      window.addEventListener("click", handleGlobalClick);
    }
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isSourceOpen, isDestOpen]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSource, selectedDestination]);

  const filteredNodes = useMemo(() => {
    return nodes.filter((node) => {
      const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.destinationName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSource = !selectedSource || node.sourceName === selectedSource;
      const matchesDest = !selectedDestination || node.destinationName === selectedDestination;

      return matchesSearch && matchesSource && matchesDest;
    });
  }, [nodes, searchQuery, selectedSource, selectedDestination]);

  const totalPages = Math.ceil(filteredNodes.length / rowsPerPage) || 1;

  const paginatedNodes = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredNodes.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredNodes, currentPage, rowsPerPage]);

  const handleOpenEdit = (node: NodeItem) => {
    setSelectedNode(node);
    setFormName(node.name);
    setFormSourceName(node.sourceName);
    setFormSourceBrand(node.sourceBrandName);
    setFormSourceType(node.sourceType);
    setFormDestName(node.destinationName);
    setFormDestBrand(node.destinationBrandName);
    setFormDestType(node.destinationType);
    setFormStatus(node.status);
    setFormIsProduction(node.isProduction);
    setIsDrawerOpen(true);
  };

  const handleOpenAdd = () => {
    setSelectedNode(null);
    setFormName("");
    setFormSourceName("");
    setFormSourceBrand("SAP");
    setFormSourceType("");
    setFormDestName("");
    setFormDestBrand("AWS");
    setFormDestType("");
    setFormStatus("Running");
    setFormIsProduction(false);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formSourceName.trim() || !formDestName.trim()) {
      setToast({
        show: true,
        variant: "danger",
        title: "Validation Error",
        description: "Please fill out Node Name, Source Connection, and Destination Connection."
      });
      return;
    }

    if (selectedNode) {
      // Edit
      setNodes((prev) =>
        prev.map((n) =>
          n.id === selectedNode.id
            ? {
              ...n,
              name: formName,
              sourceName: formSourceName,
              sourceBrandName: formSourceBrand,
              sourceType: formSourceType || `${formSourceBrand} Connection`,
              destinationName: formDestName,
              destinationBrandName: formDestBrand,
              destinationType: formDestType || `${formDestBrand} Target`,
              status: formStatus,
              isProduction: formIsProduction
            }
            : n
        )
      );
      setToast({
        show: true,
        variant: "success",
        title: "Node Updated",
        description: `Node "${formName}" updated successfully.`
      });
    } else {
      // Add
      const newId = formName.toLowerCase().replace(/[^a-z0-9]/g, "-") || Date.now().toString();
      const newNode: NodeItem = {
        id: newId,
        name: formName,
        sourceName: formSourceName,
        sourceType: formSourceType || `${formSourceBrand} Connection`,
        sourceBrandName: formSourceBrand,
        destinationName: formDestName,
        destinationType: formDestType || `${formDestBrand} Target`,
        destinationBrandName: formDestBrand,
        createdBy: "Juan Torres",
        createdDay: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        avatarText: "JT",
        status: formStatus,
        isProduction: formIsProduction
      };
      setNodes((prev) => [newNode, ...prev]);
      setToast({
        show: true,
        variant: "success",
        title: "Node Created",
        description: `Node "${formName}" created successfully.`
      });
    }

    setIsDrawerOpen(false);
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    setNodes((prev) => prev.filter((n) => n.id !== selectedNode.id));
    setToast({
      show: true,
      variant: "danger",
      title: "Node Deleted",
      description: `Node "${selectedNode.name}" has been permanently deleted.`
    });
    setIsDrawerOpen(false);
  };

  const renderPagination = (roundedClass = "rounded-b-[20px]") => {
    return (
      <div className={`flex items-center justify-between gap-6 text-sm text-neutral-800 p-4 border-t border-neutral-500/10 dark:border-neutral-300/10 sticky bottom-0 bg-container ${roundedClass} z-10 select-none`}>
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-850 dark:text-neutral-300 font-medium">Rows per page</span>
          <div className="relative">
            <Button
              variant="light"
              isDropdown
              isOpen={isRowsPerPageOpen}
              onClick={(e) => {
                e.stopPropagation();
                setIsRowsPerPageOpen(!isRowsPerPageOpen);
              }}
              className="text-xs font-semibold px-4 py-2 h-10 border border-neutral-500/30 dark:border-neutral-300/10 rounded-[10px] bg-white dark:bg-neutral-850 text-neutral-900 dark:text-white flex items-center gap-2 cursor-pointer hover:bg-neutral-500/10 transition-all font-poppins"
            >
              {rowsPerPage}
            </Button>
            {isRowsPerPageOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsRowsPerPageOpen(false)} />
                <div className="absolute bottom-full mb-1.5 left-0 z-50 w-20 bg-white dark:bg-neutral-800 border border-neutral-500/30 dark:border-neutral-300/10 rounded-[10px] shadow-lg py-1 flex flex-col animate-fade-in">
                  {[5, 10, 25, 50].map((val) => (
                    <Button
                      key={val}
                      variant="ghost"
                      onClick={() => {
                        setRowsPerPage(val);
                        setCurrentPage(1);
                        setIsRowsPerPageOpen(false);
                      }}
                      className={`w-full justify-start text-left px-3 py-1.5 text-xs font-semibold hover:bg-neutral-500/10 dark:hover:bg-neutral-300/5 transition-colors cursor-pointer ${rowsPerPage === val ? "text-seidor-main font-bold" : "text-neutral-850 dark:text-white"
                        }`}
                    >
                      {val}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Previous / Next Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`text-xs font-semibold flex items-center gap-1.5 px-3.5 py-1.5 h-auto cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-neutral-900 dark:text-white hover:bg-neutral-500/10 dark:hover:bg-neutral-300/5 rounded-lg transition-colors`}
          >
            <CaralIcon name="chevronLeft" size={12} />
            Previous
          </Button>
          <Button
            variant="ghost"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`text-xs font-semibold flex items-center gap-1.5 px-3.5 py-1.5 h-auto cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-neutral-900 dark:text-white hover:bg-neutral-500/10 dark:hover:bg-neutral-300/5 rounded-lg transition-colors`}
          >
            Next
            <CaralIcon name="chevronRigth" size={12} />
          </Button>
        </div>
      </div>
    );
  };

  const tableColumns = [
    {
      key: "name",
      header: "Name",
      width: "15%",
      render: (node: NodeItem) => (
        <span className="font-semibold text-neutral-900 dark:text-white text-sm">
          {node.name}
        </span>
      )
    },
    {
      key: "sourceName",
      header: "Source",
      width: "25%",
      render: (node: NodeItem) => (
        <div className="flex items-center gap-3">
          {node.isProduction && (
            <div className="relative group flex items-center">
              <div className="bg-info-light dark:bg-info-main/20 border border-info-main p-1.5 rounded-[8px] flex items-center justify-center size-8 shrink-0 text-info-main cursor-help transition-all duration-300">
                <CaralIcon name="badgeSync" size={14} />
              </div>
              {/* Popover */}
              <div className="absolute top-8 left-0 z-50 w-72 p-4 bg-[#E2E8F0] dark:bg-neutral-450 border border-neutral-350 dark:border-neutral-600 rounded-[12px] shadow-xl text-left scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 origin-top-left">
                <div className="absolute -top-1.5 left-3 size-3 bg-[#E2E8F0] dark:bg-neutral-450 border-t border-l border-neutral-350 dark:border-neutral-600 rotate-45" />
                <div className="relative z-10 space-y-1.5 font-normal">
                  <div className="flex items-center gap-2 text-info-hard dark:text-info-main">
                    <CaralIcon name="badgeSync" size={14} />
                    <span className="text-xs font-bold font-poppins">Productive environment</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-neutral-900 dark:text-neutral-200">
                    This node is utilizing a productive source environment, permitting automated operations and scheduling.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="bg-neutral-100 border border-neutral-800 p-1.5 rounded-[6px] flex items-center justify-center size-8 shrink-0">
            <SourceLogo brandName={node.sourceBrandName} size={16} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-neutral-900 dark:text-white font-semibold">{node.sourceName}</span>
            <span className="text-[10px] text-neutral-500">{node.sourceType}</span>
          </div>
        </div>
      )
    },
    {
      key: "destinationName",
      header: "Destination",
      width: "25%",
      render: (node: NodeItem) => (
        <div className="flex items-center gap-3">
          <div className="bg-neutral-100 border border-neutral-800 p-1.5 rounded-[6px] flex items-center justify-center size-8 shrink-0">
            <SourceLogo brandName={node.destinationBrandName} size={16} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-neutral-900 dark:text-white font-semibold">{node.destinationName}</span>
            <span className="text-[10px] text-neutral-500">{node.destinationType}</span>
          </div>
        </div>
      )
    },
    {
      key: "createdBy",
      header: "Create by",
      width: "12%",
      render: (node: NodeItem) => (
        <span className="text-neutral-800 dark:text-neutral-200 text-xs font-medium">
          {node.createdBy}
        </span>
      )
    },
    {
      key: "createdDay",
      header: "Create",
      width: "10%",
      render: (node: NodeItem) => (
        <span className="text-neutral-855 dark:text-neutral-300 text-xs font-medium">
          {node.createdDay}
        </span>
      )
    },
    {
      key: "status",
      header: "Status",
      width: "10%",
      render: (node: NodeItem) => (
        <div className="flex items-center">
          <Chip
            label={node.status === "Running" ? "Node active" : "Stop job"}
            variant={node.status === "Running" ? "success" : "danger"}
            hasBorder
          />
        </div>
      )
    },
    {
      key: "actions",
      header: "Action",
      width: "8%",
      align: "right" as const,
      render: (node: NodeItem) => (
        <Button
          variant="info"
          className="text-xs px-3.5 py-1.5 h-auto cursor-pointer"
          onClick={() => handleOpenEdit(node)}
        >
          Edit
        </Button>
      )
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-stretch font-poppins select-none transition-colors duration-300 bg-full text-foreground">
      {toast && toast.show && (
        <Alert
          type="toast"
          position="top-right"
          variant={toast.variant}
          title={toast.title}
          description={toast.description}
          onClose={() => setToast(null)}
          autoClose={3000}
        />
      )}
      <CrestoneNavbar />

      {/* Main Container */}
      <div className="flex-1 p-[18px] flex flex-col justify-start gap-6">
        {/* Title Header Card */}
        <div className="border rounded-[20px] p-5 shadow-sm space-y-6 bg-container transition-colors duration-300">
          <div className="flex items-end justify-between transition-colors duration-300">
            <div className="space-y-1 text-left">
              <h2 className="text-[30px] font-semibold tracking-tight leading-[35px] text-foreground transition-colors duration-300 font-poppins">
                Manage Nodos
              </h2>
              <p className="text-[16px] leading-6 text-neutral-900 transition-colors duration-300">
                View and manage your nodos
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar Controls Card */}
        <div className="flex  justify-between items-start sm:items-center gap-4 p-4 bg-container rounded-xl border border-neutral-500/20 dark:border-neutral-300/10">
          {/* Custom Select Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Source Dropdown */}
            <div className="relative w-full sm:w-[177px]">
              <Button
                variant="light"
                isDropdown
                isOpen={isSourceOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSourceOpen(!isSourceOpen);
                  setIsDestOpen(false);
                }}
                className="w-full h-10 border border-neutral-500/30 dark:border-neutral-300/10 rounded-lg bg-white dark:bg-neutral-850 text-neutral-800 dark:text-neutral-200 flex items-center justify-between pl-3 pr-2 cursor-pointer hover:bg-neutral-500/5 transition-all text-left"
              >
                <span className="truncate">{selectedSource || "Source"}</span>
              </Button>
              {isSourceOpen && (
                <div
                  className="absolute left-0 top-full z-50 w-full mt-1 bg-white dark:bg-neutral-800 border border-neutral-500/30 dark:border-neutral-300/10 rounded-lg shadow-lg py-1 max-h-48 overflow-y-auto animate-fade-in flex flex-col items-stretch"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedSource("");
                      setIsSourceOpen(false);
                    }}
                    className="w-full justify-start text-left px-3 py-2 text-xs font-semibold hover:bg-neutral-500/10 dark:hover:bg-neutral-300/5 text-neutral-850 dark:text-white cursor-pointer"
                  >
                    All Sources
                  </Button>
                  {uniqueSources.map((src) => (
                    <Button
                      key={src}
                      variant="ghost"
                      onClick={() => {
                        setSelectedSource(src);
                        setIsSourceOpen(false);
                      }}
                      className="w-full justify-start text-left px-3 py-2 text-xs font-semibold hover:bg-neutral-500/10 dark:hover:bg-neutral-300/5 text-neutral-850 dark:text-white cursor-pointer"
                    >
                      {src}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Destination Dropdown */}
            <div className="relative  w-full sm:w-[177px]">
              <Button
                variant="light"
                isDropdown
                isOpen={isDestOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDestOpen(!isDestOpen);
                  setIsSourceOpen(false);
                }}
                className="w-full h-10 border border-neutral-500/30 dark:border-neutral-300/10 rounded-lg bg-white dark:bg-neutral-855 text-neutral-800 dark:text-neutral-200 flex items-center justify-between pl-3 pr-2 cursor-pointer hover:bg-neutral-500/5 transition-all text-left"
              >
                <span className="truncate">{selectedDestination || "Destination"}</span>
              </Button>
              {isDestOpen && (
                <div
                  className="absolute left-0 top-full z-50 w-full mt-1 bg-white dark:bg-neutral-800 border border-neutral-500/30 dark:border-neutral-300/10 rounded-lg shadow-lg py-1 max-h-48 overflow-y-auto animate-fade-in flex flex-col items-stretch"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedDestination("");
                      setIsDestOpen(false);
                    }}
                    className="w-full justify-start text-left px-3 py-2 text-xs font-semibold hover:bg-neutral-500/10 dark:hover:bg-neutral-300/5 text-neutral-850 dark:text-white cursor-pointer"
                  >
                    All Destinations
                  </Button>
                  {uniqueDestinations.map((dest) => (
                    <Button
                      key={dest}
                      variant="ghost"
                      onClick={() => {
                        setSelectedDestination(dest);
                        setIsDestOpen(false);
                      }}
                      className="w-full justify-start text-left px-3 py-2 text-xs font-semibold hover:bg-neutral-500/10 dark:hover:bg-neutral-300/5 text-neutral-850 dark:text-white cursor-pointer"
                    >
                      {dest}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side actions */}
          <div className="flex items-center gap-3 justify-end shrink-0  sm:w-auto">
            {/* Search Bar */}
            <div className="border border-neutral-500 dark:border-neutral-300 rounded-[12px] min-h-[40px] flex items-center gap-3 px-4 py-2  sm:w-64 shadow-[0_2px_5px_rgba(0,0,0,0.04)] bg-white dark:bg-neutral-100 transition-colors duration-300">
              <span className="text-neutral-500 flex items-center"><CaralIcon name="search" size={16} /></span>
              <input
                type="text"
                placeholder="Search Nodos"
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

            {/* Add Node "+" Button */}
            <Button
              iconName="plus"
              isIconButton
              variant="success"
              title="Add Node"
              className="cursor-pointer"
              onClick={handleOpenAdd}
            />
          </div>
        </div>

        {/* View Switcher Rendering */}
        {isListView ? (
          /* LIST VIEW */
          <div className="w-full bg-container border border-neutral-500 dark:border-neutral-300 rounded-[20px] shadow-sm transition-all duration-300 flex flex-col justify-between relative">
            <div className="w-full overflow-x-auto max-h-[55vh] rounded-t-[20px] scrollbar-thin">
              {filteredNodes.length === 0 ? (
                <div className="text-center py-16 text-neutral-800 text-xs">
                  No nodes found matching filters.
                </div>
              ) : (
                <Table
                  data={paginatedNodes}
                  columns={tableColumns}
                  className="w-full text-left border-collapse min-w-[900px]"
                  hasBorder={false}
                />
              )}
            </div>
            {filteredNodes.length > 0 && renderPagination("rounded-b-[20px]")}
          </div>
        ) : (
          /* CARD / GRID VIEW */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedNodes.map((node) => (
                <div
                  key={node.id}
                  className="border border-neutral-500 dark:border-neutral-300 rounded-[20px] p-5 shadow-sm space-y-4 bg-container transition-colors duration-300 text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top: title, icon and status badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-700 dark:text-neutral-300 flex items-center"><CaralIcon name="cubeInCube" size={18} /></span>
                        <h3 className="font-bold text-base text-neutral-900 dark:text-white leading-tight truncate max-w-[150px]" title={node.name}>
                          {node.name}
                        </h3>
                      </div>
                      <Chip
                        label={node.status === "Running" ? "Running" : "Stopped"}
                        variant={node.status === "Running" ? "success" : "danger"}
                        hasBorder
                      />
                    </div>

                    {/* Timeline connection */}
                    <div className="bg-neutral-500/5 dark:bg-neutral-350/5 border border-neutral-500/10 dark:border-neutral-300/10 rounded-[12px] p-4 flex gap-4 items-stretch relative">

                      {/* Left: Blue connecting vertical timeline */}
                      <div className="flex flex-col items-center justify-between w-6 select-none shrink-0 py-1">
                        <div className="size-3 rounded-full bg-info-main border-2 border-white dark:border-neutral-900 shadow-sm" />
                        <div className="w-0.5 flex-1 bg-info-main border-dashed border-info-main/40 my-1" />
                        <div className="size-3 rounded-full bg-info-main border-2 border-white dark:border-neutral-900 shadow-sm" />
                      </div>

                      {/* Right: details of source and destination */}
                      <div className="flex-1 space-y-4">
                        {/* Source Details */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="bg-neutral-100 border border-neutral-800 p-1 rounded-[6px] flex items-center justify-center size-8 shrink-0">
                              <SourceLogo brandName={node.sourceBrandName} size={14} />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="font-bold text-xs text-neutral-900 dark:text-white">{node.sourceName}</span>
                              <span className="text-[10px] text-neutral-500">{node.sourceType}</span>
                            </div>
                          </div>

                          {/* Productive Badge in Card */}
                          {node.isProduction && (
                            <div className="relative group">
                              <div className="bg-info-light dark:bg-info-main/20 border border-info-main p-1.5 rounded-[8px] flex items-center justify-center size-8 shrink-0 text-info-main cursor-help transition-all duration-300">
                                <CaralIcon name="badgeSync" size={14} />
                              </div>

                              {/* Popover */}
                              <div className="absolute top-10 right-0 z-50 w-72 p-4 bg-[#E2E8F0] dark:bg-neutral-450 border border-neutral-350 dark:border-neutral-600 rounded-[12px] shadow-xl text-left scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 origin-top-right">
                                <div className="absolute -top-1.5 right-3 size-3 bg-[#E2E8F0] dark:bg-neutral-450 border-t border-l border-neutral-350 dark:border-neutral-600 rotate-45" />
                                <div className="relative z-10 space-y-1.5 font-normal">
                                  <div className="flex items-center gap-2 text-info-hard dark:text-info-main">
                                    <CaralIcon name="badgeSync" size={14} />
                                    <span className="text-xs font-bold font-poppins">Productive environment</span>
                                  </div>
                                  <p className="text-[11px] leading-relaxed text-neutral-900 dark:text-neutral-200">
                                    This node is utilizing a productive source environment, permitting automated operations and scheduling.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Destination Details */}
                        <div className="flex items-center gap-2.5">
                          <div className="bg-neutral-100 border border-neutral-800 p-1 rounded-[6px] flex items-center justify-center size-8 shrink-0">
                            <SourceLogo brandName={node.destinationBrandName} size={14} />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-bold text-xs text-neutral-900 dark:text-white">{node.destinationName}</span>
                            <span className="text-[10px] text-neutral-500">{node.destinationType}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle: author and date */}
                    <div className="flex items-center gap-3 pt-3.5 border-t border-neutral-500/20 dark:border-neutral-300/10">
                      <div className="bg-warning-main w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
                        {node.avatarText}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-900 dark:text-white">
                          Created by {node.createdBy}
                        </p>
                        <p className="text-[10px] text-neutral-800">
                          {node.createdDay}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Edit Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      variant="info"
                      className="text-xs font-semibold px-4 py-2 bg-[#00263E] hover:bg-neutral-800 text-white rounded-md h-auto cursor-pointer"
                      onClick={() => handleOpenEdit(node)}
                    >
                      Edit Node
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredNodes.length === 0 && (
              <div className="text-center py-16 border border-dashed border-zinc-350 rounded-[20px] text-zinc-500 text-xs bg-container">
                No nodes found matching filters.
              </div>
            )}
            {filteredNodes.length > 0 && (
              <div className="bg-container border border-neutral-500 dark:border-neutral-300 rounded-[20px] shadow-sm mt-6 relative">
                {renderPagination("rounded-[20px]")}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Node Add/Edit Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedNode ? "Edit Node" : "Create Node"}
        size="md"
      >
        <div className="flex flex-col h-full justify-between pb-6 space-y-6 text-left">
          <div className="flex-1 overflow-y-auto space-y-6 pt-4 pr-1.5 scrollbar-thin">

            {/* Header info */}
            <div className="flex items-center gap-4 p-4 rounded-[12px] bg-neutral-500/10 dark:bg-neutral-350/5 border border-neutral-500/20 dark:border-neutral-300/10">
              <div className="bg-neutral-100 border border-neutral-800 p-2.5 rounded-[8px] flex items-center justify-center size-12 shrink-0">
                <span className="text-neutral-700 flex items-center"><CaralIcon name="cubeInCube" size={24} /></span>
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-tight">
                  {selectedNode ? "Modify Node Parameters" : "Define New Node Connection"}
                </h3>
                <p className="text-xs text-neutral-800">
                  {selectedNode ? `Editing "${selectedNode.name}"` : "Link a source and destination connection."}
                </p>
              </div>
            </div>

            {/* General Settings */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 border-b border-neutral-500/20 dark:border-neutral-300/10 pb-2">
                Node Identity
              </h4>
              <TextInput
                label="Node Name"
                placeholder="e.g. Sales Data Stream"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />

              <div className="flex flex-col gap-3 pt-2">
                {/* Status Toggle */}
                <div className="flex items-center justify-between p-3.5 border border-neutral-500/20 dark:border-neutral-300/10 rounded-[12px] bg-white dark:bg-neutral-800">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white">Running State</span>
                    <span className="text-[10px] text-neutral-800">Toggle whether this node is active and running jobs</span>
                  </div>
                  <Toggle
                    checked={formStatus === "Running"}
                    onChange={(checked) => setFormStatus(checked ? "Running" : "Stop job")}
                  />
                </div>

                {/* Production Toggle */}
                <div className="flex items-center justify-between p-3.5 border border-neutral-500/20 dark:border-neutral-300/10 rounded-[12px] bg-white dark:bg-neutral-800">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      Production Environment
                      {formIsProduction && (
                        <span className="text-info-main flex items-center"><CaralIcon name="badgeSync" size={12} /></span>
                      )}
                    </span>
                    <span className="text-[10px] text-neutral-800">Mark if this node handles productive data pipelines</span>
                  </div>
                  <Toggle
                    checked={formIsProduction}
                    onChange={setFormIsProduction}
                  />
                </div>
              </div>
            </div>

            {/* Source Configuration */}
            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 border-b border-neutral-500/20 dark:border-neutral-300/10 pb-2">
                Source (Origen) Connection
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Connection Name"
                  placeholder="e.g. Jobify"
                  value={formSourceName}
                  onChange={(e) => setFormSourceName(e.target.value)}
                />

                {/* Source Brand select dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Source Technology
                  </label>
                  <select
                    className="block w-full rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 outline-none"
                    value={formSourceBrand}
                    onChange={(e) => setFormSourceBrand(e.target.value)}
                  >
                    {Array.from(VALID_BRANDS).sort().map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>

              <TextInput
                label="Connection Description / Type"
                placeholder="e.g. SAP OData Connection"
                value={formSourceType}
                onChange={(e) => setFormSourceType(e.target.value)}
              />
            </div>

            {/* Destination Configuration */}
            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 border-b border-neutral-500/20 dark:border-neutral-300/10 pb-2">
                Destination (Destino) Target
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Connection Name"
                  placeholder="e.g. WorkNest"
                  value={formDestName}
                  onChange={(e) => setFormDestName(e.target.value)}
                />

                {/* Destination Brand select dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Destination Technology
                  </label>
                  <select
                    className="block w-full rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 outline-none"
                    value={formDestBrand}
                    onChange={(e) => setFormDestBrand(e.target.value)}
                  >
                    {Array.from(VALID_BRANDS).sort().map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>

              <TextInput
                label="Connection Description / Type"
                placeholder="e.g. Amazon S3 Storage"
                value={formDestType}
                onChange={(e) => setFormDestType(e.target.value)}
              />
            </div>

          </div>

          {/* Drawer Actions */}
          <div className="pt-4 flex items-center justify-between border-t border-neutral-500/20 dark:border-neutral-300/10">
            <div>
              {selectedNode && (
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className="px-4 py-2 text-xs font-semibold h-auto cursor-pointer"
                >
                  Delete Node
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="light"
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 text-xs font-semibold h-auto cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="success"
                onClick={handleSave}
                className="px-4 py-2 text-xs font-semibold h-auto cursor-pointer"
              >
                Save Node
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
