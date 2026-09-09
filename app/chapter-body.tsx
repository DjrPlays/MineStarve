import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { RecipeItem } from './recipe-item';

export function ChapterBody({ body, recipes, mechanicsLabel }: { body: string; recipes: boolean; mechanicsLabel: string }) {
  return <div className="content-block markdown-content"><Markdown
    remarkPlugins={[remarkGfm]}
    skipHtml
    components={{
      h2: ({ children }) => <h3>{children}</h3>,
      h3: ({ children }) => <h4>{children}</h4>,
      ol: ({ children }) => <ol className="steps">{children}</ol>,
      table: ({ children }) => <div data-slot="table-container"><table data-slot="table">{children}</table></div>,
      td: ({ children }) => <td>{recipes && typeof children === 'string' ? <RecipeItem name={children} /> : children}</td>,
      blockquote: ({ children }) => <div className="note"><strong>{mechanicsLabel}</strong>{children}</div>,
    }}
  >{body}</Markdown></div>;
}
