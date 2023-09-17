package pkg;

import java.math.BigDecimal;
import java.math.RoundingMode;

import java.util.Scanner;

//class for info of friends
class Fnode
{
	double money;
	double mean;
	String name;
	String phno;
	double balance;
	String pin;
	double roundMean;
}

//class for methods
class Cashflow
{ 
	Scanner sc=new Scanner(System.in);
	Scanner sc1=new Scanner(System.in);
	Fnode friends[];
	int n;
	double f_graph[][];

//Accept Bill Payment
	void acceptBillDetails()
	{
		
	  for(int i=0;i<n;i++)
	  {
	  System.out.println("Enter amount paid by "+friends[i].name);
	  friends[i].money = sc.nextFloat();
	  friends[i].balance = friends[i].balance - friends[i].money;
	  friends[i].mean = friends[i].money/n;
	  BigDecimal bd=new BigDecimal(friends[i].mean).setScale(2,RoundingMode.HALF_DOWN);
	  friends[i].roundMean = bd.doubleValue();
	  }
	 
  //adjacency matrix
  for(int i=0;i<n;i++)
  {
	  for(int j=0;j<n;j++)
	  {
		  if(i==j)
		  {
			  f_graph[i][j]=0;
		  }
		  else
		  {
			  f_graph[j][i]=friends[i].roundMean;
		  }
	  }
  }
  
  //Display Bill Details
  System.out.println("\nDetails of friends and expenses");
  for(int i=0;i<n;i++)
  {
	  System.out.println("\nDetails of friend "+(i+1));
	  System.out.println("Name : "+friends[i].name);
	  System.out.println("Amount : "+friends[i].money);
	  System.out.println("Divided amount : "+friends[i].mean);
	  System.out.println(friends[i].roundMean);
	  System.out.println("---------------------------------------------------------");
  }
 
  //Display Expenses Matrix
  System.out.println("\nMatrix of expenses");
	  //Minimize cash Flow Function
	  minCashFlow(f_graph);
  }
 
  void acceptBankDetails()
  {
	  System.out.println("Enter number of friends");
	  n=sc.nextInt();
	  friends = new Fnode [n];
	  f_graph = new double[n+1][n+1];
	  
	  for(int i=0;i<n;i++)
	  {
	  friends[i] = new Fnode();
	  System.out.println("\nEnter Name of Friend : " +(i+1));
	  friends[i].name = sc1.nextLine();
	  System.out.println("Enter bank Balance");
	  friends[i].balance = sc.nextDouble();
	  
	  do
	  {
		  System.out.println("Enter pin");
		  friends[i].pin = sc.next();
	  }while(friends[i].pin.length() != 4);
	 
	  do
	  {
		  System.out.println("Enter Mobile Number");
		  friends[i].phno = sc.next();
	  }while(friends[i].phno.length() != 10);
	  
	  System.out.println("Details accept successfully");
	  System.out.println("---------------------------------------------------------");
	  }
  }
  
  void displayBankDetails()
  {
	  for (int i=0; i<n; i++)
	  {
		  System.out.println("\nDetails of friend "+(i+1));
		  System.out.println("Name : "+friends[i].name);
		  System.out.println("Bank Balance : "+friends[i].balance);
		  System.out.println("Phone no : "+friends[i].phno);
		  System.out.println("---------------------------------------------------------");
	  }
  }
 
  
  //Gets index at which min amount is present
  int getMin(double arr[])
  {
	int minInd = 0;
	for (int i = 1; i < n; i++)
	if (arr[i] < arr[minInd])
	minInd = i;
	return minInd;
  }
 
   int getMax(double arr[])
   {
	int maxInd = 0;
	for (int i = 1; i < n; i++)
	if (arr[i] > arr[maxInd])
	maxInd = i;
	return maxInd;
   }
   
// A utility function to return minimum of 2 values
   double minOf2(double x, double y)
   {
	   return (x < y) ? x: y;
   }
   
