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
import { useState } from "react";

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={"Seu carrinho"} />
        <div className="content">
          <section>
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
                      item // percorre tudo que esta no cart
                    ) => <TableRow />
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
