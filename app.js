const express = require("express");

//the webserver:
const app = express();

//handle incoming requests object as JSON Object
app.use(express.json());
//handle incoming requests object as strings or arrays
app.use(express.urlencoded({extended: true}));


// get route with three parameters
app.get("/calculator/:num1/:operator/:num2", (request, response)=>{
    let number1 = request.params.num1;
    let number2 = request.params.num2;
    let operator = request.params.operator;
    let text_operator; 
    let result;

    //error handling:
    if (isNaN(number1) || isNaN(number2))
        response.sendStatus(404);

    switch(operator) {
        case "add":
            result = Number(number1) + Number(number2);
            text_operator = "plus"
            break;
        case "substract":
            result = number1 - number2;
            text_operator = "minus"
            break;
        case "divide":
            result = number1 / number2;
            text_operator = "divided by"
            break;
        case "multiply":
            result = number1 * number2;
            text_operator = "multiplied by"
            break;
        default:
            response.sendStatus(404);
    }
    
    let resultObject = {
        "operation": `${number1} ${text_operator} ${number2}`,
        "result": result
    }

    response.json(resultObject);
})

app.listen(3000, (err) => {
    if(err){
        console.log("there was a problem", err);
        return;
    }
    console.log("listening on port 3000");
})
