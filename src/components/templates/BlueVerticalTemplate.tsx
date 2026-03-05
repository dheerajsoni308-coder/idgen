import React from "react";
import { TemplateProps, RenderPhoto } from "./Shared";

export const BlueVerticalTemplate = ({ data, signatureToUse }: TemplateProps) => (
    <div className="flex-1 w-full h-full relative font-sans bg-white text-slate-900 flex flex-row overflow-hidden border-2 border-slate-300 rounded-[6px]">
        {/* Left Wavy Pattern Graphic */}
        <div className="w-[20%] h-full bg-[#0a84ff] relative flex flex-col items-center shrink-0 overflow-hidden text-white gap-2 border-r-[4px] border-[#60a5fa] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.1)]">
            <div className="absolute top-2 w-[85%] aspect-[1/1.1] bg-yellow-100 border border-yellow-500 rounded-b-xl flex flex-col items-center justify-start pt-1 text-center shield-shape mt-1 shadow-sm overflow-hidden">
                {data.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={data.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                    <>
                        <span className="text-[3px] text-red-600 font-bold uppercase tracking-tighter leading-none mt-[1px]">Education</span>
                        <div className="w-3 h-3 rounded-full border border-yellow-600 mt-1"></div>
                    </>
                )}
            </div>
            {/* Wavy accents inside blue block */}
            <div className="w-full h-full opacity-30 mt-20 scale-150 rotate-12 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.8)_0%,transparent_50%)]"></div>
        </div>

        <div className="flex-1 h-full py-2 px-1 flex flex-col items-center overflow-hidden z-20 relative bg-[#f8fafc]">
            {/* Header */}
            <div className="text-center w-full mb-1 relative">
                <h1 className="text-[11px] font-black tracking-tight text-blue-900 uppercase pt-1 font-serif">{data.schoolName || 'GHSS PADRE'}</h1>
                <p className="text-[5.5px] font-bold leading-[1.1] mt-1 text-[#1e293b]">
                    {data.schoolAddress ? data.schoolAddress : (
                        <span>P.O VANINAGARA<br />KASARAGOD DISTRICT-671552</span>
                    )}
                </p>
                <p className="text-[5.5px] font-bold mt-1 text-[#1e293b]">Phone: {data.schoolPhone || '04998-266222'}</p>

            </div>

            {/* Photo & Signature */}
            <div className="w-16 h-[5rem] border-[2px] border-[#0f172a] mt-1.5 overflow-hidden bg-blue-50 relative p-0.5 shadow-sm rounded-xl">
                <div className="w-full h-full border border-slate-300 overflow-hidden rounded-lg">
                    {<RenderPhoto data={data} className="w-full h-full object-cover rounded-md" placeholderClass="w-full h-full text-blue-400 bg-[#e0f2fe] rounded-md" placeholderTextClass="text-[8px]" />}
                </div>
            </div>

            <div className="w-full mt-3 border-b-[1.5px] border-[#0f172a] text-center relative px-4 flex justify-center mb-0.5">
                {signatureToUse ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={signatureToUse} className="w-16 h-6 absolute -top-4 opacity-90 object-contain" alt="Signature" />
                ) : (
                    <svg className="w-16 h-4 absolute -top-[14px] opacity-80" viewBox="0 0 100 30" style={{ fill: 'none', stroke: '#1e3a8a', strokeWidth: 1.5 }}>
                        <path d="M10,20 Q30,5 50,20 T90,10" />
                    </svg>
                )}
            </div>
            <div className="text-center w-full leading-tight">
                <span className="text-[5px] font-bold">HEADMASTER</span><br />
                <span className="text-[4px] leading-tight">Govt. Higher Secondary School, Padre<br />P.O Vaninagara</span>
            </div>

            {/* Details */}
            <div className="w-full mt-auto px-1.5 pb-2">
                <table className="w-full text-[6px] font-bold text-slate-800 leading-[1.4]">
                    <tbody>
                        <tr><td className="w-[30%] align-top tracking-tighter">Adm. No</td><td className="w-2 align-top">:</td><td className="align-top font-bold text-[6.5px]">{data.idNumber}</td></tr>
                        <tr><td className="w-[30%] align-top tracking-tighter pt-0.5">Name</td><td className="w-2 align-top pt-0.5">:</td><td className="align-top text-blue-900 text-[6.5px] uppercase font-black tracking-tight pt-0.5">{data.name}</td></tr>
                        <tr><td className="w-[30%] align-top tracking-tighter pt-0.5">Class</td><td className="w-2 align-top pt-0.5">:</td><td className="align-top font-bold text-[6.5px] pt-0.5">{data.role || '-'}</td></tr>
                        <tr><td className="w-[30%] align-top tracking-tighter pt-0.5">D.O.B</td><td className="w-2 align-top pt-0.5">:</td><td className="align-top font-bold text-[6.5px] pt-0.5">{data.dob}</td></tr>
                        <tr><td className="w-[30%] align-top tracking-tighter pt-0.5">Blood Grp</td><td className="w-2 align-top pt-0.5">:</td><td className="align-top font-bold text-red-600 text-[6.5px] pt-0.5">{data.bloodGroup || '-'}</td></tr>
                        <tr><td className="w-[30%] align-top tracking-tighter pt-1">Address</td><td className="w-2 align-top pt-1">:</td>
                            <td className="align-top leading-[1.1] pt-1 text-[5px]">
                                {data.fatherName || 'Sundara Poojary'}<br />
                                {data.address || 'Mundolimoole\nP.O Vaninagara-671552'}
                            </td>
                        </tr>
                        <tr><td className="w-[30%] align-top tracking-tighter pt-1.5">Phone</td><td className="w-2 align-top pt-1.5">:</td><td className="align-top pt-1.5 font-bold text-[6.5px]">{data.phone}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <style dangerouslySetInnerHTML={{
            __html: `
            .shield-shape { clip-path: polygon(50% 0%, 100% 0, 100% 70%, 50% 100%, 0 70%, 0 0); }
        `}} />
    </div>
);
