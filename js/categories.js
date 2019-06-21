$(window).on("load", function () {
    let template;
    $.get("http://localhost:8080/categories", function (data) {
        $(".result").html(data);
        let parent = $(".card-parent");
        template = $(".template.card").clone();
        for (let i = 0; i < data.length; i++) {
            template.find(".card-title").text(data[i].title);
            template.find(".card-text").text(data[i].description);
            template.find(".bnt-to-goods").attr("href", "goods.html?categoryId="+data[i].id);
            template.removeClass("template");
            parent.append(template[0].outerHTML);
        }
        $(".bnt-to-goods").click(function(event){
           let k = $(event.target).attr("data-id");
            localStorage.setItem("id",k);
             

        });
        
    });


    
   
});