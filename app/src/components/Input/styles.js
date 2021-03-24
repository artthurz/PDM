import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  background: transparent;
  border-color:  rgba(209, 209, 214, 0.8);
  border-width: 1px;

  width: 80%;
  margin-bottom: 10px;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0, 0, 0, 0.8)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #000;
`;