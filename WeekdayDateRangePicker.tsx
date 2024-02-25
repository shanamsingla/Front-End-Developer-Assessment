import React, { useState, useEffect } from 'react';
import { startOfDay, endOfDay, addDays, subDays, startOfMonth, endOfMonth, isWeekend } from 'date-fns';

interface WeekdayDateRangePickerProps {
  onChange: (selectedRange: [Date, Date], weekends: Date[]) => void;
  predefinedRanges?: { label: string; value: [Date, Date] | [Date] }[] | undefined;
}

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  onChange,
  predefinedRanges = [],
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
  }, [selectedYear, selectedMonth]);

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    const selectedStartDate = getWeekdayFromDate(date);
    const selectedEndDate = getWeekdayFromDate(endDate || date);

    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);

    const weekdays = getWeekdaysBetween(selectedStartDate, selectedEndDate);
    const weekends = getWeekendsBetween(selectedStartDate, selectedEndDate);

    onChange([selectedStartDate, selectedEndDate], weekends);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const getWeekdayFromDate = (date: Date) => {
    const day = date.getDay();
    if (day === 0) date.setDate(date.getDate() + 1);
    if (day === 6) date.setDate(date.getDate() - 1);
    return new Date(date);
  };

  const getWeekdaysBetween = (startDate: Date, endDate: Date) => {
    const weekdays: Date[] = [];
    let currentDate: Date = new Date(startDate);

    while (currentDate <= endDate) {
      weekdays.push(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekdays;
  };

  const getWeekendsBetween = (startDate: Date, endDate: Date) => {
    const weekends: Date[] = [];
    let currentDate: Date = new Date(startDate);

    while (currentDate <= endDate) {
      if (isWeekend(currentDate)) {
        weekends.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekends;
  };

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate?.toISOString().split('T')[0]}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate?.toISOString().split('T')[0]}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
          min={startDate?.toISOString().split('T')[0]}
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <label>Month:</label>
        <input
          type="number"
          value={selectedMonth + 1}
          onChange={(e) => handleMonthChange(parseInt(e.target.value, 10) - 1)}
        />
      </div>

      {/* Display predefined date ranges */}
      <div>
        {predefinedRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => {
              let selectedRange: [Date, Date];
              if (range.value.length === 1) {
                // Handle single date case
                selectedRange = [range.value[0], range.value[0]];
              } else {
                // Handle date range case
                selectedRange = range.value as [Date, Date];
              }

              onChange(selectedRange, getWeekendsBetween(selectedRange[0], selectedRange[1]));
            }}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekdayDateRangePicker;
