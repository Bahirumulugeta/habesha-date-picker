import React from "react";
import { EthiopianDate } from "../util/EthiopianDateUtils";
type EthiopianDaysListProps = {
    month: number;
    year: number;
    isRange?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    hoveredEtDate?: EthiopianDate.EtDate | null;
    setHoveredEtDate?: (date: EthiopianDate.EtDate | null) => void;
    onDateChange: (date: Date | [Date | null, Date | null]) => void;
};
declare const EthiopianDaysList: React.FC<EthiopianDaysListProps>;
export default EthiopianDaysList;
