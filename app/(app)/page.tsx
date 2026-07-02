import { HomePage } from "@/components/pages/home-page";
import { PAGE_METADATA } from "@/lib/constants/metadata";

export const metadata = PAGE_METADATA.home;

export default function Page() {
  return <HomePage />;
}
