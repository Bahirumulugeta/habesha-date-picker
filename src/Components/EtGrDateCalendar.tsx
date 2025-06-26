import { Box, Button, Divider } from "@mui/material";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";

import { useContext, useEffect, useState } from "react";
import EthiopianDateCalendar from "./EthiopianDateCalendar";
import { EtDatePickerContext } from "../EtDatePickerContext";
import React from "react";
import { useEtLocalization } from "../EtLocalizationProvider";
import { styled } from "@mui/material/styles";
import { DayCalendarProps } from '@mui/x-date-pickers/internals';

interface CustomPickerDayProps extends PickersDayProps<Date> {
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  inRange?: boolean;
}

// Styled component for the date range
const StyledDay = styled(PickersDay as React.ComponentType<PickersDayProps<Date>>)<CustomPickerDayProps>(({ theme, isRangeStart, isRangeEnd, inRange }) => ({
  ...(inRange && {
    backgroundColor: theme.palette.action.selected, // A light background for dates within the range
    borderRadius: 0, // Make it a rectangle for continuous range
  }),
  ...(isRangeStart && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopLeftRadius: '50%', // Round corners for start of range
    borderBottomLeftRadius: '50%',
  }),
  ...(isRangeEnd && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopRightRadius: '50%', // Round corners for end of range
    borderBottomRightRadius: '50%',
  }),
  // Override default PickersDay styles if needed
  '&:hover': {
    backgroundColor: isRangeStart || isRangeEnd ? theme.palette.primary.dark : inRange ? theme.palette.action.hover : undefined,
  },
}));

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
            <EthiopianDateCalendar isRange={isRange} startDate={startDate} endDate={endDate} />
          </Box>
        )}
        {!disableEt && !disableGregorian && (
          <Divider orientation="vertical" flexItem />
        )}
        {!disableGregorian && (
          <Box width={295} mr={disableEt ? 2 : 0}>
            <Box width={295} pr={4}>
              <DateCalendar<Date>
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
                slots={{ day: StyledDay as React.ComponentType<PickersDayProps<Date>> }}
                slotProps={{
                  day: (ownerState) => ({
                    ...ownerState,
                    isRangeStart: isRange && startDate && ownerState.day.getTime() === startDate.getTime(),
                    isRangeEnd: isRange && endDate && ownerState.day.getTime() === endDate.getTime(),
                    inRange: isRange && startDate && endDate && ownerState.day.getTime() > startDate.getTime() && ownerState.day.getTime() < endDate.getTime(),
                  }),
                }}
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
