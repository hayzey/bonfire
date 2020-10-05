import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
    const { getByText } = render(<App />);
    const mainEle = document.querySelector('main');
    expect(mainEle).toBeInTheDocument();
});
