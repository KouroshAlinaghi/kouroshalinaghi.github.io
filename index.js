const slide = (direction, index) => {
    const container = document.querySelectorAll(".skill-projects")[index]
    scrollCompleted = 0;
    var slideVar = setInterval(() => {
        container.scrollLeft = direction == 'left' ? container.scrollLeft - 4 : container.scrollLeft + 4
        scrollCompleted += 4
        
        if (scrollCompleted >= document.querySelector(".project").offsetWidth + 40){
            window.clearInterval(slideVar)
        }
    }, 3)
} 
