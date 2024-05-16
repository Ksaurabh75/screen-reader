import React from 'react';
import styled from 'styled-components';

const InputGroupsSection = styled.section`
  margin: 12px;
  padding: 16px;
`;

const InputWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-weight: 500;
    margin: 16px;
  }
`;

const InputRadioWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 14px;
    font-weight: 500;
  }
  .lablegroup {
    display: flex;
    div {
      margin: 16px;
    }
  }
`;

export const GenericTextInputSection = ({ title, fields }) => {
  return (
    <InputGroupsSection>
      <h2>{title}</h2>
      {fields.map((field, index) => (
        <InputWithLabel key={index}>
          <label htmlFor={field.id}>{field.label}</label>
          <input id={field.id} type={field.type} />
        </InputWithLabel>
      ))}
    </InputGroupsSection>
  );
};

export const GenericRadioInputSection = ({ title, inputLabel, inputName, inputValues }) => {
  return (
    <InputGroupsSection>
      <h2>{title}</h2>
      <InputRadioWithLabel>
        <p htmlFor={inputName}>{inputLabel}</p>
        <div className="lablegroup">
          {inputValues.map((value, index) => (
            <div key={index}>
              <label htmlFor={value.id}>{value.label}</label>
              <input type="radio" id={value.id} name={inputName} value={value.value} />
            </div>
          ))}
        </div>
      </InputRadioWithLabel>
    </InputGroupsSection>
  );
};
