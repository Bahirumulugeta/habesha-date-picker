import { Box, Typography, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { EtDatePickerContext } from "../EtDatePickerContext";
import { EthiopianDate } from "../util/EthiopianDateUtils";
import { useEtLocalization } from "../EtLocalizationProvider";

type EthiopianDaysListProps = {
  month: number;
  year: number;
  isRange?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
};

const EthiopianDaysList: React.FC<EthiopianDaysListProps> = ({
  month,
  year,
  isRange,
  startDate,
  endDate,
}) => {
  const { localType } = useEtLocalization();
  const cellSize = "36px";
  const gap = 0.5;
  const days =
    localType === "EC" || localType === "GC"
      ? EthiopianDate.shortDays
      : EthiopianDate.englishShortDays;
  const today = EthiopianDate.toEth(new Date());
  const {
    onDateChange,
    setGregDate,
    value,
    disableFuture,
    disablePast,
    minDate,
    maxDate,
  } = useContext(EtDatePickerContext);

  const [selectedDate, setSelectedDate] = useState<EthiopianDate.EtDate | null>(
    value ? EthiopianDate.toEth(value) : null
  );

  const getEtDate = (day: number): EthiopianDate.EtDate => {
    return { Day: day, Month: month, Year: year };
  };

  const isDisabled = (day: number): boolean => {
    const date = EthiopianDate.createEthiopianDateFromParts(day, month, year);
    if (disableFuture && EthiopianDate.compareDates(today, date) === -1) {
      return true;
    }
    if (disablePast && EthiopianDate.compareDates(today, date) === 1) {
      return true;
    }
    if (
      minDate &&
      (minDate instanceof Date || Boolean(new Date(minDate as string))) &&
      EthiopianDate.compareDates(
        EthiopianDate.toEth(
          minDate instanceof Date ? minDate : new Date(minDate as string)
        ),
        date
      ) === 1
    ) {
      return true;
    }
    if (
      maxDate &&
      (maxDate instanceof Date || Boolean(new Date(maxDate as string))) &&
      EthiopianDate.compareDates(
        EthiopianDate.toEth(
          maxDate instanceof Date ? maxDate : new Date(maxDate as string)
        ),
        date
      ) === -1
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (value && !isRange) setSelectedDate(EthiopianDate.toEth(value));
  }, [value, isRange]);

  const isSelectedDate = (day: number): boolean => {
    return (
      day === selectedDate?.Day &&
      month === selectedDate?.Month &&
      year === selectedDate?.Year
    );
  };

  const isRangeStart = (day: number): boolean => {
    const currentDayGregorian = EthiopianDate.toGreg(getEtDate(day));
    return !!(isRange && startDate && currentDayGregorian.getTime() === startDate.getTime());
  };

  const isRangeEnd = (day: number): boolean => {
    const currentDayGregorian = EthiopianDate.toGreg(getEtDate(day));
    return !!(isRange && endDate && currentDayGregorian.getTime() === endDate.getTime());
  };

  const inRange = (day: number): boolean => {
    const currentDayGregorian = EthiopianDate.toGreg(getEtDate(day));
    return !!(isRange && startDate && endDate && currentDayGregorian.getTime() > startDate.getTime() && currentDayGregorian.getTime() < endDate.getTime());
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(7, ${cellSize})`,
          gap: gap,
          justifyContent: "center",
          alignItems: "center",
          mb: 1,
        }}
      >
        {days.map((day, index) => (
          <Typography
            key={index}
            variant="caption"
            sx={{
              justifySelf: "center",
              alignSelf: "center",
              color: "grey",
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(7, ${cellSize})`,
          gap: gap,
        }}
      >
        {Array.from(
          {
            length: EthiopianDate.ethiopianMonthLength(month, year),
          },
          (_, index) => {
            const day = index + 1;
            const currentDayGregorian = EthiopianDate.toGreg(getEtDate(day));

            return (
              <IconButton
                key={index}
                disabled={isDisabled(day)}
                onClick={() => {
                  if (isRange) {
                    if (!startDate || (startDate && endDate)) {
                      onDateChange([currentDayGregorian, null]);
                    } else if (currentDayGregorian.getTime() < startDate.getTime()) {
                      onDateChange([currentDayGregorian, startDate]);
                    } else {
                      onDateChange([startDate, currentDayGregorian]);
                    }
                  } else {
                    setSelectedDate(getEtDate(day));
                    onDateChange(currentDayGregorian);
                    setGregDate(currentDayGregorian);
                  }
                }}
                sx={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor:
                    isRangeStart(day)
                      ? "primary.main"
                      : isRangeEnd(day)
                      ? "primary.main"
                      : inRange(day)
                      ? "action.selected"
                      : isSelectedDate(day)
                      ? "primary.dark"
                      : "transparent",
                  borderRadius:
                    isRangeStart(day)
                      ? "50% 0 0 50%"
                      : isRangeEnd(day)
                      ? "0 50% 50% 0"
                      : inRange(day)
                      ? "0"
                      : "50%",
                  color:
                    isRangeStart(day) || isRangeEnd(day) ? "white" : isSelectedDate(day) ? "white" : "black",
                  border:
                    day === today.Day &&
                    month === today.Month &&
                    year === today.Year &&
                    !isSelectedDate(day) &&
                    !isRangeStart(day) &&
                    !isRangeEnd(day) &&
                    !inRange(day)
                      ? "1px solid grey"
                      : "none",
                  gridColumn:
                    index === 0
                      ? EthiopianDate.getEtMonthStartDate(month, year)
                      : undefined,
                  fontSize: "12px",
                  "&:hover": {
                    backgroundColor:
                      isRangeStart(day) || isRangeEnd(day)
                        ? "primary.dark"
                        : inRange(day)
                        ? "action.hover"
                        : isSelectedDate(day)
                        ? "primary.dark"
                        : undefined,
                  },
                }}
              >
                {day}
              </IconButton>
            );
          }
        )}
      </Box>
    </>
  );
};

export default EthiopianDaysList;
