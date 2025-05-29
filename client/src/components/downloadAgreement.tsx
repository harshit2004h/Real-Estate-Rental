import jsPDF, { GState } from "jspdf";
import logoBase64 from "@/lib/logoBase64";
import { Application } from "@/types/prismaTypes";

export function downloadAgreement(application: Application) {
  // Create new PDF document
  const doc = new jsPDF("p", "mm", "a4");

  // Define standard font sizes for consistency
  const TITLE_FONT_SIZE = 16;
  const HEADER_FONT_SIZE = 12;
  const CONTENT_FONT_SIZE = 11;
  const LABEL_FONT_SIZE = 10;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;

  // Single line page border with accent color
  doc.setDrawColor("#3b82f6");
  doc.setLineWidth(0.7);
  doc.rect(margin, margin, contentWidth, pageHeight - margin * 2, "S");

  // Add watermark logo with low opacity
  try {
    doc.saveGraphicsState();
    const gState = new GState({ opacity: 0.1 });
    doc.setGState(gState);
    const logoSize = 150;
    doc.addImage(
      logoBase64,
      "PNG",
      pageWidth / 2 - logoSize / 2,
      pageHeight / 2 - logoSize / 2,
      logoSize,
      logoSize
    );
    doc.restoreGraphicsState();
  } catch (error) {
    console.error("Error adding watermark:", error);
    // Continue with PDF generation even if watermark fails
  }

  let y = margin + 10; // Starting position

  // Define comprehensive spacing and padding values for consistent layout
  const PADDING = {
    tiny: 3, // Minimal spacing for tight elements
    small: 5, // Standard line spacing
    medium: 8, // Medium spacing between related elements
    large: 12, // Larger spacing between sections
    xlarge: 16, // Extra large spacing for major sections
  };

  // Content insets
  const TEXT_INSET = 7; // Horizontal inset for text inside boxes
  const CONTENT_INSET = 5; // Standard content inset

  // Main Title
  y = margin + 20;
  doc.setFontSize(TITLE_FONT_SIZE);
  doc.setTextColor("#000000");
  doc.setFont("helvetica", "bold");
  doc.text("RENTAL AGREEMENT", pageWidth / 2, y, { align: "center" });

  // Agreement intro text
  y += PADDING.large;
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setFont("helvetica", "normal");
  const introText1 =
    'This Rental Agreement (hereinafter referred to as the "Agreement") is made by SwitStay';
  const introText2 = `Start Date: ${new Date(
    application.lease?.startDate
  ).getDate()} day of ${new Date(application.lease?.startDate).toLocaleString(
    "en-GB",
    { month: "long" }
  )}, ${new Date(
    application.lease?.startDate
  ).getFullYear()}    End Date: ${new Date(
    application.lease?.endDate
  ).getDate()} day of ${new Date(application.lease?.endDate).toLocaleString(
    "en-GB",
    { month: "long" }
  )}, ${new Date(application.lease?.endDate).getFullYear()}`;
  const introText3 = "Between the following parties:";

  // Center align the intro text
  doc.text(introText1, pageWidth / 2, y, { align: "center" });
  doc.text(introText2, pageWidth / 2, y + PADDING.small + 2, {
    align: "center",
  });
  doc.text(introText3, pageWidth / 2, y + (PADDING.small + 2) * 2, {
    align: "center",
  });

  // Adjust the y position to account for the intro text - reduced spacing
  y += PADDING.small * 4;

  // Landlord and Tenant headers with blue color - reduced spacing
  y += 5; // Reduced from 10 to 5 to make the content closer together
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#3b82f6");
  doc.text("LANDLORD", margin + 5, y);
  doc.text("TENANT", pageWidth / 2 + 5, y);

  // Calculate column widths for the layout
  const colWidth = (contentWidth - 5) / 2;

  // Full Name fields
  y += 6;
  const fieldHeight = 10;

  // Full Name boxes - darker borders
  doc.setDrawColor("#adb5bd");
  doc.setLineWidth(0.5);
  doc.rect(margin + 5, y, colWidth - 5, fieldHeight);
  doc.rect(pageWidth / 2 + 5, y, colWidth - 5, fieldHeight);

  // Full Name labels
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setTextColor("#666666");
  doc.setFont("helvetica", "normal");
  doc.text("Full Name", margin + 7, y + 3);
  doc.text("Full Name", pageWidth / 2 + 7, y + 3);

  // Fill in names if available
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setTextColor("#000000");
  doc.text(`${application.manager.name}`, margin + 7, y + 7);
  doc.text(`${application.tenant.name}`, pageWidth / 2 + 7, y + 7);

  // Add reference text after the names
  y += fieldHeight + PADDING.small;
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setTextColor("#666666");
  doc.text(
    'Hereinafter referred to as "Landlord" and "Tenant", respectively.',
    margin + CONTENT_INSET,
    y
  );

  // Property Description section
  y += PADDING.medium;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#000000");
  doc.text("• Property Description:", margin + CONTENT_INSET, y);

  y += PADDING.small;
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setFont("helvetica", "normal");
  const propertyIntroText =
    'The Landlord agrees to rent the following property (hereinafter referred to as the "Property") to the Tenant:';
  const splitPropertyIntroText = doc.splitTextToSize(
    propertyIntroText,
    contentWidth - CONTENT_INSET * 2
  );
  doc.text(splitPropertyIntroText, margin + CONTENT_INSET, y);

  // Property address box - increased spacing after "Tenant:"
  y += splitPropertyIntroText.length * 4 + PADDING.small;
  doc.setDrawColor("#adb5bd");
  doc.rect(
    margin + CONTENT_INSET,
    y,
    contentWidth - CONTENT_INSET * 2,
    fieldHeight
  );

  // Property address label
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setTextColor("#666666");
  doc.text("Property Address", margin + TEXT_INSET, y + 3);

  // Fill in property address - guard against null/undefined values
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setTextColor("#000000");
  const fullAddress = `${application.property.name}, ${
    application.property.location.city || ""
  }, ${application.property.location.state || ""}, ${
    application.property.location.country || ""
  } ${application.property.location.postalCode || ""}`
    .replace(/,\s*,/g, ",")
    .replace(/,\s*$/g, "")
    .trim();
  const splitAddr = doc.splitTextToSize(
    fullAddress,
    contentWidth - TEXT_INSET * 2
  );
  doc.text(splitAddr, margin + TEXT_INSET, y + 7);

  // Term of Tenancy section
  y += fieldHeight + 8;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#000000");
  doc.text("• Term of Tenancy:", margin + 5, y);

  y += 5;
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setFont("helvetica", "normal");
  const termText = `The term of this tenancy shall begin on the ${new Date(
    application.lease?.startDate
  ).getDate()} day of ${new Date(application.lease?.startDate).toLocaleString(
    "en-GB",
    { month: "long" }
  )}, ${new Date(
    application.lease?.startDate
  ).getFullYear()} and shall continue on a year-to-year basis.`;
  const splitTermText = doc.splitTextToSize(termText, contentWidth - 10);
  doc.text(splitTermText, margin + 5, y);

  // Rent Payment section
  y += splitTermText.length * 4 + 6;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("• Rent Payment:", margin + 5, y);

  y += 5;
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setFont("helvetica", "normal");
  const rentText = `The Tenant shall pay a monthly rent of ${
    application.property.pricePerMonth
  }, due on the ${new Date(application.lease?.startDate).toLocaleString(
    "en-GB",
    { month: "long" }
  )} day of each month.`;
  const splitRentText = doc.splitTextToSize(rentText, contentWidth - 10);
  doc.text(splitRentText, margin + 5, y);

  // Security Deposit section
  y += splitRentText.length * 4 + 6;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("• Security Deposit:", margin + 5, y);

  y += 5;
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setFont("helvetica", "normal");
  const securityText = `Upon signing this Agreement, the Tenant shall provide a security deposit in the amount of $ ${application.property.securityDeposit}. This security deposit will be held by the Landlord to cover any damages to the Property beyond normal wear and tear, unpaid rent, or any other charges outlined in this Agreement.`;
  const splitSecurityText = doc.splitTextToSize(
    securityText,
    contentWidth - 10
  );
  doc.text(splitSecurityText, margin + 5, y);

  // Witness clause
  y += splitSecurityText.length * 3.5 + 8;
  doc.setFontSize(CONTENT_FONT_SIZE);
  const witnessText =
    "IN WITNESS WHEREOF, the Landlord and Tenant have executed this Rental Agreement as of the date first above written.";
  const splitWitnessText = doc.splitTextToSize(witnessText, contentWidth - 10);
  doc.text(splitWitnessText, margin + 5, y);

  // Signature section
  y += splitWitnessText.length * 4 + 8;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#3b82f6");
  doc.text("LANDLORD", margin + 5, y);
  doc.text("TENANT", pageWidth / 2 + 5, y);

  // Signature fields
  y += 5;
  const signRowHeight = 10;

  // Signature boxes - darker borders
  doc.setDrawColor("#adb5bd");
  doc.rect(margin + 5, y, colWidth - 5, signRowHeight);
  doc.rect(pageWidth / 2 + 5, y, colWidth - 5, signRowHeight);

  // Signature labels
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setTextColor("#666666");
  doc.setFont("helvetica", "normal");
  doc.text("Signature", margin + 7, y + 3);
  doc.text("Signature", pageWidth / 2 + 7, y + 3);

  // Printed Name fields
  y += signRowHeight + 3;
  doc.rect(margin + 5, y, colWidth - 5, signRowHeight);
  doc.rect(pageWidth / 2 + 5, y, colWidth - 5, signRowHeight);
  doc.text(`${application.manager.name}`, margin + 7, y + 3);
  doc.text(`${application.tenant.name}`, pageWidth / 2 + 7, y + 3);

  // Date fields
  y += signRowHeight + 3;
  doc.rect(margin + 5, y, colWidth - 5, signRowHeight);
  doc.rect(pageWidth / 2 + 5, y, colWidth - 5, signRowHeight);
  doc.text(`${new Date().toLocaleDateString("en-GB")}`, margin + 7, y + 3);
  doc.text(
    `${new Date().toLocaleDateString("en-GB")}`,
    pageWidth / 2 + 7,
    y + 3
  );

  doc.save(
    `${application.tenant.name}_Rental_Agreement_${application.property.name}.pdf`
  );
}
