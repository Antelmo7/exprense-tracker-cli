# expense-tracker-cli

Solution for the [Expense Tracker](https://roadmap.sh/projects/expense-tracker) challenge from [roadmap.sh](https://roadmap.sh)

Project to practice logic building, interact with filesystem, how to manage data and provide useful information.

## Install package

Run: `npm i -g vexpense-tracker` to install the package globally

- Users can add an expense with a description and amount.
- Users can update an expense.
- Users can delete an expense.
- Users can view all expenses.
- Users can view a summary of all expenses.
- Users can view a summary of expenses for a specific month (of current year).

### Usage

```bash
  expense-tracker add --description "Lunch" --amount 20
  # Expense added successfully (ID: 1)

  $ expense-tracker list
  # ID  Date       Description  Amount
  # 1   2024-08-06  Lunch        $20
  # 2   2024-08-06  Dinner       $10

  $ expense-tracker summary
  # Total expenses: $30

  $ expense-tracker delete --id 2
  # Expense deleted successfully

  $ expense-tracker summary --month 8
  # Total expenses for August: $20
```
