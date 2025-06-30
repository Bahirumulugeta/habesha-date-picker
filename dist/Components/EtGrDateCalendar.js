"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const x_date_pickers_1 = require("@mui/x-date-pickers");
const react_1 = require("react");
const EthiopianDateCalendar_1 = __importDefault(require("./EthiopianDateCalendar"));
const EtDatePickerContext_1 = require("../EtDatePickerContext");
const react_2 = __importDefault(require("react"));
const styles_1 = require("@mui/material/styles");
// Styled component for the date range
const StyledDay = (0, styles_1.styled)(x_date_pickers_1.PickersDay)(({ theme, isRangeStart, isRangeEnd, inRange }) => (Object.assign(Object.assign(Object.assign(Object.assign({}, (inRange && {
    backgroundColor: theme.palette.action.selected, // A light background for dates within the range
    borderRadius: 0, // Make it a rectangle for continuous range
})), (isRangeStart && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopLeftRadius: '50%', // Round corners for start of range
    borderBottomLeftRadius: '50%',
})), (isRangeEnd && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopRightRadius: '50%', // Round corners for end of range
    borderBottomRightRadius: '50%',
})), { 
    // Override default PickersDay styles if needed
    '&:hover': {
        backgroundColor: isRangeStart || isRangeEnd ? theme.palette.primary.dark : inRange ? theme.palette.action.hover : undefined,
    } })));
