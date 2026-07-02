import { jsPDF } from "jspdf";
import { SITE_NAME } from "../constants/metadata";
import type { ConflictWarning, Product, Routine } from "../types";
import { CYCLE_PHASE_LABELS, CYCLE_SKIN_NOTES } from "../cycle/phases";
import type { CyclePhase } from "../types";

interface GuideData {
  products: Product[];
  routines: Routine[];
  conflicts: ConflictWarning[];
  cyclePhase: CyclePhase;
  cycleDay: number | null;
  bodyContextNotes?: string[];
}

export function downloadGuidePdf(data: GuideData): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 18;
  let y = margin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  const addPageIfNeeded = (height = 12) => {
    if (y + height > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const heading = (text: string, size = 16) => {
    addPageIfNeeded(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.text(text, margin, y);
    y += size * 0.55;
  };

  const body = (text: string, size = 10) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, contentWidth);
    for (const line of lines) {
      addPageIfNeeded(6);
      doc.text(line, margin, y);
      y += 5;
    }
    y += 2;
  };

  heading(`${SITE_NAME} — Personal Guide`, 20);
  body(`Generated ${new Date().toLocaleDateString()}`);
  y += 4;

  if (data.cyclePhase !== "none" || (data.bodyContextNotes?.length ?? 0) > 0) {
    heading("Body & cycle context");
    if (data.cyclePhase !== "none") {
      body(
        `Menstrual phase: ${CYCLE_PHASE_LABELS[data.cyclePhase]}${
          data.cycleDay ? ` (day ${data.cycleDay})` : ""
        }`,
      );
      body(CYCLE_SKIN_NOTES[data.cyclePhase]);
    }
    for (const note of data.bodyContextNotes ?? []) {
      body(note);
    }
    y += 4;
  }

  heading("Your Products");
  if (data.products.length === 0) {
    body("No products added yet.");
  } else {
    for (const product of data.products) {
      addPageIfNeeded(20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(product.name, margin, y);
      y += 5;
      body(
        `${product.brand ? `${product.brand} · ` : ""}${product.category.replace("_", " ")} · ${product.frequency} · ${product.timeOfDay}`,
        9,
      );
      if (product.ingredients.length > 0) {
        body(`Ingredients: ${product.ingredients.join(", ")}`, 9);
      }
      body(product.usageGuide, 9);
      y += 2;
    }
  }

  heading("Routines");
  for (const routine of data.routines) {
    addPageIfNeeded(16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(
      `${routine.frequency} · ${routine.timeOfDay}`,
      margin,
      y,
    );
    y += 6;
    for (const step of routine.steps) {
      body(`${step.order}. ${step.productName} — ${step.instructions}`, 9);
    }
    y += 2;
  }

  if (data.conflicts.length > 0) {
    heading("Ingredient Interactions");
    for (const warning of data.conflicts) {
      body(
        `${warning.productA.name} + ${warning.productB.name}: ${warning.conflict.reason} (${warning.conflict.severity}). ${warning.conflict.guidance}`,
        9,
      );
    }
  }

  doc.save(`skincare-for-you-guide-${new Date().toISOString().slice(0, 10)}.pdf`);
}
