import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

        // Firebase Configuration
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

        function checkBirthday() {
            const now = new Date();
            const birthday = new Date("July 8, 2025 00:00:00"); // March 11, 2025 at 12:00 AM (midnight)

            if (now >= birthday) {
                document.getElementById("content").classList.remove("hidden");
                document.getElementById("timer").innerHTML = "🎉 It's Your Birthday!";
                loadMessages();
            } else {
                updateCountdown(birthday);
            }
        }

        function updateCountdown(targetDate) {
            const timerElement = document.getElementById("timer");
            const interval = setInterval(() => {
                const now = new Date();
                const remaining = targetDate - now;

                if (remaining <= 0) {
                    clearInterval(interval);
                    timerElement.innerHTML = "🎉 It's Your Birthday!";
                    document.getElementById("content").classList.remove("hidden");
                    loadMessages();
                } else {
                    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
                    timerElement.innerHTML = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
                }
            }, 1000);
        }

        function loadMessages() {
            const messagesDiv = document.getElementById("messages");
            onSnapshot(collection(db, "birthdayMessages"), (snapshot) => {
                messagesDiv.innerHTML = "";
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.name && data.message) {
                        const newMessage = document.createElement("p");
                        newMessage.innerHTML = `<strong>${data.name}:</strong> ${data.message}`;
                        messagesDiv.appendChild(newMessage);
                    }
                });
            });
        }

        document.addEventListener("DOMContentLoaded", checkBirthday);
