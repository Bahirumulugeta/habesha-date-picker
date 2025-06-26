import React, { ReactNode } from "react";
import { EtDateFieldProps } from "./EtDatePicker";
export type EtDatePickerContextValue = {
    value?: Date | null;
    monthValue?: Date | null;
    gregDate?: Date | null;
    setGregDate: (date: Date) => void;
    onMonthChange: (date: Date) => void;
    onDateChange: (date: Date | null | [Date | null, Date | null]) => void;
    dateType: "GC" | "EC" | "AO" | "CUSTOM";
    locale: "am" | "gc";
    disableFuture?: boolean;
    disablePast?: boolean;
    minDate?: Date;
    maxDate?: Date;
    isRange?: boolean;
    startDate: Date | null;
    endDate: Date | null;
} & EtDateFieldProps;
declare const EtDatePickerContext: React.Context<EtDatePickerContextValue>;
export type EtDatePickerProviderProps = {
    children: ReactNode;
    onChange?: (date: Date | null | [Date | null, Date | null]) => void;
    value?: Date | null | [Date | null, Date | null];
    dateType?: "GC" | "EC" | "AO" | "CUSTOM";
    isRange?: boolean;
} & EtDateFieldProps;
declare const EtDatePickerProvider: React.FC<EtDatePickerProviderProps>;
export { EtDatePickerProvider, EtDatePickerContext };
