import jsPDF, { GState } from "jspdf";
import logoBase64 from "@/lib/logoBase64";
import razorpayLogoBase64 from "@/lib/razorpayLogoBase64";
import { Payment } from "@/types/prismaTypes";

export interface PaymentReceiptData {
  payment: Payment;
  propertyName: string;
  propertyAddress: string;
  tenantName: string;
  tenantPhone: string;
  amount: number;
  transactionId: string;
  paymentType: string;
  date: string;
  time: string;
}

export function downloadReceipt(receiptData: PaymentReceiptData) {
  // Create new PDF document
  const doc = new jsPDF("p", "mm", "a4");

  // Define standard font sizes for consistency
  const TITLE_FONT_SIZE = 22;
  const HEADER_FONT_SIZE = 16;
  const CONTENT_FONT_SIZE = 12;
  const LABEL_FONT_SIZE = 11;
  const SMALL_FONT_SIZE = 10;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Receipt border with professional styling
  doc.setDrawColor("#2563eb");
  doc.setLineWidth(1);
  doc.rect(margin, margin, contentWidth, pageHeight - margin * 2, "S");

  // Add watermark logo with low opacity
  try {
    doc.saveGraphicsState();
    const gState = new GState({ opacity: 0.08 });
    doc.setGState(gState);
    const logoSize = 120;
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
  }

  let y = margin + 20;

  // Header Section with SwiftStay Branding
  doc.setFontSize(TITLE_FONT_SIZE);
  doc.setTextColor("#1f2937");
  doc.setFont("helvetica", "bold");
  doc.text("SWIFTSTAY", pageWidth / 2, y, { align: "center" });

  y += 8;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "normal");
  doc.text("PAYMENT RECEIPT", pageWidth / 2, y, { align: "center" });

  // Receipt number
  y += 15;
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setTextColor("#374151");
  doc.text(`Receipt No: #${receiptData.payment.id}`, margin + 10, y);
  doc.text(`Date: ${receiptData.date}`, pageWidth - margin - 50, y);

  y += 6;
  doc.text(`Time: ${receiptData.time}`, pageWidth - margin - 50, y);

  // Horizontal line separator
  y += 10;
  doc.setDrawColor("#e5e7eb");
  doc.setLineWidth(0.5);
  doc.line(margin + 10, y, pageWidth - margin - 10, y);

  // Payment Information Section
  y += 15;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#1f2937");
  doc.text("PAYMENT DETAILS", margin + 10, y);

  // Payment details grid
  y += 12;
  const leftCol = margin + 10;
  const rightCol = pageWidth / 2 + 10;
  const fieldHeight = 8;

  // Transaction ID
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Transaction ID:", leftCol, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#1f2937");
  doc.text(receiptData.transactionId || "N/A", leftCol + 35, y);

  // Payment Type
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Payment Type:", rightCol, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#1f2937");
  doc.text(receiptData.paymentType || "N/A", rightCol + 30, y);

  y += fieldHeight;

  // Payment Method
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Payment Method:", leftCol, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#1f2937");
  doc.text("Razorpay", leftCol + 35, y);

  // Amount
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Amount Paid:", rightCol, y);
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#059669");
  doc.text(
    `${receiptData.amount?.toLocaleString("en-IN") || "0"} Rs`,
    rightCol + 30,
    y
  );

  // Horizontal line separator
  y += 15;
  doc.setDrawColor("#e5e7eb");
  doc.line(margin + 10, y, pageWidth - margin - 10, y);

  // Property Information Section
  y += 15;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#1f2937");
  doc.text("PROPERTY DETAILS", margin + 10, y);

  y += 12;

  // Property Name
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Property Name:", leftCol, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#1f2937");
  doc.text(receiptData.propertyName || "N/A", leftCol + 35, y);

  y += fieldHeight;

  // Property Address
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Address:", leftCol, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#1f2937");
  const addressLines = doc.splitTextToSize(
    receiptData.propertyAddress || "Address not available",
    contentWidth - 50
  );
  doc.text(addressLines, leftCol + 35, y);

  // Adjust y position based on address lines
  y += Math.max(fieldHeight, addressLines.length * 4);

  // Horizontal line separator
  y += 10;
  doc.setDrawColor("#e5e7eb");
  doc.line(margin + 10, y, pageWidth - margin - 10, y);

  // Tenant Information Section
  y += 15;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#1f2937");
  doc.text("TENANT DETAILS", margin + 10, y);

  y += 12;

  // Tenant ID
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Tenant ID:", leftCol, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#1f2937");
  doc.text((receiptData.payment.tenantId || 0).toString(), leftCol + 25, y);

  y += fieldHeight;

  // Tenant Name
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Name:", leftCol, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#1f2937");
  doc.text(receiptData.tenantName || "N/A", leftCol + 25, y);

  y += fieldHeight;

  // Phone Number
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Phone:", leftCol, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#1f2937");
  doc.text(receiptData.tenantPhone || "N/A", leftCol + 25, y);

  y += fieldHeight;

  // Payment Status
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#6b7280");
  doc.text("Status:", leftCol, y);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#059669");
  doc.text("PAID", leftCol + 25, y);

  // Amount summary box
  y += 20;
  const boxHeight = 25;
  const boxY = y;

  // Draw amount summary box
  doc.setFillColor("#f8fafc");
  doc.setDrawColor("#e2e8f0");
  doc.rect(margin + 10, boxY, contentWidth - 20, boxHeight, "FD");

  // Amount summary content
  y += 8;
  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#1f2937");
  doc.text("TOTAL AMOUNT PAID", pageWidth / 2, y + 5, { align: "center" });

  doc.setFontSize(18);
  doc.setTextColor("#059669");
  doc.text(
    `${receiptData.amount?.toLocaleString("en-IN") || "0"} Rs`,
    pageWidth / 2,
    y + 12,
    { align: "center" }
  );

  // Footer section
  y += 40;
  doc.setDrawColor("#e5e7eb");
  doc.line(margin + 10, y, pageWidth - margin - 10, y);

  y += 10;
  doc.setFontSize(SMALL_FONT_SIZE);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#6b7280");

  const footerText1 =
    "This is a computer-generated receipt and does not require a signature.";
  const footerText2 = "For any queries, please contact SwiftStay support.";
  const footerText3 = `Generated on: ${new Date().toLocaleString()}`;

  doc.text(footerText1, pageWidth / 2, y, { align: "center" });
  doc.text(footerText2, pageWidth / 2, y + 5, { align: "center" });
  doc.text(footerText3, pageWidth / 2, y + 10, { align: "center" });

  // Thank you message
  y += 20;
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#2563eb");
  doc.text("Thank you for choosing SwiftStay!", pageWidth / 2, y, {
    align: "center",
  });

  // Security features text
  y += 15;
  doc.setFontSize(SMALL_FONT_SIZE);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#9ca3af");
  doc.text(
    "Secured by Razorpay | Transaction ID can be verified on payment gateway",
    pageWidth / 2,
    y,
    { align: "center" }
  );

  // Save the PDF
  const fileName = `SwiftStay_Receipt_${
    receiptData.transactionId
  }_${receiptData.date.replace(/\//g, "-")}.pdf`;
  doc.save(fileName);
}
