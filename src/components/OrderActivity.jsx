// File: src/components/OrderActivity.jsx
import React, { useState } from "react";
import "./OrderActivity.css";

const activityData = [
  { day: "Mon", orders: 32, revenue: 9600 },
  { day: "Tue", orders: 41, revenue: 12870 },
  { day: "Wed", orders: 36, revenue: 10980 },
  { day: "Thu", orders: 48, revenue: 14920 },
  { day: "Fri", orders: 52, revenue: 16400 },
  { day: "Sat", orders: 58, revenue: 18260 },
  { day: "Sun", orders: 46, revenue: 14870 },
];

export default function OrderActivity() {
  const [showDetails, setShowDetails] = useState(false);
  const maxOrders = Math.max(...activityData.map((item) => item.orders));

  return (
    <div className="panel order-activity-panel">
      <div className="panel-header">
        <div>
          <h3 className="panel-title">Order Activity</h3>
          <p className="panel-subtitle">Weekly order trend and revenue movement</p>
        </div>

        <button
          className="order-activity-view"
          onClick={() => setShowDetails(true)}
        >
          View Details
        </button>
      </div>

      <div className="order-activity-summary">
        <div>
          <span>Orders This Week</span>
          <strong>313</strong>
        </div>
        <div>
          <span>Revenue This Week</span>
          <strong>₹97,900</strong>
        </div>
      </div>

      <div className="order-activity-chart">
        {activityData.map((item) => (
          <div key={item.day} className="order-activity-bar-group">
            <div className="order-activity-tooltip">
              {item.orders} orders · ₹{item.revenue.toLocaleString("en-IN")}
            </div>

            <div className="order-activity-bar-track">
              <div
                className="order-activity-bar"
                style={{ height: `${(item.orders / maxOrders) * 100}%` }}
              />
            </div>

            <span>{item.day}</span>
          </div>
        ))}
      </div>

      {showDetails && (
        <div
          className="activity-modal-backdrop"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="activity-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="activity-modal-header">
              <div>
                <p>Weekly Breakdown</p>
                <h2>Order Activity Details</h2>
              </div>

              <button onClick={() => setShowDetails(false)}>×</button>
            </div>

            <div className="activity-modal-table-wrap">
              <table className="activity-modal-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                    <th>Avg. Order Value</th>
                  </tr>
                </thead>
                <tbody>
                  {activityData.map((item) => (
                    <tr key={item.day}>
                      <td>{item.day}</td>
                      <td>{item.orders}</td>
                      <td>₹{item.revenue.toLocaleString("en-IN")}</td>
                      <td>
                        ₹{Math.round(item.revenue / item.orders).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}