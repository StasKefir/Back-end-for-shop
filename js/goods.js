$(window).on("load", function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var categoryId = url.searchParams.get("categoryId");
    let template = $(".template.container").clone(),
        parent = $(".goods-parent");
    $.get("http://localhost:8080/goods", {
        "categoryId": categoryId
    }, function (data) {
        $(".result").html(data);
        for (let i = 0; i < data.length; i++) {
            template.find(".img").attr("src", data[i].img);
            template.find(".goods-title").text(data[i].title);
            template.find(".goods-desc").text(data[i].description);
            template.find(".price").text(data[i].price);
            template.removeClass("template");
            template.find(".buy").attr("data-id", data[i].id);
            template.find(".delete").attr("data-id", data[i].id);
            parent.append(template[0].outerHTML);
        }

        showDeleteBtn();

        $(".buy").on("click", function (event) {
            let cartString = localStorage.getItem("cart");
            let cart = cartString ? JSON.parse(cartString) : [],
                found = false,
                id = parseInt($(event.target).attr("data-id"));
            for (let i = 0; i < cart.length; i++) {
                if (id === cart[i].id) {
                    cart[i].qty++;
                    found = true;
                    break;
                }
            }
            if (!found) {
                cart.push({
                    "id": id,
                    "qty": 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            countItems();
            showDeleteBtn();
        });

        $(".delete").on("click", function (event) {
            let cartString = localStorage.getItem("cart");
            let cart = cartString ? JSON.parse(cartString) : [],
                id = parseInt($(event.target).attr("data-id"));
            for (let i = 0; i < cart.length; i++) {
                if (id === cart[i].id) {
                    cart[i].qty--;
                    found = true;
                    if (cart[i].qty == 0) {
                        cart.splice(i, 1);
                        hideDeleteBtn();
                        break;
                    }
                }
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            countItems();

        });
    });

    countItems();

});

function countItems() {
    let cartString = localStorage.getItem("cart");
    let cart = cartString ? JSON.parse(cartString) : [];
    let countItems = 0;
    for (let i = 0; i < cart.length; i++) {
        countItems += cart[i].qty;
    }
    $(".qty-goods").text(countItems);
}

function showDeleteBtn() {
    let cartString = localStorage.getItem("cart");
    let cart = cartString ? JSON.parse(cartString) : [];
    for (let i = 0; i < cart.length; i++) {
        $(".delete[data-id=" + cart[i].id + "]").removeClass("d-none");
    }
}

function hideDeleteBtn() {
    let cartString = localStorage.getItem("cart");
    let cart = cartString ? JSON.parse(cartString) : [];
    for (let i = 0; i < cart.length; i++) {
        $(".delete[data-id=" + cart[i].id + "]").addClass("d-none");
    }
}