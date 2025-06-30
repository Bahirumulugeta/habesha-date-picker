import React from "react";
interface EthiopianDateCalendarProps {
    isRange?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    initialViewDate?: Date | null;
    hoveredDate?: Date | null;
    setHoveredDate?: (date: Date | null) => void;
    onDateChange: (date: Date | [Date | null, Date | null]) => void;
}
declare const EthiopianDateCalendar: React.FC<EthiopianDateCalendarProps>;
export default EthiopianDateCalendar;
