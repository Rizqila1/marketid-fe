import content from "../content/eng/pages_about.json";

export default function About() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="heading__1">{content.marketid_company_title}</h1>
      <h3 className="subheading__2">{content.marketid_company} </h3>
      <h2 className="heading__2">{content.marketid_founding_date_title}</h2>
      <h3 className="subheading__2">{content.marketid_date_founding}</h3>
      <h2 className="heading__2">{content.marketid_location_title}</h2>
      <h3 className="subheading__2">{content.marketid_location}</h3>
      <h2 className="heading__2">{content.marketid_mission_title}</h2>
      <h3 className="subheading__2 text-center">{content.marketid_mission}</h3>
    </div>
  );
}
