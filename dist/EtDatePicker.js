"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const format_1 = __importDefault(require("date-fns/format"));
const icons_material_1 = require("@mui/icons-material");
const EtDatePickerContext_1 = require("./EtDatePickerContext");
const EthiopianDateUtils_1 = require("./util/EthiopianDateUtils");
const EtGrDateCalendar_1 = __importDefault(require("./Components/EtGrDateCalendar"));
const EtLocalizationProvider_1 = require("./EtLocalizationProvider");
const EtDatePicker = (_a) => {
    var { onClick, value, onChange, isRange } = _a, props = __rest(_a, ["onClick", "value", "onChange", "isRange"]);
    const { localType, getLocalMonthName } = (0, EtLocalizationProvider_1.useEtLocalization)();
    const [dateType, setDateType] = (0, react_1.useState)(localType);
    const [date, setDate] = (0, react_1.useState)(undefined);
    const [startDate, setStartDate] = (0, react_1.useState)(null);
    const [endDate, setEndDate] = (0, react_1.useState)(null);
    const [anchorEl, setAnchorEl] = react_2.default.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        if (isRange && (!startDate || !endDate))
            return;
        setAnchorEl(null);
    };
    const handleDateChange = (newValue) => {
        if (isRange) {
            const [sDate, eDate] = newValue;
            setStartDate(sDate);
            setEndDate(eDate);
            onChange === null || onChange === void 0 ? void 0 : onChange([sDate, eDate]);
        }
        else {
            setDate(newValue);
            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
            if (newValue instanceof Date) {
                setAnchorEl(null);
            }
        }
    };
    const handleDateTypeChange = (event) => {
        const newDateType = dateType === "GC" ? localType : "GC";
        setDateType(newDateType);
        event.stopPropagation();
    };
    const { disableSwitcher } = (0, EtLocalizationProvider_1.useEtLocalization)();
    (0, react_1.useEffect)(() => {
        if (isRange) {
            if (Array.isArray(value) && value.length === 2) {
                setStartDate(value[0]);
                setEndDate(value[1]);
            }
            else {
                setStartDate(null);
                setEndDate(null);
            }
        }
        else {
            if (value instanceof Date || value === null) {
                setDate(value);
            }
            else {
                setDate(undefined);
            }
        }
    }, [value, isRange]);
    return (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(material_1.TextField, Object.assign({}, props, { value: isRange
                ? `${startDate ? (0, format_1.default)(startDate, "dd/MMM/yyyy") : "-"} - ${endDate ? (0, format_1.default)(endDate, "dd/MMM/yyyy") : "-"}`
                : date
                    ? dateType === "GC"
                        ? (0, format_1.default)(date, "dd/MMM/yyyy")
                        : EthiopianDateUtils_1.EthiopianDate.formatEtDate(EthiopianDateUtils_1.EthiopianDate.toEth(date), localType, getLocalMonthName)
                    : "-", InputProps: {
                onClick: props.disabled
                    ? undefined
                    : (event) => {
                        handleClick(event);
                    },
                startAdornment: disableSwitcher ? undefined : (react_2.default.createElement(material_1.InputAdornment, { position: "start" },
                    react_2.default.createElement(material_1.ButtonBase, { onClick: handleDateTypeChange },
                        react_2.default.createElement(material_1.Typography, { fontWeight: 700, color: "primary" }, dateType === "CUSTOM" ? "CU" : dateType)))),
                endAdornment: (react_2.default.createElement(material_1.InputAdornment, { position: "end" },
                    react_2.default.createElement(material_1.IconButton, { onClick: handleClick, disabled: props.disabled },
                        react_2.default.createElement(icons_material_1.EventOutlined, null)))),
            } })),
        react_2.default.createElement(material_1.Menu, { id: "basic-menu", anchorEl: anchorEl, open: open, onClose: handleClose, MenuListProps: {
                "aria-labelledby": "basic-button",
            } },
            react_2.default.createElement(EtDatePickerContext_1.EtDatePickerProvider, { onChange: handleDateChange, disableFuture: props.disableFuture, disablePast: props.disablePast, minDate: props.minDate, maxDate: props.maxDate, value: isRange ? [startDate, endDate] : date, dateType: dateType === "AO" || dateType === "CUSTOM" ? "GC" : dateType, isRange: isRange },
                react_2.default.createElement(EtGrDateCalendar_1.default, null)))));
};
exports.default = EtDatePicker;
