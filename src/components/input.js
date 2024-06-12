import React, { useEffect } from 'react';
import styles from '../styles/Write.module.css'
import styled, { css } from 'styled-components';

const Input = ({ text, type, label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        placeholder={text}
        type={type}
        value={value}
        onChange={onChange}
        className={styles['inputStyle']}
      />
    </div>
  );
};

export default Input;
