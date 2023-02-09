import express, { Request, Response } from 'express';
import { Transaction, User } from './classes/index'
import { cpfValidator, validationData, validationUserExists} from './middlewares';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (request: Request, response: Response) => {
  return response.send('<h1>Gabriel</h1>')
});

/* USUARIOS */

export const listUsers:Array<User> = [];

//POST

app.post('/users', validationData, cpfValidator, (request: Request, response: Response)=>{
  const {name, cpf, email, age} = request.body;
  
  const newCpf = cpf?.replace(/[^a-zA-Z0-9]/g, '');
  
  
  const newUser = new User({name, cpf: newCpf, email, age});
  listUsers.push(newUser);
  console.log(listUsers)
  return response.status(201).json({listUsers, message: 'User registered successfully!'})
});

app.listen(8080, () => console.log({message: 'Servidor rodando'}))

//GET - ID - NÃO PODE MOSTRAR A LISTA DE TRANSAÇÕES

app.get('/users/:id', validationUserExists,( request: Request, response: Response)=>{
  const { id } = request.params;
 
  const user = listUsers.find(user => user.id === id) as User;
  
  return response.status(201).json({user: user.handleProperties()
    , message:'Its here, dude!'})
})

//GET USERS - query cpf, name, email
app.get('/users', (request: Request, response: Response) => {
  const {name, email, cpf} = request.query;

  const users = listUsers.filter((user)=> {
    if(name && cpf && email){
      return (
        user.name.includes(name as string) &&
        user.email.includes(email as string) &&
        user.cpf.includes(cpf as string)
      );
    }

    if(name || cpf || email){
      return (
        user.name.includes(name as string) ||
        user.email.includes(email as string) ||
        user.cpf.includes(cpf as string)
      );
    }

    return user;

  });    
 

  return response
  .status(201)
  .json({users:listUsers.map((user) => user.handleProperties()), message: 'Here all the users'})
})

app.put('/users/:id', validationUserExists, (request: Request, response: Response) => {
  const { id } = request.params
  const { name, email, cpf , age } = request.body

  const userIndex = listUsers.findIndex(user => user.id === id);
  listUsers[userIndex].name = name ?? listUsers[userIndex].name;
  listUsers[userIndex].email = email ?? listUsers[userIndex].email;
  listUsers[userIndex].cpf = cpf ?? listUsers[userIndex].cpf;
  listUsers[userIndex].age = age ?? listUsers[userIndex].age;

  console.log(listUsers)
  return response.status(200).json({user: listUsers[userIndex], message: ' thats it bro!'})
})

app.delete(
  "/users/:id",
  validationUserExists,
  (request: Request, response: Response) => {
    const { id } = request.params;
    
    const userIndex = listUsers.findIndex((user) => user.id === id);

    const user = listUsers[userIndex];

    listUsers.splice(userIndex, 1);

    return response.status(200).json({
      message:"Successfully delete user",
      user,
    })
  }  
)

app.post(
  "/users/:id/transactions",
  validationUserExists,
  (request: Request, response: Response)=>{
    const { id } = request.params;
    const { title, value, type } = request.body;

    const transaction = new Transaction({title, value, type});

    const userIndex = listUsers.findIndex(user => user.id === id)  ;

    listUsers[userIndex].transactions?.push(transaction);

    return response.status(200).json({
      message: 'Transaction Created Successfully',
      transaction
    })
  } 
);

app.get(
  "/users/:id/transactions/:idTransaction",
  validationUserExists,
  (request: Request, response: Response) => {
    const { id, idTransaction } = request.params;
 

    const user = listUsers.find(user => user.id === id);

    const transaction = user?.transactions?.find(transaction => transaction.id === idTransaction);
    
    return response.status(200).json({
      message: 'Transaction by id',
      transaction: transaction?.handleProperties()
    })
   
  }
)

app.get(
  "/users/:id/transactions",
  (request: Request, response: Response) => {
    const { id } = request.params;
    const user = listUsers.find(user => user.id === id);
    const listTransactions = user?.transactions?.map((transaction => transaction.handleProperties()))
    let totalIncome = 0 ;
    let totalOutcome = 0;
    

    const sumIncome = listTransactions?.forEach((transaction) => {
      if (transaction.type.toLowerCase() === 'income'){
        totalIncome += transaction.value
      }
    });

    const sumOutcome = listTransactions?.forEach((transaction) => {
      if (transaction.type.toLowerCase() === 'outcome'){
        totalOutcome += transaction.value
      }
    });
    
    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      credit : totalIncome - totalOutcome
    }
    

   

    return response.status(200).json({
      message: 'All transactions', listTransactions, message2:'Balance', balance
   })

  }
)


//PUT/DELETE /users/:userId/transactions/:id: Devem editar ou deletar
//transações.

app.put(
  '/users/:id/transactions/:idTransaction',
  validationUserExists,
  (request: Request, response: Response)=>{
    const { id, idTransaction } = request.params;
    const { title, value, type } = request.body;

    const userIndex = listUsers.findIndex((user)=> user.id === id);
    const transactionIndex = listUsers[userIndex].transactions?.findIndex((transaction)=> transaction.id === idTransaction) as number;
   
   listUsers[userIndex].transactions![transactionIndex].title = title ?? listUsers[userIndex].transactions![transactionIndex].title
   listUsers[userIndex].transactions![transactionIndex].value = value ?? listUsers[userIndex].transactions![transactionIndex].value
   listUsers[userIndex].transactions![transactionIndex].type = type ?? listUsers[userIndex].transactions![transactionIndex].type
    
    const transaction = listUsers[userIndex].transactions![transactionIndex].handleProperties();

    response.status(200).json({message: 'Changes saved successfully', transaction})

  });

  app.delete(
    '/users/:id/transactions/:idTransaction',
    validationUserExists,
    (request: Request, response: Response) => {
      const { id, idTransaction } = request.params;

      const user = listUsers.find(user => user.id === id);   

      const transactionIndex = user!.transactions?.findIndex(transaction => transaction.id === idTransaction) as number;
     
      const transaction = user!.transactions![transactionIndex].handleProperties();


      user!.transactions?.splice(transactionIndex, 1)

      response.status(200).json({
        message: 'Transaction deleted successfully',
        transaction
      })
    }
  )


















