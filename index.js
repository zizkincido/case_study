document.querySelector("#query-button").addEventListener("click", function() {
    var id = document.querySelector("#user-id").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://gorest.co.in/public/v2/users/" + id);
    xhr.setRequestHeader("Authorization", "Bearer 7991ba7b8480a1063d1c0780e4ba6f803f17c6ee8336c726729091527b30808f");
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var userInfo = "Ad-Soyad: " + data.name + "<br>"
                        + " "
                       + " Email: " + data.email + "<br>"
                       + " Cinsiyet: " + data.gender + "<br>"
                       + " Status: " + data.status;
            document.querySelector("#user-info").innerHTML = userInfo;
        }
        
    };
    xhr.send();
    var id = document.querySelector("#user-id").value;
    var xhr_post = new XMLHttpRequest();
    xhr_post.open("GET", "https://gorest.co.in/public/v2/posts?user_id="+ id);
    xhr_post.setRequestHeader("Authorization", "Bearer 7991ba7b8480a1063d1c0780e4ba6f803f17c6ee8336c726729091527b30808f");
    xhr_post.onload = function() {
        if (xhr_post.status === 200) {
            var data_post = JSON.parse(xhr_post.responseText);
            if(data_post.meta.count === 0) {
                console.log("This user doesn't have any post.");
            }
            else {
                var post_list = data_post.data;
                var post_list_element = document.querySelector("#post_list");
                for(var i = 0; i < post_list.length; i++) {
                    var post_element = document.createElement("div");
                    post_element.innerHTML = "Post ID: " + post_list[i].id + "<br>" +
                    "Post Title: " + post_list[i].title + "<br>" +
                    "Post Body: " + post_list[i].body;
                    post_list_element.appendChild(post_element);
                }
            }
        }
        
    };
    xhr_post.send();
});
    
        
    


  document.querySelector("#user-form").addEventListener("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(document.querySelector("#user-form"));
    var status = "inactive";
    if (formData.get("gender") === "female" || formData.get("gender") === "male") {
        status = "active";
    }
    formData.append("status", status);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://gorest.co.in/public/v2/users");
    xhr.setRequestHeader("Authorization", "Bearer 7991ba7b8480a1063d1c0780e4ba6f803f17c6ee8336c726729091527b30808f");
    xhr.onload = function() {
        if (xhr.status === 201) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
        }
    };
    xhr.send(formData);
});
document.querySelector("#todo-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(document.querySelector("#todo-form"));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://gorest.co.in/public/v2/todos");
    xhr.setRequestHeader("Authorization", "Bearer 7991ba7b8480a1063d1c0780e4ba6f803f17c6ee8336c726729091527b30808f");
    xhr.onload = function() {
        if (xhr.status === 201) {
            console.log("To-do başarıyla eklendi!");
        } else {
            console.log("Ekleme işlemi başarısız oldu. Hata: " + xhr.responseText);
        }
    };
    xhr.send(formData);
});
