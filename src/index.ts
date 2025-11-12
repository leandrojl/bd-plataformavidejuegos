import express, {type Request, type Response} from "express";
import { AppRoutes } from "./routes/routes.js";
import cors from 'cors'


const app = express();

const PORT = 3000;

app.use(express.json({ limit: '10mb' }));  //esta vaina es para que me aumente las imagenes el jijodebu
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']  // puse esto porque el cors no me dejaba meter inserts en la wishlist y ademas par aque me tome el patch de actualizar imagenes xd
}));


app.get("/", (req: Request, res: Response) => {
  res.send("Backend Juega-UNLAM funcionando 🚀");
});


app.use(AppRoutes.routes);

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})