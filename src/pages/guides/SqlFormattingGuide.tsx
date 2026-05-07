import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const SqlFormattingGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="SQL Formatting Best Practices: Write Readable Queries"
      description="Unformatted SQL is hard to debug and maintain. Learn the conventions for clean, readable queries that your team will actually understand."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'SQL Formatting' }]}
      accentColor="primary"
    >
      <SEO
        title="SQL Formatting Best Practices: Write Readable Queries | KooBrain"
        description="Learn SQL formatting conventions: keyword casing, indentation, JOIN formatting, subquery style, and how to make complex queries readable and maintainable."
        keywords="sql formatting, sql style guide, sql best practices, readable sql, sql indentation, format sql queries, sql conventions"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• Keyword casing conventions (UPPER vs lower)</li>
                <li>• How to indent SELECT, FROM, WHERE, and JOINs</li>
                <li>• Formatting CTEs and subqueries for clarity</li>
                <li>• Column alias and table alias conventions</li>
                <li>• When and how to add comments to SQL</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Why SQL Formatting Matters</h2>
          <p className="text-on-surface-variant leading-relaxed">
            SQL is written once and read many times — by you six months later, by a colleague debugging a production issue at 2am, by a code reviewer trying to understand what a query does. Unformatted SQL is one of the most common sources of silent bugs: a WHERE clause that got accidentally merged with a JOIN condition, a subquery that spans 200 characters on a single line, logic that looks correct but joins on the wrong column because the structure was impossible to scan.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            Good SQL formatting is not about aesthetics — it is about making the structure of the query immediately visible to any reader.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Keyword Casing: UPPER or lower?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            SQL is case-insensitive for keywords, so <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">SELECT</code> and <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">select</code> are identical to the database engine. The convention that dominates professional SQL:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-error mb-3">Avoid</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed">{`select u.id, u.name, count(o.id)
from users u left join orders o
on u.id = o.user_id where u.active = true
group by u.id, u.name`}</pre>
            </div>
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3">Preferred</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed">{`SELECT u.id, u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id
WHERE u.active = TRUE
GROUP BY u.id, u.name`}</pre>
            </div>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            UPPERCASE keywords create a clear visual distinction between the structural parts of the query (keywords) and the data parts (table names, column names, values). This makes it dramatically easier to scan a long query and find the WHERE clause or understand the JOIN structure at a glance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Indentation: Each Clause on Its Own Line</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Each major SQL clause — SELECT, FROM, JOIN, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT — should start on a new line. Items within a clause (column list, join conditions) are indented two or four spaces:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`SELECT
    u.id,
    u.email,
    u.created_at,
    COUNT(o.id)      AS order_count,
    SUM(o.total)     AS lifetime_value
FROM users AS u
LEFT JOIN orders AS o
    ON o.user_id = u.id
   AND o.status = 'completed'
WHERE
    u.active = TRUE
    AND u.created_at >= '2024-01-01'
GROUP BY
    u.id,
    u.email,
    u.created_at
ORDER BY lifetime_value DESC
LIMIT 100;`}</pre>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            Notice that the ON condition is indented further than the JOIN keyword — this shows it belongs to the JOIN, not to the WHERE clause. Keeping JOIN conditions in the ON clause (not in WHERE) is critical: moving a JOIN condition to WHERE silently converts a LEFT JOIN to an INNER JOIN, which is one of the most common SQL bugs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">CTEs: The Most Readable Way to Write Complex Queries</h2>
          <p className="text-on-surface-variant leading-relaxed">
            A CTE (Common Table Expression) defined with <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">WITH</code> breaks a complex query into named, readable steps. Instead of nesting subqueries three levels deep, each logical step gets its own name:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`WITH active_users AS (
    SELECT id, email
    FROM users
    WHERE active = TRUE
),
recent_orders AS (
    SELECT user_id, COUNT(*) AS order_count
    FROM orders
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY user_id
)
SELECT
    u.email,
    COALESCE(o.order_count, 0) AS orders_last_30d
FROM active_users AS u
LEFT JOIN recent_orders AS o
    ON o.user_id = u.id
ORDER BY orders_last_30d DESC;`}</pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Column Alignment and Aliases</h2>
          <ul className="space-y-2">
            {[
              'Use AS explicitly for aliases — never the implicit shorthand (col "alias")',
              'Align AS keywords vertically in a SELECT list for easier scanning',
              'Use snake_case for column aliases: order_count, not orderCount or OrderCount',
              'Qualify every column with its table alias when joining multiple tables',
              'Avoid SELECT * in production queries — always name the columns you need',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed">
                <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Adding Comments to SQL</h2>
          <p className="text-on-surface-variant leading-relaxed">
            SQL supports two comment styles: <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">-- single line</code> and <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">/* block comment */</code>. Use comments to explain <em>why</em> a clause exists, not what it does — the formatted SQL already shows what it does:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`-- Exclude trial accounts (plan_id = 0) from revenue reports
WHERE u.plan_id != 0
  -- Only count orders that cleared payment; refunds have status='refunded'
  AND o.status = 'completed'`}</pre>
          </div>
        </section>

        <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Format your SQL queries instantly</h3>
            <p className="text-sm text-on-surface-variant">Paste any SQL query to get it formatted with proper casing, indentation, and clause separation. Supports MySQL, PostgreSQL, SQLite, and SQL Server.</p>
          </div>
          <Link to="/sql-formatter" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-extrabold text-on-primary hover:opacity-90 transition-opacity text-sm shrink-0">
            SQL Formatter <ArrowRight className="size-4" />
          </Link>
        </section>

        <div className="pt-2">
          <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-black text-on-surface-variant hover:text-primary transition-colors">
            ← Back to all guides
          </Link>
        </div>

      </article>
    </ToolPageWrapper>
  );
};
