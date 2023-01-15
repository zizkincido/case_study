const API_URL = "https://gorest.co.in/public/v2";
const fetch_request = async (endpoint, values, method_type) => {
  return await fetch(`${API_URL}/${endpoint}`, {
    method: method_type,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer 7991ba7b8480a1063d1c0780e4ba6f803f17c6ee8336c726729091527b30808f`,
    },
    ...(Object.keys(values).length !== 0 && { body: JSON.stringify(values) }),
  });
};

document.querySelector("#query-button").addEventListener("click", function (e) {
  e.preventDefault();
  var searchValue = document.getElementById("search-user-id").value;
  console.log(searchValue);
  fetch_request(`users/${searchValue}`, {}, "GET")
    .then((response) => response.json())
    .then((json) => {
      document.querySelector(
        "#user-info"
      ).innerHTML = `İsim-Soyisim: ${json.name}<br>
        E-mail: ${json.email}<br>
        Gender: ${json.gender}<br>
        Status: ${json.status}`;
    });

  console.log(searchValue);
  fetch_request(`users/${searchValue}/posts`, {}, "GET")
    .then((response) => response.json())
    .then((json) => {
      if (json.length === 0) {
        document.querySelector("#post_list").innerHTML = `Postu Yok`;
      }
      for (let index = 0; index < json.length; index++) {
        document.querySelector(
          "#post_list"
        ).innerHTML = `Post ID: ${json[index].id}<br>
        Post Başlığı: ${json[index].title}<br>
        Post İçeriği: ${json[index].body}`;
      }
    });
});

document.querySelector("#user-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(document.querySelector("#user-form"));
  var status = "inactive";
  if (
    formData.get("gender") === "female" ||
    formData.get("gender") === "male"
  ) {
    status = "active";
  }
  formData.append("status", status);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://gorest.co.in/public/v2/users");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 7991ba7b8480a1063d1c0780e4ba6f803f17c6ee8336c726729091527b30808f"
  );
  xhr.onload = function () {
    if (xhr.status === 201) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
    }
  };
  xhr.send(formData);
});
document.querySelector("#todo-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(document.querySelector("#todo-form"));

    const todoData = {}
    for (var pair of formData.entries()) {
      todoData[pair[0]] = pair[1]
    }
    console.log(todoData)

    fetch_request(`users/${todoData.user_id}/todos`, todoData, "POST")
      .then((resp) => {
        console.log(resp)
        alert('To-do Başarıyla Oluşturuldu!')
        
      })
      .catch((err) =>
        console.error("Ekleme işlemi başarısız oldu. Hata: " + err)
      );
  });
