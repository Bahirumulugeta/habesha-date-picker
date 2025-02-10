import React, { ReactNode } from "react";
import { EtDateFieldProps } from "./EtDatePicker";
import { DateType } from "./util/EthiopianDateUtils";
type EtDatePickerContextType = {
    value?: Date;
    monthValue?: Date;
    gregDate?: Date;
    setGregDate: (date: Date) => void;
    onMonthChange: (date: Date) => void;
    onDateChange: (date: Date) => void;
    dateType?: DateType;
} & EtDateFieldProps;
declare const EtDatePickerContext: React.Context<EtDatePickerContextType>;
type EtDatePickerProviderProps = {
    children: ReactNode;
    onChange?: (date: Date) => void;
    value?: Date;
    dateType?: DateType;
} & EtDateFieldProps;
declare const EtDatePickerProvider: React.FC<EtDatePickerProviderProps>;
export { EtDatePickerProvider, EtDatePickerContext };
