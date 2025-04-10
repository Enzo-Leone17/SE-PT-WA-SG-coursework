let followerCountValue = 0;
const followerCounter = document.getElementById("followersCount");
followerCounter.innerText = "Follower Count: " + followerCountValue;

function countFollowers() {
  followerCountValue++;
  followerCounter.innerText = "Follower Count: " + followerCountValue;
}
