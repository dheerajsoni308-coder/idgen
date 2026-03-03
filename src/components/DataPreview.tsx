"use client";

import React, { useRef, useState } from "react";
import { StudentData, LayoutType, TemplateConfig } from "../types";
import { RefreshCw, CheckCircle, LayoutTemplate, ImagePlus, X } from "lucide-react";

interface DataPreviewProps {
    data: StudentData[];
    onReset: () => void;
    onGenerate: () => void;
    selectedLayout: LayoutType;
    onLayoutSelect: (layout: LayoutType) => void;
    templateConfig: TemplateConfig | null;
    onTemplateConfigSelect: (config: TemplateConfig | null) => void;
}

export default function DataPreview({ data, onReset, onGenerate, selectedLayout, onLayoutSelect, templateConfig, onTemplateConfigSelect }: DataPreviewProps) {
    const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);

    if (data.length === 0) return null;

    const layouts: { id: LayoutType; name: string; desc: string }[] = [
        { id: 'classic', name: 'Classic', desc: 'Standard vibrant ID design' },
        { id: 'modern', name: 'Modern', desc: 'Sleek dark theme with gradients' },
        { id: 'minimalist', name: 'Minimalist', desc: 'Clean, typography-focused design' },
        { id: 'green-school', name: 'Jalpai School', desc: 'Green landscape design' },
        { id: 'yellow-school', name: 'Sudiksha School', desc: 'Yellow/green landscape' },
        { id: 'orange-school', name: 'Vidya Mandir', desc: 'Orange landscape design' },
        { id: 'blue-vertical', name: 'GHSS Padre', vertical: true, desc: 'Blue vertical card' },
        { id: 'custom', name: 'Custom Image', desc: 'Upload your own template' }
    ] as any;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);

            setIsAnalyzingAI(true);

            try {
                // Compress image to base64 with max width 800px to avoid 413 Payload Too Large
                const base64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const MAX_WIDTH = 800;
                            const scaleSize = MAX_WIDTH / img.width;
                            canvas.width = MAX_WIDTH;
                            canvas.height = img.height > MAX_WIDTH ? img.height * scaleSize : img.height;
                            const ctx = canvas.getContext('2d');
                            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                            resolve(canvas.toDataURL('image/jpeg', 0.8));
                        };
                        img.onerror = reject;
                        img.src = event.target?.result as string;
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                const response = await fetch('/api/generate-layout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageBase64: base64 })
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Failed to analyze image with AI');
                }

                const aiLayoutConfig = await response.json();

                // Keep the image URL local so we don't have to upload the actual image to the server permanently
                onTemplateConfigSelect({
                    imageUrl: url,
                    htmlTemplate: aiLayoutConfig.html,
                    fields: aiLayoutConfig.fields || {}
                });

            } catch (error: any) {
                console.error("AI Error:", error);
                alert(`AI Generation Failed: ${error.message || 'Unknown error'}\n\nReverting to default layout positions.`);
                // Fallback to defaults
                onTemplateConfigSelect({
                    imageUrl: url,
                    fields: {
                        photo: { x: 50, y: 20, width: 25, height: 30 },
                        name: { x: 50, y: 55, fontSize: 16, color: '#000000' },
                        idNumber: { x: 50, y: 65, fontSize: 10, color: '#333333' }
                    }
                });
            } finally {
                setIsAnalyzingAI(false);
            }
        }
    };

    return (
        <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Preview & Configuration
                    </h2>
                    <p className="text-slate-500 mt-1">
                        {data.length} {data.length === 1 ? "record" : "records"} ready for generation.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={onReset}
                        className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors focus:ring-2 focus:ring-slate-200 outline-none font-medium text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Upload New</span>
                    </button>

                    <button
                        onClick={onGenerate}
                        className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all hover:shadow-lg hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none font-medium text-sm shadow-sm"
                    >
                        <CheckCircle className="w-4 h-4 break-words" />
                        <span className="whitespace-nowrap">Generate ID Cards</span>
                    </button>
                </div>
            </div>

            {/* Layout Selector */}
            <div className="mb-8 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-4 text-slate-800">
                    <LayoutTemplate className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">Select ID Card Layout</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {layouts.map((l) => (
                        <div key={l.id} className="flex flex-col gap-2">
                            <button
                                onClick={() => onLayoutSelect(l.id)}
                                className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all duration-200 outline-none w-full h-full ${selectedLayout === l.id
                                    ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-4 ring-blue-600/10'
                                    : 'border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                                    }`}
                            >
                                <span className={`font-semibold text-base mb-1 ${selectedLayout === l.id ? 'text-blue-900' : 'text-slate-700'}`}>
                                    {l.name}
                                </span>
                                <span className={`text-xs ${selectedLayout === l.id ? 'text-blue-700/80' : 'text-slate-500'}`}>
                                    {l.desc}
                                </span>
                            </button>

                            {/* Custom Layout Image Upload (Only for Custom) */}
                            {l.id === 'custom' && selectedLayout === 'custom' && (
                                <div className="mt-2 animate-in fade-in slide-in-from-top-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleBackgroundUpload}
                                        disabled={isAnalyzingAI}
                                    />
                                    {isAnalyzingAI ? (
                                        <div className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-medium">
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            <span>AI is analyzing layout...</span>
                                        </div>
                                    ) : templateConfig ? (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs">
                                                <span className="text-emerald-700 font-medium truncate max-w-[150px]">Template loaded</span>
                                                <button
                                                    onClick={() => {
                                                        onTemplateConfigSelect(null);
                                                    }}
                                                    className="text-emerald-600 hover:text-emerald-800 p-1 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors"
                                                    title="Remove template"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg text-xs font-medium transition-all"
                                        >
                                            <ImagePlus className="w-3.5 h-3.5" />
                                            <span>Upload Template Image</span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Father</th>
                                <th className="px-6 py-4 font-semibold">ID Number</th>
                                <th className="px-6 py-4 font-semibold">Blood Group</th>
                                <th className="px-6 py-4 font-semibold">DOB</th>
                                <th className="px-6 py-4 font-semibold">Phone</th>
                                <th className="px-6 py-4 font-semibold">Address</th>
                                <th className="px-6 py-4 font-semibold">Photo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.slice(0, 10).map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{student.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{student.fatherName}</td>
                                    <td className="px-6 py-4 text-slate-600">{student.idNumber}</td>
                                    <td className="px-6 py-4 text-slate-600">{student.bloodGroup}</td>
                                    <td className="px-6 py-4 text-slate-600">{student.dob}</td>
                                    <td className="px-6 py-4 text-slate-600">{student.phone}</td>
                                    <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{student.address}</td>
                                    <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{student.photoUrl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {data.length > 10 && (
                    <div className="bg-slate-50 border-t border-slate-200 p-4 text-center text-sm text-slate-500">
                        Showing first 10 rows. {data.length - 10} more records will be generated.
                    </div>
                )}
            </div>
        </div>
    );
}
