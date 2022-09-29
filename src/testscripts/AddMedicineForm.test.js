import AddMedicineForm from "../components/ui/AddMedicineForm";
import {render,screen,queryByAttribute, fireEvent} from '@testing-library/react';
import {link,BrowserRouter} from 'react-router-dom';

const Mockcontainer = ()=>{
    return(<BrowserRouter>
    <AddMedicineForm />
    </BrowserRouter>);
}
describe("to test whether add medicine form is rendered correctly", ()=>{
    test("test if name element is present in add medicine form",()=>{
        render(<Mockcontainer />);
        const txtInput = document.getElementById('medname');
        expect(txtInput).toBeInTheDocument(); 
    }); 
    test("test if description is present", ()=>{
        const r = render(<Mockcontainer />);
        const txtInput = r.container.querySelector('#meddescription');
        expect(txtInput).toBeVisible();
    });
    test("test if manufacturer is present", ()=>{
        const r = render(<Mockcontainer />);
        const txtInput = r.container.querySelector('#medmfgr');
        expect(txtInput).toBeVisible();
    });
    test("test if price is present", ()=>{
        const r = render(<Mockcontainer />);
        const txtInput = r.container.querySelector('#medprice');
        expect(txtInput).toBeVisible();
    });  
    test("test if submitBtn is present", ()=>{
        render(<Mockcontainer />);
        const btnSubmit = screen.getByText("Submit");
        expect(btnSubmit).toBeVisible();
    });   
});

describe("test whether a new medicine can be added succsfully", ()=>{
    test("test whether a new medicine can be added succsfully",()=>{
       render(<Mockcontainer />);
       const txtMedName = screen.getByLabelText("Name");
       const txtdesc = screen.getByLabelText("Description");
       const txtmanufacturer = screen.getByLabelText("Manufacturer");
       const txtprice = screen.getByLabelText("Price");
       const btnSubmit = screen.getByText("Submit");
       fireEvent.change(txtMedName,{target:{value:"Enfamil"}});
       fireEvent.change(txtdesc,{target:{value:"Baby formula for infants"}});
       fireEvent.change(txtmanufacturer,{target:{value:"Abbot Labs"}});
       fireEvent.change(txtprice,{target:{value:"300"}});
       fireEvent.click(btnSubmit);
       expect(btnSubmit).toBeVisible();        
    });
});
