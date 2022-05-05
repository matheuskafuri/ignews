import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { SignInButton } from '.';
import { createMock } from 'ts-jest-mock';

jest.mock('next-auth/client')

describe('SignInButton component', () => {
  it('should render correctly when user is not logged in', () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('should render correctly when user is logged in', () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: 'John Doe',
        email: 'john@doe.com',
      }, 
      expires: 'fake-expires',
    }, false]);

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
})