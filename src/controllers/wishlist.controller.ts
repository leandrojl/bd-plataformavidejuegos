import {type Request, type Response} from "express";
import {WishlistService} from '../services/wishlist.service.js';
import {WishlistRepository} from "../repository/wishlist.repository.js";




const wishlistRepository = new WishlistRepository();
const wishlistService = new WishlistService(wishlistRepository);


export class WishlistController {
    constructor(){}
    public getWishlistPorUsuario = async (req: Request, res: Response) =>{
        try{
            const usuarioId = Number(req.params["usuarioId"]); 
            if(isNaN(usuarioId)){
                return res.status(400).json({message: 'ID de usuario inválido'});
            }

            const wishlist = await wishlistService.obtenerWishlistPorUsuario(usuarioId);
            return res.status(200).json(wishlist);
        } catch (error) {
            return res.status(500).json({message: 'Error al obtener la wishlist', error});
        }
    }
 public agregarJuegoAWishlist = async (req: Request, res: Response) => {
  try {
    const { usuarioId, juegoId  } = req.body;
        console.log('Body recibido:', req.body);

    if (isNaN(usuarioId) || isNaN(juegoId )) {
      return res.status(400).json({ message: 'ID de usuario o juego inválido' });
    }
    await wishlistService.agregarJuegoAWishlist(usuarioId, juegoId );
    return res.status(201).json({ message: 'Juego agregado a la wishlist correctamente' });
  } catch (error) {
        console.error('Error en agregarJuegoAWishlist:', error);

    return res.status(500).json({ message: 'Error al agregar el juego a la wishlist', error });
  }
};
    public eliminarJuegoDeWishlist = async (req: Request, res: Response) => {
        try {
            const usuarioId = Number(req.params["usuarioId"]);
            const juegoId = Number(req.params["juegoId"]);  
            if (isNaN(usuarioId) || isNaN(juegoId)) {
                return res.status(400).json({ message: 'ID de usuario o juego inválido' });
            }
            await wishlistService.eliminarJuegoDeWishlist(usuarioId, juegoId);
            return res.status(200).json({ message: 'Juego eliminado de la wishlist correctamente' });
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el juego de la wishlist', error });
        }
    };
}
     
