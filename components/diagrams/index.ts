import type { projects } from "@/lib/data";
import CrmDiagram from "./CrmDiagram";
import LedgerDiagram from "./LedgerDiagram";
import ProviderDiagram from "./ProviderDiagram";
import PublishingDiagram from "./PublishingDiagram";
import RequestsDiagram from "./RequestsDiagram";
import WorkflowDiagram from "./WorkflowDiagram";

type Slug = (typeof projects)[number]["slug"];

export const diagrams: Record<Slug, () => JSX.Element> = {
  "financial-ledger-reconciliation": LedgerDiagram,
  "internal-workflow-automation": WorkflowDiagram,
  "educational-content-publishing": PublishingDiagram,
  "enterprise-request-management": RequestsDiagram,
  "multi-tenant-sales-crm": CrmDiagram,
  "ai-provider-fallback": ProviderDiagram,
};
