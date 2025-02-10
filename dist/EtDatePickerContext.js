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
exports.EtDatePickerContext = exports.EtDatePickerProvider = void 0;
const react_1 = __importStar(require("react"));
const x_date_pickers_1 = require("@mui/x-date-pickers");
const AdapterDateFns_1 = require("@mui/x-date-pickers/AdapterDateFns");
const EtDatePickerContext = (0, react_1.createContext)({
    value: new Date(),
    monthValue: new Date(),
    gregDate: new Date(),
    setGregDate: (date) => { },
    onMonthChange: (date) => { },
    onDateChange: (date) => { },
    dateType: "EN",
});
exports.EtDatePickerContext = EtDatePickerContext;
const EtDatePickerProvider = ({ children, onChange, value, disableFuture, disablePast, minDate, maxDate, dateType, }) => {
    const [date, setDate] = (0, react_1.useState)();
    const [monthValue, setMonthValue] = (0, react_1.useState)();
    const [gregDate, setGregDate] = (0, react_1.useState)();
    const onDateChange = (date) => {
        setDate(date);
        onChange === null || onChange === void 0 ? void 0 : onChange(date);
    };
    const onMonthChange = (date) => {
        setMonthValue(date);
    };
    (0, react_1.useEffect)(() => {
        if (value) {
            setDate(value);
            setGregDate(value);
        }
    }, [value]);
    return (react_1.default.createElement(x_date_pickers_1.LocalizationProvider, { dateAdapter: AdapterDateFns_1.AdapterDateFns },
        react_1.default.createElement(EtDatePickerContext.Provider, { value: {
                value: date !== null && date !== void 0 ? date : undefined,
                monthValue: monthValue,
                gregDate: gregDate,
                setGregDate,
                onMonthChange,
                onDateChange,
                disableFuture,
                disablePast,
                minDate,
                maxDate,
                dateType,
            } }, children)));
};
exports.EtDatePickerProvider = EtDatePickerProvider;
