const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const app=express();
const myGraphqlSchema=require('./schema');

app.use('/graphql',graphqlHTTP({
    schema:myGraphqlSchema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log('Server 4000"inci çalışıyor');
})

