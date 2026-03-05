import React from "react";
import { TemplateProps, RenderPhoto } from "./Shared";

export const MinimalistTemplate = ({ data, signatureToUse }: TemplateProps) => (
    <div className="flex-1 w-full h-full relative inter-font bg-[#fafafa] text-slate-900 flex flex-col overflow-hidden">
        {/* Very clean header */}
        <div className="w-full flex items-start justify-between p-4 z-10">
            <div>
                <h1 className="text-[12px] font-bold tracking-tight text-slate-900">{data.schoolName || 'RADIANT'}</h1>
                <p className="text-[6px] tracking-widest text-slate-400 uppercase mt-0.5 line-clamp-2 pr-4">{data.schoolAddress || 'School & College'}</p>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
                <div className="inline-block px-2 py-0.5 bg-slate-900 text-white text-[7px] font-semibold rounded uppercase tracking-wider">
                    {data.role || 'Student'}
                </div>
                {data.session && (
                    <div className="text-[6px] text-slate-500 font-bold uppercase tracking-widest">{data.session}</div>
                )}
            </div>
        </div>

        {/* Photo */}
        <div className="w-full px-4 z-10 flex justify-center">
            <div className="w-full max-w-[100px] h-[100px] rounded-xl overflow-hidden bg-slate-200 border border-slate-200 flex items-center justify-center grayscale contrast-125">
                {<RenderPhoto data={data} className="w-full h-full object-cover object-top" placeholderClass="w-full h-full bg-slate-100 text-slate-400" placeholderTextClass="text-[10px] font-medium" />}
            </div>
        </div>

        {/* Typography Heavy Details */}
        <div className="w-full px-4 mt-4 flex-1 z-10">
            <h2 className="text-[16px] font-bold tracking-tight leading-none mb-1 text-slate-900">{data.name}</h2>
            <p className="text-[9px] text-slate-500 font-medium mb-4">{data.idNumber}</p>

            <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                <div className="col-span-1">
                    <p className="text-[5.5px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Blood Group</p>
                    <p className="text-[8px] font-semibold text-slate-800">{data.bloodGroup || '-'}</p>
                </div>
                <div className="col-span-1">
                    <p className="text-[5.5px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">D.O.B</p>
                    <p className="text-[8px] font-semibold text-slate-800">{data.dob || '-'}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-[5.5px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Father</p>
                    <p className="text-[8px] font-semibold text-slate-800 truncate">{data.fatherName || '-'}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-[5.5px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Phone</p>
                    <p className="text-[8px] font-semibold text-slate-800">{data.phone || '-'}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-[5.5px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Address</p>
                    <p className="text-[8px] font-semibold text-slate-800 line-clamp-1 leading-tight">{data.address || '-'}</p>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="w-full p-4 z-10 flex items-end justify-between">
            <div className="w-24">
                <div className="border-b border-slate-300 w-full mb-1 h-4 flex items-end relative">
                    {/* Signature pseudo */}
                    {signatureToUse ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={signatureToUse} className="absolute bottom-0 left-0 w-12 h-6 object-contain opacity-80" alt="Signature" />
                    ) : (
                        <svg className="w-12 h-3 opacity-60" viewBox="0 0 100 30">
                            <path d="M10,20 Q30,5 50,20 T90,10" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    )}
                </div>
                <p className="text-[6px] text-slate-400 uppercase tracking-widest">Authorized</p>
            </div>
            {/* Minimalist barcode pseudo */}
            <div className="h-6 flex items-end gap-[1.5px] opacity-70">
                {[1, 2, 1, 3, 1, 1, 2, 1, 1, 2, 3, 1, 2, 1, 1].map((w, i) => (
                    <div key={i} className="bg-slate-900 h-full" style={{ width: `${w}px` }}></div>
                ))}
            </div>
        </div>
    </div>
);
