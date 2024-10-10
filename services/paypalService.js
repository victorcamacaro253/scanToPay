import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET); 
const paypalClient = new paypal.core.PayPalHttpClient(environment);


class PaypalService {

    static async createOrder(items) {

        const orderRequest= new paypal.orders.OrdersCreateRequest();

        orderRequest.requestBody({

            intent:'CAPTURE',
            purchase_units:[
                {
                    amount: {
                        currency_code: "USD",
                        value: items.reduce((total,item)=> total + (item.amount * item.quantity)/100,0).toFixed(2),
                        breakdown :{
                            item_total:{
                                currency_code:'USD',
                              value: items.reduce((total,item)=> total + (item.amount * item.quantity)/100,0).toFixed(2),
                            },

                          },
                        },


                        items: items.map(item => ({
                            name: item.name,
                            description:item.description,
                            unit_amount:{
                        currency_code:'USD',
                        value:(item.amount/100).toFixed(2),

                            },
                            quantity: item.quantity,

                              })),

                },

                
            
            ],
            application_context:{
                return_url: 'http://localhost:5000/paypal/capturePaymentPaypal',
                cancel_url: 'http://localhost:5000/paypal/cancel',
            }
        })

        const order= await paypalClient.execute(orderRequest)
        return order.result;
}

static async capturePaymentPaypal(orderId){
    const captureRequest = new paypal.orders.OrdersCaptureRequest(orderId);

    const capture = await paypalClient.execute(captureRequest)
    return capture.result
}
    
}
    
export default PaypalService

    