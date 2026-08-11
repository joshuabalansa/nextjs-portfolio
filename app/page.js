import Portfolio from "./components/Portfolio";
import { siteConfig } from "./site.config";

export default function Home() {
  return (
    <>
      {/* Crawlable fallback when JS is delayed or disabled */}
      <noscript>
        <main
          style={{
            maxWidth: "42rem",
            margin: "0 auto",
            padding: "2rem 1.25rem",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1.6,
          }}
        >
          <h1>{siteConfig.name}</h1>
          <p>
            <strong>{siteConfig.jobTitle}</strong> · {siteConfig.location}
          </p>
          <p>{siteConfig.description}</p>
          <p>
            Contact:{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <ul>
            <li>
              <a href={siteConfig.social.github}>GitHub</a>
            </li>
            <li>
              <a href={siteConfig.social.linkedin}>LinkedIn</a>
            </li>
            <li>
              <a href={siteConfig.social.instagram}>Instagram</a>
            </li>
          </ul>
        </main>
      </noscript>
      <Portfolio />
    </>
  );
}
