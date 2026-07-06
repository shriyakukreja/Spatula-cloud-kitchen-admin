// File: src/data/statusData.js
// Dummy order-status overview counts.
// Replace later with GET /api/orders/status-summary?range=daily|weekly|monthly.
// File: src/data/statusData.js

export const statusOverview = {
  daily: [
    { id: "total", label: "Total Orders", count: 46, tone: "pending" },
    { id: "delivered", label: "Delivered", count: 38, tone: "delivered" },
    { id: "pending", label: "Pending", count: 8, tone: "pending" },
    { id: "preparing", label: "Preparing", count: 6, tone: "preparing" },
    { id: "out", label: "Out for Delivery", count: 5, tone: "out" },
    { id: "cancelled", label: "Cancelled", count: 1, tone: "cancelled" },
  ],
  weekly: [
    { id: "total", label: "Total Orders", count: 284, tone: "pending" },
    { id: "delivered", label: "Delivered", count: 251, tone: "delivered" },
    { id: "pending", label: "Pending", count: 24, tone: "pending" },
    { id: "preparing", label: "Preparing", count: 19, tone: "preparing" },
    { id: "out", label: "Out for Delivery", count: 17, tone: "out" },
    { id: "cancelled", label: "Cancelled", count: 7, tone: "cancelled" },
  ],
  monthly: [
    { id: "total", label: "Total Orders", count: 864, tone: "pending" },
    { id: "delivered", label: "Delivered", count: 792, tone: "delivered" },
    { id: "pending", label: "Pending", count: 62, tone: "pending" },
    { id: "preparing", label: "Preparing", count: 43, tone: "preparing" },
    { id: "out", label: "Out for Delivery", count: 36, tone: "out" },
    { id: "cancelled", label: "Cancelled", count: 18, tone: "cancelled" },
  ],
}; 