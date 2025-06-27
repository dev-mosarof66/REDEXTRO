import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
import colors from '../../constants/colors';

const CheckPlan = ({ checked = false }) => {
  return (
    <>{
      checked && <Checkbox
        color={colors.two}
        status={checked ? 'checked' : 'unchecked'}
      />
    }</>
  );
};

export default CheckPlan;