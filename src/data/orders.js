// File: src/data/orders.js
import { menuItems } from "./menu.js";

const menuItemMap = new Map(menuItems.map((item) => [item.id, item]));

function getOrderItemDetails(orderItems) {
  return orderItems.map((orderItem) => {
    const menuItem = menuItemMap.get(orderItem.menuItemId);

    return {
      ...orderItem,
      name: menuItem?.name || "Unknown Item",
      price: menuItem?.price || 0,
      lineTotal: (menuItem?.price || 0) * orderItem.quantity,
    };
  });
}

function getOrderAmount(orderItems) {
  return getOrderItemDetails(orderItems).reduce(
    (sum, item) => sum + item.lineTotal,
    0
  );
}

function getOrderItemNames(orderItems) {
  return getOrderItemDetails(orderItems).map((item) =>
    item.quantity > 1 ? `${item.name} x${item.quantity}` : item.name
  );
}

function getDeliveryTime(createdAt, deliveredAt) {
  if (!deliveredAt) return "In progress";

  const start = new Date(createdAt).getTime();
  const end = new Date(deliveredAt).getTime();
  const minutes = Math.round((end - start) / (1000 * 60));

  return `${minutes} min`;
}

const rawOrders = [
  {
    id: "SPT-10482",
    customerId: "cust-1",
    customer: "Aarav Mehta",
    phone: "+91 98765 43210",
    address: "Flat 302, Sector 8, Dwarka, New Delhi",
    orderItems: [
      { menuItemId: "pizza-5", quantity: 1 },
      { menuItemId: "fries-4", quantity: 1 },
      { menuItemId: "bev-4", quantity: 1 },
    ],
    platform: "Zomato",
    paymentStatus: "Paid",
    status: "Preparing",
    createdAt: "2026-07-07T18:40:00",
    deliveredAt: null,
  },
  {
    id: "SPT-10481",
    customerId: "cust-2",
    customer: "Isha Kapoor",
    phone: "+91 91234 56780",
    address: "House 114, Palam Vihar, Gurugram",
    orderItems: [
      { menuItemId: "pizza-4", quantity: 1 },
      { menuItemId: "bev-2", quantity: 1 },
    ],
    platform: "Swiggy",
    paymentStatus: "Paid",
    status: "Out for Delivery",
    createdAt: "2026-07-07T18:20:00",
    deliveredAt: null,
  },
  {
    id: "SPT-10480",
    customerId: "cust-3",
    customer: "Rohan Verma",
    phone: "+91 99887 66554",
    address: "Tower B, Sector 99, Gurugram",
    orderItems: [
      { menuItemId: "burger-7", quantity: 1 },
      { menuItemId: "fries-2", quantity: 1 },
    ],
    platform: "Walk-in",
    paymentStatus: "Paid",
    status: "Ready",
    createdAt: "2026-07-07T18:05:00",
    deliveredAt: null,
  },
  {
    id: "SPT-10479",
    customerId: "cust-4",
    customer: "Sanya Malhotra",
    phone: "+91 90909 12121",
    address: "C-42, Janakpuri, New Delhi",
    orderItems: [
      { menuItemId: "pasta-1", quantity: 1 },
      { menuItemId: "coffee-1", quantity: 1 },
    ],
    platform: "Direct",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: "2026-07-07T18:50:00",
    deliveredAt: null,
  },
  {
    id: "SPT-10478",
    customerId: "cust-5",
    customer: "Kabir Shah",
    phone: "+91 97531 08642",
    address: "A-18, Rajouri Garden, New Delhi",
    orderItems: [
      { menuItemId: "pizza-1", quantity: 1 },
      { menuItemId: "fries-3", quantity: 1 },
    ],
    platform: "Zomato",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-07-07T17:30:00",
    deliveredAt: "2026-07-07T18:15:00",
  },
  {
    id: "SPT-10477",
    customerId: "cust-6",
    customer: "Meera Nair",
    phone: "+91 96345 21870",
    address: "Flat 906, Vikas Puri, New Delhi",
    orderItems: [
      { menuItemId: "pasta-2", quantity: 1 },
      { menuItemId: "bev-3", quantity: 1 },
    ],
    platform: "Swiggy",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-07-07T15:10:00",
    deliveredAt: "2026-07-07T15:55:00",
  },
  {
    id: "SPT-10476",
    customerId: "cust-7",
    customer: "Devansh Rao",
    phone: "+91 93456 78901",
    address: "Sector 22, Dwarka, New Delhi",
    orderItems: [
      { menuItemId: "pizza-8", quantity: 1 },
      { menuItemId: "side-8", quantity: 1 },
    ],
    platform: "Walk-in",
    paymentStatus: "Refunded",
    status: "Cancelled",
    createdAt: "2026-07-07T14:30:00",
    deliveredAt: null,
  },
  {
    id: "SPT-10475",
    customerId: "cust-8",
    customer: "Priya Sinha",
    phone: "+91 98123 45670",
    address: "Pocket D, Vasant Kunj, New Delhi",
    orderItems: [
      { menuItemId: "pasta-4", quantity: 1 },
      { menuItemId: "shake-5", quantity: 1 },
    ],
    platform: "Direct",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-07-07T13:20:00",
    deliveredAt: "2026-07-07T14:05:00",
  },

  // Past orders for customer profiles
  {
    id: "SPT-10461",
    customerId: "cust-1",
    customer: "Aarav Mehta",
    phone: "+91 98765 43210",
    address: "Flat 302, Sector 8, Dwarka, New Delhi",
    orderItems: [
      { menuItemId: "pizza-5", quantity: 1 },
      { menuItemId: "shake-3", quantity: 1 },
    ],
    platform: "Direct",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-07-05T20:10:00",
    deliveredAt: "2026-07-05T20:36:00",
  },
  {
    id: "SPT-10444",
    customerId: "cust-1",
    customer: "Aarav Mehta",
    phone: "+91 98765 43210",
    address: "Flat 302, Sector 8, Dwarka, New Delhi",
    orderItems: [
      { menuItemId: "burger-7", quantity: 1 },
      { menuItemId: "fries-4", quantity: 1 },
    ],
    platform: "Zomato",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-07-03T19:25:00",
    deliveredAt: "2026-07-03T19:53:00",
  },
  {
    id: "SPT-10428",
    customerId: "cust-1",
    customer: "Aarav Mehta",
    phone: "+91 98765 43210",
    address: "Flat 302, Sector 8, Dwarka, New Delhi",
    orderItems: [
      { menuItemId: "pizza-1", quantity: 2 },
      { menuItemId: "bev-4", quantity: 1 },
    ],
    platform: "Swiggy",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-06-30T21:05:00",
    deliveredAt: "2026-06-30T21:32:00",
  },
  {
    id: "SPT-10453",
    customerId: "cust-2",
    customer: "Isha Kapoor",
    phone: "+91 91234 56780",
    address: "House 114, Palam Vihar, Gurugram",
    orderItems: [
      { menuItemId: "pizza-4", quantity: 1 },
      { menuItemId: "fries-1", quantity: 1 },
    ],
    platform: "Zomato",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-07-04T18:45:00",
    deliveredAt: "2026-07-04T19:09:00",
  },
  {
    id: "SPT-10436",
    customerId: "cust-2",
    customer: "Isha Kapoor",
    phone: "+91 91234 56780",
    address: "House 114, Palam Vihar, Gurugram",
    orderItems: [
      { menuItemId: "pasta-5", quantity: 1 },
      { menuItemId: "shake-1", quantity: 1 },
    ],
    platform: "Swiggy",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-07-01T20:20:00",
    deliveredAt: "2026-07-01T20:47:00",
  },
  {
    id: "SPT-10449",
    customerId: "cust-3",
    customer: "Rohan Verma",
    phone: "+91 99887 66554",
    address: "Tower B, Sector 99, Gurugram",
    orderItems: [
      { menuItemId: "burger-7", quantity: 1 },
      { menuItemId: "bev-2", quantity: 1 },
    ],
    platform: "Walk-in",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-07-04T14:15:00",
    deliveredAt: "2026-07-04T14:36:00",
  },
  {
    id: "SPT-10431",
    customerId: "cust-3",
    customer: "Rohan Verma",
    phone: "+91 99887 66554",
    address: "Tower B, Sector 99, Gurugram",
    orderItems: [
      { menuItemId: "pizza-8", quantity: 1 },
      { menuItemId: "side-7", quantity: 1 },
    ],
    platform: "Direct",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2026-06-29T19:30:00",
    deliveredAt: "2026-06-29T20:00:00",
  },
];

export const allOrders = rawOrders.map((order) => ({
  ...order,
  itemDetails: getOrderItemDetails(order.orderItems),
  items: getOrderItemNames(order.orderItems),
  amount: getOrderAmount(order.orderItems),
  deliveryTime: getDeliveryTime(order.createdAt, order.deliveredAt),
}));

const activeStatuses = ["Pending", "Preparing", "Ready", "Out for Delivery"];

export const dashboardRecentOrders = allOrders.filter((order) => {
  if (activeStatuses.includes(order.status)) return true;

  if (order.status === "Delivered" && order.deliveredAt) {
    const deliveredTime = new Date(order.deliveredAt).getTime();
    const currentTime = new Date("2026-07-07T19:00:00").getTime();
    const oneHour = 60 * 60 * 1000;

    return currentTime - deliveredTime <= oneHour;
  }

  return false;
});

export const recentOrders = allOrders;

export const orderStatuses = [
  "Pending",
  "Preparing",
  "Ready",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];