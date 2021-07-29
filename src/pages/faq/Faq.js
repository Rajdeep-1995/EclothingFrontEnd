import React from "react";

import { Menu } from "antd";
const { SubMenu, ItemGroup } = Menu;

const Faq = () => {
  document.title = "FAQs";
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col  pt-5">
            <h6>Q.How can I pay using credit card?</h6>
            <p>
              A. Fill your shopping cart by clicking “Add to Cart” or “Add to
              Bag” on each item you want to purchase. When you’re done, click
              the “Checkout” button (it’s usually in the upper right part of the
              screen). You may have to click on the shopping cart first and then
              select the option to check out. Review your cart to be sure you've
              added the correct amount, sizes, and colors of the items you want
              to purchase. Then, you can begin the purchase process.
            </p>
            <h6>Q.How can I contact the seller?</h6>
            <p>
              A.et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus id quod
              maxime placeat facere possimus, omnis voluptas assumenda est,
              omnis dolor repellendus. Temporibus autem quibusdam et aut
              officiis debitis aut rerum necessitatibus saepe eveniet ut et
              voluptates repudiandae sint et molestiae non recusandae. Itaque
              earum rerum hic tenetur a sapiente delectus,
            </p>
            <h6>Q.How can I refund product?</h6>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minim
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
