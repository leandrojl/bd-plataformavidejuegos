import express, {type Request, type Response} from "express";
import { AppRoutes } from "./routes/routes.js";
import cors from 'cors'

const app = express();

const PORT = 3000;

app.use(express.json());
// Permitir solicitudes desde Angular
app.use(cors({
  origin: 'http://localhost:4200', // tu front
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'] // <- esto es Access-Control-Allow-Headers
}));


app.get("/", (req: Request, res: Response) => {
  res.send("Backend Juega-UNLAM funcionando 🚀");
});

app.use(AppRoutes.routes);

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})