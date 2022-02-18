import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popactions from '.';
import { Button } from '@mui/material';

const OpenButton = ({ children }) => <button data-testid="openButton" >{children}</button>;

describe('<Popactions/>', () => {
  it('should render', () => {
    const btnText = 'Popactions';
    const { getByText, queryByText, unmount } = render(
      <Popactions>
        <OpenButton>{btnText}</OpenButton>
      </Popactions>
    );
    expect(getByText(btnText)).toBeInTheDocument();
    unmount()
    expect(queryByText(btnText)).not.toBeInTheDocument();
  });
  it('should render actions', () => {
    const btnText = 'Popactions'
    const { queryByText, getByTestId } = render(<Popactions actions={[
      {
      text: '认证流程',
      variant: 'outlined',
      },
      {
      text: '新增用户',
      },
  ]}
  ><OpenButton>{btnText}</OpenButton></Popactions>);
    userEvent.click(getByTestId('openButton'));
    expect(queryByText(btnText)).toBeInTheDocument();
  });
})