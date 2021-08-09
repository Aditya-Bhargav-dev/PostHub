let url = "https://60f3bd413cb0870017a8a036.mockapi.io/Users/";
async function getPosts(id = "") {
  try {
    let response = await fetch(url + id);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    if (id === "") {
      recentPosts(data);
    }
    else {
      localStorage.setItem("comments", JSON.stringify(data.comments));
      localStorage.setItem("id", data.id);
      showPost(data);
    }
  }
  catch (error) {
    console.log(error);
  }

}

getPosts();
function recentPosts(posts) {
  let row = document.getElementById("recentPost");
  row.innerHTML = "";
  posts.forEach(element => {
    let post =
      `
      <div class="col-sm-4 col-md-4 col-lg-4 text-center">
          <div class="card">
              <div class="card-body">
              <img src="https://lh3.googleusercontent.com/8jo7jrKIA1DSGQOjQscnkF7OjyTdszyJ0ep_ARe9eZ-gGOCD1_NXTSTz1raF4G1cE9t02B0=s85" style="width:100px;height:50px;"></img><br><br>
                <h4 class="card-title">${element.title}</h4>
                <p class="card-text">${element.post.slice(0, 50)}</p>
                <a href="javascript:getPosts('${element.id}')" class="card-link">Continue reading</a>
              </div>
            </div>
            <br>
      </div>
      `
    row.innerHTML += post;
  });
}

async function createPost() {
  try {
    let name = document.getElementById("name").value;
    let title = document.getElementById("title").value;
    let pass = document.getElementById("password").value;
    let post = document.getElementById("post").value;
    let comments = [];
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, pass, title, post, comments }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    document.getElementById("form").reset();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert("Post created.")
    getPosts();
  }
  catch (error) {
    console.log(error);
  }
}

function showPost(post) {
  document.getElementById("show").style.display = "none";
  let readersComments = document.getElementById("comments");
  document.getElementById("authorname").innerHTML = "Welcome again," + post.name;
  document.getElementById("posttitle").innerHTML = post.title;
  document.getElementById("posttext").innerHTML = post.post;
  let row = "";
  readersComments.innerHTML = "";
  post.comments.forEach(comment => {

    row =
      `<p>${comment}</p>
    <hr class="my-0" style="background-color: cornsilk;"/>
    <br>
    `
    readersComments.innerHTML += row;
  });
  userpost.style.display = "block";

}

function displayComment() {

  document.getElementById("write").style.display = "block";


}

function closeComment() {
  document.getElementById("write").style.display = "none";

}

function like() {
  let text = document.getElementById("likepost");
  if (text.innerHTML === "Like") {
    text.innerHTML = "Liked";
    document.getElementById("likeicon").style.color = "blue";

  }
  else {

    text.innerHTML = "Like";
    document.getElementById("likeicon").style.color = "white";
  }


}

async function postComment() {
  try {
    let comment = document.getElementById("commenttext");
    let comments = JSON.parse(localStorage.getItem("comments"));
    comments.push(comment.value);
    console.log(comments)
    let response = await fetch(url + localStorage.getItem("id"), {
      method: "PUT",
      body: JSON.stringify({ comments }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    comment.innerHTML = "";
    showPost(data);
  }
  catch (error) {
    console.log(error);
  }
  closeComment()

}

function home() {
  let show = document.getElementById("show");
  let post = document.getElementById("userpost");
  if (show.style.display === "none") {
    show.style.display = "block";
    post.style.display = "none";
  }
}
