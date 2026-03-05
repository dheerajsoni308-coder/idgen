import React from "react";
import { TemplateProps, RenderPhoto } from "./Shared";

export const YellowSchoolTemplate = ({ data, signatureToUse }: TemplateProps) => (
    <div className="flex-1 w-full h-full relative font-sans bg-[#e2ea93] text-[#13491c] flex flex-col overflow-hidden rounded-[4px] border border-slate-300">
        {/* Top Header */}
        <div className="w-full bg-[#1b5e20] text-white pt-2 pb-1.5 px-2 flex items-center justify-between z-10">
            <div className="w-10 h-10 bg-white rounded-full flex flex-col items-center justify-center border-2 border-red-500 shrink-0 shadow-sm relative overflow-hidden">
                {data.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={data.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                    <>
                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full spin-slow opacity-20"><circle cx="50" cy="50" r="45" stroke="#1b5e20" strokeWidth="2" fill="none" strokeDasharray="5,5" /></svg>
                        <span className="text-[3px] font-black uppercase text-blue-900 absolute top-1.5 w-[80%] text-center leading-none">Sudiksha Public</span>
                        <svg className="w-3.5 h-3.5 text-green-700 mt-1.5 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        <span className="text-[3.5px] font-bold uppercase text-red-600 absolute bottom-1.5 tracking-tighter w-[90%] text-center leading-[0.9]">Unity Faith Discipline</span>
                    </>
                )}
            </div>
            <div className="flex-1 text-center pl-1">
                <h1 className="text-[13px] font-black tracking-normal uppercase text-white font-['Arial_Black',sans-serif] drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)] leading-[1.1] mb-0.5 max-w-[190px] mx-auto text-balance">
                    {data.schoolName || 'SUDIKSHA PUBLIC SCHOOL'}
                </h1>
                <p className="text-[6px] text-yellow-300 font-bold tracking-widest uppercase mb-0.5 line-clamp-1 text-ellipsis" style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.5)" }}>
                    {data.schoolAddress || 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'}
                </p>
                <p className="text-[7.5px] font-bold text-white tracking-wide leading-none">PHONE NO. : {data.schoolPhone || '+91-9999006691'}</p>
            </div>
        </div>
        {/* Sub-header Website / Session */}
        <div className="w-full bg-[#2e7d32] text-white text-center py-[2px] border-y-[1.5px] border-yellow-200 z-10 shadow-sm flex items-center justify-center gap-4">
            <span className="text-[6.5px] font-bold tracking-wide text-yellow-200">
                {data.session ? `SESSION: ${data.session}` : 'IDENTITY CARD'}
            </span>
            <span className="text-[6.5px] font-bold tracking-wide">Website : www.conf-tech.com</span>
        </div>

        <div className="flex-1 px-3 py-1 flex relative w-full ">
            <div className="flex-[0.65] flex flex-col pt-0.5">
                <div className="flex items-center text-[8.5px] mb-1">
                    <span className="font-bold text-[#1b5e20] w-[14%] uppercase mr-2.5">Name</span>
                    <span className="font-bold w-[3.5%]">:</span>
                    <span className="font-bold text-[#1b5e20] uppercase truncate leading-tight">{data.name}</span>
                </div>

                <div className="flex flex-col text-[8.5px] mb-1 w-[140%]">
                    <div className="flex items-center h-3">
                        <span className="font-bold text-[#1b5e20] w-[14%] uppercase">Class</span>
                        <span className="font-bold w-[3.5%]">:</span>
                        <span className="font-bold text-slate-800 uppercase leading-none mt-0.5">{data.role || 'III'}</span>
                    </div>
                    <div className="flex items-center h-3 mt-0.5">
                        <span className="font-bold text-[#1b5e20] w-[14%] whitespace-nowrap">ID No.</span>
                        <span className="font-bold w-[3.5%]">:</span>
                        <span className="font-bold text-slate-800 ml-0.5 leading-none">{data.idNumber || '-'}</span>
                    </div>
                    <div className="flex items-center h-3 mt-0.5">
                        <span className="font-bold text-[#1b5e20] w-[14%]">D.O.B</span>
                        <span className="font-bold w-[3.5%]">:</span>
                        <span className="font-bold text-slate-800 ml-0.5 leading-none">{data.dob || '-'}</span>
                    </div>

                    <div className="flex items-center h-3 mt-0.5">
                        <span className="font-bold text-[#1b5e20] w-[14%]">Blood </span>
                        <span className="font-bold w-[3.5%]">:</span>
                        <span className="font-bold text-slate-800 ml-0.5 leading-none">{data.bloodGroup || '-'}</span>
                    </div>

                    <div className="flex items-center h-3 mt-0.5">
                        <span className="font-bold text-[#1b5e20] w-[14%]">Address </span>
                        <span className="font-bold w-[3.5%]">:</span>
                        <span className="font-bold text-slate-800 ml-0.5 leading-none">{data.address || '-'}</span>
                    </div>
                </div>




            </div>

            {/* Right Photo */}
            <div className="flex-[0.35] flex flex-col items-center justify-start pt-1 z-10 relative pl-2 shrink-0">
                <div className="w-14 h-[4.2rem] shrink-0 border-[1.5px] border-[#1b5e20] rounded-lg overflow-hidden bg-blue-100 shadow-sm relative z-10 p-0.5">
                    <div className="w-full h-full rounded-md overflow-hidden">
                        {<RenderPhoto data={data} className="w-full h-full object-cover object-top rounded-sm" placeholderClass="w-full h-full text-blue-400 bg-blue-50/50 rounded-sm" placeholderTextClass="text-[6px]" />}
                    </div>
                    {/* Faint blue overlay for photo style matching reference */}
                    <div className="absolute inset-0 bg-blue-500/10 pointer-events-none mix-blend-multiply"></div>
                </div>

                {/* Circle stamp pseudo overlaying photo slightly */}
                <div className="w-9 h-9 border-[1.5px] border-[#121c6b] rounded-full flex flex-col items-center justify-center text-[3.5px] text-[#121c6b] font-bold uppercase tracking-tighter opacity-80 absolute top-[4rem] right-0 rotate-[-15deg] z-20 bg-transparent">
                    <div className="absolute inset-1 border-[0.5px] border-[#121c6b] rounded-full"></div>
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full"><path id="curve" fill="transparent" d="M 20 50 A 30 30 0 1 1 80 50" /><text width="100" className="text-[12px] fill-current"><textPath href="#curve" startOffset="50%" textAnchor="middle">WOODLAND SCHOOL</textPath></text></svg>
                    <span className="mt-[2px] text-[3.5px]">PRINCIPAL</span>
                    <span className="mt-[2px] text-[3px] mb-[-4px]">DEHRADUN</span>
                    <span className="text-[8px] absolute -bottom-1">★</span>
                </div>

                <div className="w-[120%] text-center border-t border-slate-600 pt-0.5 z-10 absolute bottom-[2px] right-2 mt-4">
                    {signatureToUse ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={signatureToUse} className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-8 object-contain" alt="Signature" />
                    ) : null}
                    <span className="text-[7.5px] font-bold text-[#1b5e20] tracking-tight uppercase relative z-10">Authorised Signature</span>
                </div>
            </div>
        </div>

        {/* Bottom Note */}

    </div>
);
