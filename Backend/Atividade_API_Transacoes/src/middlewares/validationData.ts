import { NextFunction, Request, Response } from "express";

export const validationData = (request: Request, response: Response, next: NextFunction)=>{
    const {name, cpf, email, age} = request.body;
  
    const newCpf = cpf.replace(/[^a-zA-Z0-9]/g, '');
  
    if(!name || !newCpf || !email || !age){
        return response.status(400).json({message: 'You need fill all the inputs.'})
  }  
  return next()
}