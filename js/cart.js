$(window).on("load", function () {
    var cart = localStorage.getItem("cart");
    if (cart) {
        $.get("http://localhost:8080/cart", {
            "cart": cart
        }, function (data) {
            let template = $(".template.line").clone(),
                parent = $(".cart-parent");

            for (let i = 0; i < data.order.length; i++) {

                template.find(".title").text(data.order[i].title);
                template.find(".item-id").text(data.order[i].id);
                template.find(".price").text(data.order[i].price);
                template.find(".qty").text(data.order[i].qty);
                template.find(".sum").text(data.order[i].sum);
                template.removeClass("template");
                parent.append(template[0].outerHTML);
                $(".total").text(data.total);
            }

        });
    }
});