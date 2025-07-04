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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const EthiopianYearList_1 = __importDefault(require("./EthiopianYearList"));
const EthiopianDaysList_1 = __importDefault(require("./EthiopianDaysList"));
const EtDatePickerContext_1 = require("../EtDatePickerContext");
const EthiopianDateUtils_1 = require("../util/EthiopianDateUtils");
const EtLocalizationProvider_1 = require("../EtLocalizationProvider");
const EthiopianDateCalendar = ({ isRange, startDate, endDate, initialViewDate, hoveredDate, setHoveredDate, onDateChange, onMonthChange, }) => {
    const { value, monthValue, setGregDate, gregDate } = (0, react_1.useContext)(EtDatePickerContext_1.EtDatePickerContext);
    const today = EthiopianDateUtils_1.EthiopianDate.toEth(new Date());
    const [ethDate, setEthDate] = (0, react_1.useState)(initialViewDate ? EthiopianDateUtils_1.EthiopianDate.toEth(initialViewDate) : today);
    const [showYearList, setShowYearList] = (0, react_1.useState)(false);
    const { localType, getLocalMonthName } = (0, EtLocalizationProvider_1.useEtLocalization)();
    const incrementMonth = () => {
        const gDate = EthiopianDateUtils_1.EthiopianDate.toGreg(Object.assign(Object.assign({}, ethDate), { Day: 15 }));
        if (ethDate.Month === 13) {
            const newEthDate = Object.assign(Object.assign({}, ethDate), { Month: 1, Year: ethDate.Year + 1, Day: 15 });
            setEthDate(newEthDate);
            onMonthChange === null || onMonthChange === void 0 ? void 0 : onMonthChange(EthiopianDateUtils_1.EthiopianDate.toGreg(newEthDate));
        }
        else {
            const newEthDate = Object.assign(Object.assign({}, ethDate), { Month: ethDate.Month + 1, Day: 15 });
            setEthDate(newEthDate);
            onMonthChange === null || onMonthChange === void 0 ? void 0 : onMonthChange(EthiopianDateUtils_1.EthiopianDate.toGreg(newEthDate));
        }
        if (!gregDate)
            return setGregDate(EthiopianDateUtils_1.EthiopianDate.toGreg(ethDate));
        const newGregDate = new Date(gregDate);
        newGregDate.setMonth(newGregDate.getMonth() + 1);
        setGregDate(newGregDate);
    };
    const decrementMonth = () => {
        if (ethDate.Month === 1) {
            const newEthDate = Object.assign(Object.assign({}, ethDate), { Year: ethDate.Year - 1, Month: 13, Day: 15 });
            setEthDate(newEthDate);
            onMonthChange === null || onMonthChange === void 0 ? void 0 : onMonthChange(EthiopianDateUtils_1.EthiopianDate.toGreg(newEthDate));
        }
        else {
            const newEthDate = Object.assign(Object.assign({}, ethDate), { Month: ethDate.Month - 1, Day: 15 });
            setEthDate(newEthDate);
            onMonthChange === null || onMonthChange === void 0 ? void 0 : onMonthChange(EthiopianDateUtils_1.EthiopianDate.toGreg(newEthDate));
        }
        if (!gregDate)
            return setGregDate(EthiopianDateUtils_1.EthiopianDate.toGreg(ethDate));
        const newGregDate = new Date(gregDate);
        newGregDate.setMonth(newGregDate.getMonth() - 1);
        setGregDate(newGregDate);
    };
    (0, react_1.useEffect)(() => {
        if (initialViewDate) {
            setEthDate(EthiopianDateUtils_1.EthiopianDate.toEth(initialViewDate));
        }
        else if (value && !isRange) {
            setEthDate(EthiopianDateUtils_1.EthiopianDate.toEth(value));
        }
    }, [value, isRange, initialViewDate]);
    (0, react_1.useEffect)(() => {
        if (!monthValue)
            return;
        const convertedDate = EthiopianDateUtils_1.EthiopianDate.toGreg(Object.assign({}, ethDate));
        const convertedMonth = convertedDate.getMonth();
        const convertedYear = convertedDate.getFullYear();
        const targetMonth = monthValue.getMonth();
        const targetYear = monthValue.getFullYear();
        const dateDifference = Math.abs(monthValue.getMonth() -
            EthiopianDateUtils_1.EthiopianDate.toGreg(Object.assign(Object.assign({}, ethDate), { Day: 15 })).getMonth());
        const isAfter = targetYear > convertedYear ||
            (targetYear === convertedYear && targetMonth > convertedMonth);
        const isBefore = targetYear < convertedYear ||
            (targetYear === convertedYear && targetMonth < convertedMonth);
        if (isAfter) {
            if (ethDate.Month === 12 || ethDate.Month === 13) {
                setEthDate(Object.assign(Object.assign({}, ethDate), { Month: 1, Year: ethDate.Year + 1 }));
            }
            else {
                if (dateDifference === 2 || dateDifference === 10) {
                    setEthDate((prev) => (Object.assign(Object.assign({}, prev), { Month: prev.Month + 2, Day: 15 })));
                    return;
                }
                setEthDate((prev) => (Object.assign(Object.assign({}, prev), { Month: prev.Month + 1 })));
            }
        }
        else if (isBefore) {
            if (ethDate.Month === 1) {
                setEthDate(Object.assign(Object.assign({}, ethDate), { Year: ethDate.Year - 1, Month: 12 }));
            }
            else {
                if (dateDifference === 0) {
                    setEthDate((prev) => (Object.assign(Object.assign({}, prev), { Month: prev.Month, Day: 15 })));
                    return;
                }
                setEthDate((prev) => (Object.assign(Object.assign({}, prev), { Month: prev.Month - 1 })));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthValue]);
    return (react_1.default.createElement(material_1.Box, { mx: 2 },
        react_1.default.createElement(material_1.Stack, { direction: "row", display: "flex", justifyContent: "space-between", m: 2 },
            react_1.default.createElement(material_1.Box, { sx: {
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }, onClick: () => setShowYearList(!showYearList) },
                react_1.default.createElement(material_1.Typography, null, `${EthiopianDateUtils_1.EthiopianDate.getEtMonthName(ethDate.Month, localType, getLocalMonthName)} ${ethDate.Year}`),
                react_1.default.createElement(material_1.IconButton, { size: "small" }, showYearList ? react_1.default.createElement(icons_material_1.ArrowDropUp, null) : react_1.default.createElement(icons_material_1.ArrowDropDown, null))),
            react_1.default.createElement(material_1.Box, { sx: { display: "flex" } },
                react_1.default.createElement(material_1.IconButton, { size: "small", onClick: decrementMonth },
                    react_1.default.createElement(icons_material_1.ChevronLeft, null)),
                react_1.default.createElement(material_1.IconButton, { size: "small", onClick: incrementMonth },
                    react_1.default.createElement(icons_material_1.ChevronRight, null)))),
        react_1.default.createElement(material_1.Box, null, showYearList ? (react_1.default.createElement(EthiopianYearList_1.default, { onYearClick: (selectedYear) => {
                setEthDate(Object.assign(Object.assign({}, ethDate), { Year: selectedYear }));
                setGregDate(EthiopianDateUtils_1.EthiopianDate.toGreg(Object.assign(Object.assign({}, ethDate), { Year: selectedYear })));
                setShowYearList(false);
            }, startYear: ethDate.Year })) : (react_1.default.createElement(EthiopianDaysList_1.default, { month: ethDate.Month, year: ethDate.Year, isRange: isRange, startDate: startDate, endDate: endDate, hoveredEtDate: hoveredDate ? EthiopianDateUtils_1.EthiopianDate.toEth(hoveredDate) : null, setHoveredEtDate: (ethDate) => setHoveredDate && setHoveredDate(ethDate ? EthiopianDateUtils_1.EthiopianDate.toGreg(ethDate) : null), onDateChange: onDateChange })))));
};
exports.default = EthiopianDateCalendar;
