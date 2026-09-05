import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Breadcrumbs({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `https://risefinance.money${item.path}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#7C867E]">
        {items.map((item, i) => (
          <span key={item.path}>
            {i > 0 && <span className="mx-2">/</span>}
            {i === items.length - 1 ? (
              <span className="text-[#9AA39C]">{item.label}</span>
            ) : (
              <Link to={item.path} className="hover:text-[#5CFFB0]">{item.label}</Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
