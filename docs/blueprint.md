# **App Name**: DerivaSim

## Core Features:

- Live Demo Toggle: Implements a global Live Demo master toggle in the main layout (header) which is labeled exactly: Live Demo. When ON, all market numeric values must update subtly and realistically every 2–5 seconds using bounded random walks and correlated moves. When OFF, values remain static at the last snapshot.
- Portfolio Overview Dashboard: Displays key performance indicators (KPIs), an asset heatmap (treemap), strategy pie chart, and strategy cards.
- Interactive Holdings Table: Provides a comprehensive and interactive data table with all specified columns, column chooser, sorting, pagination, virtualization, and row expansion for detailed insights.
- Option Chain Display: Presents an option chain with expiry accordion and strike ladder, along with a calculator and trade ticket accessible via a drawer.
- Strategy Builder and Simulator: Enables users to compose multi-leg strategies and simulate their P&L with an interactive payoff chart.
- Price Trend Emulation: LLM tool will use recent trading prices from prior close price in the chosen history range to suggest a series of new tick prices for use when the Live Demo is toggled ON.
- Alert and Notification System: Allows users to create alerts based on price thresholds, Greek values, or expiry dates, providing actionable recommendations and notifications.

## Style Guidelines:

- Primary color: Deep Indigo (#4B0082) to evoke a sense of stability and sophistication suitable for financial applications.
- Background color: Light gray (#F0F0F0) for a clean, professional look, maintaining a light color scheme.
- Accent color: Vibrant Cyan (#00FFFF) to draw attention to interactive elements and important data points.
- Body and headline font: 'Inter', a sans-serif font, for a modern, machined look suitable for both headlines and body text.
- Use consistent and clear icons from lucide-react (or equivalent) for easy navigation and visual understanding of the dashboard elements.
- Implement a responsive layout that adapts to different screen sizes, ensuring optimal viewing on both desktop and mobile devices. Use clear section divisions and whitespace to avoid clutter.
- Incorporate subtle animations for transitions and data updates to enhance the user experience without being distracting. Respect 'prefers-reduced-motion' settings.