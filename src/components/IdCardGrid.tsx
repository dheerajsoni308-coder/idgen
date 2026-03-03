"use client";

import React, { useState } from "react";
import { StudentData, LayoutType, TemplateConfig } from "../types";
import IdCard from "./IdCard";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface IdCardGridProps {
    data: StudentData[];
    layout: LayoutType;
    templateConfig?: TemplateConfig | null;
}

export default function IdCardGrid({ data, layout, templateConfig }: IdCardGridProps) {
    const [isExporting, setIsExporting] = useState(false);

    const exportAllToPDF = async () => {
        setIsExporting(true);
        try {
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const isLandscapeExport = ['green-school', 'yellow-school', 'orange-school'].includes(layout);

            // Standard ID Card size: 54 × 85.6 mm (CR80 Portrait)
            const cardWidth = isLandscapeExport ? 85.6 : 54;
            const cardHeight = isLandscapeExport ? 54 : 85.6;
            const margin = 10;
            const spacingX = isLandscapeExport ? 10 : 14;
            const spacingY = 10;

            const cols = isLandscapeExport ? 2 : 3;
            const rows = isLandscapeExport ? 5 : 3; // 2x5 grid on A4 for landscape, 3x3 for portrait

            let currentX = margin;
            let currentY = margin;
            let cardCount = 0;

            for (let i = 0; i < data.length; i++) {
                const student = data[i];
                const cardElement = document.getElementById(`id-card-${student.id}`);

                if (cardElement) {
                    // Temporarily remove transform for clean capture
                    const originalTransform = cardElement.style.transform;
                    cardElement.style.transform = "none";
                    cardElement.style.margin = "0";

                    const canvas = await html2canvas(cardElement, {
                        scale: 3, // High DPI
                        useCORS: true,
                        logging: false,
                        backgroundColor: "#ffffff",
                    });

                    // Restore transform
                    cardElement.style.transform = originalTransform;
                    cardElement.style.margin = "";

                    const imgData = canvas.toDataURL("image/jpeg", 1.0);

                    if (cardCount > 0 && cardCount % (cols * rows) === 0) {
                        pdf.addPage();
                        currentX = margin;
                        currentY = margin;
                    }

                    pdf.addImage(imgData, "JPEG", currentX, currentY, cardWidth, cardHeight);

                    cardCount++;
                    if (cardCount % cols === 0) {
                        currentX = margin;
                        currentY += cardHeight + spacingY;
                    } else {
                        currentX += cardWidth + spacingX;
                    }
                }
            }

            pdf.save("ID_Cards_Batch.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to export ID cards to PDF. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

    if (data.length === 0) return null;

    const isLandscape = ['green-school', 'yellow-school', 'orange-school'].includes(layout);

    return (
        <div className="w-full mt-12 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Generated ID Cards</h2>
                    <p className="text-slate-500 mt-1">Review the cards below before exporting</p>
                </div>

                <button
                    onClick={exportAllToPDF}
                    disabled={isExporting}
                    className="flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed outline-none focus:ring-4 focus:ring-slate-200"
                >
                    {isExporting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Download className="w-5 h-5" />
                    )}
                    <span>{isExporting ? "Generating PDF..." : "Export All as PDF"}</span>
                </button>
            </div>

            <div className={`flex flex-wrap justify-center items-center gap-x-12 gap-y-20 ${isLandscape ? 'max-w-[75rem] mx-auto' : 'max-w-7xl mx-auto'}`}>
                {data.map((student) => (
                    <IdCard key={student.id} data={student} layout={layout} templateConfig={templateConfig} />
                ))}
            </div>
        </div>
    );
}
