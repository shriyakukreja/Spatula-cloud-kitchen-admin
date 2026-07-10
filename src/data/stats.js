// File: src/data/stats.js
// Dummy statistics data for the dashboard.
// Replace later with GET /api/dashboard/stats.

export const dashboardStats = [
  {
    id: "total-orders",
    label: "Total Orders",
    value: "864",
    change: "+7.4%",
    trend: "up",
    icon: "orders",
    caption: "All time",
  },
  {
    id: "today-orders",
    label: "Today's Orders",
    value: "46",
    change: "+9.5%",
    trend: "up",
    icon: "today",
    caption: "vs yesterday",
  },
  {
    id: "revenue-today",
    label: "Revenue Today",
    value: "₹14,870",
    change: "+6.8%",
    trend: "up",
    icon: "revenue",
    caption: "vs yesterday",
  },
  {
    id: "pending-orders",
    label: "Pending Orders",
    value: "8",
    change: "2 orders",
    trend: "down",
    icon: "pending",
    caption: "Needs attention",
  },
  {
    id: "completed-orders",
    label: "Completed Orders",
    value: "38",
    change: "+8.3%",
    trend: "up",
    icon: "completed",
    caption: "Today",
  },
  {
    id: "avg-prep-time",
    label: "Avg. Preparation Time",
    value: "17 min",
    change: "-1 min",
    trend: "up",
    icon: "timer",
    caption: "Last 7 days",
  },
];