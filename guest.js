import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
    // Your Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDaqXyQHl1xmzBARI9Dp0ETt1QpiAMkd44",
        authDomain: "roqaya-birthday.firebaseapp.com",
        projectId: "roqaya-birthday",
        storageBucket: "roqaya-birthday.appspot.com",
        messagingSenderId: "1094591477011",
        appId: "1:1094591477011:web:89b6d89ddda8d1c3716e6"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    function submitMessage() {
        const name = document.getElementById("guestName").value.trim();
        const message = document.getElementById("guestMessage").value.trim();
        const confirmation = document.getElementById("confirmation");
        if (name && message) {
            addDoc(collection(db, "birthdayMessages"), { name, message }).then(() => {
                confirmation.style.display = "block";
                document.getElementById("guestName").value = "";
                document.getElementById("guestMessage").value = "";
            });
        }
    }
    window.submitMessage = submitMessage;