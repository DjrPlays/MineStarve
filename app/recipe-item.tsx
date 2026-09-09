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
};

export function RecipeItem({ name }: { name: string }) {
  const tile = itemTiles[name];
  const ring = name === '七咒之戒' || name === '灵魂缝合';
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
