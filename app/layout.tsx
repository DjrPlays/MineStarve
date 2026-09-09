import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '我的饥荒 模组 Wiki',
  icons: { icon: '/items/book.png' },
  description: '我的饥荒 1.4.5 中文玩家指南：物品栏、配方、经验附魔、不死图腾、怪物与七咒之戒。',
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}

