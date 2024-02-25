import React, { useState } from 'react';
import WeekdayDateRangePicker from './WeekdayDateRangePicker.tsx';

const App: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  const [weekendDates, setWeekendDates] = useState<Date[]>([]);

  const handleDateRangeChange = (range: [Date, Date], weekends: Date[]) => {
    setSelectedRange(range);
    setWeekendDates(weekends);
  };

  const predefinedRanges: { label: string; value: [Date, Date] | [Date] }[] = [
    { label: 'Last 7 Days', value: [new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000), new Date()] },
    { label: 'Last 30 Days', value: [new Date(new Date().getTime() - 29 * 24 * 60 * 60 * 1000), new Date()] },
    // Add more predefined ranges as needed
  ];


  return (
    <div>
      <h1>Weekday Date Range Picker App</h1>
      <WeekdayDateRangePicker onChange={handleDateRangeChange} predefinedRanges={predefinedRanges} />

      {selectedRange && (
        <div>
          <h2>Selected Date Range:</h2>
          <p>{`Start Date: ${selectedRange[0].toLocaleDateString()}`}</p>
          <p>{`End Date: ${selectedRange[1].toLocaleDateString()}`}</p>
        </div>
      )}

      {weekendDates.length > 0 && (
        <div>
          <h2>Weekend Dates:</h2>
          <ul>
            {weekendDates.map((date, index) => (
              <li key={index}>{date.toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
