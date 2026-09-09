import type { CSSProperties } from 'react';

const itemTiles: Record<string, [number, number]> = {
  '铁桶': [15, 1],
  '书 猪皮装订': [58, 0],
  '书 触手皮装订': [58, 0],
  '橡木船': [26, 8],
  '橡木箱船': [27, 8],
  '奶桶': [36, 7],
  '附魔书': [27, 12],
  '不死图腾': [26, 11],
  'Bucket': [15, 1],
  'Book (Pig Skin binding)': [58, 0],
  'Book (Tentacle Spots binding)': [58, 0],
  'Oak Boat': [26, 8],
  'Oak Chest Boat': [27, 8],
  'Milk Bucket': [36, 7],
  'Enchanted Book': [27, 12],
  'Totem of Undying': [26, 11],
};

export function RecipeItem({ name }: { name: string }) {
  const tile = itemTiles[name];
  const ring = ['七咒之戒', '灵魂缝合', 'Ring of Seven Curses', 'Soul Stitching'].includes(name);
  if (!tile && !ring) return <>{name}</>;

  const style = tile ? {
    '--item-x': `${-tile[0] * 32}px`,
    '--item-y': `${-tile[1] * 32}px`,
  } as CSSProperties : undefined;

  return <span className="recipe-item">
    <span className={`recipe-icon${ring ? ' recipe-icon-ring' : ''}`} style={style} aria-hidden="true" />
    <span>{name}</span>
  </span>;
}
