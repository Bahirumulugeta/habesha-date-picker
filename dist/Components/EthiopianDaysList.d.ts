import React from "react";
type EthiopianDaysListProps = {
    month: number;
    year: number;
    isRange?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
};
declare const EthiopianDaysList: React.FC<EthiopianDaysListProps>;
export default EthiopianDaysList;
