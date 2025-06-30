import React from "react";
interface EthiopianDateCalendarProps {
    isRange?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    initialViewDate?: Date | null;
}
declare const EthiopianDateCalendar: React.FC<EthiopianDateCalendarProps>;
export default EthiopianDateCalendar;
