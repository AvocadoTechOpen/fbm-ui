import React from 'react';
import { render } from '@testing-library/react';
import  userEvent from '@testing-library/user-event'
import Popconfirm from '.'
import { Button } from '@mui/material';

const OpenButton = ({children}) => <button data-testid="openButton" >{children}</button>;

describe('<Popconfirm/>', () => {
  it('should render' , () => {
    const btnText = 'PopConfirm'
    const { getByText, queryByText, unmount } = render(
      <Popconfirm>
        <Button>{btnText}</Button>
      </Popconfirm>
    );
    expect(getByText(btnText)).toBeInTheDocument();
    unmount()
    expect(queryByText(btnText)).not.toBeInTheDocument();
  });

  it('should render openButton', () => {
    const btnText = 'PopConfirm'
    const { getByTestId } = render(<Popconfirm ><OpenButton>{btnText}</OpenButton></Popconfirm>);
    expect(getByTestId('openButton')).toBeInTheDocument()
  })

  it('should render title', () => {
    const btnText = 'PopConfirm'
    const mesText = '这是Popconfirm的title';
    const { queryByText, getByTestId } = render(<Popconfirm title={mesText}><OpenButton>{btnText}</OpenButton></Popconfirm>);
    userEvent.click(getByTestId('openButton'));
    expect(queryByText(mesText)).toBeInTheDocument();
  });

  it('should render content', () => {
    const btnText = 'PopConfirm'
    const mesText = '这是Popconfirm的content';
    const { queryByText, getByTestId } = render(<Popconfirm content={mesText}><OpenButton>{btnText}</OpenButton></Popconfirm>);
    userEvent.click(getByTestId('openButton'));
    expect(queryByText(mesText)).toBeInTheDocument();
  });

})