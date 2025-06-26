import { Box, Button, Divider } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

import { useContext, useEffect, useState } from "react";
import EthiopianDateCalendar from "./EthiopianDateCalendar";
import { EtDatePickerContext } from "../EtDatePickerContext";
import React from "react";
import { useEtLocalization } from "../EtLocalizationProvider";

const EtGrDateCalendar = () => {
  const etDatePickerContext = useContext(EtDatePickerContext);
  const {
    onDateChange,
    disableFuture,
    disablePast,
    minDate,
    maxDate,
    onMonthChange,
    gregDate,
    setGregDate,
    dateType,
    isRange,
    startDate,
    endDate,
  } = etDatePickerContext;

  const gregDateValue = gregDate?.toLocaleDateString();

  const [gregDatePicker, setGregDatePicker] = useState<Date | null | undefined>(undefined);

  useEffect(() => {
    if (isRange) {
      setGregDatePicker(startDate);
    } else if (gregDateValue) {
      const value = new Date(gregDateValue);
      setGregDatePicker(value);
    }
  }, [gregDateValue, isRange, startDate]);

  const handleTodayButtonClick = () => {
    onDateChange(new Date());
  };

  // const { disableEt, disableGregorian } = useEtLocalization();
  const disableEt = dateType === "GC";
  const disableGregorian = dateType === "EC";
  return (
    <Box sx={{ minWidth: !disableEt && !disableGregorian ? 610 : undefined }}>
      <Box display={"flex"}>
        {!disableEt && (
          <Box
            width={295}
            display="flex"
            flexDirection="column"
            mr={disableGregorian ? 2 : 1}
          >
            <EthiopianDateCalendar />
          </Box>
        )}
        {!disableEt && !disableGregorian && (
          <Divider orientation="vertical" flexItem />
        )}
        {!disableGregorian && (
          <Box width={295} mr={disableEt ? 2 : 0}>
            <Box width={295} pr={4}>
              <DateCalendar
                monthsPerRow={3}
                value={isRange ? startDate : gregDatePicker}
                onChange={(date) => {
                  if (date && date instanceof Date) {
                    if (isRange) {
                      if (!startDate || (startDate && endDate)) {
                        etDatePickerContext.onDateChange([date, null]);
                      } else if (date.getTime() < startDate.getTime()) {
                        etDatePickerContext.onDateChange([date, startDate]);
                      } else {
                        etDatePickerContext.onDateChange([startDate, date]);
                      }
                    } else {
                      onDateChange(date);
                    }
                  }
                }}
                disableFuture={disableFuture}
                onMonthChange={(date) => {
                  const newDate = new Date(date);
                  newDate.setDate(gregDate?.getDate() ?? 15);
                  onMonthChange(newDate);
                  setGregDate(newDate);
                }}
                disablePast={disablePast}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Box>
          </Box>
        )}
      </Box>
      <Box
      // sx={{
      //   flexGrow: 1,
      //   display: "flex",
      //   alignItems: "flex-start",
      // }}
      >
        <Button
          sx={{ ml: 2, mt: disableGregorian ? 0 : -7 }}
          onClick={handleTodayButtonClick}
        >
          Today
        </Button>
      </Box>
    </Box>
  );
};

export default EtGrDateCalendar;
