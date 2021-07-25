import React from 'react';
import Counter from '../Counter';
import {
  render,
  fireEvent,
  Matcher,
  MatcherOptions,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

let getByTestId: (text: Matcher, options?: MatcherOptions) => HTMLElement;

beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

test('Header renders with correct text', () => {
  const headerEl = getByTestId('header');
  expect(headerEl.textContent).toBe('My Counter');
});

test('Counter initially starts with text of 0', () => {
  const counterEl = getByTestId('counter');
  expect(counterEl.textContent).toBe('0');
});

test('Input contians initial value of 1', () => {
  const inputEl = getByTestId('input') as HTMLInputElement;
  expect(inputEl.value).toBe('1');
});

test('Add button renders with plus sign', () => {
  const addBtn = getByTestId('add-btn');
  expect(addBtn.textContent).toBe('+');
});

test('Subtract button renders with minus sign', () => {
  const subtractBtn = getByTestId('sub-btn');
  expect(subtractBtn.textContent).toBe('-');
});

test('Changing value of input works correctly', () => {
  const inputEl = getByTestId('input') as HTMLInputElement;
  expect(inputEl.value).toBe('1');

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  });

  expect(inputEl.value).toBe('5');
});

test('Clicking on plus btn adds 1 to counter', () => {
  const addBtn = getByTestId('add-btn');
  const counterEl = getByTestId('counter');

  fireEvent.click(addBtn);
  expect(counterEl.textContent).toBe('1');
});

test('Clicking on subtract btn subtracts 1 to counter', () => {
  const subtractBtn = getByTestId('sub-btn');
  const counterEl = getByTestId('counter');

  fireEvent.click(subtractBtn);
  expect(counterEl.textContent).toBe('-1');
});

test('Change input value then clicking on add btn works correctly', () => {
  const addBtn = getByTestId('add-btn');
  const counterEl = getByTestId('counter');
  const inputEl = getByTestId('input');

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  });

  fireEvent.click(addBtn);
  expect(counterEl.textContent).toBe('5');
});

test('Change input value then clicking on subtract btn works correctly', () => {
  const subtractBtn = getByTestId('sub-btn');
  const counterEl = getByTestId('counter');
  const inputEl = getByTestId('input');

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  });

  fireEvent.click(subtractBtn);
  expect(counterEl.textContent).toBe('-5');
});

test('Adding and subtracting leads to the correct counter number', () => {
  const addBtn = getByTestId('add-btn');
  const subtractBtn = getByTestId('sub-btn');
  const counterEl = getByTestId('counter');
  const inputEl = getByTestId('input');

  fireEvent.change(inputEl, {
    target: {
      value: '10',
    },
  });

  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);

  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);

  expect(counterEl.textContent).toBe('20');

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  });

  fireEvent.click(addBtn);

  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);

  expect(counterEl.textContent).toBe('5');
});

test('Counter text changes to green when greater or equal to 100', () => {
  const addBtn = getByTestId('add-btn');
  const counterEl = getByTestId('counter');
  const inputEl = getByTestId('input');
  const subtractBtn = getByTestId('sub-btn');

  fireEvent.change(inputEl, {
    target: {
      value: '100',
    },
  });

  fireEvent.click(addBtn); // 100
  expect(counterEl.className).toBe('green');
  fireEvent.click(addBtn); // 200
  expect(counterEl.className).toBe('green');

  fireEvent.click(subtractBtn); // 100
  fireEvent.click(subtractBtn); // 0
  expect(counterEl.className).toBe('');

  fireEvent.click(subtractBtn); // -100
  expect(counterEl.className).toBe('red');
  fireEvent.click(subtractBtn); // -200
  expect(counterEl.className).toBe('red');
});
