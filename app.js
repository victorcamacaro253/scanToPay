import express,{json} from 'express';
import paymentRoutes from './routes/paymentRoutes.js';
import cors from 'cors'
import helmet from 'helmet';



const app = express();

app.use(helmet())

app.use(cors())
app.use(json());


app.get('/',(req,res)=>{
    res.json({ message : 'hola mundo' })
})


//Usa las rutas de usuarios 
app.use(paymentRoutes);



// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});