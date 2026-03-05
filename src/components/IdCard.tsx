import React from "react";
import { StudentData, LayoutType, TemplateConfig } from "../types";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { GreenSchoolTemplate } from "./templates/GreenSchoolTemplate";
import { YellowSchoolTemplate } from "./templates/YellowSchoolTemplate";
import { OrangeSchoolTemplate } from "./templates/OrangeSchoolTemplate";
import { BlueVerticalTemplate } from "./templates/BlueVerticalTemplate";
import { CustomTemplate } from "./templates/CustomTemplate";

interface IdCardProps {
    data: StudentData;
    layout?: LayoutType;
    templateConfig?: TemplateConfig | null;
    globalSignature?: string | null;
}

export default function IdCard({ data, layout = 'classic', templateConfig, globalSignature }: IdCardProps) {
    const signatureToUse = globalSignature || data.signatureUrl;
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
            {layout === 'classic' && <ClassicTemplate data={data} signatureToUse={signatureToUse} />}
            {layout === 'modern' && <ModernTemplate data={data} signatureToUse={signatureToUse} />}
            {layout === 'minimalist' && <MinimalistTemplate data={data} signatureToUse={signatureToUse} />}
            {layout === 'green-school' && <GreenSchoolTemplate data={data} signatureToUse={signatureToUse} />}
            {layout === 'yellow-school' && <YellowSchoolTemplate data={data} signatureToUse={signatureToUse} />}
            {layout === 'orange-school' && <OrangeSchoolTemplate data={data} signatureToUse={signatureToUse} />}
            {layout === 'blue-vertical' && <BlueVerticalTemplate data={data} signatureToUse={signatureToUse} />}
            {layout === 'custom' && <CustomTemplate data={data} templateConfig={templateConfig} signatureToUse={signatureToUse} />}
        </div>
    );
}