const EtGrDateCalendar = () => {
    const etDatePickerContext = (0, react_1.useContext)(EtDatePickerContext_1.EtDatePickerContext);
    const { onDateChange, disableFuture, disablePast, minDate, maxDate, onMonthChange, gregDate, setGregDate, dateType, isRange, startDate, endDate, } = etDatePickerContext;
    const [gregDatePicker, setGregDatePicker] = (0, react_1.useState)(gregDate || null);
    const [hoveredDate, setHoveredDate] = (0, react_1.useState)(null);
    const [startMonth, setStartMonth] = (0, react_1.useState)(startDate || gregDate || new Date());
    const [endMonth, setEndMonth] = (0, react_1.useState)(startDate ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1) : gregDate ? new Date(gregDate.getFullYear(), gregDate.getMonth() + 1, 1) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1));
    (0, react_1.useEffect)(() => {
        if (isRange && startDate) {
            setStartMonth(startDate);
            setEndMonth(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1));
        }
        else if (!isRange) {
            setGregDatePicker(gregDate || null);
        }
    }, [isRange, startDate, gregDate]);
    const handleTodayButtonClick = () => {
        if (isRange) {
            onDateChange([new Date(), null]);
        }
        else {
            onDateChange(new Date());
        }
    };
    const showEthiopianCalendar = dateType !== "GC";
    const showGregorianCalendar = dateType === "GC";
    return (react_2.default.createElement(material_1.Box, { sx: { minWidth: isRange ? 610 : undefined } },
        react_2.default.createElement(material_1.Box, { display: "flex" }, isRange ? (
        // Range mode: Display two calendars
        (dateType === "EC" || dateType === "AO" || dateType === "CUSTOM") ? (
        // Ethiopian/Afan Oromo range pickers
        react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(material_1.Box, { width: 295, display: "flex", flexDirection: "column", mr: 1 },
                react_2.default.createElement(material_1.Typography, { variant: "subtitle1", sx: { mb: 1 } }, "Start Date"),
                react_2.default.createElement(EthiopianDateCalendar_1.default, { isRange: isRange, startDate: startDate, endDate: endDate })),
            react_2.default.createElement(material_1.Divider, { orientation: "vertical", flexItem: true }),
            react_2.default.createElement(material_1.Box, { width: 295, display: "flex", flexDirection: "column", ml: 1, pr: 4 },
                react_2.default.createElement(material_1.Typography, { variant: "subtitle1", sx: { mb: 1 } }, "End Date"),
                react_2.default.createElement(EthiopianDateCalendar_1.default, { isRange: isRange, startDate: startDate, endDate: endDate, initialViewDate: startDate ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1) : null })))) : (
        // Gregorian range pickers (dateType === "GC")
        react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(material_1.Box, { width: 295, display: "flex", flexDirection: "column", mr: 1 },
                react_2.default.createElement(material_1.Typography, { variant: "subtitle1", sx: { mb: 1 } }, "Start Date"),
                react_2.default.createElement(x_date_pickers_1.DateCalendar, { monthsPerRow: 3, value: startDate, onChange: (date) => {
                        if (date) {
                            if (!startDate || (startDate && endDate)) {
                                etDatePickerContext.onDateChange([date, null]);
                            }
                            else if (date.getTime() < startDate.getTime()) {
                                etDatePickerContext.onDateChange([date, startDate]);
                            }
                            else {
                                etDatePickerContext.onDateChange([startDate, date]);
                            }
                            setHoveredDate(null); // Clear hovered date on selection
                        }
                    }, disableFuture: disableFuture, onMonthChange: (date) => {
                        setStartMonth(date);
                        setHoveredDate(null); // Clear hovered date on month change
                    }, disablePast: disablePast, minDate: minDate, maxDate: maxDate, slots: { day: StyledDay }, slotProps: {
                        day: (ownerState) => {
                            const isRangeStart = startDate && ownerState.day.getTime() === startDate.getTime();
                            const isRangeEnd = endDate && ownerState.day.getTime() === endDate.getTime();
                            const isInRange = (startDate &&
                                ((endDate && ownerState.day.getTime() > Math.min(startDate.getTime(), endDate.getTime()) && ownerState.day.getTime() < Math.max(startDate.getTime(), endDate.getTime())) ||
                                    (!endDate && hoveredDate && ownerState.day.getTime() > Math.min(startDate.getTime(), hoveredDate.getTime()) && ownerState.day.getTime() < Math.max(startDate.getTime(), hoveredDate.getTime()))));
                            return Object.assign(Object.assign({}, ownerState), { isRangeStart: isRangeStart, isRangeEnd: isRangeEnd, inRange: isInRange, onMouseEnter: () => {
                                    if (isRange && startDate && !endDate) {
                                        setHoveredDate(ownerState.day);
                                    }
                                }, onMouseLeave: () => {
                                    if (isRange && startDate && !endDate) {
                                        setHoveredDate(null);
                                    }
                                } });
                        },
                    }, openTo: "day", views: ['month', 'year', 'day'] })),
            react_2.default.createElement(material_1.Divider, { orientation: "vertical", flexItem: true }),
            react_2.default.createElement(material_1.Box, { width: 295, display: "flex", flexDirection: "column", ml: 1, pr: 4 },
                react_2.default.createElement(material_1.Typography, { variant: "subtitle1", sx: { mb: 1 } }, "End Date"),
                react_2.default.createElement(x_date_pickers_1.DateCalendar, { monthsPerRow: 3, value: endDate || endMonth, onChange: (date) => {
                        if (date) {
                            if (!startDate || (startDate && endDate)) {
                                etDatePickerContext.onDateChange([date, null]);
                            }
                            else if (date.getTime() < startDate.getTime()) {
                                etDatePickerContext.onDateChange([date, startDate]);
                            }
                            else {
                                etDatePickerContext.onDateChange([startDate, date]);
                            }
                            setHoveredDate(null); // Clear hovered date on selection
                        }
                    }, disableFuture: disableFuture, onMonthChange: (date) => {
                        setEndMonth(date);
                        setHoveredDate(null); // Clear hovered date on month change
                    }, disablePast: disablePast, minDate: minDate, maxDate: maxDate, slots: { day: StyledDay }, slotProps: {
                        day: (ownerState) => {
                            const isRangeStart = startDate && ownerState.day.getTime() === startDate.getTime();
                            const isRangeEnd = endDate && ownerState.day.getTime() === endDate.getTime();
                            const isInRange = (startDate &&
                                ((endDate && ownerState.day.getTime() > Math.min(startDate.getTime(), endDate.getTime()) && ownerState.day.getTime() < Math.max(startDate.getTime(), endDate.getTime())) ||
                                    (!endDate && hoveredDate && ownerState.day.getTime() > Math.min(startDate.getTime(), hoveredDate.getTime()) && ownerState.day.getTime() < Math.max(startDate.getTime(), hoveredDate.getTime()))));
                            return Object.assign(Object.assign({}, ownerState), { isRangeStart: isRangeStart, isRangeEnd: isRangeEnd, inRange: isInRange, onMouseEnter: () => {
                                    if (isRange && startDate && !endDate) {
                                        setHoveredDate(ownerState.day);
                                    }
                                }, onMouseLeave: () => {
                                    if (isRange && startDate && !endDate) {
                                        setHoveredDate(null);
                                    }
                                } });
                        },
                    }, openTo: "day", views: ['month', 'year', 'day'] }))))) : (
        // Single date mode
        react_2.default.createElement(react_2.default.Fragment, null,
            showEthiopianCalendar && (react_2.default.createElement(material_1.Box, { width: 295, display: "flex", flexDirection: "column", mr: showGregorianCalendar ? 1 : 0 },
                react_2.default.createElement(EthiopianDateCalendar_1.default, { isRange: isRange, startDate: startDate, endDate: endDate }))),
            showEthiopianCalendar && showGregorianCalendar && (react_2.default.createElement(material_1.Divider, { orientation: "vertical", flexItem: true })),
            showGregorianCalendar && (react_2.default.createElement(material_1.Box, { width: 295, mr: showEthiopianCalendar ? 0 : 2 },
                react_2.default.createElement(material_1.Box, { width: 295, pr: 4 },
                    react_2.default.createElement(x_date_pickers_1.DateCalendar, { monthsPerRow: 3, value: gregDatePicker, onChange: (date) => {
                            if (date) {
                                onDateChange(date);
                            }
                        }, disableFuture: disableFuture, onMonthChange: (date) => {
                            var _a;
                            const newDate = new Date(date);
                            newDate.setDate((_a = gregDate === null || gregDate === void 0 ? void 0 : gregDate.getDate()) !== null && _a !== void 0 ? _a : 15);
                            onMonthChange(newDate);
                            setGregDate(newDate);
                        }, disablePast: disablePast, minDate: minDate, maxDate: maxDate, slots: { day: StyledDay }, slotProps: {
                            day: (ownerState) => (Object.assign(Object.assign({}, ownerState), { isRangeStart: isRange && startDate && ownerState.day.getTime() === startDate.getTime(), isRangeEnd: isRange && endDate && ownerState.day.getTime() === endDate.getTime(), inRange: isRange && startDate && endDate && ownerState.day.getTime() > startDate.getTime() && ownerState.day.getTime() < endDate.getTime() })),
                        }, openTo: "day", views: ['month', 'year', 'day'] }))))))),
        react_2.default.createElement(material_1.Box, null,
            react_2.default.createElement(material_1.Button, { sx: { ml: 2, mt: showGregorianCalendar && !isRange ? -7 : 0 }, onClick: handleTodayButtonClick }, "Today"))));
};
exports.default = EtGrDateCalendar;
