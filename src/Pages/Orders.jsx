import { useState, useEffect } from "react";
import "../Style/orders.css";
import { toast } from "react-toastify";

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/users/me", {
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setUserId(user.id);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("http://176.136.89.140:5000/orders/", {
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
      },
    })
      .then((response) => response.json())
      .then(async (orderList) => {
        const ordersWithProducts = await Promise.all(
          orderList.map(async (order) => {
            const products = await Promise.all(
              order.productList.map(async (productId) => {
                const response = await fetch(
                  `http://176.136.89.140:5000/products/${productId}`,
                  {
                    headers: {
                      Authorization: localStorage.getItem("token")
                        ? `Basic ${localStorage.getItem("token")}`
                        : undefined,
                    },
                  }
                );
                const product = await response.json();
                return (
                  <div key={productId}>
                    <p>{product.name}</p>
                    <p>{product.price} €</p>
                  </div>
                );
              })
            );
            return {
              ...order,
              products,
            };
          })
        );
        setOrders(ordersWithProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function getUserType(userType) {
    switch (userType) {
      case 0:
        return "User";
      case 1:
        return "Admin";
      case 2:
        return "Fournisseur";
      default:
        throw new Error("User type non valide");
    }
  }

  function getOrderState(orderState) {
    switch (orderState) {
      case 0:
        return "Pending";
      case 1:
        return "Validated";
      case 2:
        return "Accepted";
      case 3:
        return "Refused";
      case 4:
        return "Delivered";
      default:
        throw new Error("Order state non valide");
    }
  }

  return (
    <div className="order-container">
      {orders.map((order) => {
        return order.id === userId ? (
          <div key={order.id} >
            <p>Type of Order : {getUserType(order.orderType)} order</p>
            <p>State of Order : {getOrderState(order.orderState)}</p>
            {order.products}
          </div>
        ) : null;
      })}
    </div>
  );
}

export default Orders;
