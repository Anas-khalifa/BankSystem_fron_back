import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserRegisterService implements CanActivate {
  userWithdrawError:any;

  constructor(private http:HttpClient,private router: Router) { }
  canActivate() :boolean{
    if(!sessionStorage.getItem("userid"))
      {
        this.router.navigate(['/login']);
        return false;
    }
  
      return true;
  }
  UserData:any=[];
  AccountData:any=[];
  AllUserData:any=[];
  LoggedInUser:any;
  LoggedInAccount:any;
  allTransactions:any=[];
  allTransfer:any=[];
  allLoans:any=[];
loan:any;
userupdate:any;
getUser(){
  this.http.get('https://localhost:7223/api/Users').subscribe((res:any)=>{
    console.log("getMethod");
    console.log(res)
    this.UserData=res.filter((a:any)=>a.access===false);
    console.log(this.UserData)
   // debugger;
  })
}
getBankAccount(){
this.http.get('https://localhost:7223/api/BankAccounts').subscribe((res:any)=>{
  this.AccountData=res;
})
}

CreateNewUser(body:any){  
    debugger;
    const creationData={
      Fullname:body.Fullname,
      Age:body.Age,
      Address:body.Address,
      PhoneNumber:body.PhoneNumber,
      Gender:body.Gender,
      RoleName:body.RoleName,
      Access:false,
      Pass:body.Pass,
      Username:body.Username

    };
    this.http.post('https://localhost:7223/api/Users/register',creationData).subscribe((res:any)=>{
      console.log(res)
      setTimeout(()=>{
        window.location.reload();
      },1000 )
    },err=>{
      console.log(err)
    } )
}

LoginUserGet(body:any){
  this.http.get('https://localhost:7223/api/Users').subscribe((res:any)=>{
    console.log("getMethod");
    console.log(res)
    this.AllUserData=res;
    let flag=false;

    this.AllUserData.forEach((element:any) => {
      if(element.username==body.Username&&element.pass==body.Pass){
        flag=true;
        this.LoggedInUser=element;
        sessionStorage.setItem("username",element.username);
        sessionStorage.setItem("userid",element.id);
        sessionStorage.setItem("isSignedIn","1");
        sessionStorage.setItem("Role",element.roleName);

      }

    });

      
  this.AccountData.forEach((element:any) => {
    if(flag&&element.userId==this.LoggedInUser.id){
      this.LoggedInAccount=element;
      sessionStorage.setItem("AccountId",element.accountId);
      
    }
  });


    if(flag&&this.LoggedInUser.access){
      this.router.navigate(['/cHomePage']);
      flag=false;
    }
    
    else if(flag&&!this.LoggedInUser.access)
    this.router.navigate(['/Denied'])


    else{
      
      setTimeout(()=>{
        window.location.reload();
      },1000 )
    }


  
  })
}

GetAllUsers(){
  this.http.get('https://localhost:7223/api/Users').subscribe((res:any)=>{

    this.AllUserData=res;
  });
  this.http.get('https://localhost:7223/api/Loans').subscribe((res:any)=>{

  this.allLoans=res;
});
  this.http.get('https://localhost:7223/api/Transactions').subscribe((res:any)=>{

  this.allTransactions=res;
});
  this.http.get('https://localhost:7223/api/Transfers').subscribe((res:any)=>{

  this.allTransfer=res;
});
debugger


}

addOperation(body:any,type:string,accId:number){
  debugger;
const opData={
  currancy:body.currancy,
  amount:body.amount,
  transactionType:type,
  accountId:accId
}
this.AccountData.forEach((element:any) => {
  if(element.accountId==accId){
    this.userWithdrawError=element;
  }
});
debugger
if(body.amount<this.userWithdrawError.balance)
this.http.post("https://localhost:7223/api/Transactions",opData).subscribe((res:any)=>{
  // this.router.navigate(['/customer']);
  setTimeout(()=>{
    window.location.reload();
  },1000 )
},err=>{
  console.log(err)
} )
}

transferOperation(body:any,accId:number,type:string){
  debugger;
  const opData={
    fromCustomerId:accId,
    toCustomerId:body.toCustomerId,
    amount:body.amount,
    TransferDate:new Date
  }

  this.AccountData.forEach((element:any) => {
    if(element.accountId==accId){
      this.userWithdrawError=element;
    }
  });
  debugger
  if(body.amount<this.userWithdrawError.balance)
  this.http.post("https://localhost:7223/api/Transfers",opData).subscribe((res:any)=>{
    // this.router.navigate(['/customer']);
    setTimeout(()=>{
      window.location.reload();
    },1000 )
  },err=>{
    console.log(err)
  } )
  return true;
}

addLoan(body:any,type:string,accId:number){
  debugger;
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const opData={
    accountId:accId,
    loanType:"_ _",
    loanAmount:body.amount,
    loanStartDate:formattedDate,
    loanEndDate:body.finalDate,
    activeState:false
  }
  
  this.http.post("https://localhost:7223/api/Loans",opData).subscribe((res:any)=>{
    // this.router.navigate(['/customer']);
    setTimeout(()=>{
      window.location.reload();
    },1000 )
  },err=>{
    console.log(err)
  } )
  return true;
}

updateBalance(body:any,accId:number,type:string){  
  let b=0,id=0;
let reciverId:any;
this.allLoans.forEach((element:any) => {
  if(element.loanId==id){
    this.loan=element;
  }
});
  this.AccountData.forEach((element:any) => {
    if(element.accountId==accId){ 
      if(type=="Deposit")
        b=element.balance+body.amount;
      else if(type=="Withdraw")
        b=element.balance-body.amount;
      else if(type=="Bill Payment")
        b=element.balance-body.amount;
      else if(type=="loan"){
        this.allLoans.forEach((e:any)=>{
          if(e.accountId==accId){
            if(e.activeState==true)
              b=element.balance+this.loan.loanAmount;
          }
        })
      }
      else{
        b=element.balance-body.amount;
      }
        id=element.userId;
        if(b<0){
          b+=body.amount;
          this.router.navigate(['/operationError']);
        }
    }
    if(element.accountId==body.toCustomerId){
      reciverId=element;
    }
  });
  debugger
  const SenderData={ 
    accountId:accId,
    balance:b,
      userId:id
  };
  if(type=="CliQ"){
  const reciverData={ 
    accountId:body.toCustomerId,
    balance:reciverId.balance+body.amount,
      userId:reciverId.userId
  };
 this.http.put('https://localhost:7223/api/BankAccounts/'+reciverData.accountId,reciverData).subscribe((res:any)=>{
    setTimeout(()=>{
      window.location.reload();
    },1000 )
  },err=>{
    console.log(err)
  } )

  }

  debugger
  this.http.put('https://localhost:7223/api/BankAccounts/'+accId,SenderData).subscribe((res:any)=>{
    setTimeout(()=>{
      window.location.reload();
    },1000 )
  },err=>{
    console.log(err)
  } )

 


}

admitUser(id:number){
const account={
  balance:0,
  userId:id
}

this.AllUserData.forEach((element:any) => {
  if(element.id==id){
    element.access=true;
  }
});
this.http.post('https://localhost:7223/api/Users/verifyUser',account).subscribe((res:any)=>{
  setTimeout(()=>{
    window.location.reload();
  },1000 )
},err=>{
  console.log(err)
} )
return true;
}

editRole(user:any){
  const putData={
    id:user.id,
    fullname:user.fullname,
    age:user.age,
    address:user.address,
    phoneNumber:user.phoneNumber,
    gender:user.gender,
    roleName:user.roleName,
    access:true,
    pass:user.pass,
    username:user.username
  
  };
  debugger
  this.http.put('https://localhost:7223/api/Users/'+user.id,putData).subscribe((res:any)=>{
    setTimeout(()=>{
      window.location.reload();
    },1000 )
  },err=>{
    console.log(err)
  } )
}

removeUser(id:number){
  this.http.delete('https://localhost:7223/api/Users/'+id).subscribe((res:any)=>{
    setTimeout(()=>{
      window.location.reload();
    },1000 )
  },err=>{
    console.log(err)
  } )
  return true;
}

admitLoan(id:number){
  debugger;
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;


this.allLoans.forEach((element:any) => {
    if(element.loanId==id){
      this.loan=element;
    }
  });
  const opData={
    loanId:this.loan.loanId,
    accountId:this.loan.accountId,
    loanType:"Default",
    loanAmount:this.loan.loanAmount,
    loanStartDate:formattedDate,
    loanEndDate:this.loan.loanEndDate,
    activeState:true
  }
  debugger
  
  this.http.put('https://localhost:7223/api/Loans/'+this.loan.loanId,opData).subscribe((res:any)=>{
    setTimeout(()=>{
      window.location.reload();
    },1000 )
  },err=>{
    console.log(err)
  } )
  return true;
  }

removeLoan(id:number){
  this.http.delete('https://localhost:7223/api/Loans/'+id).subscribe((res:any)=>{
    setTimeout(()=>{
      window.location.reload();
    },1000 )
  },err=>{
    console.log(err)
  } )
  return true;
}

UpdateUser(user:any,UserUpdateId:any){


  this.AllUserData.forEach((element:any) => {
    if(element.id==UserUpdateId){
      this.userupdate=element;
    }
  });

let putData={
      id:UserUpdateId,
      fullname:this.userupdate.fullname,
      age:this.userupdate.age,
      address:this.userupdate.address,
      phoneNumber:this.userupdate.phoneNumber,
      gender:this.userupdate.gender,
      roleName:this.userupdate.roleName,
      access:true,
      pass:user.Pass,
      username:this.userupdate.username
    
    };
    
    debugger
    this.http.put('https://localhost:7223/api/Users/'+UserUpdateId,putData).subscribe((res:any)=>{
      setTimeout(()=>{
        window.location.reload();
      },1000 )
    },err=>{
      console.log(err)
    } )
  }

}

