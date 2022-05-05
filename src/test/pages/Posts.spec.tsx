import { render, screen } from '@testing-library/react';
import { getPrismicClient } from '../../services/prismic';
import { createMock } from 'ts-jest-mock';

import Posts, { getStaticProps } from '../../pages/posts';

jest.mock('../../services/prismic');


const posts = [
  { 
    slug: 'post-1',
    title: 'Post 1',
    excerpt: 'Excerpt 1',
    updatedAt: '10 de Abril',
  }
]

describe('Posts page', () => {
  it('should render correctly', () => {
    render(<Posts posts={ posts } />);

    expect(screen.getByText("Post 1")).toBeInTheDocument();
  });

  it('should load initial data', async () => {
    const getPrismicClientMocked = createMock(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          { 
            uid: 'post-1',
            data: {
              title: [
                { type: 'heading', text: 'Post 1' }
              ],
              content: [
                { type: 'paragraph', text: 'Excerpt 1' }
              ]
            },
            last_publication_date: '04-01-2022',
          }
        ]
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'post-1',
            title: 'Post 1',
            excerpt: 'Excerpt 1',
            updatedAt: '01 de abril de 2022',
          }]
        },
      }),
    );
  })
})
