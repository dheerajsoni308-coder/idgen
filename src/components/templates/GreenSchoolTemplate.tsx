import React from "react";
import { TemplateProps, RenderPhoto } from "./Shared";

export const GreenSchoolTemplate = ({ data, signatureToUse }: TemplateProps) => (
    <div className="flex-1 w-full h-full relative font-sans bg-white flex flex-col overflow-hidden border-[6px] border-[#0e7a2b] rounded-2xl">
        {/* Top Header */}
        <div className="w-full bg-orange-600 text-white pt-2 pb-5 px-3 relative flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
                <div className="w-11 h-11 bg-yellow-400 rounded-full flex items-center justify-center border-[2.5px] border-[#800000] shadow-sm relative overflow-hidden">
                    {data.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={data.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            {/* Outer serrated red ring pseudo */}
                            <div className="absolute inset-[-4px] border border-[#800000] rounded-full border-dashed opacity-50"></div>
                            <span className="text-[10px] font-black text-[#800000] tracking-wider">LOGO</span>
                        </>
                    )}
                </div>
                <div className="pt-1">
                    {data.schoolName ? (
                        <h1 className="text-[12px] font-black tracking-wide uppercase leading-tight drop-shadow-sm text-[#f8fafc] max-w-[140px] text-balance">{data.schoolName}</h1>
                    ) : (
                        <>
                            <h1 className="text-[12px] font-black tracking-wide uppercase leading-tight drop-shadow-sm text-[#f8fafc]">JALPAI PUBLIC</h1>
                            <h1 className="text-[12px] font-black tracking-wide uppercase leading-tight drop-shadow-sm text-[#f8fafc]">SCHOOL</h1>
                        </>
                    )}
                    {data.schoolAddress && (
                        <p className="text-[6px] font-bold text-yellow-300 tracking-wider mt-0.5 max-w-[140px] leading-tight text-white/90 drop-shadow-sm line-clamp-2">
                            {data.schoolAddress}
                        </p>
                    )}
                </div>
            </div>
            <div className="text-right flex flex-col items-end">
                <span className="text-[8px] font-bold tracking-widest uppercase mb-1">
                    {data.session ? `SESSION ${data.session}` : 'IDENTITY CARD'}
                </span>
                {!data.session && <span className="text-[5px] text-green-200">ID CARD</span>}
            </div>
        </div>

        {/* White wave for ID */}
        <div className="absolute top-[42px] right-0 bg-white h-7 w-[40%] rounded-tl-[20px] z-[15] flex justify-end items-center pr-4 shadow-[-2px_-2px_4px_rgba(0,0,0,0.1)]">
            <span className="text-[8.5px] font-bold text-slate-800 tracking-wider">SR : {data.idNumber || '123-456'}</span>
        </div>

        <div className="flex-1 flex px-3 py-1.5 z-10 w-full relative">
            {/* Left Details */}
            <div className="flex-1 pr-1 pt-1">
                <table className="w-full text-[7px] font-bold text-slate-800 leading-[1.35]">
                    <tbody>
                        <tr><td className="w-[28%] uppercase align-top">Name</td><td className="w-[5%] align-top text-center">:</td><td className="uppercase align-top">{data.name}</td></tr>
                        <tr><td className="w-[28%] uppercase align-top">Class</td><td className="w-[5%] align-top text-center">:</td><td className="uppercase align-top">{data.role || 'IX "A"'}</td></tr>
                        <tr><td className="w-[28%] uppercase align-top">Father Name</td><td className="w-[5%] align-top text-center">:</td><td className="uppercase align-top tracking-tighter">{data.fatherName}</td></tr>
                        <tr><td className="w-[28%] uppercase align-top">D.O.B.</td><td className="w-[5%] align-top text-center">:</td><td className="uppercase align-top">{data.dob}</td></tr>
                        <tr><td className="w-[28%] uppercase align-top">Address</td><td className="w-[5%] align-top text-center">:</td><td className="uppercase align-top leading-tight">{data.address || 'BINNAGURI\nJALPAIGURI'}</td></tr>
                        <tr><td className="w-[28%] uppercase align-top pt-1">Phone</td><td className="w-[5%] align-top text-center pt-1">:</td><td className="uppercase align-top pt-1 font-bold">{data.phone}</td></tr>
                    </tbody>
                </table>
                {data.session && (
                    <div className="mt-1 text-[5.5px] text-slate-600 font-bold ml-[33%] flex items-center gap-1">
                        {/* <span>Session :</span> <span>{data.session}</span> */}
                    </div>
                )}
            </div>

            {/* Right Photo Area */}
            <div className="w-[30%] flex flex-col items-end justify-start relative pt-4 pl-2 shrink-0">
                <div className="w-14 h-16 shrink-0 border-[1.5px] border-[#0e7a2b] p-0.5 bg-green-50 z-10 overflow-hidden box-border shadow-sm rounded-lg">
                    {<RenderPhoto data={data} className="w-full h-full object-cover object-top rounded-md" placeholderClass="w-full h-full bg-green-400 text-white rounded-md" placeholderTextClass="text-[6px]" />}
                </div>
                {/* Blood Drop */}
                <div className="absolute bottom-[20px] left-[-3px] flex items-center gap-0.5 transform scale-100 -translate-x-full pr-1">
                    <svg className="w-4 h-5 text-red-600 fill-current drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24"><path d="M12 2C12 2 5 10.08 5 15C5 18.86 8.13 22 12 22C15.87 22 19 18.86 19 15C19 10.08 12 2 12 2Z" /></svg>
                    <span className="text-[10px] font-black text-red-600 tracking-tighter">{data.bloodGroup || ''}</span>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="w-full bg-green-600 text-white px-3 py-1 flex justify-between items-center z-10 border-t-2 border-[#15803d]">
            <div className="text-[7.5px] leading-[1.2] font-semibold tracking-wide flex items-center">
                {!data.schoolAddress ? (
                    <div>
                        <p>L.R.P. Road, P.O. Banarhat, Dist. Jalpaiguri</p>
                        <p>West Bengal, Phone : {data.schoolPhone || '03563-000000'}</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="text-center w-16 relative pt-3">
                {signatureToUse ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={signatureToUse} className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 object-contain opacity-90" alt="Signature" />
                ) : (
                    <svg className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-4 opacity-80" viewBox="0 0 100 30" style={{ fill: 'none', stroke: '#2563eb', strokeWidth: 1.5 }}>
                        <path d="M20,20 Q40,-5 60,20 T80,10" />
                    </svg>
                )}
                <span className="text-[8px] font-bold z-10 relative">Principal</span>
            </div>
        </div>
    </div >
);
