"use client";

import { useState } from "react";
import { StudentData, LayoutType, TemplateConfig } from "@/types";
import FileUpload from "@/components/FileUpload";
import DataPreview from "@/components/DataPreview";
import IdCardGrid from "@/components/IdCardGrid";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('classic');
  const [templateConfig, setTemplateConfig] = useState<TemplateConfig | null>(null);

  const handleDataLoaded = (data: StudentData[]) => {
    setStudents(data);
    setShowGrid(false); // Reset to preview state when new data arrives
  };

  const handleReset = () => {
    setStudents([]);
    setShowGrid(false);
  };

  const handleGenerate = () => {
    if (selectedLayout === 'custom' && !templateConfig) {
      alert("Please map your custom template fields before generating.");
      return;
    }
    setShowGrid(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 relative pb-24">
      {/* Decorative background blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-100/60 to-transparent blur-3xl pointer-events-none -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative">
        <header className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ring-1 ring-inset ring-blue-700/10">
            <Sparkles className="w-4 h-4" />
            <span>Premium Edition</span>
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Instant ID Card Generator
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Upload your student or employee data spreadsheet and automatically generate print-ready, high-quality ID cards in seconds.
          </p>
        </header>

        {students.length === 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <FileUpload onDataLoaded={handleDataLoaded} />

            <div className="mt-16 text-center text-sm text-slate-400">
              <p>Supported columns: Name, ID, Role, Department, Blood Group, DOB, Photo (URL)</p>
            </div>
          </div>
        ) : !showGrid ? (
          <DataPreview
            data={students}
            onReset={handleReset}
            onGenerate={handleGenerate}
            selectedLayout={selectedLayout}
            onLayoutSelect={setSelectedLayout}
            templateConfig={templateConfig}
            onTemplateConfigSelect={setTemplateConfig}
          />
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowGrid(false)}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                ← Back to Data Preview
              </button>
            </div>
            <IdCardGrid data={students} layout={selectedLayout} templateConfig={templateConfig} />
          </div>
        )}
      </div>
    </main>
  );
}
