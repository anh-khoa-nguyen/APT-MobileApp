import React from 'react';

// Components utils
export function capitalize(str) {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d)) return dateString;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export function getDateTimeString(dateStr) {
  if (!dateStr) return '';
  const dateTime = dateStr.slice(0, 19).replace('T', ' ');
  const [date, time] = dateTime.split(' ');
  if (!date || !time) return dateTime;
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year} at ${time.replace(/:/g, ':')}`;
}


// App.js
export function createStack(Stack, screens) {
  return () => (
    <Stack.Navigator>
      {screens.map(({ name, component, options }, idx) => (
        <Stack.Screen
          key={name || idx}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
}