document.addEventListener("DOMContentLoaded", () => {
  const wordElement = document.getElementById("word");
  const fullName = " FAVOUR  OMIRIN";
  const firstName = " FAVOUR";
  let currentWord = fullName;

  function animateWord(word) {
    wordElement.innerHTML = "";
    word.split("").forEach((letter, index) => {
      const span = document.createElement("span");
      if (letter === " ") {
        span.innerHTML = "&nbsp;"; // Use a non-breaking space for the space character
      } else {
        span.innerText = letter;
      }
      span.style.animationDelay = `${index * 0.5}s`;
      wordElement.appendChild(span);
    });
  }

  function cycleWords() {
    setTimeout(() => {
      currentWord = currentWord === fullName ? firstName : fullName;
      animateWord(currentWord);
      cycleWords();
    }, currentWord.length * 100 + 6000); // Length of word * animation delay + pause time
  }

  animateWord(currentWord);
  cycleWords();
});

function react() {
  window.open("https://repository-navigator.netlify.app/", "_blank");
}
function vue() {
  window.open("https://github-repository-navigator.netlify.app/", "_blank");
}
function github() {
  window.open("https://github.com/Modred14", "_blank");
}

document.getElementById("colorLink").addEventListener("click", function () {
  var link = this;
  setTimeout(function () {
    link.classList.add("clicked");
  }, 200);
});

document.getElementById("colorLink").addEventListener("click", function () {
  var link = this;
  setTimeout(function () {
    link.classList.add("clicked");
  }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("comment-form");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");
  const commentsList = document.getElementById("comments-list");
  const noCommentsText = document.getElementById("no-comments");

  const baseURL = 'https://favour-omirin.onrender.com';

  async function fetchComments() {
    try {
      const response = await fetch(`${baseURL}/comments`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const comments = await response.json();
      updateComments(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const commentText = commentInput.value.trim();
    if (name && commentText) {
      try {
        const response = await fetch(`${baseURL}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, text: commentText }),
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        await response.json();
        fetchComments();
        nameInput.value = "";
        commentInput.value = "";
        alert("Your comment has been submitted successfully.");
      } catch (error) {
        console.error('Error submitting comment:', error);
        alert("There was an error submitting your comment. Please try again.");
      }
    }
  });

  async function deleteComment(index) {
    const confirmed = confirm("This action will delete this comment. Click Cancel to cancel.");
    if (confirmed) {
      try {
        const response = await fetch(`${baseURL}/comments/${index}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        fetchComments();
        alert(`You have successfully deleted the comment.`);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  }

  async function deleteReply(commentIndex, replyIndex) {
    const confirmed = confirm("This action will delete this reply. Click Cancel to cancel.");
    if (confirmed) {
      try {
        const response = await fetch(`${baseURL}/comments/${commentIndex}/replies/${replyIndex}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        fetchComments();
        alert(`You have successfully deleted the reply.`);
      } catch (error) {
        console.error('Error deleting reply:', error);
      }
    }
  }

  function showReplyForm(index) {
    const replyFormHTML = `
      <form class="reply-form" onsubmit="submitReply(event, ${index})">
        <div class="background">
          <input
            type="text"
            id="reply-name-${index}" 
            placeholder="Your name"
            required
          />
          <textarea
            id="reply-text-${index}" placeholder="Your reply" 
            required
          ></textarea>
          <button type="submit">Send</button>
        </div>
      </form>
    `;
    document.getElementById(`comment-${index}`).insertAdjacentHTML('beforeend', replyFormHTML);
  }

  async function submitReply(event, index) {
    event.preventDefault();
    const name = document.getElementById(`reply-name-${index}`).value.trim();
    const replyText = document.getElementById(`reply-text-${index}`).value.trim();
    if (name && replyText) {
      try {
        const response = await fetch(`${baseURL}/comments/${index}/replies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, text: replyText }),
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        await response.json();
        fetchComments();
        alert("Your reply has been submitted successfully.");
      } catch (error) {
        console.error('Error submitting reply:', error);
        alert("There was an error submitting your reply. Please try again.");
      }
    }
  }

  function updateComments(comments) {
    if (comments.length === 0) {
      noCommentsText.style.display = "block";
      commentsList.style.display = "none";
    } else {
      noCommentsText.style.display = "none";
      commentsList.style.display = "block";
      commentsList.innerHTML = comments
        .map(
          (comment, index) =>
            `<li id="comment-${index}">
              <div>
                <span class="comment-author">${comment.name}:</span>
                <span class="comment-text">${comment.text}</span>
              </div>
              <button class="reply-button" onclick="showReplyForm(${index})">Reply</button>
              <button class="delete-button" onclick="deleteComment(${index})">Delete</button>
              <ul class="replies">
                ${comment.replies ? comment.replies.map((reply, replyIndex) => `
                  <li>
                    <span class="reply-author">${reply.name}:</span>
                    <span class="reply-text">${reply.text}</span>
                    <button class="delete-button" style="display: block; margin-left: -10px; margin-top: -1px;" onclick="deleteReply(${index}, ${replyIndex})">Delete</button>
                  </li>
                `).join('') : ''}
              </ul>
            </li>`
        )
        .join("");
    }
  }

  window.deleteComment = deleteComment;
  window.showReplyForm = showReplyForm;
  window.submitReply = submitReply;
  window.deleteReply = deleteReply;
  fetchComments();
});

