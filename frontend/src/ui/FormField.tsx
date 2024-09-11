import React from "react";

interface FormFieldProps {
  fieldName: "Username" | "Email" | "Name" | "Password";
  fieldType: "password" | "text" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldLabel: string;
}

export const FormField = ({
  fieldName,
  fieldLabel,
  fieldType,
  onChange,
}: FormFieldProps) => {
    
  return (
    <div className="flex flex-col mb-5">
      <label className="text-md font-semibold mb-2 ">{fieldName}</label>
      <input
        onChange={onChange}
        className="focus:outline-none placeholder:text-slate-500 border-slate-100 border-2 rounded p-2"
        placeholder={fieldLabel}
        type={fieldType}
      />
    </div>
  );
};
