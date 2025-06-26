import { TextField } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
type CustomFieldProps = Omit<React.ComponentProps<typeof TextField>, "onChange" | "value" | "InputProps">;
export type EtDateFieldProps = Pick<React.ComponentProps<typeof DatePicker>, "disablePast" | "disableFuture"> & {
    minDate?: Date;
    maxDate?: Date;
};
type EtDatePickerProps = {
    onClick?: () => void;
    isRange?: boolean;
    value?: Date | null | [Date | null, Date | null];
    onChange?: (date: Date | null | [Date | null, Date | null]) => void;
} & CustomFieldProps & EtDateFieldProps;
declare const EtDatePicker: React.FC<EtDatePickerProps>;
export default EtDatePicker;
