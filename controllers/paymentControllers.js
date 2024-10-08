// controllers/PaymentController.js
import StripeService from '../services/stripeService.js';
import pagosModel from '../models/pagosModel.js';
import query from '../config/db.js'; // si estás usando un archivo db.js para queries
import generateQrCode from '../services/qrCodeGenerator.js';

class PaymentController {
    static async createPayment(req, res) {
        const { items, user_id } = req.body;

        try {
            // Crear sesión de Stripe
            const session = await StripeService.createCheckoutSession(items);

       const checkoutUrl = session.url;

            // Generar código QR
  
    const qrCode = await generateQrCode(checkoutUrl);

           //  Guardar pago en la base de datos
        /*   const result = await pagosModel.addPago(user_id,session.id,);
         const idPago = result.insertId;

            // Insertar los productos comprados en la base de datos
            for (const item of items) {
                const { product_id, amount, quantity } = item;
                await query(
                    `INSERT INTO productos_compras (id_compra, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)`,
                    [idCompra, product_id, quantity, amount]
                );
            }*/

            // Devolver la URL de Stripe al cliente
            return res.json({ url: session.url,id:session.id,qrCode });

        } catch (error) {
            console.error('Error en el proceso de pago:', error);
            return res.status(500).json({ message: error.message });
        }
    }

  
    // Endpoint para obtener un pago por ID
    static async getPaymentById(req, res) {
        const { paymentId } = req.params;

        try {
            const payment = await PaymentModel.getPaymentById(paymentId);
            if (!payment) {
                return res.status(404).json({ message: 'Pago no encontrado' });
            }
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener el pago' });
        }
    }
}




export default PaymentController;
