import {render,screen} from '@testing-library/react';
import LoginForm from '../components/ui/LoginForm';

//check whether submit button is present.
test('Checking Homepage Submit button',()=>{
    render(<LoginForm/>);
    const submitBtn = screen.getByText(/Submit/);
    expect(submitBtn).toBeInTheDocument();
});

//check whether user id text box is present
test('Checking whether user id text box is present',()=>{
    render(<LoginForm/>);
    const userIdTextBox = screen.getByTestId('userId');
    expect(userIdTextBox).toBeInTheDocument();
});
//check whether password text box is present
test('Checking whether password text box is present',()=>{
    render(<LoginForm />);
    const passwordTextBox = screen.getByPlaceholderText('Password');
    expect(passwordTextBox).toBeInTheDocument();
});