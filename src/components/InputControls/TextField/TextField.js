import React from 'react';

function TextField(props) {
  const {
    id,
    type,
    name,
    className,
    placeholder,
    disabled,
    dataError,
    onChange,
    onBlur,
    value,
  } = props;
  return (
    <textarea
      id={id || ''}
      type={type || 'text'}
      name={name || ''}
      className={className || 'form-control'}
      placeholder={placeholder || ''}
      disabled={!!disabled}
      data-error={dataError || ''}
      onChange={onChange || null}
      onBlur={onBlur || null}
      value={value || null}
    />
  );
}

export default TextField;
