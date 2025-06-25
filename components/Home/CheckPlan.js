import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
import colors from '../../constants/colors';

const CheckPlan = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      color={colors.two}
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
  );
};

export default CheckPlan;