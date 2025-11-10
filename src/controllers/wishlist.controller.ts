import {type Request, type Response} from "express";
import {WishlistService} from '../services/wishlist.service.js';
import {WishlistRepository} from "../repository/wishlist.repository.js";




const wishlistRepository = new WishlistRepository();
const wishlistService = new WishlistService(wishlistRepository);


export class WishlistController {
    constructor(){}
    public getWishlistPorUsuario = async (req: Request, res: Response) =>{
        try{
            const idUsuario = Number(req.params["usuarioId"]); 
            if(isNaN(idUsuario)){
                return res.status(400).json({message: 'ID de usuario inválido'});
            }

            const wishlist = await wishlistService.obtenerWishlistPorUsuario(idUsuario);
            return res.status(200).json(wishlist);
        } catch (error) {
            return res.status(500).json({message: 'Error al obtener la wishlist', error});
        }
    }
    public agregarJuegoAWishlist = async (req: Request, res: Response) => {
        try {
            const idUsuario = Number(req.params["usuarioId"]);
            const { idJuego } = req.body;
            if (isNaN(idUsuario) || isNaN(idJuego)) {
                return res.status(400).json({ message: 'ID de usuario o juego inválido' });
            }
            await wishlistService.agregarJuegoAWishlist(idUsuario, idJuego);
            return res.status(201).json({ message: 'Juego agregado a la wishlist correctamente' });
        }
            catch (error) {
            return res.status(500).json({ message: 'Error al agregar el juego a la wishlist', error });
        }
    };
    public eliminarJuegoDeWishlist = async (req: Request, res: Response) => {
        try {
            const idUsuario = Number(req.params["usuarioId"]);
            const idJuego = Number(req.params["juegoId"]);  
            if (isNaN(idUsuario) || isNaN(idJuego)) {
                return res.status(400).json({ message: 'ID de usuario o juego inválido' });
            }
            await wishlistService.eliminarJuegoDeWishlist(idUsuario, idJuego);
            return res.status(200).json({ message: 'Juego eliminado de la wishlist correctamente' });
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el juego de la wishlist', error });
        }
    };
}
     
