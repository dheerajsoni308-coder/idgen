import React from "react";
import { TemplateProps, RenderPhoto } from "./Shared";

export const ClassicTemplate = ({ data, signatureToUse }: TemplateProps) => (
    <div className="flex-1 w-full h-full relative id-font bg-white flex flex-col pt-1">
        {/* Top Header Section */}
        <div className="w-full flex items-center bg-[#1e2a8a] text-white px-2 py-1.5 mt-1 border-t-2 border-b-2 border-[#1e2a8a]">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shrink-0 border-2 border-white overflow-hidden">
                {data.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={data.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[8px] text-blue-900 font-bold">LOGO</div>
                )}
            </div>
            <div className="flex-1 px-1">
                <h1 className="text-[10px] font-black leading-tight tracking-wide text-center uppercase">{data.schoolName || 'RADIANT SCHOOL & COLLEGE'}</h1>
            </div>
        </div>

        <div className="w-full text-center py-0.5 px-2">
            <p className="text-[7.5px] italic font-medium text-slate-800 line-clamp-2">{data.schoolAddress || 'A home of quality & morality'}</p>
        </div>

        <div className="w-full bg-[#f97316] text-white text-center py-1 mb-2 flex flex-col items-center justify-center">
            <h2 className="text-[9px] font-bold tracking-widest uppercase">STUDENT ID CARD</h2>
            {data.session && <span className="text-[6px] font-semibold tracking-wider">SESSION {data.session}</span>}
        </div>

        <div className="w-full flex justify-center mb-2 relative z-10">
            <div className="absolute top-[-8px] left-[-16px] w-20 h-20 border-[3px] border-[#f97316] rounded-full opacity-20 pointer-events-none"></div>
            <div className="w-12 h-12 bg-[#0ea5e9] rounded-xl border border-slate-300 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative z-10">
                {<RenderPhoto data={data} className="w-full h-full" placeholderClass="w-full h-full bg-[#0ea5e9] text-white" placeholderTextClass="text-[8px] font-medium" />}
            </div>
        </div>

        <div className="w-full px-3 flex-1 flex flex-col z-10 pb-12">
            <table className="w-full text-[8.5px] leading-[1.3] text-black font-bold">
                <tbody>
                    <tr><td className="w-16 align-top pb-[1px]">Name</td><td className="w-2 align-top pb-[1px] text-center">:</td><td className="align-top pb-[1px]">{data.name}</td></tr>
                    <tr><td className="w-16 align-top pb-[1px]">Class</td><td className="w-2 align-top pb-[1px] text-center">:</td><td className="align-top pb-[1px]">{data.role || '-'}</td></tr>
                    <tr><td className="w-16 align-top pb-[1px]">Father</td><td className="w-2 align-top pb-[1px] text-center">:</td><td className="align-top pb-[1px] truncate">{data.fatherName}</td></tr>
                    <tr><td className="w-16 align-top pb-[1px]">ID No.</td><td className="w-2 align-top pb-[1px] text-center">:</td><td className="align-top pb-[1px]">{data.idNumber}</td></tr>
                    <tr><td className="w-16 align-top pb-[1px] whitespace-nowrap">Date of Birth</td><td className="w-2 align-top pb-[1px] text-center">:</td><td className="align-top pb-[1px]">{data.dob}</td></tr>
                    <tr><td className="w-16 align-top pb-[1px] whitespace-nowrap">Blood Group</td><td className="w-2 align-top pb-[1px] text-center">:</td><td className="align-top pb-[1px] text-red-600 font-bold">{data.bloodGroup}</td></tr>
                    <tr><td className="w-16 align-top pb-[1px]">Phone</td><td className="w-2 align-top pb-[1px] text-center">:</td><td className="align-top pb-[1px]">{data.phone}</td></tr>
                    <tr><td className="w-16 align-top pb-[1px]">Address</td><td className="w-2 align-top pb-[1px] text-center">:</td><td className="align-top pb-[1px] leading-tight line-clamp-2">{data.address}</td></tr>
                </tbody>
            </table>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[60px] overflow-hidden pointer-events-none z-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[#f97316] fill-current">
                <path d="M 0 100 C 30 50 70 50 100 100 L 100 100 Z" />
            </svg>
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#4c1d95]"></div>
        </div>

        <div className="absolute bottom-1.5 right-2 w-20 flex flex-col items-center z-10">
            <div className="h-6 w-full flex items-end justify-center font-['Brush_Script_MT',cursive] text-sm text-black mb-0.5 border-b border-black relative">
                {signatureToUse ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={signatureToUse} className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-8 object-contain" alt="Signature" />
                ) : 'Signature'}
            </div>
            <span className="text-[7.5px] font-bold text-black uppercase">Principal</span>
        </div>
    </div>
);
