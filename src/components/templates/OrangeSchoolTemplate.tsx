import React from "react";
import { TemplateProps, RenderPhoto } from "./Shared";

export const OrangeSchoolTemplate = ({ data, signatureToUse }: TemplateProps) => (
    <div className="flex-1 w-full h-full relative font-sans bg-white text-slate-900 flex flex-col overflow-hidden border-[1.5px] border-slate-300 rounded-[8px] z-0">
        {/* Top Orange Header */}
        <div className="w-full bg-[#f6ab00] pt-2 pb-1.5 px-3 flex items-center relative overflow-hidden z-10 shrink-0">
            <div className="w-10 h-10 bg-[#1d3557] rounded-full flex flex-col items-center justify-start pt-0.5 shrink-0 text-white relative shadow-inner overflow-hidden border-[1.5px] border-[#f6ab00] z-10">
                {data.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={data.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                    <>
                        <span className="text-[3px] uppercase tracking-widest text-[#f6ab00] font-black w-[90%] text-center leading-[1.2]">Sri Sri<br />Ravishankar</span>
                        <div className="w-4 h-2 bg-[#f6ab00] rounded-t-full mt-auto relative opacity-90"></div>
                    </>
                )}
            </div>
            <div className="flex-1 text-center font-bold pl-2 pb-0.5 text-[#111827] z-10 flex flex-col justify-center">
                <h1 className="text-[10.5px] font-black uppercase tracking-tight font-['Arial_Black',sans-serif] leading-none mb-[2px]">{data.schoolName || 'SRI SRI RAVISHANKAR VIDYA MANDIR'}</h1>
                <div className="text-[4.5px] font-bold leading-[1.2] tracking-wide line-clamp-3 mb-[1px]">
                    {data.schoolAddress ? (
                        <span>{data.schoolAddress}. {data.schoolPhone ? `Tel: ${data.schoolPhone}` : ''}</span>
                    ) : (
                        <span>Survey No. 309/1, Beside Radhey Party Plot, Near Talao,<br />Vesu Abhwa Road, Village Abhwa, Tal. Choryasi,<br />Dist. Surat - 395007.Tel. : 0261 - 3240033.</span>
                    )}
                </div>
                {data.session && (
                    <span className="text-[5px] text-red-700 bg-white/50 inline-block px-1 rounded-sm mt-0.5 mx-auto">Session: {data.session}</span>
                )}
            </div>
        </div>

        {/* Red thin separator */}
        <div className="w-full h-[1.5px] bg-[#d92121] z-10 shrink-0"></div>

        <div className="flex-1 px-3 py-1 flex relative w-full z-10 bg-white">
            {/* Left Details */}
            <div className="flex-[0.65] flex flex-col pt-1 z-10 pr-2 pb-1">
                <h2 className="text-[12px] font-bold text-[#111827] mb-2 font-serif uppercase tracking-tight leading-tight">{data.name}</h2>

                <div className="flex mb-1 items-start mt-1">
                    <span className="text-[7.5px] font-bold text-[#111827] w-7 shrink-0 leading-none">ID No.</span>
                    <span className="text-[7.5px] font-bold text-[#111827] w-1.5 leading-none">:</span>
                    <span className="text-[7.5px] font-bold leading-[1.3] text-[#111827] truncate">{data.idNumber || '-'}</span>
                </div>

                <div className="flex mb-1 items-start mt-0.5">
                    <span className="text-[7.5px] font-bold text-[#111827] w-7 shrink-0 leading-none">F.Name</span>
                    <span className="text-[7.5px] font-bold text-[#111827] w-1.5 leading-none">:</span>
                    <span className="text-[7.5px] font-bold leading-[1.3] text-[#111827] truncate">{data.fatherName || '-'}</span>
                </div>

                <div className="flex mb-1 items-start mt-0.5">
                    <span className="text-[7.5px] font-bold text-[#111827] w-7 shrink-0 leading-none">D.O.B</span>
                    <span className="text-[7.5px] font-bold text-[#111827] w-1.5 leading-none">:</span>
                    <span className="text-[7.5px] font-bold leading-[1.3] text-[#111827] truncate">{data.dob || '-'}</span>
                </div>

                <div className="flex mb-1 items-start mt-0.5">
                    <span className="text-[7.5px] font-bold text-[#111827] w-7 shrink-0 leading-none">B.Grp</span>
                    <span className="text-[7.5px] font-bold text-[#111827] w-1.5 leading-none">:</span>
                    <span className="text-[7.5px] font-bold leading-[1.3] text-red-600 truncate">{data.bloodGroup || '-'}</span>
                </div>

                <div className="flex mb-1 items-start mt-0.5">
                    <span className="text-[7.5px] font-bold text-[#111827] w-7 shrink-0 leading-none">Add.</span>
                    <span className="text-[7.5px] font-bold text-[#111827] w-1.5 leading-none">:</span>
                    <span className="text-[7px] font-bold leading-[1.15] text-[#111827] line-clamp-2">{data.address || 'Swapnadeep Apartment, Bhatar Char Rasta, Surat.'}</span>
                </div>

                <div className="flex mb-1 items-center mt-0.5">
                    <span className="text-[7.5px] font-bold text-[#111827] w-7 shrink-0 leading-none">Tel.</span>
                    <span className="text-[7.5px] font-bold text-[#111827] w-1.5 leading-none">:</span>
                    <span className="text-[7.5px] font-bold text-[#111827] leading-none">{data.phone || '-'}</span>
                </div>

                <div className="mt-auto flex pb-0.5">
                    <span className="text-[6.5px] font-bold text-transparent tracking-wider">.</span>
                </div>
            </div>

            {/* Right Photo Area */}
            <div className="flex-[0.35] flex flex-col items-center justify-between z-10 pt-1 shrink-0">
                <div className="text-[8px] font-bold text-[#111827] mb-0.5 leading-none text-center h-4 flex items-center"><span className="line-clamp-2">Std. {data.role || 'III - B'}</span></div>

                <div className="w-14 h-[4.2rem] shrink-0 border-[1.5px] border-[#d97706] rounded-lg overflow-hidden bg-slate-50 relative p-0.5 shadow-sm mt-1">
                    <div className="w-full h-full border border-slate-200 rounded-md">
                        {<RenderPhoto data={data} className="w-full h-full object-cover object-top rounded-[4px]" placeholderClass="w-full h-full text-slate-400 bg-slate-100 rounded-[4px]" placeholderTextClass="text-[6px]" />}
                    </div>
                </div>

                <div className="mt-2 text-center border-t-[1px] border-slate-800 w-[90%] pt-[1px] relative">
                    {signatureToUse ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={signatureToUse} className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-6 object-contain" alt="Signature" />
                    ) : null}
                    <span className="text-[5px] font-bold text-[#111827] uppercase tracking-wide relative z-10">Principal Sign</span>
                </div>
            </div>
        </div>

        {/* Faint Background Text Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5] overflow-hidden">
            <div className="transform rotate-[-35deg] scale-150 flex flex-col items-center gap-12 opacity-[0.04]">
                <span className="text-[32px] font-black tracking-[0.2em] text-slate-900 whitespace-nowrap font-sans">UNIVERSAL CARDS & PRINTERS</span>
                <span className="text-[32px] font-black tracking-[0.2em] text-slate-900 whitespace-nowrap font-sans">UNIVERSAL CARDS & PRINTERS</span>
            </div>
        </div>
    </div>
);
