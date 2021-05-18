import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsSearch from './NewsSearch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getThePaper, scourPaper } from '../services/newsApi';

require('dotenv').config();

jest.mock('../services/newsApi.js', () => ({
  getThePaper() {
    return Promise.resolve([
      {
        title: 'Ghosts, are they you?',
        author: 'Mr. Boo',
        description: 'A study on past, present, and future ghosts',
        url: 'www.ghost.com',
        source: 'The Washington Ghost'
      }
    ]);
  },
  
  scourPaper() {
    return Promise.resolve([
      {
        title: 'Ghosts, are they you?',
        author: 'Mr. Boo',
        description: 'A study on past, present, and future ghosts',
        url: 'www.ghost.com',
        source: 'The Washington Ghost'
      }
    ])
  }
}))

describe('NewsSearch container', () => {

  it('renders App', async () => {
    render(<NewsSearch />);

    screen.getByLabelText('loading')

    const ul = await screen.findByRole('list', { name: 'articles' });
    expect(ul).not.toBeEmptyDOMElement();
    expect(ul).toMatchSnapshot();

    const input = await screen.findByLabelText('article search');
    userEvent.type(input, 'ghosts');
    expect(input).toMatchSnapshot();

    const submitButton = await screen.findByRole('button', { name: 'search-articles' })
    userEvent.click(submitButton);
    expect(submitButton).toMatchSnapshot();

    const article = await screen.findAllByRole('listitem', { name: 'article' })
    expect(article).toMatchSnapshot();
  });
});
