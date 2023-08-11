import { useState, useEffect } from "react";
import { supabase } from "../../Config/supabaseClient";
import { useAuth } from "../../Hooks/useAuth";
import { Button, Dialog, TextField } from "@mui/material";

const Budget = () => {
  const [netSalary, setNetSalary] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expenseNameInput, setExpenseNameInput] = useState("");
  const [expenseAmountInput, setExpenseAmountInput] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const getBudget = async () => {
      try {
        const { data, error } = await supabase
          .from("budget")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (error) throw error;
        if (data !== null) {
          setNetSalary(data.net_salary);
          setExpenses(data.expenses);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getBudget();
  }, [user.id]);

  useEffect(() => {
    const totalExpenses = Object.values(expenses).reduce(
      (total, expense) => total + expense,
      0
    );
    setSavings(netSalary - totalExpenses);
  }, [expenses, netSalary]);

  const addExpense = async (expenseName, expenseAmount) => {
    const newExpenses = {
      ...expenses,
      [expenseName]: expenseAmount,
    };

    setExpenses(newExpenses);

    try {
      const { error } = await supabase.from("budget").insert(
        {
          net_salary: netSalary,
          expenses: newExpenses,
        },
      )
      .eq('user_id', user.id)

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  // edit button for net salary and each expense
  const updateBudget = async () => {
    try {
      const { error } = await supabase
        .from("budget")
        .update({
          net_salary: netSalary,
          expenses: expenses,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  // reset all button
  const deleteBudget = async () => {
    try {
      const { error } = await supabase
        .from("budget")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <div className="mt-20 mb-10 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold text-center">Budget</h2>
      <Button
        type="button"
        variant="text"
        sx={{ marginTop: "5px" }}
        onClick={handleDialog}
      >
        Add expenses
      </Button>
      <Button onClick={deleteBudget}>Clear All</Button>

      <Dialog open={dialogOpen} onClose={handleDialog}>
        <form className="w-80 flex flex-col items-center p-2">
          <h4 className="text-sm self-start mt-1">Expense Name:</h4>
          <TextField
            type="text"
            size="small"
            sx={{ width: "100%" }}
            onChange={(e) => setExpenseNameInput(e.target.value)}
          />
          <h4 className="text-sm self-start mt-4">Expense Amount:</h4>
          <TextField
            type="number"
            size="small"
            sx={{ width: "100%" }}
            onChange={(e) => setExpenseAmountInput(Number(e.target.value))}
          />
          <div className="w-80 flex justify-around mt-4 mb-2">
            <Button
              variant="contained"
              sx={{ width: "40%" }}
              onClick={handleDialog}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ width: "40%" }}
              onClick={() => {
                addExpense(expenseNameInput, expenseAmountInput);
                setDialogOpen(false);
                setExpenseNameInput("");
                setExpenseAmountInput(0);
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </Dialog>

      <div className="mt-10 w-4/5 flex flex-col justify-center">
        <div className="w-full max-w-2xl flex flex-col">
          <h3 className="text-sm self-start">Net Salary:</h3>
          <div className="w-full border-2 border-black rounded-md p-1 m-1">
            <p onChange={(e) => setNetSalary(Number(e.target.value))}>
              R {netSalary}
            </p>
          </div>
        </div>

        <div className="w-full max-w-2xl flex flex-col justify-center items-center mt-5">
          <h3 className="text-sm self-start">Expenses:</h3>
          {Object.entries(expenses).map(([expenseName, expenseAmount]) => (
            <div
              key={expenseName}
              className="w-full border-2 border-black rounded-md p-1 m-1"
            >
              <p>
                {expenseName} : R {expenseAmount}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-2xl flex flex-col mt-5">
          <h3 className="text-sm self-start">Total Savings:</h3>
          <div className="w-full border-2 border-black rounded-md p-1 m-1">
            <p>R {savings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;

// import { useState, useEffect } from "react";
// import { supabase } from "../../Config/supabaseClient";
// import { useAuth } from "../../Hooks/useAuth";
// import { Button, Dialog, TextField } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckIcon from "@mui/icons-material/Check";

// const Budget = () => {
//   const [netSalary, setNetSalary] = useState(0);
//   const [expenses, setExpenses] = useState([]);
//   const [savings, setSavings] = useState(0);
//   const [editing, setEditing] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     const getBudget = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("budget")
//           .select("*")
//           .eq("user_id", user.id)
//           .single();

//         if (error) throw error;
//         if (data !== null) {
//           setNetSalary(data.net_salary)
//           setExpenses(data.expenses)
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     getBudget();
//   }, [user.id]);

//   // const addBudget = async (expenseName, expenseAmount) => {
//   //   const newExpenses = {
//   //     ...expenses,
//   //     [expenseName]: Number(expenseAmount),
//   //   };

//   //   setExpenses(newExpenses);

//   //   try {
//   //     const { error } = await supabase
//   //       .from("budget")
//   //       .insert({
//   //         net_salary: netSalary,
//   //         expenses: expenses, // might have to change to 'newExpenses'
//   //       })
//   //       .eq("user_id", user.id);

//   //     if (error) throw error;
//   //     window.location.reload();
//   //   } catch (error) {
//   //     console.log(error.message);
//   //   }
//   // };

//   const updateBudget = async () => {
//     try {
//       const { error } = await supabase
//         .from("budget")
//         .update({ net_salary: netSalary, expenses: expenses })
//         .eq("user_id", user.id)

//       if (error) throw error
//     } catch (error) {
//       console.log(error.message)
//     }
//   }

//   useEffect(() => {
//     const totalExpenses = Object.values(expenses).reduce(
//       (total, expense) => total + expense,
//       0
//     );
//     setSavings(netSalary - totalExpenses);
//   }, [expenses, netSalary]);

//   console.log('expenses; ', expenses)

//   return (
//     <div className="mt-20 mb-10 flex flex-col justify-center items-center">
//       <h2 className="text-xl font-bold text-center">Budget</h2>
//       <Button variant="text" size="small">
//         Add Expense
//       </Button>

//       <div className="mt-2 flex flex-row justify-between items-center w-4/5 max-w-2xl border-2 bg-slate-300 rounded-lg">
//       <input
//           type="number"
//           value={netSalary}
//           onChange={(e) => setNetSalary(parseFloat(e.target.value))}
//         />
//         <div>
//           <button className="text-base p-3" type="submit" onClick={() => setEditing(true)}>
//             <EditIcon color="action" />
//           </button>
//         </div>
//       </div>

//       {/* Add expenses */}
//       {expenses.map((expense) => {
//         <p>{expense}</p>
//       })}

//       <div className="mt-2 flex flex-row justify-between items-center w-4/5 max-w-2xl border-2 bg-slate-300 rounded-lg">
//         <p className="text-base p-3">R {savings}</p>
//       </div>
//     </div>
//   );
// };

// export default Budget;
