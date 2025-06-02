import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "./Apis";

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

export function usePaginatedApi(endpoint, query = '', deps = []) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadData = useCallback(async () => {
    if (!hasMore && page !== 1) return;
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      let url = `${endpoint}?page=${page}`;
      if (query) url += `&q=${encodeURIComponent(query)}`;
      const res = await authAPI(token).get(url);
      if (page === 1) {
        setData(res.data.results);
      } else {
        setData(prev => [...prev, ...res.data.results]);
      }
      setHasMore(res.data.next !== null);
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [endpoint, query, page, hasMore]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [query, ...deps]);

  useEffect(() => {
    let timer = setTimeout(() => {
      loadData();
    }, 500);
    return () => clearTimeout(timer);
  }, [query, page, loadData]);

  const loadMore = () => {
    if (!loading && hasMore && data.length > 0) {
      setPage(prev => prev + 1);
    }
  };

  return { data, loading, hasMore, page, setPage, loadMore, setData };
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