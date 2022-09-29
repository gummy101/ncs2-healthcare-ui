import HomePage from "../components/ui/Homepage";
import { render, screen } from '@testing-library/react';

describe("testing Homepage", () => {
    //check whether the image is present using findBY
    test('checking whether homepage image is present', async () => {
        render(<HomePage />);
        const loginImg = await screen.findByTestId("imgContainer");
        expect(loginImg).toBeInTheDocument();
    });

    //check whether welcome message is rendered properly
    test('checking whether welcome message is rendered properly', () => {
        var msgs = ['Get Medicines delivered to your doorstep.', 'Fast Checkout. Secure Delivery.', 'Next Day delivery.'];
        render(<HomePage />);
        const p1 = screen.getByText(msgs[0]);
        expect(p1).toBeInTheDocument();

        const p2 = screen.getByText(msgs[1]);
        expect(p2).toBeInTheDocument();

        const p3 = screen.getByText(msgs[2]);
        expect(p3).toBeInTheDocument();

    });
});
