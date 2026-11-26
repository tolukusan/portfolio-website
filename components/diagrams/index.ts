import type { projects } from "@/lib/data";
import LedgerDiagram from "./LedgerDiagram";
import PublishingDiagram from "./PublishingDiagram";
import RequestsDiagram from "./RequestsDiagram";
import WorkflowDiagram from "./WorkflowDiagram";

type Slug = (typeof projects)[number]["slug"];

export const diagrams: Record<Slug, () => JSX.Element> = {
  "financial-ledger-reconciliation": LedgerDiagram,
  "internal-workflow-automation": WorkflowDiagram,
  "educational-content-publishing": PublishingDiagram,
  "enterprise-request-management": RequestsDiagram,
};
