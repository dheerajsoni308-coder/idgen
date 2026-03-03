export interface StudentData {
  id: string; // Internal unique ID
  name: string;
  fatherName: string;
  idNumber: string;
  dob: string;
  bloodGroup: string;
  phone: string;
  address: string;
  role?: string; // Kept for backward compatibility
  department?: string; // Kept for backward compatibility
  photoUrl?: string; // Optional URL for a custom photo
  schoolName?: string;
  schoolAddress?: string;
  session?: string;
  schoolPhone?: string;
  logoUrl?: string;
  signatureUrl?: string;
}

export type LayoutType = 'classic' | 'modern' | 'minimalist' | 'custom' | 'green-school' | 'yellow-school' | 'orange-school' | 'blue-vertical';

export interface TemplateFieldInfo {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  width?: number; // percentage
  height?: number; // percentage
  fontSize?: number; // px
  color?: string;
}

export interface TemplateConfig {
  imageUrl: string;
  htmlTemplate?: string;
  fields: {
    photo?: TemplateFieldInfo;
    name?: TemplateFieldInfo;
    idNumber?: TemplateFieldInfo;
    dob?: TemplateFieldInfo;
    bloodGroup?: TemplateFieldInfo;
    phone?: TemplateFieldInfo;
    department?: TemplateFieldInfo; // or role
  };
}
