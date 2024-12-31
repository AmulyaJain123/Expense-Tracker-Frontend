/*Multiple Bills: Handle various expenses with different participants effortlessly.
Optimized Settlements: Get the reduced number of transactions required to balance the splits.
User-Friendly Interface: Easily add people, bills, and track expenses with our intuitive platform. 
flex flex-col text-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px]  sm:mx-[50px] lg:mx-[100px]
*/

export default function FeaturesMenu() {
  return (
    <div className="mt-16 flex flex-col space-y-2">
      <div className="flex flex-col text-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px]  sm:mx-[50px] lg:mx-[100px]">
        <div className="font-medium text-base sm:text-lg sm:w-[250px]">
          Create SPLITS
        </div>
        <div className="sm:text-base text-sm  sm:w-2/3">
          Enter bills, assign participant shares, and let our algorithm optimize
          transactions for efficient settling.
        </div>
      </div>
      <div className="flex flex-col text-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px]  sm:mx-[50px] lg:mx-[100px]">
        <div className="font-medium text-base sm:text-lg sm:w-[250px]">
          Save Expense Details
        </div>
        <div className="sm:text-base text-sm sm:w-2/3">
          Retain all information, including bills, expenditures, and transaction
          records, for future reference.
        </div>
      </div>
      <div className="flex flex-col text-center sm:text-start space-y-4 sm:space-y-0 items-center sm:items-start sm:flex-row bg-stone-100 py-4 px-2 border-b-2 border-stone-300 sm:space-x-[50px]  sm:mx-[50px] lg:mx-[100px]">
        <div className="font-medium text-base sm:text-lg sm:w-[250px]">
          Share with Friends
        </div>
        <div className="sm:text-base text-sm sm:w-2/3">
          Send saved SPLITS directly to your existing friends on the platform
          for collaborative expense management.
        </div>
      </div>
    </div>
  );
}
