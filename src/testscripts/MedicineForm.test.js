import React from "react";
import MedicinePage from "../components/ui/MedicinePage";
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import {link,BrowserRouter} from 'react-router-dom';

const Mockcontainer = ()=>{
    return(<BrowserRouter>
    <MedicinePage/>
    </BrowserRouter>);
}

describe("testing medicine display page", ()=>{
    test("check whether Add medicine link is present",async ()=>{
        const r = render(<Mockcontainer />);
        const p = await waitForElementToBeRemoved(()=>(screen.getByText("Loading Medicines....")),{timeout:10000});
        const addMedicinelink = screen.getByText("Add Medicine");
        expect(addMedicinelink).toBeInTheDocument();
    });
    test("check whether table is loaded",async ()=>{
        const r = render(<Mockcontainer />);
        const p = await waitForElementToBeRemoved(()=>(screen.getByText("Loading Medicines....")),{timeout:10000});                    
        const medTable = await (await screen.findByTestId("medTable")).firstChild;
        expect(medTable).toHaveClass("MuiDataGrid-root");
    })
});
