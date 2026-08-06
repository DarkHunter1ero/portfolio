"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ReactFlow,
  type Node,
  type Edge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type {
  ReactFlowDiagramData,
} from "@/types";

// ─── Custom Database node ────────────────────────────────────────

function DatabaseNode({ data }: { data: { label: string } }) {
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-zinc-600"
      />
      <div
        className="
          bg-[#1a1a1f] border border-[#2a2a35] rounded-b-[40%] rounded-t-[40%]
          px-6 py-3 min-w-[120px] text-center
          text-xs font-medium text-[#f0f0f5]
          shadow-sm
        "
        dangerouslySetInnerHTML={{ __html: data.label }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-600"
      />
    </div>
  );
}

const nodeTypes = {
  database: DatabaseNode,
};

const defaultEdgeOptions = {
  style: { stroke: "#2a2a35", strokeWidth: 2 },
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
      const dagre = await import("@dagrejs/dagre");

      if (cancelled) return;

      const direction = data.direction ?? "TB";
      const g = new dagre.graphlib.Graph();

      g.setGraph({
        rankdir: direction,
        nodesep: 60,
        ranksep: 80,
        marginx: 40,
        marginy: 40,
      });

      g.setDefaultEdgeLabel(() => ({}));

      const NODE_W = 180;
      const NODE_H = 56;

      for (const node of data.nodes) {
        g.setNode(node.id, { width: NODE_W, height: NODE_H });
      }

      for (const edge of data.edges) {
        g.setEdge(edge.source, edge.target);
      }

      dagre.layout(g);

      const nodes: Node[] = data.nodes.map((node) => {
        const pos = g.node(node.id)!;
        const x = pos.x - NODE_W / 2;
        const y = pos.y - NODE_H / 2;

        return {
          id: node.id,
          type: node.type === "database" ? "database" : "default",
          position: { x, y },
          data: { label: node.data.label },
          style: {
            width: NODE_W,
            ...node.style,
          },
          sourcePosition:
            direction === "TB" ? Position.Bottom : Position.Right,
          targetPosition:
            direction === "TB" ? Position.Top : Position.Left,
        };
      });

      const edges: Edge[] = data.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label ?? undefined,
        style: { stroke: "#2a2a35", strokeWidth: 2 },
        labelStyle: { fill: "#888", fontSize: 11 },
        labelBgStyle: { fill: "#1a1a1f" },
        markerEnd: {
          type: "arrowclosed",
          color: "#2a2a35",
          width: 16,
          height: 16,
        },
      }));

      if (!cancelled) {
        setLaidOut({ nodes, edges });
      }
    }

    computeLayout();

    return () => {
      cancelled = true;
    };
  }, [data]);

  const onInit = useCallback(
    (instance: { fitView: (opts?: { duration?: number }) => void }) => {
      setTimeout(() => instance.fitView({ duration: 300 }), 80);
    },
    []
  );

  return (
    <div
      role="img"
      aria-label="Architecture diagram"
      className="rounded-2xl border border-[#2a2a35] bg-[#0a0a0b] overflow-hidden"
      style={{ width: "100%", height: 500 }}
    >
      <style>{`
        .react-flow__node-default {
          background: #1e1e24 !important;
          border: 1px solid #2a2a35 !important;
          border-radius: 8px !important;
          color: #f0f0f5 !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          padding: 12px 16px !important;
          text-align: center !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
          width: auto !important;
          min-width: 140px !important;
          white-space: pre-line !important;
          line-height: 1.5 !important;
        }
        .react-flow__node-default .react-flow__handle {
          background: #52525b !important;
          width: 8px !important;
          height: 8px !important;
          border: none !important;
        }
        .react-flow__attribution {
          display: none !important;
        }
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
        fitView
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}
