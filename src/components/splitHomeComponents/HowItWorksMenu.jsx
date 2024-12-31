/*Create a Split: Start by creating a split and adding the participants.
Add Bills: Enter the details of each bill that needs to be divided. You
can add multiple bills, and each can have a different composition of
expenses shared among the participants. Simplify Transactions: BillSplit
will automatically calculate and minimize the number of transactions
needed to settle the split, making it easy for everyone to pay their fair
share */

export default function HowItWorksMenu() {
  return (
    <div className="mt-16 flex flex-col space-y-2">
      <div className="flex flex-col text-center justify-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px]  sm:mx-[50px] lg:mx-[100px]">
        Under the hood, SPLIT leverages a heap-based algorithm to minimize
        transactions.
      </div>
      <div className="flex flex-col text-center justify-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px] sm:mx-[50px] lg:mx-[100px]">
        The algorithm uses two heaps—one for participants owed money (Creditors)
        and another for those who owe (Debtors).
      </div>
      <div className="flex text-center bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px] sm:mx-[50px] lg:mx-[100px]">
        It matches the largest debts with the highest credits efficiently,
        reducing the number of transactions required while ensuring the optimal
        settlement of balances.
      </div>
    </div>
  );
}
