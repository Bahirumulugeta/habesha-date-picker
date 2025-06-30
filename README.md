# Habesha Date DatePicker

Current Version: 0.2.1

An Ethiopian date picker component designed for React applications. It's built on top of Material-UI and provides a culturally tailored date picker experience integrated seamlessly with other MUI components.

![Screenshot of DatePicker](https://drive.google.com/file/d/1XHGNh8F578IB9fY5F6RRaC1TvFuSdDer/view?usp=drive_link)
Replace `YOUR_IMAGE_LINK_HERE` with the actual link to your image.

## Installation

You can install the package using npm:

```console
npm install habesha-datepicker
```

### Peer Dependencies

```code
"peerDependencies": {
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0",
  "@mui/icons-material": "^5.14.6",
  "@mui/material": "^5.14.6",
  "@mui/x-date-pickers": "^6.11.2",
  "date-fns": "^2.30.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

You can install them using:

```console
npm install @mui/icons-material @mui/material @mui/x-date-pickers date-fns react react-dom
```

## Usage

### Basic Usage with `EtDatePicker` (Single Date Selection)

To use the date picker for single date selection:

```tsx
import React, { useState } from "react";
import EtDatePicker from "habesha-datepicker";

function MyComponent() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <EtDatePicker
      label="Document Date"
      onChange={(selectedDate) => {
        setDate(selectedDate as Date | null); // Cast if necessary based on your exact onChange signature
      }}
      value={date}
      minDate={new Date("2023-08-20")}
      maxDate={new Date("2023-08-26")}
      // other TextField props here, except InputProps
    />
  );
}
```

### Range Date Selection

To enable date range selection, set the `isRange` prop to `true`. The `value` prop will then be an array `[startDate, endDate]` and `onChange` will provide a similar array.

```tsx
import React, { useState } from "react";
import EtDatePicker from "habesha-datepicker";

function MyRangeComponent() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <EtDatePicker
      label="Date Range"
      isRange={true}
      onChange={(selectedRange) => {
        setDateRange(selectedRange as [Date | null, Date | null]);
      }}
      value={dateRange}
      // You can still use minDate and maxDate to restrict the overall range
    />
  );
}
```

## Localization Support in `Version 0.1.1`

Starting from version 0.1.7, `habesha-datepicker` introduces localization support for different Ethiopian localizations. This feature allows a more tailored experience for users.


#### 1. First, you need to import the EtLocalizationProvider from the habesha-datepicker package.

```tsx

import { EtLocalizationProvider } from 'habesha-datepicker';

```


#### 2. Wrap Your Application or Component:
Use the EtLocalizationProvider to wrap your entire application or just the section where the date picker is used. This will ensure that all date pickers within this context are localized.

```tsx

function MyApp({ children }) {
  return (
    <EtLocalizationProvider localType="EC">
      {children}
    </EtLocalizationProvider>
  );
}
```
#### 3. Configure the Localization Provider:
The EtLocalizationProvider accepts the following props to configure the localization:

`localType:` This can be set to "GC" (Gregorian Calendar), "EC" (Amharic - Ethiopian Calendar), "AO" (Afan Oromo), or "CUSTOM". It defines the type of localization you want to apply. "GC", "EC" and "AO" are predefined localizations, while "CUSTOM" allows for more personalized configurations.

`getLocalMonthName:` This optional function is used only when localType is set to "CUSTOM". It allows you to provide a custom function to return the name of the month based on the month number.

```tsx
function MyApp() {
  const getCustomMonthName = (month: number) => {
    // Define custom month names
    const customMonthNames = ["Custom Month 1", "Custom Month 2", ...];
    return customMonthNames[month - 1];
  };

  return (
    <EtLocalizationProvider localType="CUSTOM" getLocalMonthName={getCustomMonthName}>
      {children}
    </EtLocalizationProvider>
  );
}


```


### Using `EtDateViewer`

```tsx
import { EtDateViewer } from "habesha-datepicker";

<EtDateViewer date={new Date()}  sx={{ color: "red" }} variant="h6" />

```
 

## EthiopianDateUtil

`EthiopianDateUtil` is a utility module that provides various functions for working with Ethiopian dates. Here are some of the key functionalities:

### Creating an Ethiopian Date

```typescript
import { EthiopianDate } from 'habesha-datepicker';

const date = EthiopianDate.createEthiopianDateFromParts(23, 7, 2013);
```

### Convert To and From Gregorian

```typescript
import { EthiopianDate } from 'habesha-datepicker';

const etDate = EthiopianDate.toEth(new Date());
const grDate = EthiopianDate.toGreg(etDate);
```

### Getting Ethiopian Months

```typescript
import { EthiopianDate } from 'habesha-datepicker';

const months = EthiopianDate.ethMonths;
```

### Examples

#### Convert a Gregorian Date to Ethiopian Date

```typescript
const etDate = EthiopianDate.toEth(new Date());
```

#### Convert an Ethiopian Date to Gregorian Date

```typescript
const grDate = EthiopianDate.toGreg({ Day: 23, Month: 7, Year: 2013 });
```

#### Get the Names of Ethiopian Months

```typescript
const months = EthiopianDate.ethMonths;
```

For more functionalities, refer to the source code.

## Support and Contributions

Feel free to open issues or PRs if you find any problems or have suggestions for improvements.
