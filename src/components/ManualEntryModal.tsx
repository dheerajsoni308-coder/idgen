"use client";

import React, { useState } from "react";
import { StudentData } from "../types";
import { X } from "lucide-react";

interface ManualEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: StudentData[]) => void;
}

export default function ManualEntryModal({ isOpen, onClose, onSubmit }: ManualEntryModalProps) {
    const [formData, setFormData] = useState<Partial<StudentData>>({
        name: "",
        fatherName: "",
        idNumber: "",
        dob: "",
        bloodGroup: "",
        phone: "",
        address: "",
        role: "",
        department: "",
        photoUrl: "",
        schoolName: "",
        schoolAddress: "",
        schoolPhone: "",
        logoUrl: "",
        session: "",
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.idNumber) {
            alert("Name and ID Number are required fields.");
            return;
        }

        const newStudent: StudentData = {
            id: crypto.randomUUID(),
            name: formData.name || "Unknown",
            fatherName: formData.fatherName || "Unknown",
            idNumber: formData.idNumber || "N/A",
            dob: formData.dob || "N/A",
            bloodGroup: formData.bloodGroup || "N/A",
            phone: formData.phone || "N/A",
            address: formData.address || "N/A",
            role: formData.role || "Student",
            department: formData.department || "General",
            photoUrl: formData.photoUrl || undefined,
            schoolName: formData.schoolName || undefined,
            schoolAddress: formData.schoolAddress || undefined,
            schoolPhone: formData.schoolPhone || undefined,
            logoUrl: formData.logoUrl || undefined,
            signatureUrl: undefined, // Handled globally usually
            session: formData.session || undefined,
        };

        onSubmit([newStudent]);
        onClose();

        // Optional: Reset form on submit
        // setFormData({...});
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Manually Create ID Card</h2>
                        <p className="text-sm text-slate-500 mt-0.5">Fill in the details below to instantly generate a custom ID card.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    <form id="manual-entry-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Student Details */}
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-1">Primary Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">Full Name *</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. John Doe" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">ID Number *</label>
                                    <input required name="idNumber" value={formData.idNumber} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. EMP-001" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">Role / Class</label>
                                    <input name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Student, Manager" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">Department</label>
                                    <input name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Science, Engineering" />
                                </div>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-1">Personal Info</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">Father&apos;s Name</label>
                                    <input name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">Date of Birth</label>
                                    <input name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 15-Aug-2005" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">Blood Group</label>
                                    <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. O+" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">Phone</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs font-medium text-slate-700">Address</label>
                                    <input name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>
                        </div>

                        {/* Organization & Media */}
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-1">Organization & Media URLs</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">School/Org Name</label>
                                    <input name="schoolName" value={formData.schoolName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-700">Session/Year</label>
                                    <input name="session" value={formData.session} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 2024-2025" />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs font-medium text-slate-700">School Address</label>
                                    <input name="schoolAddress" value={formData.schoolAddress} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs font-medium text-slate-700">Photo URL (Web Link or Local Path)</label>
                                    <input name="photoUrl" value={formData.photoUrl} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://... or C:\Images\photo.jpg" />
                                    <p className="text-[10px] text-slate-500">Note: Local paths will automatically be resolved to /api/local-image by the Image handler if supported, or leave empty for a placeholder.</p>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 mt-auto">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="manual-entry-form"
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Generate ID Card
                    </button>
                </div>

            </div>
        </div>
    );
}
