import React from "react";
import { TemplateProps, RenderPhoto } from "./Shared";

export const CustomTemplate = ({ data, templateConfig }: TemplateProps) => {
    if (!templateConfig) {
        return (
            <div className="flex-1 w-full h-full relative inter-font bg-white flex flex-col overflow-hidden items-center justify-center p-4 text-center">
                <span className="text-slate-400 text-xs text-balance">Please map your custom template fields before generating.</span>
            </div>
        );
    }

    // --- NEW: HTML TEMPLATE APPROACH ---
    if (templateConfig.htmlTemplate) {
        let html = templateConfig.htmlTemplate;

        // Replace text placeholders
        html = html.replace(/\{\{name\}\}/gi, data.name || '');
        html = html.replace(/\{\{idNumber\}\}/gi, data.idNumber || '');
        html = html.replace(/\{\{dob\}\}/gi, data.dob || '');
        html = html.replace(/\{\{bloodGroup\}\}/gi, data.bloodGroup || '');
        html = html.replace(/\{\{phone\}\}/gi, data.phone || '');
        html = html.replace(/\{\{department\}\}/gi, data.department || data.role || '');
        html = html.replace(/\{\{fatherName\}\}/gi, data.fatherName || '');
        html = html.replace(/\{\{address\}\}/gi, data.address || '');

        // Replace photo securely (fallback to empty dot image or a placeholder path if empty)
        const fallbackPhotoUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Ccircle cx='12' cy='7' r='4' /%3E%3Cpath d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' /%3E%3C/svg%3E";
        html = html.replace(/\{\{photoUrl\}\}/gi, data.photoUrl || fallbackPhotoUrl);

        return (
            <div
                className="w-full h-full flex flex-col items-center justify-center bg-white overflow-hidden relative id-card-container"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    }

    // --- OLD: FALLBACK ABSOLUTE POSITIONING APPROACH ---
    const { imageUrl, fields } = templateConfig;

    // Helper to position absolutely based on percentages
    const getStyle = (field: import('../../types').TemplateFieldInfo | undefined): React.CSSProperties => {
        if (!field) return { display: 'none' };
        return {
            position: 'absolute',
            left: `${field.x}%`,
            top: `${field.y}%`,
            width: field.width ? `${field.width}%` : undefined,
            height: field.height ? `${field.height}%` : undefined,
            fontSize: field.fontSize ? `${field.fontSize}px` : undefined,
            color: field.color || 'inherit',
            transform: 'translate(-50%, -50%)', // Center based on the X/Y point
            whiteSpace: 'nowrap',
        };
    };

    return (
        <div className="flex-1 w-full h-full relative inter-font bg-white flex flex-col overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="ID Template" className="absolute inset-0 w-full h-full object-cover z-0" />

            {/* Foreground elements overlaid on top of the custom image */}
            <div className="absolute inset-0 z-10 w-full h-full">

                {/* Photo */}
                {fields?.photo && (
                    <div style={getStyle(fields.photo)} className="overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200/50">
                        {<RenderPhoto data={data} className="w-full h-full object-cover" placeholderClass="w-full h-full bg-slate-100 text-slate-400" placeholderTextClass="text-[6px]" />}
                    </div>
                )}

                {/* Texts */}
                {fields?.name && (
                    <div style={getStyle(fields.name)} className="font-bold">
                        {data.name}
                    </div>
                )}

                {fields?.idNumber && (
                    <div style={getStyle(fields.idNumber)} className="font-semibold">
                        {data.idNumber}
                    </div>
                )}

                {fields?.department && (data.department || data.role) && (
                    <div style={getStyle(fields.department)} className="font-semibold">
                        {data.department || data.role}
                    </div>
                )}

                {fields?.dob && (
                    <div style={getStyle(fields.dob)} className="font-semibold">
                        {data.dob}
                    </div>
                )}

                {fields?.bloodGroup && (
                    <div style={getStyle(fields.bloodGroup)} className="font-bold text-rose-600">
                        {data.bloodGroup}
                    </div>
                )}

                {fields?.phone && (
                    <div style={getStyle(fields.phone)} className="font-semibold">
                        {data.phone}
                    </div>
                )}
            </div>
        </div>
    );
};
