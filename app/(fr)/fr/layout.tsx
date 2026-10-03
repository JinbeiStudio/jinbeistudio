import RootDocument from '@/components/RootDocument';
import { buildMetadata } from '@/lib/site';

export { viewport } from '@/lib/site';
export const metadata = buildMetadata('fr');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="fr">{children}</RootDocument>;
}
