/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('unit test of <App/>', () => {
  test('test is working', () => {
    render(
      <Button
        schema={{
          type: 'Button',
          propValue: 'hello world',
          animations: [],
          events: [],
          style: {},
        }}
      />
    );
    // expect(screen.getByText('画布')).toBeInTheDocument();
  });
});
