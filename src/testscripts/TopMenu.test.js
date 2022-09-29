import {render,screen} from'@testing-library/react';
import TopMenu from '../components/ui/TopMenu';
import {Link,BrowserRouter} from 'react-router-dom';

const MockContainer = ()=>{
    return (
    <BrowserRouter>
    <TopMenu />
    </BrowserRouter> );
}

//checkm whether all top menus are rendered properly
test('should render 5 top menus with correct strings', ()=>{
    var menuNames = ['Home','Users','Medicines','Orders'];
    render(<MockContainer />);    
    const linkElementHome = screen.getAllByRole("listitem").find((listitem)=>listitem.textContent == menuNames[0]);
    expect(linkElementHome).toBeInTheDocument();
    const linkElementUsers = screen.getAllByRole("listitem").find((listitem)=>listitem.textContent == menuNames[1]);
    expect(linkElementUsers).toBeInTheDocument();    
    const linkElementmedicines = screen.getAllByRole("listitem").find((listitem)=>listitem.textContent == menuNames[2]);
    expect(linkElementmedicines).toBeInTheDocument();    
    const linkElementOrders = screen.getAllByRole("listitem").find((listitem)=>listitem.textContent == menuNames[3]);
    expect(linkElementOrders).toBeInTheDocument();    
});
