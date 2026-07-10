// File: src/data/statusData.js

export const statusOverview = {
  daily: [
    { id: "pending", label: "Pending", count: 8, tone: "pending" },
    { id: "preparing", label: "Preparing", count: 6, tone: "preparing" },
    { id: "ready", label: "Ready", count: 4, tone: "ready" },
    { id: "out", label: "Out for Delivery", count: 5, tone: "out" },
    { id: "delivered", label: "Delivered", count: 38, tone: "delivered" },
    { id: "cancelled", label: "Cancelled", count: 1, tone: "cancelled" },
  ],
  weekly: [
    { id: "pending", label: "Pending", count: 24, tone: "pending" },
    { id: "preparing", label: "Preparing", count: 19, tone: "preparing" },
    { id: "ready", label: "Ready", count: 11, tone: "ready" },
    { id: "out", label: "Out for Delivery", count: 17, tone: "out" },
    { id: "delivered", label: "Delivered", count: 251, tone: "delivered" },
    { id: "cancelled", label: "Cancelled", count: 7, tone: "cancelled" },
  ],
  monthly: [
    { id: "pending", label: "Pending", count: 62, tone: "pending" },
    { id: "preparing", label: "Preparing", count: 43, tone: "preparing" },
    { id: "ready", label: "Ready", count: 28, tone: "ready" },
    { id: "out", label: "Out for Delivery", count: 36, tone: "out" },
    { id: "delivered", label: "Delivered", count: 792, tone: "delivered" },
    { id: "cancelled", label: "Cancelled", count: 18, tone: "cancelled" },
  ],
};