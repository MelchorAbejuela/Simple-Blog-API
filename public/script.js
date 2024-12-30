const createPostContainer = document.querySelector(".create-post-container");
const upperPart = document.querySelector(".upper-part");
const fetchedPosts = document.querySelector(".fetched-posts-container");

const inputElement = () => {
  upperPart.style.display = "none";
  fetchedPosts.style.display = "none";
  createPostContainer.style.display = "flex";
};

document.querySelector(".input-element").addEventListener("click", () => {
  setTimeout(() => {
    inputElement();
  }, 400);
});

// Fetch posts function
const fetchAllPost = async () => {
  const response = await axios.get("/api/posts");

  if (response.data.msg === "No Post Found.") {
    fetchedPosts.innerHTML = response.data.msg;
    return;
  } else {
    const post = response.data.map((postData) => {
      const isoDate = postData.date;
      const date = new Date(isoDate);
      const localDateString = date.toLocaleDateString();
      const localTimeString = date.toLocaleTimeString("fil-PH", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return `
        <div class="single-post">
          <div>
            <img src="" alt="">
          </div>
          <div>
            <div class="who-when">
              <p class="who">Melchor Abejuela</p>
              <p class="when">${localTimeString} - ${localDateString}</p>
              <button class="edit-button" data-postId="${postData._id}"></button>
            </div>
            <div>
              <p class="post-con">${postData.post}</p>
            </div>
          </div>
        </div>
      `;
    });

    fetchedPosts.innerHTML = post.join("");
  }
};
fetchAllPost();

// Create a post function
const createPost = async () => {
  const selectAudience = document.querySelector(".select-audience");
  const textArea = document.querySelector(".text-area");

  document
    .querySelector(".post-submit-button")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      await axios.post("/api/posts", {
        post: textArea.value,
        audience: selectAudience.value,
      });
      fetchAllPost();
      window.location.reload();
    });
};
createPost();

// Edit a post function
const displayEditPost = async (patchMethod) => {
  const fetchedPostContainer = document.querySelector(
    ".fetched-posts-container"
  );

  fetchedPostContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-button")) {
      // get the data attribute
      const postId = e.target.getAttribute("data-postId");

      // remove the display after getting the data attribute
      upperPart.style.display = "none";
      fetchedPosts.style.display = "none";

      // main container
      const mainContainer = document.querySelector(".main");

      // get the single post container and the text content
      const singlePost = e.target.closest(".single-post");
      const pastPost = singlePost.querySelector(".post-con").textContent.trim();

      const editPostContainer = `
        <div class="edit-post-container">
          <a href="index.html">Go back</a>
          <div class="edit-post-header">
            <img src="" alt="">
            <div>
              <p class="profile-name">Melchor Abejuela</p>
              <select class="select-audience">
                <option value="friends">Friends</option>
                <option value="public">Public</option>
                <option value="only me">Only me</option>
              </select>
            </div>
          </div>
          <div class="create-post-body">
            <textarea class="text-area">${pastPost}</textarea>
            <div class="post-button-container">
              <button type="button" class="cancel-edit">Cancel</button>
              <button type="submit" class="post-submit-button" data-postId="${postId}">Post</button>
            </div>
          </div>
        </div>
        <div class="fetched-posts-container"></div>
      `;

      mainContainer.innerHTML = editPostContainer;
      patchMethod();
    }
  });
};

const patchMethod = async () => {
  const editPostContainer = document.querySelector(".edit-post-container");
  editPostContainer.addEventListener("click", async (e) => {
    if (e.target.classList.contains("post-submit-button")) {
      const updatePostContainer = e.target.closest(".edit-post-container");

      const audienceContainer =
        updatePostContainer.querySelector(".select-audience");
      const postContainer = updatePostContainer.querySelector(".text-area");

      const audience = audienceContainer.value;
      const post = postContainer.value;

      const postId = e.target.getAttribute("data-postId");

      const response = await axios.patch(`/api/posts/${postId}`, {
        audience: audience,
        post: post,
      });
      window.location.reload();
    }
  });
};

displayEditPost(patchMethod);
