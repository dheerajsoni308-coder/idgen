"use client";

import React, { useCallback, useState } from "react";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { StudentData } from "../types";

interface FileUploadProps {
    onDataLoaded: (data: StudentData[]) => void;
}

export default function FileUpload({ onDataLoaded }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const processFile = useCallback((file: File) => {
        setError(null);
        setSuccess(null);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                if (json.length < 2) {
                    setError("The uploaded file does not contain enough data. Please include headers.");
                    return;
                }

                const headers = (json[0] as string[]).map((h) => h?.toString().toLowerCase().trim());
                const mappedData: StudentData[] = [];

                const nameIdx = headers.findIndex((h) => h.includes("name") && !h.includes("father"));
                const fatherIdx = headers.findIndex((h) => h.includes("father"));
                const idIdx = headers.findIndex((h) => h === "id" || h.includes("id number") || h.includes("id no") || h.includes("roll"));
                const roleIdx = headers.findIndex((h) => h.includes("role") || h.includes("type"));
                const deptIdx = headers.findIndex((h) => h.includes("department") || h.includes("course"));
                const bgIdx = headers.findIndex((h) => h.includes("blood") || h === "bg");
                const dobIdx = headers.findIndex((h) => h.includes("dob") || h.includes("date of birth"));
                const phoneIdx = headers.findIndex((h) => (h.includes("phone") || h.includes("mobile") || h.includes("contact")) && !h.includes("school"));
                const addressIdx = headers.findIndex((h) => (h.includes("address") || h.includes("location")) && !h.includes("school") && !h.includes("institute"));
                const photoIdx = headers.findIndex((h) => (h.includes("photo") || h.includes("image")) && !h.includes("school"));
                const schoolNameIdx = headers.findIndex((h) => h === "school" || h.includes("school form") || h.includes("school name") || h.includes("institute"));
                const schoolAddressIdx = headers.findIndex((h) => h === "school address" || h.includes("institute address"));
                const schoolPhoneIdx = headers.findIndex((h) => h === "school phone" || h.includes("school contact"));
                const logoIdx = headers.findIndex((h) => h === "logo" || h.includes("school logo"));
                const signIdx = headers.findIndex((h) => h === "sign" || h === "signature" || h.includes("principal sign") || h.includes("authority sign"));
                const sessionIdx = headers.findIndex((h) => h === "session" || h.includes("academic session") || h.includes("year"));

                if (nameIdx === -1 || idIdx === -1) {
                    setError("Required columns 'Name' and 'ID' not found in the spreadsheet.");
                    return;
                }

                for (let i = 1; i < json.length; i++) {
                    const row = json[i] as unknown[];
                    if (!row || row.length === 0 || !(row as (string | undefined)[])[nameIdx as number]) continue; // Skip empty rows

                    mappedData.push({
                        id: crypto.randomUUID(),
                        name: String((row as (string | undefined)[])[nameIdx as number] || "Unknown"),
                        fatherName: fatherIdx !== -1 ? String((row as (string | undefined)[])[fatherIdx] || "Unknown") : "Unknown",
                        idNumber: String((row as (string | undefined)[])[idIdx as number] || "N/A"),
                        dob: dobIdx !== -1 ? (typeof (row as (string | number | undefined)[])[dobIdx] === "number" ? new Date(Math.round(((row as number[])[dobIdx] - 25569) * 86400 * 1000)).toLocaleDateString() : String((row as (string | undefined)[])[dobIdx])) : "N/A",
                        bloodGroup: bgIdx !== -1 ? String((row as (string | undefined)[])[bgIdx] || "N/A") : "N/A",
                        phone: phoneIdx !== -1 ? String((row as (string | undefined)[])[phoneIdx] || "N/A") : "N/A",
                        address: addressIdx !== -1 ? String((row as (string | undefined)[])[addressIdx] || "N/A") : "N/A",
                        role: roleIdx !== -1 ? String((row as (string | undefined)[])[roleIdx] || "Student") : "Student",
                        department: deptIdx !== -1 ? String((row as (string | undefined)[])[deptIdx] || "General") : "General",
                        photoUrl: (() => {
                            const raw = photoIdx !== -1 ? (row as (string | undefined)[])[photoIdx] : undefined;
                            if (!raw) return undefined;
                            const strRaw = String(raw).trim();
                            // If it's a local absolute path (Windows or Unix like)
                            if (/^[a-zA-Z]:[/\\]/.test(strRaw) || strRaw.startsWith('/')) {
                                return `/api/local-image?path=${encodeURIComponent(strRaw)}`;
                            }
                            return strRaw;
                        })(),
                        schoolName: schoolNameIdx !== -1 ? String((row as (string | undefined)[])[schoolNameIdx] || "") : undefined,
                        schoolAddress: schoolAddressIdx !== -1 ? String((row as (string | undefined)[])[schoolAddressIdx] || "") : undefined,
                        schoolPhone: schoolPhoneIdx !== -1 ? String((row as (string | undefined)[])[schoolPhoneIdx] || "") : undefined,
                        logoUrl: (() => {
                            const raw = logoIdx !== -1 ? (row as (string | undefined)[])[logoIdx] : undefined;
                            if (!raw) return undefined;
                            const strRaw = String(raw).trim();
                            if (/^[a-zA-Z]:[/\\]/.test(strRaw) || strRaw.startsWith('/')) {
                                return `/api/local-image?path=${encodeURIComponent(strRaw)}`;
                            }
                            return strRaw;
                        })(),
                        signatureUrl: (() => {
                            const raw = signIdx !== -1 ? (row as (string | undefined)[])[signIdx] : undefined;
                            if (!raw) return undefined;
                            const strRaw = String(raw).trim();
                            if (/^[a-zA-Z]:[/\\]/.test(strRaw) || strRaw.startsWith('/')) {
                                return `/api/local-image?path=${encodeURIComponent(strRaw)}`;
                            }
                            return strRaw;
                        })(),
                        session: sessionIdx !== -1 ? String((row as (string | undefined)[])[sessionIdx] || "") : undefined,
                    });
                }

                setSuccess(`Successfully loaded ${mappedData.length} records.`);
                onDataLoaded(mappedData);
            } catch (err) {
                console.error(err);
                setError("Failed to parse the Excel file. Ensure it is a valid format.");
            }
        };
        reader.onerror = () => {
            setError("Failed to read the file.");
        };
        reader.readAsArrayBuffer(file);
    }, [onDataLoaded]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            processFile(file);
        }
    }, [processFile]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    }, [processFile]);

    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <div
                className={`relative group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400"
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <UploadCloud
                    className={`w-16 h-16 mb-4 transition-colors duration-300 ${isDragging ? "text-blue-500" : "text-slate-400 group-hover:text-slate-500"}`}
                />
                <p className="mb-2 text-lg font-semibold text-slate-700">
                    <span className="font-bold text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-slate-500">Excel files (.xlsx, .xls, .csv)</p>

                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleChange}
                    accept=".xlsx, .xls, .csv"
                />
            </div>

            {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-700 flex items-center space-x-3 border border-red-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {success && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 text-emerald-700 flex items-center space-x-3 border border-emerald-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{success}</p>
                </div>
            )}
        </div>
    );
}
