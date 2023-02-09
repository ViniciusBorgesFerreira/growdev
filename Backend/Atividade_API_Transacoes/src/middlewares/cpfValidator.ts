import { NextFunction, Request, Response } from "express";
import { listUsers } from "..";

export const cpfValidator = (request: Request, response: Response, next: NextFunction)=>{
    const { cpf } = request.body;
  
    const newCpf = cpf.replace(/[^a-zA-Z0-9]/g, '');
  
    if(listUsers.some(user => user.cpf === newCpf)){
        return response.status(400).json({message: 'CPF already exists!'})
    }
  return next();
}