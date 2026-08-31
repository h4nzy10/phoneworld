function animate() {
    const cardInfos = document.querySelectorAll(".group");

    cardInfos.forEach((card) => {
        const innerDiv = card.querySelector("div");

        innerDiv.style.transform = "translateY(0)";
        innerDiv.style.transition = "0.3s ease";

        card.addEventListener("click", () => {
            const isActive = card.classList.contains("active");

            if (isActive) {
                card.classList.remove("active");

                innerDiv.style.transform = "translateY(0px)";
                innerDiv.style.color = "#222831";
                innerDiv.style.backgroundColor =
                    "rgba(255, 255, 255, 0.9)";
            } else {
                card.classList.add("active");

                innerDiv.style.transform = "translateY(-250px)";
                innerDiv.style.color = "#00ADB5";
                innerDiv.style.backgroundColor = "#222831";
            }
        });
    });
}
animate();