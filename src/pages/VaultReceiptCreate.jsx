import ReceiptCreate from "../components/vaultCreateComponents/ReceiptCreate";
import { Helmet } from "react-helmet-async";

export default function VaultReceiptCreate() {
  return (
    <>
      <Helmet>
        <title> Create Receipt | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white whiteScr overflow-auto pb-[80px] rounded-r-xl lg:rounded-r-none rounded-l-xl">
        <ReceiptCreate />
      </div>
    </>
  );
}
