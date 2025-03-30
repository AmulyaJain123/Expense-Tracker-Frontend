import DocCreate from "../components/vaultCreateComponents/DocCreate";
import ReceiptCreate from "../components/vaultCreateComponents/ReceiptCreate";
import { Helmet } from "react-helmet-async";

export default function VaultDocCreate() {
  return (
    <>
      <Helmet>
        <title> Create Doc | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white whiteScr overflow-auto pb-[80px] rounded-r-xl lg:rounded-r-none rounded-l-xl">
        <div className="flex flex-col mx-auto max-w-[1200px]">
          <DocCreate />
        </div>
      </div>
    </>
  );
}
