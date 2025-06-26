"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const EtDatePickerContext_1 = require("../EtDatePickerContext");
const EthiopianDateUtils_1 = require("../util/EthiopianDateUtils");
const EtLocalizationProvider_1 = require("../EtLocalizationProvider");
const EthiopianDaysList = ({ month, year, isRange, startDate, endDate, }) => {
    const { localType } = (0, EtLocalizationProvider_1.useEtLocalization)();
    const cellSize = "36px";
    const gap = 0.5;
    const days = localType === "EC" || localType === "GC"
        ? EthiopianDateUtils_1.EthiopianDate.shortDays
        : EthiopianDateUtils_1.EthiopianDate.englishShortDays;
    const today = EthiopianDateUtils_1.EthiopianDate.toEth(new Date());
    const { onDateChange, setGregDate, value, disableFuture, disablePast, minDate, maxDate, } = (0, react_1.useContext)(EtDatePickerContext_1.EtDatePickerContext);
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(value ? EthiopianDateUtils_1.EthiopianDate.toEth(value) : null);
    const getEtDate = (day) => {
        return { Day: day, Month: month, Year: year };
    };
    const isDisabled = (day) => {
        const date = EthiopianDateUtils_1.EthiopianDate.createEthiopianDateFromParts(day, month, year);
        if (disableFuture && EthiopianDateUtils_1.EthiopianDate.compareDates(today, date) === -1) {
            return true;
        }
        if (disablePast && EthiopianDateUtils_1.EthiopianDate.compareDates(today, date) === 1) {
            return true;
        }
        if (minDate &&
            (minDate instanceof Date || Boolean(new Date(minDate))) &&
            EthiopianDateUtils_1.EthiopianDate.compareDates(EthiopianDateUtils_1.EthiopianDate.toEth(minDate instanceof Date ? minDate : new Date(minDate)), date) === 1) {
            return true;
        }
        if (maxDate &&
            (maxDate instanceof Date || Boolean(new Date(maxDate))) &&
            EthiopianDateUtils_1.EthiopianDate.compareDates(EthiopianDateUtils_1.EthiopianDate.toEth(maxDate instanceof Date ? maxDate : new Date(maxDate)), date) === -1) {
            return true;
        }
        return false;
    };
    (0, react_1.useEffect)(() => {
        if (value && !isRange)
            setSelectedDate(EthiopianDateUtils_1.EthiopianDate.toEth(value));
    }, [value, isRange]);
    const isSelectedDate = (day) => {
        return (day === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.Day) &&
            month === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.Month) &&
            year === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.Year));
    };
    const isRangeStart = (day) => {
        const currentDayGregorian = EthiopianDateUtils_1.EthiopianDate.toGreg(getEtDate(day));
        return !!(isRange && startDate && currentDayGregorian.getTime() === startDate.getTime());
    };
    const isRangeEnd = (day) => {
        const currentDayGregorian = EthiopianDateUtils_1.EthiopianDate.toGreg(getEtDate(day));
        return !!(isRange && endDate && currentDayGregorian.getTime() === endDate.getTime());
    };
    const inRange = (day) => {
        const currentDayGregorian = EthiopianDateUtils_1.EthiopianDate.toGreg(getEtDate(day));
        return !!(isRange && startDate && endDate && currentDayGregorian.getTime() > startDate.getTime() && currentDayGregorian.getTime() < endDate.getTime());
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { sx: {
                display: "grid",
                gridTemplateColumns: `repeat(7, ${cellSize})`,
                gap: gap,
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
            } }, days.map((day, index) => (react_1.default.createElement(material_1.Typography, { key: index, variant: "caption", sx: {
                justifySelf: "center",
                alignSelf: "center",
                color: "grey",
            } }, day)))),
        react_1.default.createElement(material_1.Box, { sx: {
                display: "grid",
                gridTemplateColumns: `repeat(7, ${cellSize})`,
                gap: gap,
            } }, Array.from({
            length: EthiopianDateUtils_1.EthiopianDate.ethiopianMonthLength(month, year),
        }, (_, index) => {
            const day = index + 1;
            const currentDayGregorian = EthiopianDateUtils_1.EthiopianDate.toGreg(getEtDate(day));
            return (react_1.default.createElement(material_1.IconButton, { key: index, disabled: isDisabled(day), onClick: () => {
                    if (isRange) {
                        if (!startDate || (startDate && endDate)) {
                            onDateChange([currentDayGregorian, null]);
                        }
                        else if (currentDayGregorian.getTime() < startDate.getTime()) {
                            onDateChange([currentDayGregorian, startDate]);
                        }
                        else {
                            onDateChange([startDate, currentDayGregorian]);
                        }
                    }
                    else {
                        setSelectedDate(getEtDate(day));
                        onDateChange(currentDayGregorian);
                        setGregDate(currentDayGregorian);
                    }
                }, sx: {
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: isRangeStart(day)
                        ? "primary.main"
                        : isRangeEnd(day)
                            ? "primary.main"
                            : inRange(day)
                                ? "action.selected"
                                : isSelectedDate(day)
                                    ? "primary.dark"
                                    : "transparent",
                    borderRadius: isRangeStart(day)
                        ? "50% 0 0 50%"
                        : isRangeEnd(day)
                            ? "0 50% 50% 0"
                            : inRange(day)
                                ? "0"
                                : "50%",
                    color: isRangeStart(day) || isRangeEnd(day) ? "white" : isSelectedDate(day) ? "white" : "black",
                    border: day === today.Day &&
                        month === today.Month &&
                        year === today.Year &&
                        !isSelectedDate(day) &&
                        !isRangeStart(day) &&
                        !isRangeEnd(day) &&
                        !inRange(day)
                        ? "1px solid grey"
                        : "none",
                    gridColumn: index === 0
                        ? EthiopianDateUtils_1.EthiopianDate.getEtMonthStartDate(month, year)
                        : undefined,
                    fontSize: "12px",
                    "&:hover": {
                        backgroundColor: isRangeStart(day) || isRangeEnd(day)
                            ? "primary.dark"
                            : inRange(day)
                                ? "action.hover"
                                : isSelectedDate(day)
                                    ? "primary.dark"
                                    : undefined,
                    },
                } }, day));
        }))));
};
exports.default = EthiopianDaysList;
