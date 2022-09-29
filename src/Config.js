export const configinfo = {
    apiUrl: 'https://fsdehealthapi.azurewebsites.net',
    //local docker
    //apiUrl: 'http://localhost:5296', 
    backendroutes: {

        addItemtoCart: '/Cart/AddItemtoCart',
        newAddress: '/User/NewAddress',
        addMedicine: '/admin/addMedicine',
        addNewUser: '/User/signup',
        addNewCart: '/Cart/Add',
        addNewOrder: '/Order/PlaceOrder',
        addNewPayment: '/PaymentInfo',
        getAllMedicine: '/admin/getAllMedicine',
        getAddressByUser: '/User/',
        getUserByUserName: '/User/GetUserByUserName/',
        signin:'/User/signin',
        getCartByCartId: '/Cart/CartByCartId/',
        getCartByUserId: '/cart/CartByUserId/',
        getOrderByOrderId: '/order/',
        getOrdersByUserId: '/Order/OrdersByUserId/',
        getAllOrders:'/Order',
        getAllUsers: '/User',
        removeItemFromCart: '/Cart/RemoveItemFromCart',
        removeAllItemsFromCart:'/Cart/RemoveAllItemsFromCart'
    }
}