export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Abdullah",
    jobTitle: "Software Engineer",
    url: "https://abdullah-portfolio.vercel.app",
    image: "https://abdullah-portfolio.vercel.app/profile.jpeg",
    email: "drabdullahumer@gmail.com",
    sameAs: [
      "https://www.linkedin.com/in/abdullahumer12",
      "https://github.com/abdullahdatascience",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