    void minCashFlowRec(double amount[])
{
  int mxCredit = getMax(amount), mxDebit = getMin(amount);
  if (amount[mxCredit] == 0 && amount[mxDebit] == 0)
return;

// Find the minimum of two amounts
  double min = minOf2(-amount[mxDebit], amount[mxCredit]);
amount[mxCredit] -= min;
amount[mxDebit] += min;

// If minimum is the maximum amount to be
System.out.println("---------------------------------------------------------");
System.out.println("\n"+friends[mxDebit].name + " pays " + min+ " to " + friends[mxCredit].name);

//updation
System.out.println("---------------------------------------------------------");
System.out.println(friends[mxDebit].name+" Do you want to Debit "+min+" from your account to "+friends[mxCredit].name+" ?");
System.out.println("Enter 0 for No, 1 for Yes");
int ans = sc.nextInt();
if (ans == 1)
{
	int count = 0;
	String enteredPin;
	int flag = 0;
	do
	{
		System.out.println("Please enter correct account Pin Code : ");
		enteredPin = sc.next();
		count++;
	}while (!friends[mxDebit].pin.equals(enteredPin) && count!=3);
	
	if (friends[mxDebit].pin.equals(enteredPin))
	{
		System.out.println("---------------------------------------------------------");
		System.out.println("Correct PIN detected");
		friends[mxDebit].balance = friends[mxDebit].balance - min;
		friends[mxCredit].balance = friends[mxCredit].balance + min;
		System.out.println("Amount "+min+" debited to "+friends[mxCredit].name);
		System.out.println("---------------------------------------------------------");
		flag = 1;
		enteredPin = null;
	}
	
	if (flag == 0)
	{
		System.out.println("---------------------------------------------------------");
		System.out.println("Transaction Unsuccessful\nYou have exceeded the limit of the wrong PIN.\nTry again in 24 Hours");
		System.out.println("---------------------------------------------------------");
	}
}
//closing if statement to check balance before transfer
minCashFlowRec(amount);
}
    
     void minCashFlow(double f_graph[][])
     {
    	 double amount[]=new double[n];
 
    	 for (int p = 0; p < n; p++)
    		 for (int i = 0; i < n; i++)
    			 amount[p] += (f_graph[i][p] - f_graph[p][i]);
 
    	 minCashFlowRec(amount);
  }
     
     void checkBalance()
     {
    	 int id = 100;
    	 int flag = 0;
    	 int count = 0;
    	 
    	 System.out.println("---------------------------------------------");
    	 System.out.println("Check your Bank Balance");
    	 System.out.println("Enter your Name");
    	 String inputName = sc1.nextLine();
    	 
    	 for (int i=0; i<n; i++)
    	 {
    		 if (friends[i].name.equals(inputName))
    		 {
    			 System.out.println("Account found");
    			 id = i;
    			 flag = 1;
    			 break;
    		 } 
    	 }
    	 
    	 if (flag == 0)
 		{
 			System.out.println("---------------------------------------------------------");
 			System.out.println("No Account found by the name : "+inputName);
 			System.out.println("---------------------------------------------------------");
 		}
    	 
    	 do
    	 {
    		 System.out.println("Enter correct PIN");
        	 String inputPin = sc.next();
        	 if(friends[id].pin.equals(inputPin))
        	 {
        		 flag = 1;
        		 System.out.println("---------------------------------------------------------");
        		 System.out.println("Correct PIN detected");
        		 System.out.println("Bank Balance : "+friends[id].balance);
        		 break;
        	 }
        	 
        	 else 
        	 {
        		 count++;
        	 }
        	 
    	 }while (flag != 1 || count != 3);
    	 
    	 if (flag == 0)
    		{
    			System.out.println("---------------------------------------------------------");
    			System.out.println("Transaction Unsuccessful\nYou have exceeded the limit of the wrong PIN.\nTry again in 24 Hours");
    			System.out.println("---------------------------------------------------------");
    		}
    	 
     }
}

public class Main
{
public static void main (String args [])
{
Cashflow cf = new Cashflow();
Scanner kb = new Scanner (System.in);
System.out.println("Enter details");
cf.acceptBankDetails();
int option;
do
{
System.out.println("---------------------------------------------------------");
System.out.println("Choose from the following operations\n0. Exit\n1. Split money\n2. Check Bank Balance\n3. Show all accounts details");
option = kb.nextInt();
switch(option)
{
	case 1:
		cf.acceptBillDetails();
		break;
	
	case 2:
		cf.checkBalance();
		break;
		
	case 3:
		cf.displayBankDetails();
		break;
	
	default :
		if(option !=0)
			System.out.println("Option does not exist");
}
} while (option!=0);
System.out.println("Thank you !!\nPROGRAM TERMINATED");
kb.close();
}
}
