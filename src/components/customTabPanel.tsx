'use client'
import React from 'react';
import Box from '@mui/material/Box';

interface CustomTabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const CustomTabPanel = ({ children, value, index }:CustomTabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default CustomTabPanel;