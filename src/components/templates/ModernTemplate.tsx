import React from "react";
import { TemplateProps, RenderPhoto } from "./Shared";

export const ModernTemplate = ({ data, signatureToUse }: TemplateProps) => (
    <div className="flex-1 w-full h-full relative outfit-font bg-[#0f172a] text-white flex flex-col overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-blue-600/30 blur-2xl"></div>
        <div className="absolute bottom-[-50px] left-[-30px] w-[120px] h-[120px] rounded-full bg-emerald-500/20 blur-xl"></div>

        {/* Header */}
        <div className="w-full flex items-center justify-between px-4 py-4 z-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0 shadow-lg overflow-hidden">
                {data.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={data.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                    <div className="text-[8px] text-white font-bold">LOGO</div>
                )}
            </div>
            <div className="flex-1 flex flex-col items-end text-right pl-2">
                <h1 className="text-[12px] font-bold tracking-widest uppercase text-blue-400 line-clamp-1">{data.schoolName || 'STUDENT ID'}</h1>
                {data.schoolAddress && <p className="text-[5.5px] text-slate-400 mt-0.5 line-clamp-2">{data.schoolAddress}</p>}
                {data.session && <span className="text-[6px] font-bold text-emerald-400 mt-0.5 border border-emerald-500/30 px-1 rounded-sm">SESSION {data.session}</span>}
            </div>
        </div>

        {/* Photo & Name */}
        <div className="w-full flex flex-col items-center z-10 mt-1 relative">
            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-emerald-400 shadow-xl mb-2 relative">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
                    {<RenderPhoto data={data} className="w-full h-full object-cover" placeholderClass="w-full h-full bg-slate-800 text-slate-400" placeholderTextClass="text-[6px] font-medium" />}
                </div>
                {signatureToUse && (
                    <div className="absolute -bottom-2 -right-4 z-20 w-12 h-6 bg-white/10 rounded backdrop-blur-[2px]">
                        <img src={signatureToUse} className="w-full h-full object-contain drop-shadow-lg" alt="Signature" />
                    </div>
                )}
            </div>
            <h2 className="text-[14px] font-bold tracking-wide text-center uppercase leading-tight px-2">{data.name}</h2>
            <div className="mt-1 px-3 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[8px] font-semibold tracking-wider">
                {data.idNumber}
            </div>
        </div>

        {/* Details */}
        <div className="w-full px-5 mt-4 z-10 flex-1">
            <div className="space-y-1.5">
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-0.5">
                    <span className="text-[7px] text-slate-400 uppercase tracking-wider">Dept/Class</span>
                    <span className="text-[8px] font-semibold text-slate-200 truncate pl-2">{data.department || data.role || 'General'}</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-0.5">
                    <span className="text-[7px] text-slate-400 uppercase tracking-wider">Father</span>
                    <span className="text-[8px] font-semibold text-slate-200 truncate pl-2">{data.fatherName || '-'}</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-0.5">
                    <span className="text-[7px] text-slate-400 uppercase tracking-wider">DOB</span>
                    <span className="text-[8px] font-semibold text-slate-200">{data.dob || '-'}</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-0.5">
                    <span className="text-[7px] text-slate-400 uppercase tracking-wider">Blood Grp</span>
                    <span className="text-[8px] font-semibold text-rose-400">{data.bloodGroup || '-'}</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-0.5">
                    <span className="text-[7px] text-slate-400 uppercase tracking-wider shrink-0 mr-2">Address</span>
                    <span className="text-[7px] font-semibold text-slate-300 truncate">{data.address || '-'}</span>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="w-full bg-slate-900/80 backdrop-blur-md py-2 px-4 flex justify-between items-center z-10 border-t border-slate-800">
            <div className="flex flex-col">
                <span className="text-[6px] text-slate-500">Contact</span>
                <span className="text-[8px] font-medium text-slate-300">{data.phone}</span>
            </div>
            {/* QR Code pseudo-placeholder */}
            <div className="w-6 h-6 bg-white rounded-sm p-0.5 flex flex-wrap gap-[1px]">
                {[...Array(16)].map((_, i) => <div key={i} className={`w-[calc(25%-1px)] h-[calc(25%-1px)] ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>)}
            </div>
        </div>
    </div>
);
