import WarrantyCreate from "../components/vaultCreateComponents/WarrantyCreate";
import { Helmet } from "react-helmet-async";

export default function VaultWarrantyCreate() {
  return (
    <>
      <Helmet>
        <title> Create Warranty | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white whiteScr overflow-auto pb-[80px] rounded-r-xl lg:rounded-r-none rounded-l-xl">
        <WarrantyCreate />
      </div>
    </>
  );
}
