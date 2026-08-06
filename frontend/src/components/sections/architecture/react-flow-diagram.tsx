"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ReactFlow,
  type Node,
  type Edge,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  UserRound,
  Monitor,
  Server,
  Database,
  Cloud,
  Shield,
} from "lucide-react";
import type { ReactFlowDiagramData } from "@/types";

// ─── Variant palette ─────────────────────────────────────────────

type Variant =
  | "user"
  | "frontend"
  | "service"
  | "database"
  | "external"
  | "hardware";

const variantMeta = {
  user: {
    bg: "bg-blue-600",
    border: "border-blue-500",
    text: "text-white",
    icon: UserRound,
    shape: "rounded-full px-5",
    iconBg: "bg-blue-500/40",
  },
  frontend: {
    bg: "bg-blue-600",
    border: "border-blue-500",
    text: "text-white",
    icon: Monitor,
    shape: "rounded-xl",
    iconBg: "bg-blue-500/40",
  },
  service: {
    bg: "bg-[#1e1e24]",
    border: "border-[#2a2a35]",
    text: "text-[#f0f0f5]",
    icon: Server,
    shape: "rounded-xl border-l-[3px] border-l-blue-500",
    iconBg: "bg-zinc-700/60",
  },
  database: {
    bg: "bg-[#1a1a1f]",
    border: "border-[#2a2a35]",
    text: "text-[#f0f0f5]",
    icon: Database,
    shape: "",
    iconBg: "bg-zinc-700/60",
  },
  external: {
    bg: "bg-amber-900/80",
    border: "border-amber-700 border-dashed",
    text: "text-[#fef3c7]",
    icon: Cloud,
    shape: "rounded-xl",
    iconBg: "bg-amber-800/60",
  },
  hardware: {
    bg: "bg-violet-800/80",
    border: "border-violet-600",
    text: "text-[#ede9fe]",
    icon: Shield,
    shape: "rounded-xl",
    iconBg: "bg-violet-700/60",
  },
} as const;

// ─── Custom Node ─────────────────────────────────────────────────

type CustomNodeData = { label: string; variant?: Variant };
type CustomNodeType = Node<CustomNodeData>;

