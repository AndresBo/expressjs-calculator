const express = require("express");

//the webserver:
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/calculator/:num1/:operator/:num2", (request, response)=>{
    let number1 = request.params.num1;
    let number2 = request.params.num2;
    let operator = request.params.operator;

    let result;

    switch(operator) {
        case "add":
            result = number1 + number2;
            break;
        case "substract":
            result = number1 - number2;
            break;
        case "divide":
            result = number1 / number2;
            break;
        case "multiply":
            result = number1 * number2;
            break;
        default:
            result = 'no match';
    }
    
    let resultObject = {
        "operation": `${number1} ${operator} ${number2}`,
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
