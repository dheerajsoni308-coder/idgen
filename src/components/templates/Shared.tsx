import React from "react";
import { StudentData, TemplateConfig } from "../../types";

export interface TemplateProps {
    data: StudentData;
    signatureToUse?: string | null;
    templateConfig?: TemplateConfig | null;
}

export const RenderPhoto = ({
    data,
    className,
    placeholderClass,
    placeholderTextClass
}: {
    data: StudentData;
    className: string;
    placeholderClass: string;
    placeholderTextClass: string;
}) => {
    return data.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.photoUrl} alt={data.name} className={`object-cover object-top ${className}`} />
    ) : (
        <div className={`flex items-center justify-center text-center ${placeholderClass}`}>
            <span className={placeholderTextClass}>Photo<br />Here</span>
        </div>
    );
};
