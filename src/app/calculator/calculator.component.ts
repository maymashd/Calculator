import { Component, OnInit } from '@angular/core';


enum Action {
  Number = "Number",
  Equal = "Equal",
  Operation = "Operation"
};

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  
  currentNumber = '0';
  firstOperand = null;
  secondNumber=null;
  operator = null;
  waitForSecondNumber = false;
  equalClicked=false;
  lastOperation=Action.Number;
  
  

  constructor() { }

  ngOnInit() {
  }

  public getNumber(v: string){
    
    if (this.lastOperation==Action.Operation){
      this.currentNumber='0';
    }
    console.log(v);
    if (this.lastOperation==Action.Equal){
      this.clear();
    }
    
    if(this.waitForSecondNumber)
    {
      console.log("good");
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      console.log(this.currentNumber);
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
    this.lastOperation=Action.Number
    this.secondNumber=null
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  private doCalculation(op , secondOp){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp;  
      case 'p':
      return Math.pow(this.firstOperand,secondOp);  
    }
  }
  public doCalculation2(op:String){
    if (op==='%'){
      this.currentNumber=String((Number(this.currentNumber)/100).toFixed(10));
    }
    else if (op==='√'){
      this.currentNumber=String(Math.sqrt(Number(this.currentNumber)));
    }
    else if (op==='a'){
      this.currentNumber=String(Math.abs(Number(this.currentNumber)));
    }
    else if (op==='x' && this.currentNumber!="0"){
      console.log('x');
      this.currentNumber=String(1/Number(this.currentNumber));      
    }
    else if(op==='b'){
      this.currentNumber=this.currentNumber.substr(0,this.currentNumber.length-1);
      
    }
    else if (op==='r'){
      this.currentNumber=String(Number(this.currentNumber)*(-1));
    }
    this.secondNumber=null
  }
  public local(op:String){
    if (op=='S'){
      localStorage.setItem("val",this.currentNumber);
    }
    else if (op=='R'){
     if ( localStorage.length!=0){
      this.currentNumber=localStorage.getItem("val");
     }
    }
    else if (op=='C'){
      localStorage.clear();
    }
    else if (op=='P'){
      localStorage.setItem("val",String(Number(localStorage.getItem("val"))+Number(this.currentNumber)));
    }
    else if (op=='M'){
      localStorage.setItem("val",String(Number(localStorage.getItem("val"))-Number(this.currentNumber)));
    }
  }

  public getOperation(op: string){
    console.log(op);
    console.log("ok3");
    console.log("second num"+ this.secondNumber);
    if(this.firstOperand === null){
      console.log("ok2");
      this.firstOperand = Number(this.currentNumber);
      this.operator=op;
      this.waitForSecondNumber=true;

    }else if(this.operator){
      if (op==='='){
        console.log("ok");
      if (this.secondNumber===null){
        console.log("a1");
        this.secondNumber=Number(this.currentNumber);
        this.equalClicked=true;
        const result = this.doCalculation(this.operator , this.secondNumber);
        this.currentNumber = String(result);
        this.firstOperand = result;
       
        
      }
      else if (this.secondNumber!=null && this.lastOperation==Action.Equal){
        //this.equalClicked=true
        console.log("a2");
        console.log(this.operator);
        const result = this.doCalculation(this.operator , this.secondNumber);
      this.currentNumber = String(result);
      this.firstOperand = result;
      console.log("ok")
      return;
      
      }else {
        const result = this.doCalculation(this.operator , Number(this.currentNumber));
      this.currentNumber = String(result);
      this.firstOperand = result;
      console.log("ok")
      
      }
     
      this.lastOperation=Action.Equal;
    }
     else{
        console.log("operation");
      if ( this.lastOperation==Action.Equal){
        
        console.log("aaa");
        this.firstOperand=Number(this.currentNumber);
        this.operator=op;
        this.secondNumber=null;
        this.waitForSecondNumber = false;
        this.equalClicked=false;
        this.lastOperation=Action.Operation;

        return;

      }
      else if (this.lastOperation==Action.Operation){
        this.operator=op;

      }
      else{
        const result=this.doCalculation(this.operator,Number(this.currentNumber));
        this.firstOperand=result;
        this.currentNumber=String(result);
        this.waitForSecondNumber=true;
      }

      this.waitForSecondNumber=true;
      this.lastOperation=Action.Operation;
    }
    
    }

  }

  public clear(){
    this.secondNumber=null;
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
    this.equalClicked=false
  }

}
