const root = document.getElementById("root");

const tweetItems = document.getElementById("tweetItems");
const addTweet = document.getElementById("addTweet");
const likedList = document.getElementById("likedList");
const goBack = document.getElementById("goBack");

const modifyItem = document.getElementById("modifyItem");
const tweetList = document.getElementById("tweetList");

const modifyItemInput = document.getElementById("modifyItemInput");
const saveModifiedItem = document.getElementById("saveModifiedItem");
const cancelModification = document.getElementById("cancelModification");

let allTweets = [];

const openTweetList = () => {
    modifyItem.style.display = "none";
    tweetItems.style.display = "block";
};

const openTweetBox = () => {
    modifyItem.style.display = "block";
    tweetItems.style.display = "none";
};

likedList.addEventListener("click", () => {});

addTweet.addEventListener("click", () => openTweetBox());
cancelModification.addEventListener("click", () => openTweetList());

saveModifiedItem.addEventListener("click", () => {
    if (modifyItemInput.value !== "") {
        const tweetMessage = modifyItemInput.value;
        const liTag = document.createElement("li");
        const span = document.createElement("span");
        const buttonGroup = document.createElement("div");
        const removeButton = document.createElement("button");
        const likeButton = document.createElement("button");

        span.setAttribute("class", "tweetMessages");
        buttonGroup.setAttribute("class", "buttons-group");
        removeButton.setAttribute("class", "remove");
        likeButton.setAttribute("class", "like");
        liTag.setAttribute("class", "list-item");

        span.textContent = `${tweetMessage}`;
        removeButton.textContent = "Remove";
        likeButton.textContent = "Like";

        buttonGroup.appendChild(removeButton);
        buttonGroup.appendChild(likeButton);

        liTag.appendChild(span);
        liTag.appendChild(buttonGroup);

        allTweets.push(liTag);
        saveTweet();
        modifyItemInput.value = "";
        openTweetList();

        if (allTweets.length !== 0) {
            likeTweet();

            removeTweet();
        }
    }
});

const saveTweet = () => {
    tweetList.innerHTML = "";
    allTweets.map((tweet) => {
        tweetList.append(tweet);
    });
};

const likeTweet = () => {
    const likeButtons = document.querySelectorAll(".like");
    const listItems = document.querySelectorAll(".list-item");

    likedList.addEventListener("click", () => {
        goBack.style.display = "block";
        likedList.style.display = "none";
        addTweet.style.display = "none";

        listItems.forEach((listItem) => {
            if (listItem.getAttribute("data-like") !== "true") {
                listItem.style.display = "none";
            }
        });

        allTweets.map((tweet) => {
            tweetList.append(tweet);
        });
    });

    goBack.addEventListener("click", () => {
        goBack.style.display = "none";
        likedList.style.display = "block";
        addTweet.style.display = "block";

        listItems.forEach((listItem) => {
            listItem.style.display = "flex";
        });
    });

    likeButtons.forEach((likeButton, idx) => {
        let toggle = false;

        likeButton.addEventListener("click", (e) => {
            if (toggle) {
                toggle = false;
                likeButton.innerHTML = "Like";
                listItems[idx].removeAttribute("data-like");
            } else {
                toggle = true;
                likeButton.innerHTML = "Dislike";
                listItems[idx].setAttribute("data-like", "true");
            }
        });
    });
};

const removeTweet = () => {
    const removeButtons = document.querySelectorAll(".remove");
  
    allTweets.forEach((tweet, idx) => {
        removeButtons[idx].addEventListener("click", () => {
            allTweets.splice(idx, 1);
            saveTweet();
        });
    });
};