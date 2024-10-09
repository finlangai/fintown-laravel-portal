interface Holder {
   id: string;
   is_foreigner: boolean;
   is_founder: boolean;
   is_organization: boolean;
   name: string;
   ownership: number;
   position: string | null;
   shares: number;
   symbol: string;
}
interface ShareHolderProps {
   holders: Holder[]; 
}