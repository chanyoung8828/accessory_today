const message = document.querySelector('.welcome-message');
const orderComplete = document.querySelector('.order-complete');
const preparing = document.querySelector('.preparing-delivery');
const delivery = document.querySelector('.delivery');
const deliveryComplete = document.querySelector('.delivery-complete');

document.querySelector('.order-tracking').addEventListener('click', () => {
    window.location.href="/user/orderTracking";
});

let userId;
document.querySelector('.info-update').addEventListener('click', () => {
    window.location.href=`/user/userInfo/${userId}`;
});

const token = localStorage.getItem('Authorization') || "";
if (!token) {
    alert("회원가입 페이지로 이동합니다.");
    location.href = "/join";
}
else getUserData();

async function getUserData() {

    await fetch("/api/users/mypage", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    })
    .then((res) => {
        if (res.status !== 200) {
            alert("로그인이 필요한 서비스입니다.");
            window.location.href = "/";
        }
        return res.json();
      })
      .then((userData) => {
        const { deliveryStatus, user } = userData;
        userId = user['_id'];

        if (!userId) {alert("???");}
        message.innerText = `안녕하세요, ${user.username}님😀 `;
        console.log(userId);
        if (deliveryStatus.length < 0) {
            orderComplete.innerText = deliveryStatus["주문완료"];
            preparing.innerText = deliveryStatus["배송준비"];
            delivery.innerText = delivery["배송중"];
            deliveryComplete.innerText = deliveryStatus["배송완료"];
        } else {
            orderComplete.innerText = 0;
            preparing.innerText = 0;
            delivery.innerText = 0;
            deliveryComplete.innerText = 0;
        } 
      })
      .catch((err) => console.log(err));
}

  