function CustomNode({ data }: NodeProps<CustomNodeType>) {
  const variant = data.variant ?? "service";
  const meta = variantMeta[variant];

  if (variant === "database") {
    return (
      <div className="flex flex-col items-center min-w-[150px]">
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-zinc-500 !w-3 !h-3 !border-0"
        />
        <div className="relative z-10 mb-[-12px]">
          <span className="inline-block rounded-full bg-zinc-700 px-3 py-0.5 text-[10px] font-bold tracking-wider text-zinc-300 border border-zinc-600">
            DB
          </span>
        </div>
        <div className="w-full h-5 bg-[#222228] border border-[#2a2a35] border-b-0 rounded-t-[50%_/_18px]" />
        <div className="w-full flex items-center gap-2.5 bg-[#1a1a1f] border-x border-[#2a2a35] px-5 py-3">
          <div className="flex-shrink-0 rounded-md bg-zinc-700/60 p-1.5">
            <Database className="h-4 w-4 text-zinc-300" />
          </div>
          <span className="text-xs font-medium text-[#f0f0f5] leading-snug whitespace-pre-line">
            {data.label}
          </span>
        </div>
        <div className="w-full h-5 bg-[#1a1a1f] border border-[#2a2a35] border-t-0 rounded-b-[50%_/_18px]" />
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-zinc-500 !w-3 !h-3 !border-0"
        />
      </div>
    );
  }

  const Icon = meta.icon;

  return (
    <div
      className={`
        ${meta.bg} ${meta.border} ${meta.text} ${meta.shape}
        flex items-center gap-3 px-4 py-3 shadow-md
        border min-w-[160px] max-w-[240px]
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-zinc-500 !w-3 !h-3 !border-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-500 !w-3 !h-3 !border-0"
      />
      <div className={`flex-shrink-0 rounded-md ${meta.iconBg} p-1.5`}>
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-xs font-medium leading-snug whitespace-pre-line">
        {data.label}
      </span>
    </div>
  );
}

const nodeTypes = { default: CustomNode, database: CustomNode };

// ─── Layout helper ────────────────────────────────────────────────

interface RawNode {
  id: string;
  data: { label: string; variant?: Variant };
  style?: Record<string, string>;
}

interface RawEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

function layoutNodes(
  rawNodes: RawNode[],
  rawEdges: RawEdge[],
  direction: "TB" | "LR",
  dagreModule: typeof import("@dagrejs/dagre")
): { nodes: Node[]; edges: Edge[] } {
  const g = new dagreModule.graphlib.Graph();

  g.setGraph({
    rankdir: direction,
    nodesep: 80,
    ranksep: 100,
    marginx: 50,
    marginy: 50,
  });

  g.setDefaultEdgeLabel(() => ({}));

  const NODE_W = 190;
  const NODE_H = 64;

  for (const node of rawNodes) {
    g.setNode(node.id, { width: NODE_W, height: NODE_H });
  }

  for (const edge of rawEdges) {
    g.setEdge(edge.source, edge.target);
  }

  dagreModule.layout(g);

  const nodes: Node[] = rawNodes.map((node) => {
    const pos = g.node(node.id)!;
    const x = pos.x - NODE_W / 2;
    const y = pos.y - NODE_H / 2;

    return {
      id: node.id,
      type: "default",
      position: { x, y },
      data: {
        label: node.data.label,
        variant: node.data.variant ?? "service",
      } satisfies CustomNodeData,
      style: {
        width: NODE_W,
        ...node.style,
      },
      sourcePosition:
        direction === "TB" ? Position.Bottom : Position.Right,
      targetPosition: direction === "TB" ? Position.Top : Position.Left,
    };
  });

  const edges: Edge[] = rawEdges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label ?? undefined,
    type: "smoothstep",
    style: { stroke: "#3f3f46", strokeWidth: 2 },
    labelStyle: { fill: "#a1a1aa", fontSize: 11, fontWeight: 600 },
    labelBgStyle: { fill: "#18181b", opacity: 0.95 },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 4,
    markerEnd: {
      type: "arrowclosed",
      color: "#52525b",
      width: 18,
      height: 18,
    },
  }));

  return { nodes, edges };
}

// ─── Default edge options ─────────────────────────────────────────

const defaultEdgeOptions = {
  type: "smoothstep",
  style: { stroke: "#3f3f46", strokeWidth: 2 },
  markerEnd: {
    type: "arrowclosed" as const,
    color: "#52525b",
    width: 18,
    height: 18,
  },
};

// ─── Component ────────────────────────────────────────────────────

interface ReactFlowDiagramProps {
  data: ReactFlowDiagramData;
}

export function ReactFlowDiagram({ data }: ReactFlowDiagramProps) {
  const [laidOut, setLaidOut] = useState<{
    nodes: Node[];
    edges: Edge[];
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function computeLayout() {
      const dagreModule = await import("@dagrejs/dagre");
      if (cancelled) return;

      const result = layoutNodes(
        data.nodes as RawNode[],
        data.edges,
        data.direction ?? "TB",
        dagreModule
      );

      if (!cancelled) setLaidOut(result);
    }

    computeLayout();

    return () => {
      cancelled = true;
    };
  }, [data]);

  const onInit = useCallback(
    (instance: { fitView: (opts?: { duration?: number }) => void }) => {
      setTimeout(() => instance.fitView({ duration: 400 }), 100);
    },
    []
  );

  return (
    <div
      role="img"
      aria-label="Architecture diagram"
      className="rounded-2xl border border-[#2a2a35] bg-[#0a0a0b] overflow-hidden"
      style={{ width: "100%", height: 550 }}
    >
      <style>{`
        .react-flow__attribution { display: none !important; }
        .react-flow__background { background: #0a0a0b !important; }
      `}</style>
      <ReactFlow
        nodes={laidOut?.nodes ?? []}
        edges={laidOut?.edges ?? []}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onInit={onInit}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
        minZoom={0.3}
        maxZoom={2}
        fitView
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}
