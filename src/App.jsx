/*
? DESAFIO - Shopping Cart:

Você deve desenvolver um carrinho de compras funcional.
Funcionalidades que esperamos que você desenvolva:

todo - inserção de novos produtos no carrinho
todo - remoção de produtos já inseridos
todo - alteração de quantidade de cada item 
todo - cálculo do preço total dos itens inseridos

todo - FUNCIONALIDADE EXTRA: aplicação de cupom de desconto
*/
import "./styles.scss";

import PageHeader from "./layout/PageHeader";
import PageTitle from "./layout/PageTitle";
import Summary from "./Summary";
import TableRow from "./TableRow";
import { useEffect, useState } from "react";
import { api } from "./provider";

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function App() {
  const [cart, setCart] = useState([]);

  const productObject = {
    name: "produto",
    category: "categoria",
    price: randomNumber(200, 600),
    quantity: 1,
  };

  const fetchData = () => {
    api.get("/cart").then((response) => setCart(response.data)); // receive itens from api
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = () => {
    api.post("/cart", productObject).then((response) => {
      fetchData(); // preenche a state com o novo item
    });
  };

  const handleRemoveItem = (item) => {
    // passe a função para dentro do componente via props
    api.delete("/cart/" + item).then((res) => {
      fetchData();
    });
    console.log(item);
  };

  const handleUpdatedItem = (item, action) => {
    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      if (item.quantity === 1) {
        alert("não pode tirar mais que isso");
      }
      item.quantity -= 1;
    }
    const newData = { ...item, quantity: item.quantity };
    api.put("/cart" + item.id, newData).then((res) => {
      console.log(newData);
      console.log(response);
      fetchData();
    });
  };
  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={"Seu carrinho"} />
        <div className="content">
          <section>
            <button
              onClick={handleAddItem}
              style={{ padding: "5px 10px", marginBottom: "15px" }}
            >
              Add to cart
            </button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={"5"} style={{ textAlign: "center" }}>
                      Não há itens em seu carrinho.
                    </td>
                  </tr>
                ) : (
                  cart.map(
                    (
                      item,
                      index // percorre tudo que esta no cart
                    ) => (
                      <TableRow
                        key={index}
                        data={item}
                        handleRemoveItem={handleRemoveItem}
                        handleUpdatedItem={handleUpdatedItem}
                      />
                    )
                  )
                )}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
