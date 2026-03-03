import React from "react";
import { StudentData, LayoutType, TemplateConfig } from "../types";

interface IdCardProps {
    data: StudentData;
    layout?: LayoutType;
    templateConfig?: TemplateConfig | null;
}

export default function IdCard({ data, layout = 'classic', templateConfig }: IdCardProps) {

    // Helper to render photo
    const renderPhoto = (className: string, placeholderClass: string, placeholderTextClass: string) => {
        return data.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.photoUrl} alt={data.name} className={`object-cover object-top ${className}`} />
        ) : (
            <div className={`flex items-center justify-center text-center ${placeholderClass}`}>
                <span className={placeholderTextClass}>Photo<br />Here</span>
            </div>
        );
    };

    const renderClassic = () => (
        <div className="flex-1 w-full h-full relative id-font bg-white flex flex-col pt-1">
            {/* Top Header Section */}
            <div className="w-full flex items-center bg-[#1e2a8a] text-white px-2 py-1.5 mt-1 border-t-2 border-b-2 border-[#1e2a8a]">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shrink-0 border-2 border-white overflow-hidden">
                    {data.logoUrl ? (
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
                    {renderPhoto("w-full h-full", "w-full h-full bg-[#0ea5e9] text-white", "text-[8px] font-medium")}
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
                    {data.signatureUrl ? (
                        <img src={data.signatureUrl} className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-8 object-contain" alt="Signature" />
                    ) : 'Signature'}
                </div>
                <span className="text-[7.5px] font-bold text-black uppercase">Principal</span>
            </div>
        </div>
    );

    const renderModern = () => (
        <div className="flex-1 w-full h-full relative outfit-font bg-[#0f172a] text-white flex flex-col overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-blue-600/30 blur-2xl"></div>
            <div className="absolute bottom-[-50px] left-[-30px] w-[120px] h-[120px] rounded-full bg-emerald-500/20 blur-xl"></div>

            {/* Header */}
            <div className="w-full flex items-center justify-between px-4 py-4 z-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0 shadow-lg overflow-hidden">
                    {data.logoUrl ? (
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
            <div className="w-full flex flex-col items-center z-10 mt-1">
                <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-emerald-400 shadow-xl mb-2">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
                        {renderPhoto("w-full h-full object-cover", "w-full h-full bg-slate-800 text-slate-400", "text-[6px] font-medium")}
                    </div>
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

    const renderMinimalist = () => (
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
                    {renderPhoto("w-full h-full object-cover object-top", "w-full h-full bg-slate-100 text-slate-400", "text-[10px] font-medium")}
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
                        {data.signatureUrl ? (
                            <img src={data.signatureUrl} className="absolute bottom-0 left-0 w-12 h-6 object-contain opacity-80" alt="Signature" />
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

    const renderGreenSchool = () => (
        <div className="flex-1 w-full h-full relative font-sans bg-white flex flex-col overflow-hidden border-[6px] border-[#0e7a2b] rounded-2xl">
            {/* Top Header */}
            <div className="w-full bg-[#0e7a2b] text-white pt-2 pb-5 px-3 relative flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                    <div className="w-11 h-11 bg-yellow-400 rounded-full flex items-center justify-center border-[2.5px] border-[#800000] shadow-sm relative overflow-hidden">
                        {data.logoUrl ? (
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
                <span className="text-[8.5px] font-bold text-slate-800 tracking-wider">ID : {data.idNumber || '123-456'}</span>
            </div>

            <div className="flex-1 flex px-3 py-1.5 z-10 w-full relative">
                {/* Left Details */}
                <div className="flex-1 pr-1 pt-1">
                    <table className="w-full text-[7px] font-bold text-slate-800 leading-[1.35]">
                        <tbody>
                            <tr><td className="w-[28%] uppercase align-top">Name</td><td className="w-[5%] align-top text-center">:</td><td className="uppercase align-top">{data.name}</td></tr>
                            <tr><td className="w-[28%] uppercase align-top">Class</td><td className="w-[5%] align-top text-center">:</td><td className="uppercase align-top">{data.role || 'IX "A"'}</td></tr>
                            <tr><td className="w-[28%] uppercase align-top">Father Name</td><td className="w-[5%] align-top text-center">:</td><td className="uppercase align-top tracking-tighter">{data.fatherName}</td></tr>
                            <tr><td className="w-[28%] uppercase align-top">Student D.O.B.</td><td className="w-[5%] align-top text-center">:</td><td className="uppercase align-top">{data.dob}</td></tr>
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
                        {renderPhoto("w-full h-full object-cover object-top rounded-md", "w-full h-full bg-green-400 text-white rounded-md", "text-[6px]")}
                    </div>
                    {/* Blood Drop */}
                    <div className="absolute bottom-[20px] left-[-3px] flex items-center gap-0.5 transform scale-100 -translate-x-full pr-1">
                        <svg className="w-4 h-5 text-red-600 fill-current drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24"><path d="M12 2C12 2 5 10.08 5 15C5 18.86 8.13 22 12 22C15.87 22 19 18.86 19 15C19 10.08 12 2 12 2Z" /></svg>
                        <span className="text-[10px] font-black text-red-600 tracking-tighter">{data.bloodGroup || ''}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="w-full bg-[#0e7a2b] text-white px-3 py-1 flex justify-between items-center z-10 border-t-2 border-[#15803d]">
                <div className="text-[7.5px] leading-[1.2] font-semibold tracking-wide flex items-center">
                    {!data.schoolAddress ? (
                        <div>
                            <p>L.R.P. Road, P.O. Banarhat, Dist. Jalpaiguri</p>
                            <p>West Bengal, Phone : {data.schoolPhone || '03563-000000'}</p>
                        </div>
                    ) : (
                        <p>Phone : {data.schoolPhone || 'N/A'}</p>
                    )}
                </div>
                <div className="text-center w-16 relative pt-3">
                    {data.signatureUrl ? (
                        <img src={data.signatureUrl} className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 object-contain opacity-90" alt="Signature" />
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

    const renderYellowSchool = () => (
        <div className="flex-1 w-full h-full relative font-sans bg-[#e2ea93] text-[#13491c] flex flex-col overflow-hidden rounded-[4px] border border-slate-300">
            {/* Top Header */}
            <div className="w-full bg-[#1b5e20] text-white pt-2 pb-1.5 px-2 flex items-center justify-between z-10">
                <div className="w-10 h-10 bg-white rounded-full flex flex-col items-center justify-center border-2 border-red-500 shrink-0 shadow-sm relative overflow-hidden">
                    {data.logoUrl ? (
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
                            {renderPhoto("w-full h-full object-cover object-top rounded-sm", "w-full h-full text-blue-400 bg-blue-50/50 rounded-sm", "text-[6px]")}
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
                        {data.signatureUrl ? (
                            <img src={data.signatureUrl} className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-8 object-contain" alt="Signature" />
                        ) : null}
                        <span className="text-[7.5px] font-bold text-[#1b5e20] tracking-tight uppercase relative z-10">Authorised Signature</span>
                    </div>
                </div>
            </div>

            {/* Bottom Note */}

        </div>
    );

    const renderOrangeSchool = () => (
        <div className="flex-1 w-full h-full relative font-sans bg-white text-slate-900 flex flex-col overflow-hidden border-[1.5px] border-slate-300 rounded-[8px] z-0">
            {/* Top Orange Header */}
            <div className="w-full bg-[#f6ab00] pt-2 pb-1.5 px-3 flex items-center relative overflow-hidden z-10 shrink-0">
                <div className="w-10 h-10 bg-[#1d3557] rounded-full flex flex-col items-center justify-start pt-0.5 shrink-0 text-white relative shadow-inner overflow-hidden border-[1.5px] border-[#f6ab00] z-10">
                    {data.logoUrl ? (
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
                            {renderPhoto("w-full h-full object-cover object-top rounded-[4px]", "w-full h-full text-slate-400 bg-slate-100 rounded-[4px]", "text-[6px]")}
                        </div>
                    </div>

                    <div className="mt-2 text-center border-t-[1px] border-slate-800 w-[90%] pt-[1px] relative">
                        {data.signatureUrl ? (
                            <img src={data.signatureUrl} className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-6 object-contain" alt="Signature" />
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

    const renderBlueVertical = () => (
        <div className="flex-1 w-full h-full relative font-sans bg-white text-slate-900 flex flex-row overflow-hidden border-2 border-slate-300 rounded-[6px]">
            {/* Left Wavy Pattern Graphic */}
            <div className="w-[20%] h-full bg-[#0a84ff] relative flex flex-col items-center shrink-0 overflow-hidden text-white gap-2 border-r-[4px] border-[#60a5fa] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.1)]">
                <div className="absolute top-2 w-[85%] aspect-[1/1.1] bg-yellow-100 border border-yellow-500 rounded-b-xl flex flex-col items-center justify-start pt-1 text-center shield-shape mt-1 shadow-sm overflow-hidden">
                    {data.logoUrl ? (
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
                        {renderPhoto("w-full h-full object-cover rounded-md", "w-full h-full text-blue-400 bg-[#e0f2fe] rounded-md", "text-[8px]")}
                    </div>
                </div>

                <div className="w-full mt-3 border-b-[1.5px] border-[#0f172a] text-center relative px-4 flex justify-center mb-0.5">
                    {data.signatureUrl ? (
                        <img src={data.signatureUrl} className="w-16 h-6 absolute -top-4 opacity-90 object-contain" alt="Signature" />
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

    const renderCustom = () => {
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
        const getStyle = (field: import('../types').TemplateFieldInfo | undefined): React.CSSProperties => {
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
                            {renderPhoto("w-full h-full object-cover", "w-full h-full bg-slate-100 text-slate-400", "text-[6px]")}
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

    const isLandscape = ['green-school', 'yellow-school', 'orange-school'].includes(layout);

    return (
        <div
            id={`id-card-${data.id}`}
            className={`relative bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden flex ${isLandscape ? 'flex-row' : 'flex-col'} font-sans`}
            style={{
                width: isLandscape ? "3.375in" : "2.125in", // CR80 standards swapped for landscape
                height: isLandscape ? "2.125in" : "3.375in",
                transform: "scale(1.5)",
                transformOrigin: "top left",
                marginBottom: isLandscape ? "1.2in" : "1.8in",
                marginRight: isLandscape ? "1.8in" : "1.2in",
                // Make sure background doesn't bleed out of rounded corners
                isolation: 'isolate'
            }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .id-font { font-family: 'Roboto', sans-serif; }
        .outfit-font { font-family: 'Outfit', sans-serif; }
        .inter-font { font-family: 'Inter', sans-serif; }
      `}} />
            {layout === 'classic' && renderClassic()}
            {layout === 'modern' && renderModern()}
            {layout === 'minimalist' && renderMinimalist()}
            {layout === 'green-school' && renderGreenSchool()}
            {layout === 'yellow-school' && renderYellowSchool()}
            {layout === 'orange-school' && renderOrangeSchool()}
            {layout === 'blue-vertical' && renderBlueVertical()}
            {layout === 'custom' && renderCustom()}
        </div>
    );
}
