# 🇪🇹 Habesha DatePicker

**Version: 0.2.2**

A beautiful and culturally-aware Ethiopian calendar component built for modern React applications. Powered by **Material-UI**, `habesha-datepicker` simplifies date selection, supporting the Ethiopian calendar, Afan Oromo labels, and the Gregorian calendar.


## 🚀 Installation

To get started, install the package via npm:

```bash
npm install habesha-datepicker
```

**Required Peer Dependencies:**

This package relies on the following peer dependencies. Please ensure they are also installed in your project:

```
"@emotion/react": "^11.11.0",
"@emotion/styled": "^11.11.0",
"@mui/icons-material": "^5.14.6",
"@mui/material": "^5.14.6",
"@mui/x-date-pickers": "^6.11.2",
"date-fns": "^2.30.0",
"react": "^18.2.0",
"react-dom": "^18.2.0"
```

You can install them all at once using this command:

```bash
npm install @mui/icons-material @mui/material @mui/x-date-pickers date-fns react react-dom
```

## 🧠 Usage

### Single Date Picker

Use it for selecting a single date, just like any standard date picker.

```tsx
import React, { useState } from "react";
import EtDatePicker from "habesha-datepicker";

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <EtDatePicker
      label="Select Document Date"
      value={selectedDate}
      onChange={(date) => setSelectedDate(date as Date | null)}
      minDate={new Date("YYYY-MM-DD")}
      maxDate={new Date("YYYY-MM-DD")}
    />
  );
}
```
![Habesha DatePicker Screenshot](https://drive.google.com/uc?export=view&id=1oG1zswr8xCVq5Fyx2JAvi-Ih5utWF2bw)

---
### Range Picker (Start → End)

Need to select a date range? It's straightforward.

```tsx
import React, { useState } from "react";
import EtDatePicker from "habesha-datepicker";

function MyRangeComponent() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <EtDatePicker
      label="Select Date Range"
      isRange
      value={dateRange}
      onChange={(range) => setDateRange(range as [Date | null, Date | null])}
    />
  );
}
```
![Habesha DatePicker Screenshot](https://drive.google.com/uc?export=view&id=19TAm4V71Mm-SFMrw0nsXhA_RB95Ahw7_)

---
## 🌍 Localization
Since version 0.1.7, the date picker offers robust localization options:

*   **GC** – Gregorian Calendar
*   **EC** – Ethiopian Calendar (Amharic)
*   **AO** – Afan Oromo
*   **CUSTOM** – Define your own calendar labels

### Step 1: Wrap your application with the provider

```tsx
import { EtLocalizationProvider } from "habesha-datepicker";

function MyApp({ children }) {
  return (
    <EtLocalizationProvider localType="EC"> {/* or 'AO', 'GC', 'CUSTOM' */}
      {children}
    </EtLocalizationProvider>
  );
}
```

### Step 2: Utilize CUSTOM localization (optional)

For full control over month names, use the `CUSTOM` type and provide your own `getLocalMonthName` function:

```tsx
<EtLocalizationProvider
  localType="CUSTOM"
  getLocalMonthName={(month) => ["Custom Month 1", "Custom Month 2", "Custom Month 3", "Custom Month 4", "Custom Month 5", "Custom Month 6", "Custom Month 7", "Custom Month 8", "Custom Month 9", "Custom Month 10", "Custom Month 11", "Custom Month 12", "Custom Month 13"][month - 1]}
>
  {children}
</EtLocalizationProvider>
```

## 🗓 EtDateViewer

If you simply need to display a date without the ability to edit it, the `EtDateViewer` component is perfect.

```tsx
import { EtDateViewer } from "habesha-datepicker";

<EtDateViewer date={new Date()} sx={{ color: "blue" }} variant="h6" />;
```

## 🧰 EthiopianDateUtil

This utility provides helpful functions for working with Ethiopian dates directly.

### Create a date manually

```ts
import { EthiopianDate } from "habesha-datepicker";

const newEthiopianDate = EthiopianDate.createEthiopianDateFromParts(23, 7, 2013); // Day, Month, Year
```

### Convert between calendars

```ts
import { EthiopianDate } from "habesha-datepicker";

const ethiopianDate = EthiopianDate.toEth(new Date()); // Converts Gregorian Date to Ethiopian Date
const gregorianDate = EthiopianDate.toGreg({ Day: 23, Month: 7, Year: 2013 }); // Converts Ethiopian Date to Gregorian Date
```

### Get all month names

Access the array of Ethiopian month names:

```ts
import { EthiopianDate } from "habesha-datepicker";

const allEthiopianMonths = EthiopianDate.ethMonths;
```

## 🛠 Support & Contributions

Encounter a bug, have an idea for improvement, or want to add a new feature? Your contributions are welcome!

*   **Open an issue:** Share your findings or suggestions.
*   **Create a pull request:** Directly contribute to the codebase.

Your support helps make this project better for everyone! 🙌