// models/PaymentModel.js
import pool from '../config/db.js';

class PaymentModel {
    // Crear un registro de pago
    static async createPayment({ userId, amount, stripePaymentId, status }) {
        const query = `
            INSERT INTO payments (user_id, amount, stripe_payment_id, status)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [userId, amount, stripePaymentId, status]);
        return result;
    }
    
    // Obtener un pago por ID
    static async getPaymentById(paymentId) {
        const query = 'SELECT * FROM payments WHERE id = ?';
        const [rows] = await pool.execute(query, [paymentId]);
        return rows[0];
    }
}

export default PaymentModel;
