$(document).ready(function () {
  $(".contact__form").submit(function (e) {
    e.preventDefault();
    var formID = $(this).attr("id");
    var formNm = $("#" + formID);
    var message = $(formNm).find(".form-message");
    form.find("textarea, input").each(function () {
      if ($(this).val() == "") {
        // сообщение, что не все поля заполены
        message.html("Заполните все поля!").fadeTo(500, 1);
        // error = true;
      }
    });
    $.ajax({
      type: "POST",
      url: "http://form.okshimel.in.ua/telegram.php",
      dataType: "json",
      data: formNm.serialize(),
      success: function (data) {
        // Вывод сообщения об успешной отправке
        message.html(data);
        formID.trigger("reset");
        setTimeout(function () {
          message.html("Спасибо за отправку вашего сообщения!");
        }, 3000);
      },
      error: function (jqXHR, text, error) {
        // Вывод сообщения об ошибке отправки
        setTimeout(function () {
          message.html("Ошибка. Сообщение не отправлено!");
          $("input").not(":input[type=submit], :input[type=hidden]").val("");
        }, 3000);
      },
    });
    // return false;
  });
});
