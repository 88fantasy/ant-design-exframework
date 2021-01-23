import React from 'react';
import { Select, Input } from "antd";
const { Option } = Select

interface Props {
  value?: {
    number: number,
    currency: number
  };
  onChange?: (value: {
    number?: number,
    currency?: number
  }) => void;
}

const Example: React.FC<Props> = ({ value = {} , onChange }) => {
  const triggerChange = (changedValue: {
    number?: number,
    currency?: number
  }) => {
    if (onChange) {
      onChange({ ...value, ...changedValue });
    }
  };

  const onNumberChange = (e: any) => {
    const newNumber = parseInt(e.target.value || 0, 10);
    triggerChange({ number: newNumber });
  };

  const onCurrencyChange = (newCurrency: number) => {
    triggerChange({ currency: newCurrency });
  };

  return (
    <span>
      <Input
        type="number"
        value={value.number}
        onChange={onNumberChange}
        style={{ width: 100 }}
      />
      <Select
        value={value.currency}
        style={{ width: 80, margin: '0 8px' }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};

export default Example;