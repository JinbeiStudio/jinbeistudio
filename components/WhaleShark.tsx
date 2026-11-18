import { whaleSharkExtras } from '@/lib/sea';
import SeaCreature from './SeaCreature';

export default function WhaleShark() {
  return <SeaCreature kind="whaleShark" className="shark" extra={whaleSharkExtras} />;
}
