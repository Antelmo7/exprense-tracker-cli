#!/usr/bin/env node

import fs, { readFile } from 'fs';
import path from 'path';
const __dirname = import.meta.dirname;
import { Command } from 'commander';
import { exec } from 'child_process';

const program = new Command();

const expensesFilePath = path.join(__dirname, 'expenses.json');

function readExpensesFile() {
  try {
    if (!fs.existsSync(expensesFilePath)) {
      fs.writeFileSync(expensesFilePath, JSON.stringify([]), 'utf8');
      return [];
    } else {
      const data = fs.readFileSync(expensesFilePath, 'utf8');
      const expenses = JSON.parse(data);
      return expenses;
    }
  } catch (error) {
    console.error('Error reading expenses');
  }
}

function updateExpensesFile(expenses) {
  try {
    fs.writeFileSync(expensesFilePath, JSON.stringify(expenses), 'utf8');
  } catch (error) {
    console.error('Error saving expenses');
  }
}

function addExpense(options) {
  try {
    let expenses = readExpensesFile();

    const expense = {
      id: (expenses.length < 1) ? 1 : parseInt(expenses[expenses.length - 1].id) + 1,
      description: options.description,
      amount: parseInt(options.amount),
      createdAt: new Date()
    }

    expenses.push(expense);
    updateExpensesFile(expenses);
    console.log(`Expense added successfully (ID: ${expense.id})`);
  } catch (error) {

  }
}

function listAllExpenses(options) {
  const expenses = readExpensesFile();

  if (expenses.length < 1) {
    console.log('No expenses yet');
  } else {
    console.log('ID Date Description Amount');
    expenses.forEach((expense) => {
      console.log(`${expense.id}  ${new Date(expense.createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' })} ${expense.description} $${expense.amount}`);
    });
  }
}

function getStrMonth(number) {
  switch (parseInt(number)) {
    case 1:
      return 'January'
      break;
    case 2:
      return 'February'
      break;
    case 3:
      return 'March'
      break;
    case 4:
      return 'April'
      break;
    case 5:
      return 'May'
      break;
    case 6:
      return 'June'
      break;
    case 7:
      return 'July'
      break;
    case 8:
      return 'August'
      break;
    case 9:
      return 'September'
      break;
    case 10:
      return 'October'
      break;
    case 11:
      return 'November'
      break;
    case 12:
      return 'December'
      break;
  }
}

function expensesSummary(options) {
  const expenses = readExpensesFile();
  let summary = 0;

  if (parseInt(options.month) >= 1) {
    expenses.forEach(expense => {
      const month = new Date(expense.createdAt).getMonth();
      if (month === parseInt(options.month) - 1) {
        summary += parseInt(expense.amount);
      }
    });
    console.log(`Total value for ${getStrMonth(options.month)}: $${summary}`);
  } else {
    expenses.forEach(expense => {
      summary += parseInt(expense.amount);
    });
    console.log(`Total value: ${summary}`);
  }
}

function deleteExpense(options) {
  const expenses = readExpensesFile();
  const expenseIndex = expenses.findIndex(expense => expense.id === parseInt(options.id));

  if (expenseIndex < 0) {
    console.log(`Expense with ID: ${options.id} not found`);
  } else {
    expenses.splice(expenseIndex, 1);
    updateExpensesFile(expenses);
    console.log('Expense deleted successfully');
  }
}

program
  .name('vexpense-tracker')
  .description('A simple expense tracker application to manage your finances.')
  .version('1.0.0');

program.command('add')
  .description('Add a new expense')
  .option('-d, --description <string>', 'description for the expense')
  .option('-a, --amount <integer>', 'amount of the expense')
  .action(addExpense);

program.command('list')
  .description('List all expenses')
  .action(listAllExpenses);

program.command('summary')
  .description('Get a summary of all expenses all expenses or by month')
  .option('-m, --month <integer>', 'Get a summary for number of month')
  .action(expensesSummary);

program.command('delete')
  .description('Delete an expense')
  .option('-i, --id <integer>', 'Id of the expense to delete')
  .action(deleteExpense);

program.parse();