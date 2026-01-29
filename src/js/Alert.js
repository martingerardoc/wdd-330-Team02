export default class Alert {
  constructor(jsonPath = "../json/alerts.json") {
    this.jsonPath = jsonPath;
    this.init();
  }

  async init() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error("Failed to load alerts");
      const alerts = await response.json();
      this.renderAlerts(alerts);
    } catch (error) {
      // Still working on how to log the error without causing an issue with lint
      // console.error("Alert Error:", error);
    }
  }

  renderAlerts(alerts) {
    if (!alerts || alerts.length === 0) return;

    // Create a section container for the list of alerts
    const section = document.createElement("section");
    section.className = "alert-list";

    // Loop through all the alerts and build a <p> for each one of them
    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      p.style.padding = "1rem";
      // p.style.margin = "5px 0";
      section.appendChild(p);
    });

    // Prepend to main the alerts section container
    const main = document.querySelector("main");
    main.prepend(section);
  }
}
