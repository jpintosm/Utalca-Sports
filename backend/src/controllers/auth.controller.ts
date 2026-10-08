import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
  private authService = new AuthService();

  login = async (req: Request, res: Response) => {
    const { correo, contrasena } = req.body;
const result = await this.authService.login(correo, contrasena);

    res.status(200).json(result);
  };
}

export default AuthController;
